import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {TextInputIcon} from './TextInputIcon';
import {MainSubmitButton} from './MainSubmitButton';
import {CheckBoxes} from './../components/CheckBoxes';
import { observer, inject } from 'mobx-react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

@inject('registerStore')
@observer
class RegisterStep3 extends Component{

    constructor(props){
        super(props)
        this.state={
            userEmail: this.props.registerStore.register.tel,
            userPassword: '',
            userConfirmPassword: '',
            errorText: '',
            errorPassowrd:false,
            userEmailErr:false
        }
        this.onSubmitButtonPress = this.onSubmitButtonPress.bind(this);
    }
    componentDidMount(){
      this.setState({userEmail:this.props.registerStore.register.tel})
    };
    
    onPasswordChange(){
        if(this.state.userConfirmPassword!=''){
            if(this.state.userPassword!=this.state.userConfirmPassword){
                this.setState({
                    errorText: 'รหัสผ่านไม่ตรงกัน',
                    userConfirmPassword:''
                })
            }else{

                this.setState({
                    errorText: null
                })
            }
        }else{
            var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
            if(this.state.userPassword.length >=8 && regex.test(this.state.userPassword)){
                this.setState({errorPassowrd:false})
            }else{
                this.setState({errorPassowrd:true})
            }
        }

    }

    onConfirmPasswordChange(){

        if(this.state.userConfirmPassword!=this.state.userPassword){
            this.setState({
                errorText: 'รหัสผ่านไม่ตรงกัน',
            })
        }else{
            this.setState({
                errorText: null
            })
        }
    }

    onSubmitButtonPress(){
        //this.props.registerStore.register.username = this.state.userEmail;
        this.props.registerStore.register.password = this.state.userPassword;
        this.setState({
            userPassword: '',
            userConfirmPassword: '',
        })
        this.props.onSubmitRegister3Press();
    }
    isShowSubmit(){
        if(this.state.userEmail!=''&&this.state.userPassword !='' 
        &&(this.state.errorText==null||this.state.errorText=='') && this.state.userConfirmPassword !='' 
        && !this.state.errorPassowrd){
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
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    automaticallyAdjustContentInsets={false}
                    //keyboardShouldPersistTaps='always'
                    enableOnAndroid={true}
                    contentContainerStyle={{flexGrow:1,}}
                    //style={{flex: 1}}
                    scrollEnabled={true}
                >
                    <View style={styles.userDetailContainerStyle}>
                        <TextInputIcon
                            value={this.props.registerStore.register.username}
                            leftLabelText='อีเมล/เบอร์โทรศัพท์'
                            iconUri={require('./../source/icons/iconMail.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            onChangeText={(userEmail)=> this.props.registerStore.register.username = userEmail}
                            keyboardType='email-address'
                            returnKeyType='next'
                            blurOnSubmit={true}
                            editable={false}
                            onBlur={()=>{
                                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                var telRex = /^[08|09|06|][0-9]+[0-9]$/
                                if(re.test(this.props.registerStore.register.username) || telRex.test(this.props.registerStore.register.username)){
                                    if(telRex.test(this.state.userEmail) && this.state.userEmail.length ==10){
                                        this.setState({userEmailErr:false})
                                    }else if(!telRex.test(this.state.userEmail)){
                                         this.setState({userEmailErr:false})
                                    }
                                    
                                }else{
                                    this.setState({userEmailErr:true})
                                }
                            }}
                        />
                        {this.state.userEmailErr && <Text style={styles.errorMsg}>อีเมล/เบอร์โทรศัพท์ ไม่ถูกรูปแบบ</Text>}
                        <TextInputIcon
                            value={this.state.userPassword}
                            leftLabelText='รหัสผ่าน'
                            iconUri={require('./../source/icons/iconPass.png')}
                            containerStyle={!this.state.errorPassowrd ?styles.inputContainerStyle:styles.inputContainerErrStyle}
                            iconStyle={styles.iconStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            secureTextEntry={true}
                            onChangeText={(userPassword)=> this.setState({userPassword})}
                            onEndEditing={this.onPasswordChange.bind(this)}
                            returnKeyType='next'
                            blurOnSubmit={true}
                            maxLength={16}
                        />
                        {this.state.errorPassowrd && <Text style={styles.errorMsg}>รหัสผ่านไม่ถูกรูปแบบ</Text>}
                        <TextInputIcon
                            value={this.state.userConfirmPassword}
                            leftLabelText='ยืนยันรหัสผ่าน'
                            iconUri={require('./../source/icons/iconPass.png')}
                            containerStyle={!this.state.errorText ?styles.inputContainerStyle:styles.inputContainerErrStyle}
                            iconStyle={styles.iconStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            secureTextEntry={true}
                            onChangeText={(userConfirmPassword)=> this.setState({userConfirmPassword})}
                            onEndEditing={this.onPasswordChange.bind(this)}
                            returnKeyType='next'
                            blurOnSubmit={true}
                            maxLength={16}
                        />
                        <Text style={styles.errorTextStyle}>{this.state.errorText}</Text>
                        <Text style={styles.directionTextStyle}>รหัสผ่านจะต้องมี 8 หลัก ประกอบไปด้วยตัวอักษรภาษาอังกฤษพิมพ์ใหญ่และตัวพิมพ์เล็กและตัวเลข</Text>
                        {this.isShowSubmit() && <View style={styles.submitButtonContainerStyle}>
                            <MainSubmitButton
                                buttonTitleText='ยืนยันข้อมูล'
                                onPress={this.onSubmitButtonPress}
                            />
                        </View>}
                    </View>
                </KeyboardAwareScrollView>
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
        fontSize: responsiveFontSize(2.2),
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
    },
    inputContainerErrStyle:{
        borderBottomColor: 'red',
        height: responsiveHeight(7)
    },
    errorMsg:{
        fontSize:responsiveFontSize(2.2),
        color:"red",
        padding:2
    },
    errorTextStyle:{
        fontSize: responsiveHeight(2.64),
        marginTop: responsiveHeight(1),
        color: 'red'
    },

}

export {RegisterStep3}