import React,{Component} from 'react';
import {Text,View,Alert,Keyboard} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {TextInputIcon} from './../components/TextInputIcon';
import {MainSubmitButton} from './../components/MainSubmitButton';

export default class NewPasswordScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            newPassword: '',
            confirmNewPassword: '',
        }
    }

    onSubmitButtonPress(){
        if(this.state.newPassword!==this.state.confirmNewPassword){
            Alert.alert(
                'เกิดข้อผิดพลาด',
                'รหัสผ่านไม่ตรงกัน',
                [
                {text: 'OK',},
                ]
            )
            this.setState({
                newPassword: null,
                confirmNewPassword: null,
            })
        }else{

        }
        Keyboard.dismiss()
    }

    render(){
        return(
            <View style={styles.newPasswordScreenContainerStyle}>
                  <Headers
                    leftIconName='cancel'
                    headerTitleText='รหัสผ่านใหม่'
                />
                <View style={styles.newPasswordDetailContainerStyle}>
                    <TextInputIcon
                        value={this.state.newPassword}
                        onChangeText={(newPassword)=>this.setState({newPassword})}
                        leftLabelText='รหัสผ่านใหม่'
                        iconUri={require('../source/icons/iconPass.png')}
                        containerStyle={styles.inputContainerStyle}
                        secondFlex={secondFlex}
                        thirdFlex={thirdFlex}
                        secureTextEntry
                    />
                    <TextInputIcon
                        value={this.state.confirmNewPassword}
                        onChangeText={(confirmNewPassword)=>this.setState({confirmNewPassword})}
                        leftLabelText='ยืนยันรหัสผ่านใหม่'
                        iconUri={require('../source/icons/iconPass.png')}
                        containerStyle={styles.inputContainerStyle}
                        secondFlex={secondFlex}
                        thirdFlex={thirdFlex}
                        secureTextEntry
                    />
                    <MainSubmitButton
                        buttonTitleText='ตกลง'
                        onPress={this.onSubmitButtonPress.bind(this)}
                        style={styles.submitButtonContainerStyle}
                    />
                </View>
            </View>
        )
    }
}

const secondFlex = 0.3,thirdFlex = 0.9

const styles={
    newPasswordScreenContainerStyle:{
        flex: 1,
    },
    newPasswordDetailContainerStyle:{
        flex: 1,
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
        paddingTop: responsiveHeight(2),
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
        height: responsiveHeight(8)
    },
    submitButtonContainerStyle:{
        marginTop: responsiveHeight(2.5),
    }
}
