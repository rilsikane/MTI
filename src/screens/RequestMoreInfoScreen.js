import React,{Component} from 'react';
import {Text,View} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {MainSubmitButton} from './../components/MainSubmitButton';
import {TextInputIcon} from './../components/TextInputIcon';

export default class RequestMoreInfoScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            userCareer: '',
            userEducation: '',
            userIncome: '',
        }
    }

    render(){
        return(
            <View style={styles.requestMoreInfoScreenContainerStyle}>
                <Headers
                    leftIconName='cancel'
                    headerTitleText='ขอข้อมูลเพิ่มเติม'
                />
                <View style={styles.requestMoreInfoContainerStyle}>
                    <Text style={styles.titleTextStyle}>กรุณากอรกข้อมูลส่วนตัวให้ครบถ้วน เพื่อสิทธิประโยชน์ของสมาชิก</Text>
                    <TextInputIcon
                        genderValue={this.state.userCareer}
                        onSubmitEditing={(userCareer)=>this.setState({userCareer})}
                        iconUri={require('./../source/icons/iconCareer.png')}
                        containerStyle={styles.inputContainerStyle}
                        secondFlex={secondFlex}
                        thirdFlex={thirdFlex}
                        inputType='selector'
                        options='career'
                        //editable={this.state.canEditProfile}
                    />
                    <TextInputIcon
                        genderValue={this.state.userEducation}
                        onSubmitEditing={(userEducation)=>this.setState({userEducation})}
                        iconUri={require('./../source/icons/iconEducation.png')}
                        containerStyle={styles.inputContainerStyle}
                        secondFlex={secondFlex}
                        thirdFlex={thirdFlex}
                        inputType='selector'
                        options='education'
                        //editable={this.state.canEditProfile}
                    />
                    <TextInputIcon
                        genderValue={this.state.userIncome}
                        onSubmitEditing={(userCareer)=>this.setState({userIncome})}
                        iconUri={require('./../source/icons/iconIncome.png')}
                        containerStyle={styles.inputContainerStyle}
                        secondFlex={secondFlex}
                        thirdFlex={thirdFlex}
                        inputType='selector'
                        options='income'
                        //editable={this.state.canEditProfile}
                    />
                    <MainSubmitButton
                        buttonTitleText='บันทึกข้อมูล'
                        onPress={()=>alert('บันทึกข้อมูล')}
                        style={styles.submitButtonStyle}
                    />
                </View>
            </View>
        )
    }
}

const secondFlex = 0.3,thirdFlex = 0.9

const styles={
    requestMoreInfoScreenContainerStyle:{
        flex: 1,
    },
    requestMoreInfoContainerStyle:{
        flex: 1,
        paddingLeft: responsiveWidth(5),
        paddingRight: responsiveWidth(5),
    },
    titleTextStyle:{
        letterSpacing: 0,
        textAlign: "center",
        color: "#0194d2",
        fontSize: responsiveFontSize(2.2),
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(3),
    },
    inputContainerStyle:{
        borderBottomColor: '#C4C4C4',
        height: responsiveHeight(7.8)
    },
    submitButtonStyle:{
        marginTop: responsiveHeight(3),
    }
}