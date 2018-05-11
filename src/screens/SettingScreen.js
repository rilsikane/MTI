import React,{Component} from 'react';
import {Text,View,TouchableOpacity,Image} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from '../components/Headers';
import SwitchSelector from '../components/SwitchSelector';
import store from 'react-native-simple-store';
import app from '../stores/app';

export default class SettingScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            languageIndex: 1,
            notifyIndex: 1,
            fontSizeIndex: 0,
        }

    }

    renderLanguageSwitch(){
        const languageOption = [
            { label: 'ไทย', value: 1 },
            { label: 'อังกฤษ', value: 0 },
        ]

        return(
            <View style={styles.switchContainerStyle}>
                <SwitchSelector 
                    options={languageOption} 
                    initial={this.state.languageIndex} 
                    onPress={value => this.setState({languageIndex: value})} 
                    buttonColor='rgb(253,98,98)'
                    style={styles.switchStyle}
                    fontSize={responsiveFontSize(2)}
                    selectedColor='rgb(253,98,98)'
                    textColor='rgb(253,98,98)'
                    hasPadding={false}
                />
            </View>
        )
    }

    renderNotifySwitch(){
        const notifyOption = [
            { label: 'เปิด', value: 1 },
            { label: 'ปิด', value: 0 },
        ]

        return(
            <View style={styles.switchContainerStyle}>
                <SwitchSelector 
                    options={notifyOption} 
                    initial={this.state.notifyIndex} 
                    onPress={value => this.setState({notifyIndex: value})} 
                    buttonColor='rgb(253,98,98)'
                    style={styles.switchStyle}                    
                    fontSize={responsiveFontSize(2)}
                    selectedColor='rgb(253,98,98)'
                    textColor='rgb(253,98,98)'
                    hasPadding={false}
                />
            </View>
        )
    }

    renderFontSizeRadio(){
        return(
            <View style={styles.fontSizeRadioContainerStyle}>
                <TouchableOpacity onPress={()=>this.onFontSizeButtonPress(0)} style={[styles.fontSizeRadioSectionStyle,this.state.fontSizeIndex==0&&styles.fontSizeRadioActiveStyle]}>
                    <Text style={[styles.smallFontSizeStyle,this.state.fontSizeIndex==0?styles.fontSizeTextStyle:styles.fontSizeActiveTextStyle]}>ก</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.onFontSizeButtonPress(1)} style={[styles.fontSizeRadioSectionStyle,this.state.fontSizeIndex==1&&styles.fontSizeRadioActiveStyle]}>
                    <Text style={[styles.largeFontSizeStyle,this.state.fontSizeIndex!=0?styles.fontSizeTextStyle:styles.fontSizeActiveTextStyle]}>ก</Text>
                </TouchableOpacity>
            </View>
        )
    }

    async onFontSizeButtonPress(index){
        this.setState({
            fontSizeIndex: index,
        })
        if(index==1){
            store.save("setting",{fontSize:"large"})
            app.fontSize =1.2;
        }else{
            store.save("setting",{fontSize:"small"})
        }
    }

    gotoScreen(link){
        this.props.navigator.push({
            screen: link, // unique ID registered with Navigation.registerScreen
            passProps:{},
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            animated: false, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
        })
    }

    render(){
        return(
            <View style={styles.settingScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='ตั้งค่า'
                    rightIconName='iconBell'
                />
                <View style={styles.settingContainerStyle}>
                    {/* <View style={styles.switchSectionStyle}>
                        <Text style={styles.settingTitleTextStyle}>ภาษา</Text>
                        {this.renderLanguageSwitch()}
                    </View>
                    <View style={styles.switchSectionStyle}>
                        <Text style={styles.settingTitleTextStyle}>การแจ้งเตือน</Text>
                        {this.renderNotifySwitch()}
                    </View>
                    <View style={styles.switchSectionStyle}>
                        <Text style={styles.settingTitleTextStyle}>ขนาดตัวหนังสือ</Text>
                        {this.renderFontSizeRadio()}
                    </View> */}
                    {/* <TouchableOpacity style={styles.switchSectionStyle}  onPress={()=>this.gotoScreen('mti.SettingAppLockingScreen')}>
                        <Text style={styles.settingTitleTextStyle}>การล็อกรหัสและ Touch ID</Text> */}
                        {/* <TouchableOpacity */}
                           
                        {/* > */}
                            {/* <Image
                                source={require('../source/icons/iconRightArrow01.png')}
                                resizeMode='contain'
                                style={styles.rightArrowIconStyle}
                            /> */}
                        {/* </TouchableOpacity> */}
                    {/* </TouchableOpacity> */}
                    <View style={styles.servicePolicyButtonContainerStyle}>
                        <Image
                            source={require('../source/icons/iconContact01.png')}
                            resizeMode='contain'
                            style={styles.policyIconStyle}
                        />
                        <TouchableOpacity
                            onPress={()=>     
                                this.props.navigator.showModal({
                                    screen: 'mti.ServicePolicyScreen', // unique ID registered with Navigation.registerScreen
                                    title: undefined, // navigation bar title of the pushed screen (optional)
                                    titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                                    passProps: {
                                        navigator:this.props.navigator,
                                    }, // Object that will be passed as props to the pushed screen (optional)
                                    animated: true, // does the push have transition animation or does it happen immediately (optional)
                                    backButtonTitle: undefined, // override the back button title (optional)
                                    backButtonHidden: false, // hide the back button altogether (optional)
                                })
                            }
                        >
                            <Text style={styles.policyTextStyle}>เงื่อนไขการให้บริการ</Text>
                        </TouchableOpacity>
                    </View> 
                    <View style={styles.appIconContainerStyle}>
                        <Image
                            source={require('../source/icons/iconApp01.png')}
                            resizeMode='contain'
                            style={styles.appIconStyle}
                        />
                    </View>
                    <View style={styles.appTextContainerStyle}>
                        <Text style={styles.appTitleTextStyle}>Muang Thai Friends Club Version 1.0{'\n'}เพื่อนสนิทที่สร้างแรงบันดาลใจและเติมเต็มทุกความสุขของคุณ</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles={
    settingScreenContainerStyle:{
        flex: 1,
        backgroundColor:"#fff"
    },
    settingContainerStyle:{
        flex: 1,
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
    },
    switchContainerStyle:{
        width: responsiveWidth(20),
        height: responsiveHeight(5),
    },
    switchSectionStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: responsiveHeight(2),
        paddingBottom: responsiveHeight(2),
        borderBottomWidth: responsiveHeight(0.17),
        borderBottomColor: '#d2dbe5',
        height: responsiveHeight(10),
    },
    settingTitleTextStyle:{
        fontSize: responsiveFontSize(2.2),
        letterSpacing: 0,
        color: "#1595d3"
    },
    rightArrowIconStyle:{
        height: responsiveHeight(2.11),
    },
    switchStyle:{
        borderColor: '#c5c6c8',
        borderWidth: 1,
        height: responsiveHeight(5),
        width: responsiveWidth(20),
    },
    fontSizeRadioContainerStyle:{
        flexDirection: 'row',
    },
    fontSizeRadioSectionStyle:{
        width: responsiveHeight(5),
        height: responsiveHeight(5),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: '#c5c6c8',
        borderWidth: 1,
        marginLeft: responsiveWidth(2),
    },
    smallFontSizeStyle:{
        fontSize: responsiveFontSize(2.2),
    },
    largeFontSizeStyle:{
        fontSize: responsiveFontSize(3),
    },
    fontSizeTextStyle:{
        color: '#FFF',
    },
    fontSizeActiveTextStyle:{
        color: 'rgb(253,98,98)',
    },
    fontSizeRadioActiveStyle:{
        borderBottomWidth: 5,
        borderBottomColor: '#ca4e4e',
        backgroundColor: 'rgb(253,98,98)',
        borderWidth: 0,
    },
    servicePolicyButtonContainerStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: responsiveHeight(4),
    },
    policyIconStyle:{
        height: responsiveHeight(2.11),
    },
    policyTextStyle:{
        fontSize: responsiveFontSize(2.2),
        letterSpacing: 0,
        color: "#777777",
        textDecorationLine: 'underline',
    },
    appIconContainerStyle:{
        height: responsiveHeight(10.56),
        marginTop: responsiveHeight(6),
        marginBottom: responsiveHeight(6),
        alignItems: 'center',
    },
    appIconStyle:{
        height: responsiveHeight(10.56),
    },
    appTextContainerStyle:{
        flex: 1,
    },
    appTitleTextStyle:{
        fontSize: responsiveFontSize(2.2),
        letterSpacing: 0,
        textAlign: 'center',
        color: "#777777"
    }
}