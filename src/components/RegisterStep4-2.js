import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';


import {TextInputIcon} from './TextInputIcon';
import {MainSubmitButton} from './MainSubmitButton';
import {CheckBoxes} from './../components/CheckBoxes';

class RegisterStep4_2 extends Component{

    constructor(props){
        super(props)
        this.state={
            otp: '',

        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(){
        this.props.onSubmitRegister4_2Press(this.state.otp)
    }
    render(){
        return(
            <View style={styles.registerStep1ContainerStyle}>
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
                        <TouchableOpacity onPress={this.props.onRequestNewOtpButtonPress} style={styles.requestNewOtpContainerStyle}>
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
        flex: 1,

    },
    mascotImageStyle:{
        height: responsiveHeight(20.51),
        alignSelf: 'center',
        marginBottom: responsiveHeight(2),

    },
    registerDirectionContainerStyle:{
        marginLeft: responsiveWidth(6),
        marginRight: responsiveWidth(6),
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

export {RegisterStep4_2}