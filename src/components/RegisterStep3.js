import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {TextInputIcon} from './TextInputIcon';
import {MainSubmitButton} from './MainSubmitButton';
import {CheckBoxes} from './../components/CheckBoxes';
import { observer, inject } from 'mobx-react';

@inject('registerStore')
@observer
class RegisterStep3 extends Component{

    constructor(props){
        super(props)
        this.state={
            userEmail: '',
            userPassword: '',
            userConfirmPassword: '',
            errorText: ''
        }
        this.onSubmitButtonPress = this.onSubmitButtonPress.bind(this);
    }

    onPasswordChange(){

        if(this.state.userPassword!=this.state.userConfirmPassword){
            this.setState({
                errorText: 'รหัสผ่านไม่ตรงกัน'
            })
        }else{
            this.setState({
                errorText: null
            })
        }

    }

    onConfirmPasswordChange(){

        if(this.state.userConfirmPassword!=this.state.userPassword){
            this.setState({
                errorText: 'รหัสผ่านไม่ตรงกัน'
            })
        }else{
            this.setState({
                errorText: null
            })
        }
    }

    onSubmitButtonPress(){
        this.props.registerStore.register.username = this.state.userEmail;
        this.props.registerStore.register.password = this.state.userPassword;
        this.props.onSubmitRegister3Press();
    }
    isShowSubmit(){
        if(this.state.userEmail!=''&&this.state.userPassword !='' 
        &&(this.state.errorText==null||this.state.errorText=='') && this.state.userConfirmPassword !=''){
            return true;
        }else{
            return false;
        }
    }

    render(){
        return(
            <View style={styles.registerStep1ContainerStyle}>
                <View style={styles.registerDirectionContainerStyle}>
                    <Text style={styles.registerTitleTextStyle}>ข้อมูลบัญชีของคุณ</Text>
                    <Text style={styles.directionTextStyle}>กรุณากอรกข้อมูลบัญชีส่วนตัว เพื่อใช้ในการเข้าใช้งานแอพพลิเคชั่น</Text>
                </View>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.userDetailContainerStyle}>
                        <TextInputIcon
                            value={this.state.userEmail}
                            leftLabelText='อีเมล/เบอร์โทรศัพท์'
                            iconUri={require('./../source/icons/iconMail.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            onChangeText={(userEmail)=> this.setState({userEmail})}
                            keyboardType='email-address'
                        />
                        <TextInputIcon
                            value={this.state.userPassword}
                            leftLabelText='รหัสผ่าน'
                            iconUri={require('./../source/icons/iconPass.png')}
                            containerStyle={styles.inputContainerStyle}
                            iconStyle={styles.iconStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            secureTextEntry={true}
                            onChangeText={(userPassword)=> this.setState({userPassword})}
                            onEndEditing={this.onPasswordChange.bind(this)}
                        />
                        <TextInputIcon
                            value={this.state.userConfirmPassword}
                            leftLabelText='ยืนยันรหัสผ่าน'
                            iconUri={require('./../source/icons/iconPass.png')}
                            containerStyle={styles.inputContainerStyle}
                            iconStyle={styles.iconStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            secureTextEntry={true}
                            onChangeText={(userConfirmPassword)=> this.setState({userConfirmPassword})}
                            onEndEditing={this.onPasswordChange.bind(this)}
                        />
                        <Text style={styles.errorTextStyle}>{this.state.errorText}</Text>
                        {this.isShowSubmit() && <View style={styles.submitButtonContainerStyle}>
                            <MainSubmitButton
                                buttonTitleText='ยืนยันข้อมูล'
                                onPress={this.onSubmitButtonPress}
                            />
                        </View>}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const secondFlex = 0.4,thirdFlex = 0.9

const styles={
    registerStep1ContainerStyle:{
        flex: 1,

    },
    mascotImageStyle:{
        height: responsiveHeight(20.51),
        alignSelf: 'center',
        marginBottom: responsiveHeight(2),

    },
    registerDirectionContainerStyle:{
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
        justifyContent: 'center',
    }

}

export {RegisterStep3}