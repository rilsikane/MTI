import React,{Component} from 'react';
import {Text,View,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from '../components/Headers';
import SwitchSelector from '../components/SwitchSelector';

export default class SettingAppLockingScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            lockingIndex: 1,
            touchIdIndex: 1,
        }
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
                    onPress={value => this.setState({lockingIndex: value})} 
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
                        <Text style={styles.settingTitleTextStyle}>ล็อกรหัส</Text>
                        {this.renderLockingSwitch()}
                    </View>
                    <View style={styles.switchSectionStyle}>
                        <TouchableOpacity
                            style={styles.changePassContainerStyle}
                        >
                            <Text style={styles.settingBulletTitleTextStyle}>{'\u2022'}  </Text>
                            <Text style={[styles.settingTitleTextStyle,{textDecorationLine: 'underline',}]}>เปลี่ยนรหัส</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.switchSectionStyle}>
                        <Text style={styles.settingTitleTextStyle}>Touch ID</Text>
                        {this.renderTouchIdSwitch()}
                    </View>
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