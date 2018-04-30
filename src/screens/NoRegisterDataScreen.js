import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity,Alert} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PopupDialog,{ SlideAnimation }  from 'react-native-popup-dialog';
import { observer, inject } from 'mobx-react';
import {postBasic} from '../api'
import {MainSubmitButton} from './../components/MainSubmitButton';
import {Headers} from './../components/Headers';
import {TextInputIcon} from './../components/TextInputIcon';
import app from '../stores/app';
import Communications from 'react-native-communications';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

@inject('registerStore')
@observer
export default class NoRegisterDataScreen extends Component{

    constructor(props){
        super(props)
        if(!this.props.registerStore.register){
            this.props.registerStore.register = {};
        }
        this.state={emailErr:false,telErr:false,name:this.props.registerStore.register.name,surname:this.props.registerStore.register.surname,email:'',tel:''}
        this.requestContact = this.requestContact.bind(this);
        this.props.registerStore.contact = {};
        // this.props.registerStore.contact.email = '';
        // this.props.registerStore.contact.tel = '';
        this.app = app;
        this.gotoWelcome = this.gotoWelcome.bind(this);
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
    gotoWelcome(){
        setTimeout(()=>{
            this.app.login();
        })
        // this.props.navigator.dismissModal({
        //     animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        // });
        
    }

    renderLeavingContactPopup(){
        return(
            <PopupDialog
                ref={(leavingDialog) => { this.leavingDialog = leavingDialog; }}
                width={responsiveWidth(90)}
                height={responsiveHeight(60)}
                dialogStyle={styles.popupContainerStyle}
                containerStyle={styles.popupLayoutContainerStyle}
                //dialogAnimation={slideAnimation}
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

    renderNotificationPopup(){
        return(
            <PopupDialog
                ref={(notifyDialog) => { this.notifyDialog = notifyDialog; }}
                width={responsiveWidth(90)}
                height={responsiveHeight(27)}
                dialogStyle={styles.popupContainerStyle}
                containerStyle={styles.popupLayoutContainerStyle}
                dialogAnimation={slideAnimation}
            >
                <View>
                    <TouchableOpacity onPress={()=> this.notifyDialog.dismiss()}>
                        <Image
                            source={require('./../source/icons/btnClose.png')}
                            style={styles.btnCloseImageStyle}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.popupTitleTextStyle}>แจ้งเตือน</Text>
                        <Text style={styles.popupDetailTextStyle}>ท่านเป็นสมาชิกของเราอยู่แล้ว รบกวน Login เพื่อเข้าสู่ระบบ สามารถสอบถามเพิ่มเติม ติดต่อ 1484</Text>
                    </View>
                </View>
            </PopupDialog>
        )
    }

    render(){
        return(
            <View style={styles.noRegisterDataScreenContainerStyle}>
                <Headers
                    leftIconName='cancel'
                    headerTitleText='ลงทะเบียนสมาชิก'
                    cancel={()=>this.props.navigator.dismissModal({
                        animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                      })}
                />
                <View style={styles.logoContainerStyle}>
                    <Image
                        source={require('../source/images/mtiMainLogoImg.png')}
                        resizeMode='contain'
                        style={styles.logoImageStyle}
                    />
                </View>
                <Text style={styles.noDataTitleTextStyle}>ขออภัยค่ะ ไม่พบข้อมูลในระบบ</Text>
                <Text style={styles.noDataDetailTextStyle}>กรุณาตรวจสอบข้อมูลของท่านหรือฝากข้อมูลติดต่อกลับ  </Text>
                <View style={styles.contactButtonGroupContainerStyle}>
                    <MainSubmitButton
                        buttonTitleText='Call Now'
                        iconImageUri={require('../source/icons/iconPhoneSelected.png')}
                        style={styles.callNowButtonStyle}
                        onPress={()=>Communications.phonecall("1484", true)}
                    />
                     <MainSubmitButton
                        buttonTitleText='ฝากข้อมูลติดต่อกลับ'
                        style={styles.leaveContactButtonStyle}
                        onPress={()=>this.leavingDialog.show()}
                    />
                </View>
                <View style={styles.noUserUseContainerStyle}>
                    <TouchableOpacity onPress={this.gotoWelcome}>
                        <Text style={styles.noUserUserTextStyle}>เข้าใช้งานโดยไม่เป็นสมาชิก</Text>
                    </TouchableOpacity>
                </View>
                {this.renderLeavingContactPopup()}
                {this.renderNotificationPopup()}
            </View>
        )
    }
}

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
})

const secondFlex = 0.3,thirdFlex = 0.9

const styles={
    noRegisterDataScreenContainerStyle:{
        flex: 1,
        backgroundColor:"#FFF"
    },
    logoContainerStyle:{
        height: responsiveHeight(15.75),
        marginTop: responsiveHeight(7),
        marginBottom: responsiveHeight(3.5),
    },
    logoImageStyle:{
        height: responsiveHeight(15.75),
        alignSelf: 'center',
    },
    noDataTitleTextStyle:{
        fontSize: responsiveFontSize(3.5),
        color: '#1595d3',
        textAlign: 'center',
        letterSpacing: -0.24,
        marginTop: responsiveHeight(2.5),
        marginBottom: responsiveHeight(2),
    },
    noDataDetailTextStyle:{
        fontSize: responsiveFontSize(2.2),
        color: '#919195',
        textAlign: 'center',
    },
    leaveContactTextStyle:{
        fontSize: responsiveFontSize(2.2),
        color: '#1595d3',
        textDecorationLine: 'underline'
    },
    contactButtonGroupContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: responsiveWidth(2),
        marginRight: responsiveWidth(2),
        marginTop: responsiveHeight(3),
        zIndex: 10,
    },
    callNowButtonStyle:{
        width: responsiveWidth(37.65)
    },
    leaveContactButtonStyle:{
        width: responsiveWidth(48.75)
    },
    noUserUseContainerStyle:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: responsiveHeight(5)
    },
    noUserUserTextStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(2.2),
    },
    popupContainerStyle:{
        borderRadius: 3,
        padding: responsiveWidth(4),

    },
    popupLayoutContainerStyle:{
        justifyContent: 'flex-start',
        paddingTop: responsiveHeight(10),
        zIndex: 100,
        backgroundColor:"#fff"
    },
    btnCloseImageStyle:{
        height: responsiveHeight(2.81),
        alignSelf: 'flex-end'
    },
    popupTitleTextStyle:{
        fontSize: responsiveFontSize(3.5),
        color: '#1595d3',
        textAlign: 'center',
        marginTop: responsiveHeight(2.5),
        marginBottom: responsiveHeight(2),
        letterSpacing: -0.24,
    },
    popupDetailTextStyle:{
        fontSize: responsiveFontSize(2.2),
        color: '#919195',
        textAlign: 'center',
    },
    inputContainerStyle:{
        borderBottomColor: '#C4C4C4',
        height: responsiveHeight(8),
    },
    submitButtonContainerStyle:{
        marginLeft: responsiveWidth(2),
        marginRight: responsiveWidth(2),
        justifyContent: 'center',
        marginTop: responsiveHeight(2),

    },
    errorMsg:{
        fontSize:responsiveFontSize(2.2),
        color:"red",
        padding:2
    }
}
