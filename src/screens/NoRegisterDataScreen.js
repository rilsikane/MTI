import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PopupDialog,{ SlideAnimation }  from 'react-native-popup-dialog';
import { observer, inject } from 'mobx-react';

import {MainSubmitButton} from './../components/MainSubmitButton';
import {Headers} from './../components/Headers';
import {TextInputIcon} from './../components/TextInputIcon';

@inject('registerStore')
@observer
export default class NoRegisterDataScreen extends Component{

    constructor(props){
        super(props)

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
                <View>
                    <TouchableOpacity onPress={()=> this.leavingDialog.dismiss()}>
                        <Image
                            source={require('./../source/icons/btnClose.png')}
                            style={styles.btnCloseImageStyle}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.popupTitleTextStyle}>ฝากข้อมูลติดตต่อกลับ</Text>
                        <Text style={styles.popupDetailTextStyle}>กรุณากรอกข้อมูลของคุณและรอการติดต่อกลับ</Text>
                        <TextInputIcon
                            //value={this.props.registerStore.register.name}
                            onChangeText={(userFirstName)=>this.props.registerStore.register.name=userFirstName}
                            leftLabelText='ชื่อ'
                            iconUri={require('./../source/icons/iconAvatar.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                        />
                        <TextInputIcon
                            //value={this.props.registerStore.register.surname}
                            onChangeText={(userLastName)=>this.props.registerStore.register.name=surname}
                            leftLabelText='นามสกุล'
                            iconUri={require('./../source/icons/iconAvatar.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                        />
                        <TextInputIcon
                            //value={this.props.registerStore.register.tel}
                            onChangeText={(userPhone)=>this.props.registerStore.register.tel=userPhone}
                            leftLabelText='เบอร์โทรศัพท์'
                            iconUri={require('./../source/icons/iconPhone.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                        />
                        <TextInputIcon
                            //value={this.state.email}
                            onChangeText={(email)=>this.setState({email})}
                            leftLabelText='อีเมล'
                            iconUri={require('../source/icons/iconMail.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            keyboardType='email-address'
                        />
                    </View>
                    <View style={styles.submitButtonContainerStyle}>
                        <MainSubmitButton
                            buttonTitleText='ตกลง'
                            onPress={()=>alert('Submit')}
                        />
                    </View>
                </View>
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
                />
                <View style={styles.logoContainerStyle}>
                    <Image
                        source={require('../source/images/mtiMainLogoImg.png')}
                        resizeMode='contain'
                        style={styles.logoImageStyle}
                    />
                </View>
                <Text style={styles.noDataTitleTextStyle}>ขออภัยค่ะ ไม่พบข้อมูลสมาชิกของคุณ</Text>
                <Text style={styles.noDataDetailTextStyle}>กรุณาตรวจสอบข้อมูลสมาชิกของคุณให้ถูกต้อง{'\n'}หรือ {<Text onPress={()=>this.leavingDialog.show()} style={styles.leaveContactTextStyle}>ฝากข้อมูลให้เราติดต่อกลับ</Text>} หากคุณเคยเป็นสมาชิกแล้ว</Text>
                <View style={styles.contactButtonGroupContainerStyle}>
                    <MainSubmitButton
                        buttonTitleText='Call Now'
                        iconImageUri={require('../source/icons/iconPhoneSelected.png')}
                        style={styles.callNowButtonStyle}
                    />
                     <MainSubmitButton
                        buttonTitleText='ฝากข้อมูลติดต่อกลับ'
                        style={styles.leaveContactButtonStyle}
                        onPress={()=>this.leavingDialog.show()}
                    />
                </View>
                <View style={styles.noUserUseContainerStyle}>
                    <TouchableOpacity onPress={()=>this.notifyDialog.show()}>
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
}
