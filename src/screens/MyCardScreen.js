import React,{Component} from 'react';
import {Text,View,Image,ImageBackground,ScrollView} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Spinner from 'react-native-loading-spinner-overlay';

import {Headers} from './../components/Headers';
import {UserShortDetailCard} from './../components/UserShortDetailCard';
import {CheckBoxes} from '../components/CheckBoxes';

import {post,authen,get,put} from '../api';
import store from 'react-native-simple-store';

export default class MyCardScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            isLoading: true,
            qrChecked: true,
            userDetail:{},
        }
    }

    async componentDidMount(){
        this.init();
    }

    async init(){
        this.setState({isLoading: true});
        let user = await store.get("user");
       
        this.setState({
            userDetail: user,
            isLoading: false,
        })
        console.log(this.state.userDetail.card)
    }

    onCheckBoxPress(type){
        if(type==='qr'){
        
            this.setState({qrChecked: true})
        }else{
        
            this.setState({qrChecked: false})
        }
      
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:"#fff"}}>
            <Headers
            leftIconName='back'
            headerTitleText='My Card'
            rightIconName='iconBell'
            />
            <ScrollView style={styles.myCardScreenContainerStyle}>
               
                {!this.state.isLoading  && <View style={styles.myCardContainerStyle}>
                    <UserShortDetailCard
                        showQr={false}
                        navigator={this.props.navigator}
                    />
                    <View style={styles.myCardSectionStyle}>
                            <ImageBackground style={styles.cardImgStyle} imageStyle={styles.frontCardContainerStyle}  source={{uri:this.state.userDetail.card.design.front}} >
                                <Text style={styles.myCardTitleTextStyle}>MTI MY CARD</Text>
                                <View style={styles.myCardDetailTextContainerStyle}>
                                    <Text style={styles.userNameTextStyle}>{`${this.state.userDetail.name} ${this.state.userDetail.surname}`}</Text>
                                    {!this.state.isLoading  && <Text style={styles.cardIdTextStyle}>รหัส {this.state.userDetail.card.code}</Text>}
                                </View>
                            </ImageBackground>
                        <View style={styles.checkBoxContainerStyle}>
                            <Text style={styles.checkTitleTextStyle}>ข้อมูลหลังบัตร :</Text>
                            <CheckBoxes
                                checkBoxTitleText='QR Code'
                                checked={this.state.qrChecked}
                                checkedColor='#0194d2'
                                uncheckedColor='rgba(145, 145, 149, 0.27)'
                                checkBoxTextStyle={styles.checkBoxTextStyle}
                                //textUnderLine={true}
                                onIconPress={()=>this.onCheckBoxPress('qr')}
                                containerStyle={styles.checkBoxStyle}
                            />
                            <CheckBoxes
                                checkBoxTitleText='Barcode'
                                checked={!this.state.qrChecked}
                                checkedColor='#0194d2'
                                uncheckedColor='rgba(145, 145, 149, 0.27)'
                                checkBoxTextStyle={styles.checkBoxTextStyle}
                                //textUnderLine={true}
                                onIconPress={()=>this.onCheckBoxPress('barcode')}
                                containerStyle={styles.checkBoxStyle}
                            />
                        </View>
                        <ImageBackground style={{height: responsiveHeight(31),width: responsiveWidth(85)}} imageStyle={styles.backCardContainerStyle}  source={{uri:this.state.userDetail.card.design.rear}} >
                            {!this.state.isLoading  && <Image
                                source={{uri:this.state.qrChecked?this.state.userDetail.card.qrcode:this.state.userDetail.card.barcode}}
                                resizeMode='contain'
                                style={styles.qrImageStyle}
                            />}
                            <Text style={styles.myCardTitleTextStyle}>MTI MY CARD</Text>
                        </ImageBackground>
                    </View>
                </View>}
                {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
            </ScrollView>
            </View>
        )
    }
}

const styles={
    myCardScreenContainerStyle:{
        flex: 1,
        backgroundColor:"#fff"
    },
    myCardContainerStyle:{
        flex: 1,
    },
    myCardSectionStyle:{
        flex: 1,
        alignItems: 'center',
        paddingTop: responsiveHeight(1),
    },
    frontCardContainerStyle:{
        borderRadius: 15,
        //borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#dddddd",
        justifyContent: 'space-between',
    },
    cardImgStyle:{
        height: responsiveHeight(30),
        width: responsiveWidth(85),
    },
    qrImageStyle:{
        height: responsiveHeight(14.43),
        width: responsiveHeight(30),
        alignSelf: 'center',
        marginTop: responsiveHeight(4),
    },
    backCardContainerStyle:{
        borderRadius: 15,
        backgroundColor: "#f6f6f6",
        borderWidth: 1,
        borderColor: "#dddddd",
        justifyContent: 'space-around',
    },
    myCardTitleTextStyle:{
        letterSpacing: 0,
        textAlign: "center",
        color: "transparent",
        //opacity: 0.27,
        fontSize: responsiveFontSize(7.5),
    },
    myCardDetailTextContainerStyle:{
        marginLeft: responsiveWidth(7),
        marginBottom: responsiveWidth(7),
        marginTop: responsiveHeight(12),
    },
    userNameTextStyle:{
        color: "#FFF",
        fontSize: responsiveFontSize(3),
    },
    cardIdTextStyle:{
        color: "#FFF",
        fontSize: responsiveFontSize(2.2),
        marginTop: -responsiveHeight(1),
    },
    checkBoxContainerStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        width: responsiveWidth(85),
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(1),
    },
    checkTitleTextStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(2.8),
    },
    checkBoxTextStyle:{
        color: "#919195",
        letterSpacing: 0,
        fontSize: responsiveFontSize(2.2),
    },
    checkBoxStyle:{
        height: responsiveHeight(3),
    }
}
