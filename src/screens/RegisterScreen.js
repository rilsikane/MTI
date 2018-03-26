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
import {postBasic} from '../api'
import { observer, inject } from 'mobx-react';
import { ifIphoneX } from 'react-native-iphone-x-helper'

@inject('registerStore')
@observer
export default class RegisterScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            pageNumber: 0,
            enable:false
        }
        if(!this.props.registerStore.register){
            this.props.registerStore.register = {};
        }
        this.updateRef = this.updateRef.bind(this);
        this.gotoWelcome = this.gotoWelcome.bind(this);
    }

    updateRef(ref) {
        this._pages = ref;
    }

    renderPopup(){
        const slideAnimation = new SlideAnimation({
            slideFrom: 'bottom',
          })

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

    async _onSubmitRegister1Press(param){
        if (this._pages) {
            let response = await postBasic("mti/checkinfo",param);
            if(response){
                if(!response.message){
                    this.props.registerStore.register = response;
                    this.props.registerStore.register.idcard = param.idcard;
                    this.props.registerStore.register.birthdate = param.birthdate;
                    this.setState({enable:true});
                    this._pages.scrollToPage(1);
                    this.setState({enable:false});
                }else{
                    this.popupDialog.show();
                }
            }
        }
    }

    _onSubmitRegister2Press(){
        if (this._pages) {
            this.setState({enable:true});
            this._pages.scrollToPage(2);
            this.setState({enable:false});
           
        }
    }

    _onSubmitRegister3Press(){
        if (this._pages) {
           
            this.setState({enable:true});
            this._pages.scrollToPage(3);
            this.setState({enable:false});
        }
    }

   async _onSubmitRegister4_1Press(){
        if (this._pages) {
            let param = {};
            param.mobile_no = this.props.registerStore.register.tel;
            let response = await postBasic("otp/request",param);
            if(response){
                if(!response.message){
                  
                    this.props.registerStore.register.refcode = response.refcode;
                    this.setState({enable:true});
                    this._pages.scrollToPage(4);
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
        let param = {};
        param.refcode = this.props.registerStore.register.refcode;
        param.otp = otp;
        let response = await postBasic("otp/check",param);
        if(response){
            if(!response.message){
               if(response.status=='ok'){
                this.props.navigator.resetTo({
                    screen: 'mti.LifeStyleScreen', // unique ID registered with Navigation.registerScreen
                    title: undefined, // navigation bar title of the pushed screen (optional)
                    passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
                    animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
                    animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
                    navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
                    navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                  });
                }
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

    async _onRequestNewOtpButtonPress(){
        let param = {};
            param.mobile_no = this.props.registerStore.register.tel;
            let response = await postBasic("otp/request",param);
            if(response){
                if(!response.message){
                    Alert.alert(
                        'แจ้ง OTP',
                        `ส่ง OTP ไปยังหมายเลข ${ this.props.registerStore.register.tel} เรียบร้อยแล้ว`,
                        [
                        {text: 'OK', onPress: () => console.log('OK Pressed!')},
                        ]
                    )
                    this.props.registerStore.register.refcode = response;
                    this._pages.scrollToPage(4);
                }else{
                    this.popupDialog.show();
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
                    cancel={()=>this.props.navigator.pop()}
                    //rightIconName='iconBell'
                />
                <PageIndicators
                    pageNumber={this.state.pageNumber+1}
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
                    <RegisterStep2
                        onSubmitRegister2Press={this._onSubmitRegister2Press.bind(this)}
                    />
                    <RegisterStep3
                        onSubmitRegister3Press={this._onSubmitRegister3Press.bind(this)}
                    />
                    <LifeStyleScreen/>
                    <RegisterStep4_1
                        onSubmitRegister4_1Press={this._onSubmitRegister4_1Press.bind(this)}
                    />
                    <RegisterStep4_2
                        onSubmitRegister4_2Press={this._onSubmitRegister4_2Press.bind(this)}
                        onRequestNewOtpButtonPress={this._onRequestNewOtpButtonPress.bind(this)}
                    />
                        
                </Pages>}

                {this.renderPopup()}
            </View>
            
        )
    }
}

const styles={
    registerScreenContainerStyle:{
        flex: 1,

    },
    popupContainerStyle:{
        borderRadius: 3,
        padding: responsiveWidth(4),

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
        fontSize: responsiveFontSize(2.6),
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

    }
}
