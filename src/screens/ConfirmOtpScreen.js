import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity,Alert} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {TextInputIcon} from '../components/TextInputIcon';
import {MainSubmitButton} from '../components/MainSubmitButton';
import {CheckBoxes} from '../components/CheckBoxes';
import { observer, inject } from 'mobx-react';
import {postBasic} from '../api/';

@inject('registerStore')
@observer
class ConfirmOtpScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            otp: '',

        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onRequestNewOtpButtonPress = this.onRequestNewOtpButtonPress.bind(this);
    }
    async onRequestNewOtpButtonPress(){
        let param = {};
        param.mobile_no = this.props.registerStore.otp.tel;
        this.setState({isLoading:true})
        let response = await postBasic("otp/request",param);
        this.setState({isLoading:false});
        if(response){
            this.setState({isLoading:false});
            if(!response.message){
                setTimeout(()=>{Alert.alert(
                    ' ',
                    `ส่ง OTP ไปยังหมายเลข ${ this.props.registerStore.otp.tel} เรียบร้อยแล้ว`,
                    [
                    {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    ]
                )},150)
                this.props.registerStore.otp.refcode = response.refcode;
            }
        }
    }
    async onSubmit(){
        this.setState({isLoading:false});
        let param = {};
        param.refcode = this.props.registerStore.otp.refcode;
        param.otp = this.state.otp;
        //this.setState({isLoading:true})
        let response = await postBasic("otp/check",param);
        this.setState({isLoading:false});
        if(response){
            this.props.navigator.push({
                screen: 'mti.NewPasswordScreen', // unique ID registered with Navigation.registerScreen
                title: undefined, // navigation bar title of the pushed screen (optional)
                titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                passProps: {navigator:this.props.navigator,data:response}, // Object that will be passed as props to the pushed screen (optional)
                animated: true, // does the push have transition animation or does it happen immediately (optional)
                backButtonTitle: undefined, // override the back button title (optional)
                backButtonHidden: false, // hide the back button altogether (optional)
            })
        }
    }
    render(){
        return(
            <View style={styles.registerStep1ContainerStyle}>
                 <Headers
                    leftIconName=''
                    rightIconName='cancel'
                    headerTitleText='ลืมรหัสผ่าน'
                    cancel={()=> this.props.navigator.resetTo({
                        screen: 'mti.LoginScreen', // unique ID registered with Navigation.registerScreen
                        title: undefined, // navigation bar title of the pushed screen (optional)
                        passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
                        animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
                        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
                        navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
                        navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                      })}
                />
                <View style={styles.registerDirectionContainerStyle}>
                    <Text style={styles.registerTitleTextStyle}>ยืนยันตัวตนด้วยรหัส OTP</Text>
                    <Text style={styles.directionTextStyle}>ระบุรหัส OTP ที่ได้รับทาง SMS{`\n`}รหัสมีอายุการใช้งาน 5 นาที</Text>
                </View>
                <View style={styles.userDetailContainerStyle}>
                    <TextInputIcon
                        value={this.state.otp}
                        leftLabelText='รหัส OTP'
                        iconStyle={styles.iconStyle}
                        iconUri={require('./../source/icons/iconPass.png')}
                        containerStyle={styles.inputContainerStyle}
                        secondFlex={secondFlex}
                        thirdFlex={thirdFlex}
                        onChangeText={(otp)=> this.setState({otp})}
                        keyboardType='numeric'
                    />
                    <View style={styles.submitButtonContainerStyle}>
                        <MainSubmitButton
                            buttonTitleText='ตกลง'
                            onPress={this.onSubmit}
                        />
                        <TouchableOpacity onPress={this.onRequestNewOtpButtonPress} style={styles.requestNewOtpContainerStyle}>
                            <Text style={styles.requestNewOtpTextStyle}>ขอรับรหัสใหม่อีกครั้ง</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const secondFlex = 0.3,thirdFlex = 0.6

const styles={
    registerStep1ContainerStyle:{
        flex: 1
    },
    mascotImageStyle:{
        height: responsiveHeight(20.51),
        alignSelf: 'center',
        marginBottom: responsiveHeight(2),

    },
    registerDirectionContainerStyle:{
        marginLeft: responsiveWidth(6),
        marginRight: responsiveWidth(6),
        marginTop:responsiveHeight(5)
    },
    registerTitleTextStyle:{
        textAlign: 'center',
        color: '#1595d3',
        fontSize: responsiveFontSize(3.5),
        marginBottom: responsiveHeight(1),

    },
    directionTextStyle:{
        textAlign: 'center',
        color: "#919195",
        letterSpacing: 0,
        fontSize: responsiveFontSize(2.4),
        marginLeft: responsiveWidth(10),
        marginRight: responsiveWidth(10),
    },
    userDetailContainerStyle:{
        flex: 1,
        paddingLeft: responsiveWidth(5),
        paddingRight: responsiveWidth(5),
    },
    iconStyle:{
        height: responsiveHeight(2.81),

    },
    inputContainerStyle:{
        borderBottomColor: '#C4C4C4',
    },
    iconStyle:{
        height: responsiveHeight(3)
    },
    checkBoxTextStyle:{
        color: "#0194d2",
        letterSpacing: 0,
        fontSize: responsiveFontSize(2.64),
    },
    errorTextStyle:{
        fontSize: responsiveHeight(2.64),
        marginTop: responsiveHeight(1),
        color: 'red'
    },
    submitButtonContainerStyle:{
        flex: 1,
        marginTop: responsiveHeight(3),
        // justifyContent: 'center',
    },
    requestNewOtpContainerStyle:{
        marginTop: responsiveHeight(2),

    },
    requestNewOtpTextStyle:{
        textAlign: 'center',
        fontSize: responsiveFontSize(2.64),
        color: '#1595d3'
    }

}

export default ConfirmOtpScreen;