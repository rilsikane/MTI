import React,{Component} from 'react';
import {Text,View} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {TextInputIcon} from './../components/TextInputIcon';
import {MainSubmitButton} from './../components/MainSubmitButton';

export default class ForgotPasswordScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            forgotPasswordEmail: '',
        }
    }

    render(){
        return(
            <View style={styles.forgotPasswordScreenContainerStyle}>
                  <Headers
                    leftIconName='cancel'
                    headerTitleText='ลืมรหัสผ่าน'
                />
                <View style={styles.forgotPasswordDetailContainerStyle}>
                    <Text style={styles.titleTextStyle}>กรุณากรอกอีเมล หรือ เบอร์โทรศัพท์ของคุณ{'\n'}เพื่อขอรับรหัสผ่านใหม่</Text>
                    <TextInputIcon
                        value={this.state.forgotPasswordEmail}
                        onChangeText={(forgotPasswordEmail)=>this.setState({forgotPasswordEmail})}
                        leftLabelText='อีเมล / เบอร์โทรศัพท์'
                        iconUri={require('../source/icons/iconMail.png')}
                        containerStyle={styles.inputContainerStyle}
                        secondFlex={secondFlex}
                        thirdFlex={thirdFlex}
                        keyboardType='email-address'
                    />
                    <MainSubmitButton
                        buttonTitleText='ตกลง'
                        onPress={()=>alert('Submit')}
                        style={styles.submitButtonContainerStyle}
                    />
                </View>
            </View>
        )
    }
}

const secondFlex = 0.3,thirdFlex = 0.9

const styles={
    forgotPasswordScreenContainerStyle:{
        flex: 1,
    },
    forgotPasswordDetailContainerStyle:{
        flex: 1,
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
    },
    titleTextStyle:{
        letterSpacing: 0,
        textAlign: "center",
        color: "#1595d3",
        fontSize: responsiveFontSize(3),
        marginTop: responsiveHeight(4),
        marginBottom: responsiveHeight(3),
    },
    inputContainerStyle:{
        borderBottomColor: '#C4C4C4',
        height: responsiveHeight(7)
    },
    submitButtonContainerStyle:{
        marginTop: responsiveHeight(2.5),
    }
}
