import React,{Component} from 'react';
import {Text,View,Image,Dimensions,ImageBackground,TextInput,TouchableOpacity,ScrollView,SafeAreaView} from 'react-native';
import PropTypes from "prop-types";
import { Container, Header, Content, Item, Input, Icon,Card } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {TextInputIcon} from './../components/TextInputIcon';
import {CheckBoxes} from './../components/CheckBoxes';
import {MainSubmitButton} from './../components/MainSubmitButton';
import store from 'react-native-simple-store';
import {post,authen,get} from '../api'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import Spinner from 'react-native-loading-spinner-overlay';
import app from '../stores/app';

export default class LoginScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            userEmail: '',
            userPassword: '',
            remember:false,
            isLoading:false
        }
        this.login = this.login.bind(this);
        this.gotoRegister = this.gotoRegister.bind(this);
        this.gotoWelcome = this.gotoWelcome.bind(this);
        this.app = app;
    }
    async login(){
        this.setState({isLoading:true});
        let param = {};
        param.username = this.state.userEmail;
        param.password = this.state.userPassword;
        let token = await authen(param);
        if(token){
            let response = await get("me",{});
            if(response){
                store.save("user",response);
                this.gotoWelcome();
                
            }else{
                this.setState({isLoading:false});
            }
        }else{
            this.setState({isLoading:false});
        }
    }
    gotoRegister(){
        this.props.navigator.push({
			screen: 'mti.RegisterScreen', // unique ID registered with Navigation.registerScreen
			title: undefined, // navigation bar title of the pushed screen (optional)
			titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
			passProps: {}, // Object that will be passed as props to the pushed screen (optional)
			animated: true, // does the push have transition animation or does it happen immediately (optional)
			backButtonTitle: undefined, // override the back button title (optional)
			backButtonHidden: false, // hide the back button altogether (optional)
		});
    }
    gotoWelcome(){
        this.props.navigator.resetTo({
			screen: 'mti.WelcomeScreen', // unique ID registered with Navigation.registerScreen
			title: undefined, // navigation bar title of the pushed screen (optional)
			titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
			passProps: {}, // Object that will be passed as props to the pushed screen (optional)
			animated: true, // does the push have transition animation or does it happen immediately (optional)
			backButtonTitle: undefined, // override the back button title (optional)
			backButtonHidden: false, // hide the back button altogether (optional)
		});
    }

    render(){
        return(
            <KeyboardAwareScrollView 
                resetScrollToCoords={{ x: 0, y: 0 }}
                //automaticallyAdjustContentInsets={false}
                enableOnAndroid={true}
                keyboardShouldPersistTaps='always'
                contentContainerStyle={{flex: 1,}}
                >
                    {ifIphoneX && <View style={{height:40}}>
                        <ImageBackground
                            source={require('./../source/images/bgGradient.png')}
                            style={styles.loginFormImageBackgroundStyle}
                            resizeMode='stretch'
                        />
                    </View>}
                    <View style={styles.bannerImageContainerStyle}>
                        <Image
                            source={require('./../source/images/bannerImg.png')}
                            resizeMode='stretch'
                            style={styles.bannerImageStyle}  
                        />
                    </View> 
                    <View style={styles.loginFormContainerStyle}>
                        <ImageBackground
                            source={require('./../source/images/bgGradient.png')}
                            style={styles.loginFormImageBackgroundStyle}
                            resizeMode='stretch'
                        >
                            <View style={styles.bannerBottomLineStyle}/>
                            <View style={styles.logoContainerStyle}>
                                <Image
                                    source={require('./../source/images/Logo.png')}
                                    style={styles.logoImageStyle}
                                    resizeMode='contain'
                                />
                            </View>
                            <View style={styles.loginInputContainerStyle}>
                                <Item
                                    style={styles.textInputContainerStyle}
                                >
                                    <Image
                                        source={require('./../source/icons/iconEmail.png')}
                                        style={styles.emailIconStyle}
                                        resizeMode='contain'
                                    />
                                    <Input 
                                        value={this.state.userEmail}
                                        onChangeText={(userEmail)=>this.setState({userEmail})}
                                        placeholder='อีเมล/เบอร์โทรศัพท์'
                                        placeholderTextColor={textColor}
                                        style={styles.emailInputStyle}     
                                        keyboardType='email-address'         
                                    />
                                </Item>

                                <Item
                                    style={styles.textInputContainerStyle}
                                >
                                    <Image
                                        source={require('./../source/icons/iconPassword.png')}
                                        style={styles.passwordIconStyle}
                                        resizeMode='contain'
                                    />
                                    <Input 
                                        value={this.state.userPassword}
                                        onChangeText={(userPassword)=>this.setState({userPassword})}
                                        placeholder='รหัสผ่าน'
                                        placeholderTextColor={textColor}
                                        style={styles.textInputStyle}
                                        secureTextEntry
                                        returnKeyType = {"done"}
                                        onSubmitEditing={() => {
                                            this.login();
                                        }}
                                    />
                                    <TouchableOpacity style={styles.forgotPasswordContainerStyle}> 
                                        <Text style={styles.forgotPasswordTextStyle}>ลืมรหัสผ่าน ?</Text>
                                    </TouchableOpacity>
                                </Item>
                                <CheckBoxes
                                    title='จำรหัสผ่านเพื่อเข้าใช้งานในครั้งต่อไป'
                                    checked={this.state.remember}
                                    checkedColor='#81c5e3'
                                    uncheckedColor='#81c5e3'
                                    textStyle={styles.checkBoxTextStyle}
                                    onIconPress={()=>this.setState({remember: !this.state.remember})}
                                />
                                <MainSubmitButton
                                    buttonTitleText='เข้าสู่ระบบ'
                                    onPress={this.login}
                                />
                                <View style={styles.touchIdContainerStyle}>
                                    <Image
                                        source={require('./../source/icons/IconTouchID.png')}
                                        style={styles.touchIdIconStyle}
                                        resizeMode='contain'
                                    />
                                    <TouchableOpacity>
                                        <Text style={styles.touchIdDetailTextStyle}>เข้าใช้งานได้ง่ายๆ ด้วย Passcode Lock & Touch ID คลิก</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.registerBottomContainerStyle}>
                                    <TouchableOpacity onPress={this.gotoRegister}>
                                        <Text style={styles.registerBottomTextStyle}>ลงทะเบียนสมาชิก</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.gotoWelcome}>
                                        <Text style={styles.registerBottomTextStyle}>ใช้งานโดยไม่เข้าสู่ระบบ</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    {this.app.isLoading && <Spinner visible={this.app.isLoading}  textStyle={{color: '#FFF'}} />}
            </KeyboardAwareScrollView>
            
        )
    }
}

const {height,width} = Dimensions.get('window')
const textColor = '#81cae9'

const styles={
    loginContainerStyle:{
        flex: 1,
    },
    bannerImageContainerStyle:{
        // shadowColor: '#000',
        // shadowOffset:{
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.5,
        // shadowRadius: 1.5,
        // elevation: 3,
        // borderBottomWidth: 0.1,
        // borderColor: '#000'
    },
    bannerImageStyle:{
        width: null,
        ...ifIphoneX({
            height: responsiveHeight(32)
        }, {
            height: responsiveHeight(35)
        })
    },
    bannerBottomLineStyle:{
        height: responsiveHeight(0.35),
        backgroundColor: '#000',
        opacity: 0.2,
    },
    loginFormContainerStyle:{
        flex: 1,
    },
    loginFormImageBackgroundStyle:{
        flex: 1,
    },
    logoContainerStyle:{
        alignItems: 'center',
        marginTop: '5%'
    },
    logoImageStyle:{
        height: responsiveHeight(12),
    },
    loginInputContainerStyle:{
        flex: 1,
        paddingLeft: responsiveWidth(5),
        paddingRight: responsiveWidth(5),

    },
    textInputContainerStyle:{
        borderBottomColor: '#67bfe5',
        marginTop: responsiveHeight(2),
        justifyContent: 'center'
    },
    passwordIconStyle:{
        height: responsiveHeight(2.81),
        flex: 0.1,

    },
    textInputStyle:{
        fontSize: responsiveFontSize(2.64),
        color: textColor,
        flex: 0.6,


    },
    forgotPasswordContainerStyle:{
        flex: 0.3,

    },
    forgotPasswordTextStyle:{
        fontSize: responsiveFontSize(2.46),
        color: textColor,
        textAlign: 'right'
    },
    emailIconStyle:{
        height: responsiveHeight(2.46),
        flex: 0.1,
    },
    emailInputStyle:{
        fontSize: responsiveFontSize(2.64),
        color: textColor,
        flex: 0.9,
    },
    checkBoxTextStyle:{
        color: textColor,
        fontSize: responsiveFontSize(2.64)
    },
    touchIdContainerStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: responsiveHeight(2),
        //marginBottom: responsiveHeight(1),
    },
    touchIdIconStyle:{
        height: responsiveHeight(4.92),
    },
    registerBottomContainerStyle:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    touchIdDetailTextStyle:{
        color: '#9fbfcf',
        fontSize: responsiveFontSize(2),

    },
    registerBottomTextStyle:{
        color: '#9fbfcf',
        fontSize: responsiveFontSize(2.93),

    }
}