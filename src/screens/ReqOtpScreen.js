import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity,Alert,Keyboard} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {TextInputIcon} from '../components/TextInputIcon';
import {MainSubmitButton} from '../components/MainSubmitButton';
import {CheckBoxes} from '../components/CheckBoxes';
import {Headers} from './../components/Headers';
import { observer, inject } from 'mobx-react';
import {postBasic} from '../api/';
import PopupDialog,{ SlideAnimation }  from 'react-native-popup-dialog';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay';
@inject('registerStore')
@observer
class ReqOtpScreen extends Component{
    static navigatorStyle = {
        tabBarHidden: true
    };

    constructor(props){
        super(props)
        this.state={
            tel:'',
            telErr:false,
            telModalErr:false,
            isLoading:false,
            emailErr:false,telErr:false,
            name:'',surname:'',email:'',tel:'',
            telModal:'',
        }
        this.reqOtp = this.reqOtp.bind(this);
        this.requestContact = this.requestContact.bind(this);
        this.inputs = {};
        this.focusNextField = this.focusNextField.bind(this);
    }
    componentDidMount(){
      this.setState({tel:this.props.data.tel});
    };
    
    async reqOtp(){
        this.setState({isLoading:true})
            let param = {};
            param.mobile_no = this.state.tel;
            let response = await postBasic("otp/request",param);
            if(response){
                this.setState({isLoading:false});
                if(!response.message){
                    this.props.registerStore.otp.refcode = response.refcode;
                    this.props.registerStore.otp.tel =  this.state.tel;
                    this.props.registerStore.otp.email = this.props.data.email;
                    this.props.navigator.push({
                        screen: 'mti.ConfirmOtpScreen', // unique ID registered with Navigation.registerScreen
                        title: undefined, // navigation bar title of the pushed screen (optional)
                        titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                        passProps: {navigator:this.props.navigator,data:response}, // Object that will be passed as props to the pushed screen (optional)
                        animated: true, // does the push have transition animation or does it happen immediately (optional)
                        backButtonTitle: undefined, // override the back button title (optional)
                        backButtonHidden: false, // hide the back button altogether (optional)
                    })
                }else{
                    Alert.alert(
                        ' ',
                        response.message,
                        [
                        {text: 'OK', onPress: () => console.log('OK Pressed!')},
                        ]
                    )
                }
            }
    }
    openLeavingContactPopup(){
        this.setState({telModal:this.state.tel});
        this.leavingDialog.show();
    }
    renderLeavingContactPopup(){
        return(
            <PopupDialog
                ref={(leavingDialog) => { this.leavingDialog = leavingDialog; }}
                width={responsiveWidth(90)}
                height={responsiveHeight(75)}
                dialogStyle={styles.popupContainerStyle}
                containerStyle={styles.popupLayoutContainerStyle}
            >
             <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                automaticallyAdjustContentInsets={false}
                //keyboardShouldPersistTaps='always'
                enableOnAndroid={true}
                contentContainerStyle={{flexGrow:1,}}
                //style={{flex: 1}}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                >
                    <TouchableOpacity onPress={()=> {
                        this.setState({telModalErr:false});
                        this.leavingDialog.dismiss()
                        }}>
                        <Image
                            source={require('./../source/icons/btnClose.png')}
                            style={styles.btnCloseImageStyle}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.popupTitleTextStyle}>ฝากข้อมูลติดต่อกลับ</Text>
                        <Text style={styles.popupDetailTextStyle}>กรุณากรอกข้อมูลของคุณและรอการติดต่อกลับ</Text>
                        <TextInputIcon
                            value={this.state.name}
                            onChangeText={(userFirstName)=>this.setState({name:userFirstName})}
                            leftLabelText='ชื่อ'
                            iconUri={require('./../source/icons/iconAvatar.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                setTimeout(()=>{
                                this.focusNextField('surname');
                                },200);
                            }}
                        />
                        <TextInputIcon
                            refs={ input => {
                                this.inputs['surname'] = input;
                            }}
                            value={this.state.surname}
                            onChangeText={(userLastName)=>this.setState({surname:userLastName})}
                            leftLabelText='นามสกุล'
                            iconUri={require('./../source/icons/iconAvatar.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                setTimeout(()=>{
                                this.focusNextField('phone');
                                },200);
                            }}
                        />
                        <TextInputIcon
                            refs={ input => {
                                this.inputs['phone'] = input;
                            }}
                            value={this.state.telModal}
                            leftLabelText='เบอร์โทรศัพท์'
                            iconUri={require('./../source/icons/iconPhone.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            keyboardType='phone-pad'
                            onChangeText={(userPhone)=>{
                                if(userPhone.length<10){
                                    this.setState({telModalErr:true,telModal:userPhone})
                                }else{
                                    this.setState({telModalErr:false,telModal:userPhone})
                                }
                            }}
                            //blurOnSubmit={true}
                            maxLength={10}
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                setTimeout(()=>{
                                this.focusNextField('email');
                                },200);
                            }}
                        />
                        {this.state.telModalErr && <Text style={styles.errorMsg}>เบอร์โทรศัพท์ของท่านไม่ถูกต้อง    </Text>}
                        <TextInputIcon
                            refs={ input => {
                                this.inputs['email'] = input;
                            }}
                            value={this.state.email}
                            onChangeText={(email)=>{
                                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                if(re.test(email)){
                                    this.setState({emailErr:false,email:email})
                                }else{
                                    this.setState({emailErr:true,email:email})
                                }
                            }}
                            leftLabelText='อีเมล'
                            iconUri={require('../source/icons/iconMail.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            keyboardType='email-address'
                            blurOnSubmit={true}
                            returnKeyType = {"done"}
                            
                        />
                        {this.state.emailErr && <Text style={styles.errorMsg}>รูปแบบ E-mail ของท่านไม่ถูกต้อง</Text>}
                    </View>
                    <View style={styles.submitButtonContainerStyle}>
                    {this.isShowSumbit() &&<MainSubmitButton
                            buttonTitleText='ตกลง'
                            onPress={()=>this.requestContact()}
                        />}
                    </View>
                </KeyboardAwareScrollView>
            </PopupDialog>
        )
    }
    async requestContact(){
        let param = {};
        param.name = this.state.name;
        param.surname = this.state.surname;
        param.email = this.state.email;
        param.tel = this.state.telModal;

        let response = await postBasic("member/request",param);
        if(response){
            Alert.alert(
                '',
                'ท่านได้ฝากข้อมูลติดต่อกลับเรียบร้อยแล้ว',
                [
                {text: 'ตกลง', onPress: () =>{
                    this.leavingDialog.dismiss();
                    this.props.navigator.dismissModal({
                        animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                    });
                    setTimeout(()=>{
                        this.props.navigator.resetTo({
                            screen: 'mti.LoginScreen', // unique ID registered with Navigation.registerScreen
                            title: undefined, // navigation bar title of the pushed screen (optional)
                            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                            animated: true, // does the push have transition animation or does it happen immediately (optional)
                            animationType: 'slide-down',
                            backButtonTitle: undefined, // override the back button title (optional)
                            backButtonHidden: false, // hide the back button altogether (optional)
                            })
                    },500)
                  }
                }
                ]
            )
        }else{

        }
    }
    isShowSumbit(){
        if(''!=this.state.name && ''!=this.state.surname
            && ''!=this.state.email
            && ''!=this.state.tel
            && !this.state.emailErr && !this.state.telErr){
                return true;
        }else{
            return false;
        }
    }

    focusNextField(key){
        this.inputs[key].focus();
    }

    render(){
        return(
            <View style={styles.registerStep1ContainerStyle}>
                 <Headers
                    leftIconName='cancel'
                    headerTitleText='ลืมรหัสผ่าน'
                    cancel={()=> 
                        {
                            this.props.navigator.resetTo({
                            screen: 'mti.LoginScreen', // unique ID registered with Navigation.registerScreen
                            title: undefined, // navigation bar title of the pushed screen (optional)
                            passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
                            animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
                            animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
                            navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
                            navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                        })
                      }
                    }
                />
                <View style={styles.registerDirectionContainerStyle}>
                    <Text style={styles.registerTitleTextStyle}>ยืนยันตัวตนด้วยรหัส OTP</Text>
                    <Text style={styles.directionTextStyle}>กดรับรหัส OTP จากเบอร์โทรศัพท์ของคุณ</Text>
                </View>
                <View style={styles.userDetailContainerStyle}>
                    <View>
                        <TextInputIcon
                                value={this.state.tel}
                                onChangeText={(userPhone)=>this.state.tel=userPhone}
                                leftLabelText='โทรศัพท์'
                                iconUri={require('./../source/icons/iconPhone.png')}
                                containerStyle={!this.state.telErr ?styles.inputContainerStyle:styles.inputContainerErrStyle}
                                secondFlex={secondFlex}
                                thirdFlex={thirdFlex}
                                keyboardType='phone-pad'
                                returnKeyType='done'
                                blurOnSubmit={true}
                                editable={false}
                            />
                        {this.state.telErr && <Text style={styles.errorMsg}>เบอร์โทรศัพท์ของท่านไม่ถูกต้อง    </Text>}
                    </View>
                    <View style={{flexDirection: 'row',padding:5}}>
                        <Text style={styles.directionTextStyle}>กรณีพบข้อมูลไม่ถูกต้อง</Text>
                        <TouchableOpacity onPress={()=>this.openLeavingContactPopup()}>
                            <Text style={[styles.textUnderLineStyle]}>ติดต่อเรา</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.submitButtonContainerStyle}>
                        <MainSubmitButton
                            buttonTitleText='รับรหัส OTP'
                            onPress={this.reqOtp}
                        />
                    </View>
                </View>
                {this.renderLeavingContactPopup()}
                {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
            </View>
        )
    }
}

const secondFlex = 0.4,thirdFlex = 0.5

const styles={
    registerStep1ContainerStyle:{
        flex: 1,
        backgroundColor:"#fff"
    },
    mascotImageStyle:{
        height: responsiveHeight(20.51),
        alignSelf: 'center',
        marginBottom: responsiveHeight(2),

    },
    registerDirectionContainerStyle:{
        marginTop:responsiveHeight(5),
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

    },
    userDetailContainerStyle:{
        flex: 1,
        paddingLeft: responsiveWidth(5),
        paddingRight: responsiveWidth(5),
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
        marginTop: responsiveHeight(2),
        zIndex: 5,
        // justifyContent: 'center',
    },
    errorMsg:{
        fontSize:responsiveFontSize(2.2),
        color:"red",
        padding:2
    },
    textUnderLineStyle:{
        textDecorationLine: 'underline',
        textDecorationColor: '#0194d2',
        textDecorationStyle: 'solid',
        color:'#0194d2',
        fontSize: responsiveFontSize(2.4)
    },
    popupContainerStyle:{
        borderRadius: 3,
        padding: responsiveWidth(4),
        zIndex:9999
    },
    popupLayoutContainerStyle:{
        justifyContent: 'flex-start',
        paddingTop: responsiveHeight(10),
        zIndex: 999,
    },
    popupTitleTextStyle:{
        fontSize: responsiveFontSize(3),
        color: '#1595d3',
        textAlign: 'center',
        marginTop: responsiveHeight(2.5),
        marginBottom: responsiveHeight(2),

    },
    popupDetailTextStyle:{
        fontSize: responsiveFontSize(2.2),
        color: '#919195',
        textAlign: 'center',
        marginLeft: responsiveWidth(8),
        marginRight: responsiveWidth(8),
    },
    popupRefTextStyle:{
        fontSize: responsiveFontSize(2.6),
        color: '#1595d3',
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    btnCloseImageStyle:{
        height: responsiveHeight(2.81),
        alignSelf: 'flex-end'
    },
}

export default ReqOtpScreen