import React,{Component} from 'react';
import {Text,View,Keyboard} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {TextInputIcon} from './../components/TextInputIcon';
import {MainSubmitButton} from './../components/MainSubmitButton';
import {postBasic} from '../api'
import Spinner from 'react-native-loading-spinner-overlay';
export default class ForgotPasswordScreen extends Component{
    static navigatorStyle = {
        tabBarHidden: true
    };

    constructor(props){
        super(props)
        this.state={
            forgotPasswordEmail: '',
            isLoading:false
        }
    }
    async submit(){
        Keyboard.dismiss();
        this.setState({isLoading:true});
        let response = await postBasic("forgot/check",{tel_or_email:this.state.forgotPasswordEmail},true);
        this.setState({isLoading:false});
        if(response){
            this.props.navigator.push({
                screen: 'mti.ReqOtpScreen', // unique ID registered with Navigation.registerScreen
                title: undefined, // navigation bar title of the pushed screen (optional)
                titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                passProps: {navigator:this.props.navigator,data:response}, // Object that will be passed as props to the pushed screen (optional)
                animated: true, // does the push have transition animation or does it happen immediately (optional)
                backButtonTitle: undefined, // override the back button title (optional)
                backButtonHidden: false, // hide the back button altogether (optional)
            })
        }else{
            setTimeout(()=>{
                this.props.navigator.showModal({
                    screen: 'mti.NoRegisterDataScreen', // unique ID registered with Navigation.registerScreen
                    title: undefined, // navigation bar title of the pushed screen (optional)
                    titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                    passProps: {navigator:this.props.navigator}, // Object that will be passed as props to the pushed screen (optional)
                    animated: true, // does the push have transition animation or does it happen immediately (optional)
                    backButtonTitle: undefined, // override the back button title (optional)
                    backButtonHidden: false, // hide the back button altogether (optional)
                    
                })
            },200)
        }
    }
    render(){
        return(
            <View style={styles.forgotPasswordScreenContainerStyle}>
                  <Headers
                    leftIconName='cancel'
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
                     hideRightIcon={true}
                />
                <View style={styles.forgotPasswordDetailContainerStyle}>
                    <Text style={styles.titleTextStyle}>กรุณากรอกอีเมล หรือ เบอร์โทรศัพท์ของคุณ{'\n'}เพื่อกำหนดรหัสผ่านใหม่</Text>
                    <TextInputIcon
                        value={this.state.forgotPasswordEmail}
                        onChangeText={(forgotPasswordEmail)=>this.setState({forgotPasswordEmail})}
                        leftLabelText='อีเมล / เบอร์โทรศัพท์'
                        iconUri={require('../source/icons/iconMail.png')}
                        containerStyle={styles.inputContainerStyle}
                        secondFlex={secondFlex}
                        thirdFlex={thirdFlex}
                        keyboardType='email-address'
                        onSubmitEditing={() => this.submit()}
                    />
                    <MainSubmitButton
                        buttonTitleText='ตกลง'
                        onPress={()=>this.submit()}
                        style={styles.submitButtonContainerStyle}
                    />
                     {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
                </View>
            </View>
        )
    }
}

const secondFlex = 0.3,thirdFlex = 0.9

const styles={
    forgotPasswordScreenContainerStyle:{
        flex: 1,
        backgroundColor:"#fff"
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
    },
    errorMsg:{
        fontSize:responsiveFontSize(2.2),
        color:"red",
        padding:2
    }
}
