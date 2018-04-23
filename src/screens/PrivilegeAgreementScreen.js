import React,{Component} from 'react';
import {Text,View,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {MainSubmitButton} from './../components/MainSubmitButton';
import {post,authen,get} from '../api';

export default class PrivilegeAgreementScreen extends Component{

    constructor(props){
        super(props)
        this.redeem = this.redeem.bind(this);
    }

    renderAgreementList(){

        // return this.props.data.content2.map((data,i)=>
        //     <View key={i} style={styles.agreementListTextContainerStyle}>
        //         <Text style={styles.agreementTitleTextStyle}>{++i}. </Text>
        //         <Text style={styles.agreementTitleTextStyle}>{data.description}</Text>
        //     </View>
        // )
        return <Text style={styles.agreementTitleTextStyle}>{this.props.data.content2}</Text>
    }
    async redeem(){
        let response2 = await post(`privilege/redeem`,{"privilege_id":this.props.data.id});
        console.log(JSON.stringify(response2));
        if(response2){
            this.props.navigator.showModal({
                screen: 'mti.PrivilegeQrCodeScreen', // unique ID registered with Navigation.registerScreen
                title: undefined, // navigation bar title of the pushed screen (optional)
                titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                passProps: {navigator:this.props.navigator,data:this.props.data}, // Object that will be passed as props to the pushed screen (optional)
                animated: true, // does the push have transition animation or does it happen immediately (optional)
                backButtonTitle: undefined, // override the back button title (optional)
                backButtonHidden: false, // hide the back button altogether (optional)
                
            })
        }
        console.log(response2);
    }

    render(){
        return(
            <View style={styles.privilegeAgreementScreenContainerStyle}>
                <Headers
                    headerTitleText='เงื่อนไขสำหรับใช้สิทธิ์'
                />
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
                    <TouchableOpacity onPress={()=>this.props.navigator.dismissModal({
                        animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                    })}>
                        <Text style={styles.cancelTextStyle}>ยกเลิก</Text>
                    </TouchableOpacity>
                </View>
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