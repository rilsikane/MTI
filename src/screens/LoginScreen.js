import React,{Component} from 'react';
import {Text,View,Image,Dimensions,ImageBackground,TextInput,TouchableOpacity,ScrollView,SafeAreaView,Keyboard,Animated,StatusBar} from 'react-native';
import PropTypes from "prop-types";
import { Container, Header, Content, Item, Input, Icon,Card } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PopupDialog,{ SlideAnimation }  from 'react-native-popup-dialog';

import {TextInputIcon} from './../components/TextInputIcon';
import {CheckBoxes} from './../components/CheckBoxes';
import {MainSubmitButton} from './../components/MainSubmitButton';
import store from 'react-native-simple-store';
import {post,authen,get} from '../api'
import { ifIphoneX,isIphoneX } from 'react-native-iphone-x-helper'
import Spinner from 'react-native-loading-spinner-overlay';
import app from '../stores/app';

export default class LoginScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            userEmail: '',
            userPassword: '',
            forgotPasswordEmail: '',
            remember:false,
            isLoading:false,
            keyboardShow : false,
        }
        this.login = this.login.bind(this);
        this.gotoRegister = this.gotoRegister.bind(this);
        this.gotoWelcome = this.gotoWelcome.bind(this);
        this.app = app;
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
        this.scroll = {};
        this.forgotPassword = this.forgotPassword.bind(this);
        if(isIphoneX()){
            this.imageHeight = new Animated.Value(responsiveHeight(32),);
        }else{
            this.imageHeight = new Animated.Value(responsiveHeight(35),);
        }
    }
    async login(){
       
        let param = {};
        param.username = this.state.userEmail;
        param.password = this.state.userPassword;
        setTimeout(()=>{
            this.setState({isLoading:true});
        },100)
        let response = await authen(param);
        if(response){
            if(response.first_logon=="N"){
            // if(false){
                let token = response.token;
                store.save("token",token);
                if(token){
                    let [response1] = await Promise.all([get("me",{})]);
                    this.setState({isLoading:false});
                    if(response1){
                        await store.save("user",response1);
                        this.gotoWelcome();
                    }
                }else{
                    this.setState({isLoading:false});
                }
            }else{

                let token = response.token;
                await store.save("token",token);
                let user = await get("me",{});
                user.username = this.state.userEmail;
                user.password = this.state.userPassword;
                this.setState({isLoading:false});
                this.props.navigator.push({
                    screen: 'mti.RegisterScreen', // unique ID registered with Navigation.registerScreen
                    title: undefined, // navigation bar title of the pushed screen (optional)
                    titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                    passProps: {user:user}, // Object that will be passed as props to the pushed screen (optional)
                    animated: true, // does the push have transition animation or does it happen immediately (optional)
                    backButtonTitle: undefined, // override the back button title (optional)
                    backButtonHidden: false, // hide the back button altogether (optional)
                    navigatorStyle: {
                        drawUnderStatusBar: true,
                        statusBarColor: 'transparent',
                    },
                });
                
                
            }
        }
        this.setState({isLoading:false});
    }
    gotoRegister(user){
        this.props.navigator.push({
			screen: 'mti.RegisterScreen', // unique ID registered with Navigation.registerScreen
			title: undefined, // navigation bar title of the pushed screen (optional)
			titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
			animated: true, // does the push have transition animation or does it happen immediately (optional)
			backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
            navigatorStyle: {
                drawUnderStatusBar: true,
                statusBarColor: 'transparent',
            },
		});
    }
    async gotoWelcome(){
    // this.props.navigator.resetTo({
    // 	screen: 'mti.WelcomeScreen', // unique ID registered with Navigation.registerScreen
    // 	title: undefined, // navigation bar title of the pushed screen (optional)
    // 	titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
    // 	passProps: {}, // Object that will be passed as props to the pushed screen (optional)
    // 	animated: true, // does the push have transition animation or does it happen immediately (optional)
    // 	backButtonTitle: undefined, // override the back button title (optional)
    // 	backButtonHidden: false, // hide the back button altogether (optional)
    // });
    setTimeout(()=>{
        this.app.login();
    },300)
   
    
    //this.setState({isLoading:false});
}
    keyboardWillShow = async (event) => {
    this.setState({keyboardShow:true});
    await Animated.timing(this.imageHeight, {
        duration: 200,
        toValue: responsiveHeight(0),
    }).start();
    };

    keyboardWillHide = (event) => {
    this.setState({keyboardShow:false});
    Animated.timing(this.imageHeight, {
        duration: 200,
        toValue: responsiveHeight(isIphoneX()?32:35),
    }).start();
    };
    // renderForgotPasswordPopup(){
    //     return(
    //         <PopupDialog
    //             ref={(popupDialog) => { this.popupDialog = popupDialog; }}
    //             width={responsiveWidth(90)}
    //             height={responsiveHeight(38)}
    //             dialogStyle={styles.popupContainerStyle}
    //             containerStyle={styles.popupLayoutContainerStyle}
    //         >
    //             <View>
    //                 <TouchableOpacity onPress={()=> this.popupDialog.dismiss()}>
    //                     <Image
    //                         source={require('./../source/icons/btnClose.png')}
    //                         style={styles.btnCloseImageStyle}
    //                         resizeMode='contain'
    //                     />
    //                 </TouchableOpacity>
    //                 <View>
    //                     <Text style={styles.popupTitleTextStyle}>ลืมรหัสผ่าน</Text>
    //                     <Text style={styles.popupDetailTextStyle}>กรุณากรอกอีเมลของคุณเพื่อขอรับรหัสผ่านใหม่</Text>
    //                     <TextInputIcon
    //                         value={this.state.forgotPasswordEmail}
    //                         onChangeText={(forgotPasswordEmail)=>this.setState({forgotPasswordEmail})}
    //                         leftLabelText='อีเมล/เบอร์โทรศํพท์'
    //                         iconUri={require('../source/icons/iconMail.png')}
    //                         containerStyle={styles.inputContainerStyle}
    //                         secondFlex={secondFlex}
    //                         thirdFlex={thirdFlex}
    //                         keyboardType='email-address'
    //                     />
    //                 </View>
    //                 <View style={styles.submitButtonContainerStyle}>
    //                     <MainSubmitButton
    //                         buttonTitleText='ตกลง'
    //                         onPress={()=>alert('Submit')}
    //                     />
    //                 </View>
    //             </View>
    //         </PopupDialog>
    //     )
    // }
    forgotPassword(){
        this.props.navigator.resetTo({
            screen: 'mti.ForgotPasswordScreen', // unique ID registered with Navigation.registerScreen
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            passProps: {navigator:this.props.navigator}, // Object that will be passed as props to the pushed screen (optional)
            animated: true, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
        })
    }
    render(){
        return(
            <View style={styles.loginContainerStyle}>
                <ScrollView 
                    // resetScrollToCoords={{ x: 0, y: 0 }}
                    // automaticallyAdjustContentInsets={false}
                    // enableOnAndroid={true}
                    // keyboardShouldPersistTaps='always'
                    contentContainerStyle={{flex: 1,}}
                    style={{flex: 1}}
                >
                    <StatusBar/>
                    {isIphoneX() && <View style={{height:40}}>
                        <ImageBackground
                            source={require('./../source/images/bgGradient.png')}
                            style={[styles.loginFormImageBackgroundStyle]}
                            resizeMode='stretch'
                        />
                    </View>}
                    <View style={styles.bannerImageContainerStyle}>
                        <Animated.Image
                            source={require('./../source/images/bannerImg.png')}
                            resizeMode='stretch'
                            style={[styles.bannerImageStyle,{ height: this.imageHeight,width:null}]}  
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
                                    <TouchableOpacity onPress={()=>this.forgotPassword()} style={styles.forgotPasswordContainerStyle}> 
                                        <Text style={styles.forgotPasswordTextStyle}>ลืมรหัสผ่าน ?</Text>
                                    </TouchableOpacity>
                                </Item>
                                <CheckBoxes
                                    checkBoxTitleText='จำรหัสผ่านเพื่อเข้าใช้งานในครั้งต่อไป'
                                    checked={this.state.remember}
                                    checkedColor='#81c5e3'
                                    uncheckedColor='#81c5e3'
                                    checkBoxTextStyle={styles.checkBoxTextStyle}
                                    onIconPress={()=>this.setState({remember: !this.state.remember})}
                                    containerStyle={styles.checkBoxStyle}
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
                                <Text style={{color:"#fff"}}>Version : 1.28</Text>
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
                    {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
                </ScrollView>
                {/* {this.renderForgotPasswordPopup()} */}
            </View>
        )
    }
    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
      }
}

const {height,width} = Dimensions.get('window')
const textColor = '#81cae9'
const secondFlex = 0.3,thirdFlex = 0.9

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
        height:responsiveHeight(65),
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
        color: "rgba(255, 255, 255, 0.9)",
        fontSize: responsiveFontSize(2.2),
        opacity: 0.9,
    },  
    checkBoxStyle:{
        height: responsiveHeight(3),
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
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
        flex:1,
        textAlign:'center'

    },
    registerBottomTextStyle:{
        color: '#9fbfcf',
        fontSize: responsiveFontSize(2.93),

    },
    popupContainerStyle:{
        borderRadius: 3,
        padding: responsiveWidth(4),

    },
    popupLayoutContainerStyle:{
        justifyContent: 'flex-start',
        paddingTop: responsiveHeight(15)
    },
    btnCloseImageStyle:{
        height: responsiveHeight(2.81),
        alignSelf: 'flex-end'
    },
    popupTitleTextStyle:{
        fontSize: responsiveFontSize(3.4),
        color: '#1595d3',
        textAlign: 'center',
        marginTop: responsiveHeight(2.5),
        marginBottom: responsiveHeight(2),

    },
    popupDetailTextStyle:{
        fontSize: responsiveFontSize(2.2),
        color: '#919195',
        textAlign: 'center',
    },
    inputContainerStyle:{
        borderBottomColor: '#C4C4C4',
    },
    submitButtonContainerStyle:{
        marginLeft: responsiveWidth(2),
        marginRight: responsiveWidth(2),
        justifyContent: 'center',
        marginTop: responsiveHeight(2),

    }
}