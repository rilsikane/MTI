import React,{Component} from 'react';
import {Text,View,Alert,Keyboard} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {TextInputIcon} from './../components/TextInputIcon';
import {MainSubmitButton} from './../components/MainSubmitButton';
import {postBasic} from '../api'
import { observer, inject } from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';
@inject('registerStore')
@observer
export default class NewPasswordScreen extends Component{
    static navigatorStyle = {
        tabBarHidden: true
    };
    constructor(props){
        super(props)
        this.state={
            newPassword: '',
            confirmNewPassword: '',
            errorPassowrd:false,
            isLoading:false,
            errorConfirmPassowrd:''
        }
        this.focusNextField = this.focusNextField.bind(this); 
        this.inputs = {};
    }

    async onSubmitButtonPress(){
        if(this.state.newPassword!==this.state.confirmNewPassword&&this.state.confirmNewPassword.length>0){
            Alert.alert(
                ' ',
                'รหัสผ่านไม่ตรงกัน',
                [
                {text: 'OK',},
                ]
            )
            this.setState({
                newPassword: '',
                confirmNewPassword: '',
                errorPassowrd:false,
                isLoading:false
            })
        }else{
            this.setState({isLoading:true});
            let responnse = await postBasic("forgot/password",{email:this.props.registerStore.otp.email,new_password:this.state.newPassword});
            this.setState({isLoading:false});
            if(responnse){
                setTimeout(()=>{
                Alert.alert(
                    '',
                    'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว',
                    [
                    {text: 'ตกลง', onPress: () => 
                    {
                        setTimeout(()=>{
                            this.props.navigator.resetTo({
                                screen: 'mti.LoginScreen', // unique ID registered with Navigation.registerScreen
                                title: undefined, // navigation bar title of the pushed screen (optional)
                                titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                                passProps: {}, // Object that will be passed as props to the pushed screen (optional)
                                animated: true, // does the push have transition animation or does it happen immediately (optional)
                                backButtonTitle: undefined, // override the back button title (optional)
                                backButtonHidden: false, // hide the back button altogether (optional)
                            })
                        },600)    
                        
                    }},
                    ]
                )},500)
            }else{
                this.setState({isLoading:false});
            }
        }
        Keyboard.dismiss()
    }
    onPasswordChange(){
        var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
        if(this.state.newPassword.length >=8 && regex.test(this.state.newPassword)){
            this.setState({errorPassowrd:false})
        }else{
            this.setState({errorPassowrd:true})
        }

    }

    focusNextField(key){
        this.inputs[key].focus();
    }

    render(){
        return(
            <View style={styles.newPasswordScreenContainerStyle}>
                  <Headers
                    leftIconName='cancel'
                    headerTitleText='รหัสผ่านใหม่'
                    cancel={()=> this.props.navigator.resetTo({
                        screen: 'mti.LoginScreen', // unique ID registered with Navigation.registerScreen
                        title: undefined, // navigation bar title of the pushed screen (optional)
                        passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
                        animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
                        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
                        navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
                        navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                      })}
                     hideRightIcon={true}
                />
                <View style={styles.newPasswordDetailContainerStyle}>
                    <TextInputIcon
                        value={this.state.newPassword}
                        onChangeText={
                            (newPassword)=> {
                                var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
                                if(newPassword.length >=8 && regex.test(newPassword)){
                                    this.setState({errorPassowrd:false,newPassword:newPassword,confirmNewPassword:""})
                                }else{
                                    this.setState({errorPassowrd:true,newPassword:newPassword,confirmNewPassword:""})
                                }
                            }
                        }
                        leftLabelText='รหัสผ่านใหม่'
                        iconUri={require('../source/icons/iconPass.png')}
                        containerStyle={styles.inputContainerStyle}
                        secondFlex={secondFlex}
                        thirdFlex={thirdFlex}
                        secureTextEntry
                        onEndEditing={this.onPasswordChange.bind(this)}
                        maxLength={16}
                        blurOnSubmit={ false }
                        onSubmitEditing={() => {
                            setTimeout(()=>{
                            this.focusNextField('confirmPass');
                            },200);
                        }}
                        returnKeyType = {"next"}
                    />
                    {this.state.errorPassowrd ? <Text style={styles.errorMsg}>รหัสผ่านไม่ถูกรูปแบบตามที่กำหนด</Text>:null}
                    <TextInputIcon
                        refs={ input => {
                            this.inputs['confirmPass'] = input;
                        }}
                        value={this.state.confirmNewPassword}
                        onChangeText={
                            (confirmNewPassword)=> {
                                var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
                                if(confirmNewPassword.length >=8 && regex.test(confirmNewPassword)){
                                    if(this.state.newPassword!==confirmNewPassword){
                                        this.setState({confirmNewPassword:confirmNewPassword,errorConfirmPassowrd:'รหัสผ่านไม่ตรงกัน'})
                                    }else{
                                        this.setState({confirmNewPassword:confirmNewPassword,errorConfirmPassowrd:''})
                                    }
                                }else{
                                    this.setState({confirmNewPassword:confirmNewPassword,errorConfirmPassowrd:'รหัสผ่านไม่ถูกรูปแบบตามที่กำหนด'})
                                }
                            }
                        }
                        leftLabelText='ยืนยันรหัสผ่านใหม่'
                        iconUri={require('../source/icons/iconPass.png')}
                        containerStyle={styles.inputContainerStyle}
                        secondFlex={secondFlex}
                        thirdFlex={thirdFlex}
                        secureTextEntry
                        maxLength={16}
                        blurOnSubmit={true}
                        onSubmitEditing={()=>this.onSubmitButtonPress.bind(this)}
                    />
                     {(this.state.errorConfirmPassowrd&&this.state.errorConfirmPassowrd!='') ? <Text style={styles.errorMsg}>{this.state.errorConfirmPassowrd}</Text>:null}
                     <Text style={styles.directionTextStyle}>กำหนดรหัสผ่านต้องมีอักขระอย่างน้อย 8 ตัวและประกอบไปด้วย {'\n'}ตัวอักษรภาษาอังกฤษ พิมพ์เล็ก พิมพ์ใหญ่ และตัวเลข</Text>
                     {!this.state.errorPassowrd && !this.state.errorConfirmPassowrd && this.state.newPassword!=''&& this.state.confirmNewPassword!='' 
                     &&<MainSubmitButton
                        buttonTitleText='ตกลง'
                        onPress={this.onSubmitButtonPress.bind(this)}
                        style={styles.submitButtonContainerStyle}
                    />}
                </View>
                {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
            </View>
        )
    }
}

const secondFlex = 0.3,thirdFlex = 0.9

const styles={
    newPasswordScreenContainerStyle:{
        flex: 1,
        backgroundColor:"#fff"
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
    },
    errorMsg:{
        fontSize:responsiveFontSize(2.2),
        color:"red",
        padding:2
    },
    errorTextStyle:{
        fontSize: responsiveHeight(2.64),
        marginTop: responsiveHeight(1),
        color: 'red'
    },
    directionTextStyle:{
        textAlign: 'center',
        color: "#919195",
        letterSpacing: 0,
        fontSize: responsiveFontSize(2.2),
    },
}
