import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity,Alert} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Pages } from 'react-native-pages';
import PopupDialog,{ SlideAnimation }  from 'react-native-popup-dialog';

import LifeStyleScreen from './LifeStyleScreen';
import {TextInputIcon} from './../components/TextInputIcon';
import {MainSubmitButton} from './../components/MainSubmitButton';
import {PageIndicators} from './../components/PageIndicators';
import {Headers} from './../components/Headers';
import {RegisterStep1} from './../components/RegisterStep1';
import {RegisterStep2} from './../components/RegisterStep2';
import {RegisterStep3} from './../components/RegisterStep3';
import {RegisterStep4_1} from './../components/RegisterStep4-1';
import {RegisterStep4_2} from './../components/RegisterStep4-2';
import {postBasic,put} from '../api'
import { observer, inject } from 'mobx-react';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import app from '../stores/app';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

@inject('registerStore')
@observer
export default class RegisterScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            pageNumber: 1,
            enable:false,
            isLoading:false,
            firstLogon:false,
            emailErr:false,telErr:false,
            name:'',surname:'',email:'',tel:''
        }
        if(!this.props.registerStore.register){
            this.props.registerStore.register = {};
        }
        this.updateRef = this.updateRef.bind(this);
        this.gotoWelcome = this.gotoWelcome.bind(this);
        this.app = app;
        this.requestContact = this.requestContact.bind(this);
        this.openLeavingContactPopup = this.openLeavingContactPopup.bind(this);
    }
    async componentDidMount(){
        if(this.props.user){
            this.setState({isLoading:true})
            this.props.registerStore.register = {...this.props.user};
            setTimeout(()=>{
                this.setState({pageNumber:2,firstLogon:true});
                this._pages.scrollToPage(1);
                this.setState({isLoading:false});
            },1500)
         
        }
    }

    updateRef(ref) {
        this._pages = ref;
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
    async requestContact(){
        let param = {};
        param.name = this.state.name;
        param.surname = this.state.surname;
        param.email = this.state.email;
        param.tel = this.state.tel;

        let response = await postBasic("member/request",param);
        if(response){
            Alert.alert(
                'สำเร็จ',
                'ฝากข้อมูลติดต่อกลับเรียบร้อย',
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

    renderPopup(){
        return(
            <PopupDialog
                ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                dialogAnimation={slideAnimation}
                width={responsiveWidth(90.15)}
                height={responsiveHeight(58.05)}
                dialogStyle={styles.popupContainerStyle}
            >
                <View>
                    <TouchableOpacity onPress={()=> this.popupDialog.dismiss()}>
                        <Image
                            source={require('./../source/icons/btnClose.png')}
                            style={styles.btnCloseImageStyle}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <Image
                        source={require('./../source/images/mascot.png')}
                        style={styles.mascotImageStyle}
                        resizeMode='contain'
                    />
                    <View>
                        <Text style={styles.popupTitleTextStyle}>ขออภัยค่ะ ไม่พบข้อมูลสมาชิกของคุณ</Text>
                        <Text style={styles.popupDetailTextStyle}>กรุณาตรวจสอบข้อมูลของคุณให้ถูกต้องหรือสอบถามข้อมูลสมาชิกเพิ่มเติมได้ที่</Text>
                        <TouchableOpacity>
                            <Text style={styles.popupRefTextStyle}>www.mticonnect.com/Contact/Information</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.submitButtonContainerStyle}>
                        <MainSubmitButton
                            buttonTitleText='เข้าใช้งานโดยไม่เป็นสมาชิก'
                            onPress={this.gotoWelcome}
                        />
                    </View>
                </View>
            </PopupDialog>
        )
    }
    openLeavingContactPopup(){
        this.leavingDialog.show();
    }
    renderLeavingContactPopup(){
        return(
            <PopupDialog
                ref={(leavingDialog) => { this.leavingDialog = leavingDialog; }}
                width={responsiveWidth(90)}
                height={responsiveHeight(60)}
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
                >
                    <TouchableOpacity onPress={()=> this.leavingDialog.dismiss()}>
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
                        />
                        <TextInputIcon
                            value={this.state.surname}
                            onChangeText={(userLastName)=>this.setState({surname:userLastName})}
                            leftLabelText='นามสกุล'
                            iconUri={require('./../source/icons/iconAvatar.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                        />
                        <TextInputIcon
                            value={this.state.tel}
                            onChangeText={(userPhone)=>this.setState({tel:userPhone})}
                            leftLabelText='เบอร์โทรศัพท์'
                            iconUri={require('./../source/icons/iconPhone.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            keyboardType='phone-pad'
                            onBlur={()=>{
                                if(this.state.tel.length!=10 && this.state.tel.length!=12){
                                    this.setState({telErr:true})
                                }else{
                                    this.setState({telErr:false})
                                }
                            }}
                            blurOnSubmit={true}
                        />
                        {this.state.telErr && <Text style={styles.errorMsg}>เบอร์โทรศัพท์ ไม่ถูกต้อง</Text>}
                        <TextInputIcon
                            value={this.state.email}
                            onChangeText={(email)=>this.setState({email:email})}
                            leftLabelText='อีเมล'
                            iconUri={require('../source/icons/iconMail.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            keyboardType='email-address'
                            onBlur={()=>{
                                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                if(re.test(this.state.email)){
                                    this.setState({emailErr:false})
                                }else{
                                    this.setState({emailErr:true})
                                }
                            }}
                            blurOnSubmit={true}
                            returnKeyType = {"done"}
                            
                        />
                        {this.state.emailErr && <Text style={styles.errorMsg}>Email ไม่ถูกต้อง</Text>}
                    </View>
                    {this.isShowSumbit() && <View style={styles.submitButtonContainerStyle}>
                        <MainSubmitButton
                            buttonTitleText='ตกลง'
                            onPress={()=>this.requestContact()}
                        />
                    </View>}
                </KeyboardAwareScrollView>
            </PopupDialog>
        )
    }

    async _onSubmitRegister1Press(param){
        if (this._pages) {
            this.setState({isLoading:true})
            let response = await postBasic("mti/checkinfo",param,true);
            this.setState({isLoading:false});
            if(response){
                if(!response.message && "checkMember"!=response.data_source){
                    this.props.registerStore.register = {...response};
                    this.props.registerStore.register.idcard = param.idcard;
                    this.props.registerStore.register.birthdate = param.birthdate;
                    this.setState({enable:true});
                    setTimeout(()=>{
                        this.setState({enable:true,pageNumber:1});
                        this._pages.scrollToPage(1);
                        this.setState({enable:false});
                    },100);
                    
                }else{
                    this.setState({isLoading:false});
                    if("checkMember"==response.data_source){
                        setTimeout(()=>{
                        Alert.alert(
                            'แจ้งเตือน',
                            'ท่านเป็นสมาชิกของเราอยู่แล้วรบกวนlog in เพื่อเข้าระบบ สอบถามเพิ่มเติมติดต่อ 1484',
                            [
                            {text: 'ตกลง', onPress: () =>{
                               
                                    this.props.navigator.resetTo({
                                        screen: 'mti.LoginScreen', // unique ID registered with Navigation.registerScreen
                                        title: undefined, // navigation bar title of the pushed screen (optional)
                                        titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                                        animated: true, // does the push have transition animation or does it happen immediately (optional)
                                        animationType: 'slide-down',
                                        backButtonTitle: undefined, // override the back button title (optional)
                                        backButtonHidden: false, // hide the back button altogether (optional)
                                        })
                               
                            }
                            }
                            ]
                        )
                        },500)
                    }
                }
            }else{
                this.props.registerStore.register = {...param};
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
                },500)
            }
        }
    }

    async _onSubmitRegister2Press(){
        if (this._pages) {
            let param = {};
            param.mobile_no = this.props.registerStore.register.tel;
            param.email = this.props.registerStore.register.email;
            //this.setState({isLoading:true})
            if(!this.state.firstLogon){
            let response = await postBasic("mti/checktelephone",param);
            //this.setState({isLoading:false});
                if(response){
                    //this.setState({isLoading:true})
                    let response2 = await postBasic("mti/checkemail",param);
                    //this.setState({isLoading:false});
                    if(response2){
                        this.setState({isLoading:false});
                        this.props.registerStore.register.username = this.props.registerStore.register.tel;
                        this.setState({enable:true});
                        setTimeout(()=>{
                            this.setState({enable:true,pageNumber:2});
                            this._pages.scrollToPage(2);
                            this.setState({enable:false});
                        },100)
                       
                        
                    }
                }else{
                    this.setState({isLoading:false});
                }
            }else{
                this.setState({enable:true,pageNumber:3});
                this._pages.scrollToPage(3);
                this.setState({enable:false});
            }
           
        }
    }

    async _onSubmitRegister3Press(){
        if (this._pages) {
            this.setState({enable:true,pageNumber:4});
            this._pages.scrollToPage(3);
            this.setState({enable:false});
        }
    }

   async _onSubmitRegister4_1Press(){
        if (this._pages) {
            this.setState({isLoading:true})
            let param = {};
            param.mobile_no = this.props.registerStore.register.tel;
            let response = await postBasic("otp/request",param);
            if(response){
                this.setState({isLoading:false});
                if(!response.message){
                    this.props.registerStore.register.refcode = response.refcode;
                    this.setState({enable:true,pageNumber:4});
                    setTimeout(()=>{
                        this._pages.scrollToPage(4);
                    },100)
                    this.setState({enable:false});
                }else{
                    Alert.alert(
                        'เกิดข้อผิดพลาด',
                        response.message,
                        [
                        {text: 'OK', onPress: () => console.log('OK Pressed!')},
                        ]
                    )
                }
            }
            
        }
    }

    async _onSubmitRegister4_2Press(otp){
        this.setState({isLoading:false});
        let param = {};
        param.refcode = this.props.registerStore.register.refcode;
        param.otp = otp;
        //this.setState({isLoading:true})
        let response = await postBasic("otp/check",param);
        this.setState({isLoading:false});
        if(response){
            if(!response.message){
               if(response.status=='ok'){

                this.setState({isLoading:true})
                    let param2 = this.props.registerStore.register;
                    let response2 = {};
                    if(!this.state.firstLogon){
                        response2 = await postBasic("member",param2);
                    }else{
                        response2 = await put("me/profile",param2);
                    }
                    this.setState({isLoading:false});
                    if(response2){
                        if(!response2.message){
                            this.setState({isLoading:false});
                            this.props.navigator.resetTo({
                                screen: 'mti.WelcomeScreen', // unique ID registered with Navigation.registerScreen
                                title: undefined, // navigation bar title of the pushed screen (optional)
                                passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
                                animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
                                animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
                                navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
                                navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                              });
                        }else{
                            this.setState({isLoading:false});
                            Alert.alert(
                                'เกิดข้อผิดพลาด',
                                response.message,
                                [
                                {text: 'OK', onPress: () => console.log('OK Pressed!')},
                                ]
                            )
                        }
                    }
                
                }
            }else{
                this.setState({isLoading:false});
                Alert.alert(
                    'เกิดข้อผิดพลาด',
                    response.message,
                    [
                    {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    ]
                )
            }
        }
        this.setState({isLoading:false});
    }

    async _onRequestNewOtpButtonPress(){
            let param = {};
            param.mobile_no = this.props.registerStore.register.tel;
            this.setState({isLoading:true})
            let response = await postBasic("otp/request",param);
            this.setState({isLoading:false});
            if(response){
                this.setState({isLoading:false});
                if(!response.message){
                    setTimeout(()=>{Alert.alert(
                        'แจ้ง OTP',
                        `ส่ง OTP ไปยังหมายเลข ${ this.props.registerStore.register.tel} เรียบร้อยแล้ว`,
                        [
                        {text: 'OK', onPress: () => console.log('OK Pressed!')},
                        ]
                    )},150)
                    this.props.registerStore.register.refcode = response.refcode;
                }
            }
    }

    onScrollEnd(index) {
        if(index<5&&index!=3){
            this.setState({pageNumber: index+1})
        }
      
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
            <View style={styles.registerScreenContainerStyle}>
                <Headers
                    leftIconName='cancel'
                    headerTitleText='ลงทะเบียนสมาชิก'
                    cancel={()=>
                        {
                            console.log(this.state.pageNumber);
                            if(this.state.pageNumber==1){
                                this.props.navigator.pop()
                            }else{
                                if(this.state.pageNumber==2 && this.props.user){
                                    this.props.registerStore.register = {};
                                    this.props.navigator.resetTo({
                                        screen: 'mti.LoginScreen', // unique ID registered with Navigation.registerScreen
                                        title: undefined, // navigation bar title of the pushed screen (optional)
                                        titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                                        passProps: {}, // Object that will be passed as props to the pushed screen (optional)
                                        animated: true, // does the push have transition animation or does it happen immediately (optional)
                                        backButtonTitle: undefined, // override the back button title (optional)
                                        backButtonHidden: false, // hide the back button altogether (optional)
                                    })
                                }else{
                                    this.setState({enable:true});
                                    this._pages.scrollToPage(this.state.pageNumber-2);
                                    this.setState({enable:false,pageNumber:this.state.pageNumber-1});
                                }
                            }
                        }
                    
                    }
                    cancelTxt={this.state.pageNumber==1?'ยกเลิก':'กลับ'}
                    //rightIconName='iconBell'
                />
                <PageIndicators
                    pageNumber={this.state.pageNumber}
                />
                {this.props.registerStore.register && <Pages
                    ref={this.updateRef} 
                    indicatorPosition='none'
                    onScrollEnd={this.onScrollEnd.bind(this)}
                    isDragging={false} 
                    scrollEnabled={this.state.enable}
                >
                     <RegisterStep1
                        onSubmitRegister1Press={this._onSubmitRegister1Press.bind(this)}
                    />
                     <RegisterStep2 firstLogon={this.state.firstLogon} pageNumber={this.state.pageNumber}
                        onSubmitRegister2Press={this._onSubmitRegister2Press.bind(this)} 
                        openLeavingDialog={this.openLeavingContactPopup} 
                        closeLeavingDialog={()=>this.leavingDialog.close()}
                    />
                   
                    
                  
                    <RegisterStep3
                        onSubmitRegister3Press={this._onSubmitRegister3Press.bind(this)}
                    />
                    <RegisterStep4_1 firstLogon={this.state.firstLogon}
                        onSubmitRegister4_1Press={this._onSubmitRegister4_1Press.bind(this)}
                    />
                    <RegisterStep4_2
                        onSubmitRegister4_2Press={this._onSubmitRegister4_2Press.bind(this)}
                        onRequestNewOtpButtonPress={this._onRequestNewOtpButtonPress.bind(this)}
                    />
                        
                </Pages>}
                       
                {this.renderLeavingContactPopup()}
                {this.renderPopup()}
                {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
            </View>
            
        )
    }
}

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
})

const secondFlex = 0.3,thirdFlex = 0.9

const styles={
    registerScreenContainerStyle:{
        flex: 1,
    },
    popupContainerStyle:{
        borderRadius: 3,
        padding: responsiveWidth(4),

    },
    popupLayoutContainerStyle:{
        justifyContent: 'flex-start',
        paddingTop: responsiveHeight(10)
    },
    btnCloseImageStyle:{
        height: responsiveHeight(2.81),
        alignSelf: 'flex-end'
    },
    mascotImageStyle:{
        height: responsiveHeight(20.51),
        alignSelf: 'center'
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
    submitButtonContainerStyle:{
        marginLeft: responsiveWidth(2),
        marginRight: responsiveWidth(2),
        justifyContent: 'center',
        marginTop: responsiveHeight(2),

    },
    inputContainerStyle:{
        borderBottomColor: '#C4C4C4',
        height: responsiveHeight(8),
    },
}
