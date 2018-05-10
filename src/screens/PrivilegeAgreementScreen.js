import React,{Component} from 'react';
import {Text,View,TouchableOpacity,ScrollView,Alert} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Spinner from 'react-native-loading-spinner-overlay';

import {Headers} from './../components/Headers';
import {MainSubmitButton} from './../components/MainSubmitButton';
import {post,authen,get} from '../api';

export default class PrivilegeAgreementScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            isLoading: false,
        }
        this.redeem = this.redeem.bind(this);
    }

    renderAgreementList(){
        let content2 = this.props.data.content2.split("|");
        return content2.map((data,i)=>
            <View key={i} style={styles.agreementListTextContainerStyle}>
                <Text style={styles.agreementTitleTextStyle}>{data}</Text>
            </View>
        )
        //return <Text style={styles.agreementTitleTextStyle}>{this.props.data.content2}</Text>
    }
    async redeem(){
        this.setState({isLoading: true})
        if(this.props.data.type.toLowerCase()=='barter'){
            let checkBarter = await post('redeem/check/barter',{})
            this.setState({isLoading: false})
            if(checkBarter&&checkBarter.status=='ok'){
                setTimeout(()=>{
                    this.props.navigator.dismissModal({
                        animationType: 'none' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                    });
                },50)
                setTimeout(()=>{
                    this.props.navigator.push({
                        screen: "mti.MyCardScreen", // unique ID registered with Navigation.registerScreen
                        passProps:{navigator:this.props.navigator},
                        title: undefined, // navigation bar title of the pushed screen (optional)
                        titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                        animated: false, // does the push have transition animation or does it happen immediately (optional)
                        backButtonTitle: undefined, // override the back button title (optional)
                        backButtonHidden: false, // hide the back button altogether (optional)
                    })
                },200);
                //this.setState({isLoading: false})
            }else{
                console.log('redeem error')
                this.setState({isLoading: false})
            }
         
        }else{
            let response2 = await post(`redeem`,{"privilege_id":this.props.data.id});
            console.log(JSON.stringify(response2));
             this.setState({isLoading: false});
            if(response2){
                setTimeout(()=>{
                    this.props.navigator.showModal({
                        screen: 'mti.PrivilegeQrCodeScreen', // unique ID registered with Navigation.registerScreen
                        title: undefined, // navigation bar title of the pushed screen (optional)
                        titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                        passProps: {navigator:this.props.navigator,redeem:response2,data:this.props.data,item:this.props.item}, // Object that will be passed as props to the pushed screen (optional)
                        animated: true, // does the push have transition animation or does it happen immediately (optional)
                        backButtonTitle: undefined, // override the back button title (optional)
                        backButtonHidden: false, // hide the back button altogether (optional)
                        
                    })
                },500);
               
            }
        }
   
    }

    render(){
        return(
            <View style={styles.privilegeAgreementScreenContainerStyle}>
                <Headers
                    headerTitleText='เงื่อนไขสำหรับใช้สิทธิ์'
                    leftIconName='close'
                />
                <ScrollView style={{flex: 1,}}>
                    <View style={styles.privilegeAgreementContainerStyle}>
                        <Text style={styles.privilegeTitleTextStyle}>{this.props.data.name}</Text>
                        <Text style={styles.privilegeDurationTextStyle}></Text>
                        <Text style={styles.agreementTitleTextStyle}>เงื่อนไขสำหรับใช้สิทธิ์</Text>
                        {this.renderAgreementList()}
                        <MainSubmitButton
                            buttonTitleText='ตกลง'
                            onPress={this.redeem}
                            style={styles.submitButtonStyle}
                        />
                        {/* <TouchableOpacity onPress={()=>this.props.navigator.dismissModal({
                            animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                        })}>
                            <Text style={styles.cancelTextStyle}>ยกเลิก</Text>
                        </TouchableOpacity> */}
                    </View>
                </ScrollView>
                {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
            </View>
        )
    }
}

const styles={
    privilegeAgreementScreenContainerStyle:{
        flex: 1,
        backgroundColor: '#FFF'
    },
    privilegeAgreementContainerStyle:{
        flex: 1,
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
    },
    privilegeTitleTextStyle:{
        letterSpacing: 0,
        color: "#1595d3",
        fontSize: responsiveFontSize(3),
        marginTop: responsiveHeight(3.5),
        marginBottom: responsiveHeight(2.4)
    },
    privilegeDurationTextStyle:{
        letterSpacing: 0,
        fontSize: responsiveFontSize(2.15),
        color: 'rgb(253,98,98)',
        marginBottom: responsiveHeight(2.4),
    },
    agreementTitleTextStyle:{
        letterSpacing: 0,
        color: "#919195",
        fontSize: responsiveFontSize(2.15),
    },
    agreementListTextContainerStyle:{
        flexDirection: 'row',
    },
    submitButtonStyle:{
        marginTop: responsiveHeight(2.5),
        marginBottom: responsiveHeight(2.5),
    },
    cancelTextStyle:{
        letterSpacing: 0,
        textAlign: "right",
        color: "#1595d3",
        textDecorationLine: 'underline',
        fontSize: responsiveFontSize(2.8),
    }
}