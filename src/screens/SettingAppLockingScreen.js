import React,{Component} from 'react';
import {Text,View,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from '../components/Headers';
import SwitchSelector from '../components/SwitchSelector';
import store from 'react-native-simple-store';
export default class SettingAppLockingScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            lockingIndex: 0,
            touchIdIndex: 0,
            user:{},
            openModal:false
        }
        this.enablePincode = this.enablePincode.bind(this);
        this.cancelSetPincode = this.cancelSetPincode.bind(this);
        this.next = this.next.bind(this);
        this.setUpPinComplete = this.setUpPinComplete.bind(this);
        this.changePincode = this.changePincode.bind(this);
    }
    componentDidMount(){
        this.init();
    }
    async init(){
        this.setState({openModal:true})
        let user = await store.get("user");
        this.setState({user:user,lockingIndex:user.pinCode?1:0,openModal:false});
    }
    async enablePincode(value){
       if(value==0){
        this.setState({openModal:true});
        this.props.navigator.showModal({
            screen: 'mti.PassCodeScreen', // unique ID registered with Navigation.registerScreen
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            passProps:{cancel:this.cancelSetPincode,next:this.next},
            animated: true, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
        })
       }else{
        this.setState({openModal:true});
        let user = await store.get("user");
        let tmpUser = {...user};
        tmpUser.pinCode = null;
        tmpUser.passCode = undefined;
        await store.update("user",tmpUser);
        this.setState({user:tmpUser,lockingIndex:0,openModal:false});
       }
    }
    cancelSetPincode(){
        this.props.navigator.dismissModal({
            animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        })
        this.setState({lockingIndex:0,openModal:false});
       
    }
    next(passcode){
        this.props.navigator.showModal({
            screen: 'mti.PassConfirmCodeScreen', // unique ID registered with Navigation.registerScreen
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            passProps:{cancel:this.cancelSetPincode,passCode:passcode,next:this.setUpPinComplete},
            animated: true, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
        })
    }
    async setUpPinComplete(pinCode){
        this.props.navigator.dismissAllModals({
            animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        })
        let user = await store.get("user");
        user.pinCode = pinCode.toString();
        await store.update("user",user);
        this.setState({user:user,lockingIndex:1,openModal:false});
        alert("ตั้งค่า Pin Code เรียบร้อย");
    }
    async changePincode(){
        let user = await store.get("user");
        this.props.navigator.showModal({
            screen: 'mti.PassCodeChangeScreen', // unique ID registered with Navigation.registerScreen
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            passProps:{cancel:this.cancelSetPincode,passCode:user.pinCode,next:()=>this.enablePincode(0)},
            animated: true, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
        })
    }

    renderLockingSwitch(){
        const lockingOption = [
            { label: 'เปิด', value: 1 },
            { label: 'ปิด', value: 0 },
        ]
        return(
            <View style={styles.switchContainerStyle}>
                <SwitchSelector 
                    options={lockingOption} 
                    initial={this.state.lockingIndex}
                    onPress={value => this.enablePincode(value)} 
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

    renderTouchIdSwitch(){
        const lockingOption = [
            { label: 'เปิด', value: 1 },
            { label: 'ปิด', value: 0 },
        ]

        return(
            <View style={styles.switchContainerStyle}>
                <SwitchSelector 
                    options={lockingOption} 
                    initial={this.state.touchIdIndex} 
                    onPress={value => this.setState({touchIdIndex: value})} 
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

    render(){
        return(
            <View style={styles.settingAppLockingScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='การล็อกรหัสและ Touch ID'
                    longTitle
                />
                <View style={styles.settingAppLockingContainerStyle}>
                    <View style={styles.switchSectionStyle}>
                        <Text style={styles.settingTitleTextStyle}>Pin Code</Text>
                        {!this.state.openModal && this.renderLockingSwitch()}
                    </View>
                    {this.state.user.pinCode && <View>
                        <View style={[styles.switchSectionStyle,{borderBottomColor:"transparent"}]}>
                            <TouchableOpacity onPress={this.changePincode}
                                style={styles.changePassContainerStyle}
                            >
                                <Text style={styles.settingBulletTitleTextStyle}>{'\u2022'}  </Text>
                                <Text style={[styles.settingTitleTextStyle,{textDecorationLine: 'underline',}]}>เปลี่ยน Pin Code</Text>
                            </TouchableOpacity>
                        
                        </View>
                        {/* <View style={styles.switchSectionStyle}>
                                <View style={styles.changePassContainerStyle}>
                                    <Text style={[styles.settingBulletTitleTextStyle]}>{'\u2022'}  </Text>
                                    <View style={{flexDirection:'row', justifyContent: 'space-between',flex:1,alignItems:'center'}}>
                                        <Text style={[styles.settingTitleTextStyle]}>Touch ID</Text>
                                        {this.renderTouchIdSwitch()}
                                    </View>
                                </View>
                        </View> */}
                    </View>}
                </View>
            </View>
        )
    }
}

const styles={
    settingAppLockingScreenContainerStyle:{
        flex: 1,
    },
    settingAppLockingContainerStyle:{
        flex: 1,
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
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
    changePassContainerStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: responsiveWidth(4),
    },
    settingBulletTitleTextStyle:{
        fontSize: responsiveFontSize(2.2),
        letterSpacing: 0,
        color: "#1595d3",
    },
    settingTitleTextStyle:{
        fontSize: responsiveFontSize(2.2),
        letterSpacing: 0,
        color: "#1595d3",
    },
    switchContainerStyle:{
        width: responsiveWidth(20),
        height: responsiveHeight(5),
    },
    switchStyle:{
        borderColor: '#c5c6c8',
        borderWidth: 1,
        height: responsiveHeight(5),
        width: responsiveWidth(20),
    },
}