import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {TextInputIcon} from './TextInputIcon';
import {MainSubmitButton} from './MainSubmitButton';
import {CheckBoxes} from './../components/CheckBoxes';
import { observer, inject } from 'mobx-react';

@inject('registerStore')
@observer
class RegisterStep2 extends Component{

    constructor(props){
        super(props)
        this.state={
            userFirstName: '',
            userLastName: '',
            userGender: '',
            userEmail: '',
            userPhone: '',
            checkBoxIsSelected: false,
            emailErr:false,
            phoneErr:false
        }
        this.submitRegister = this.submitRegister.bind(this);
    }
   componentWillReceiveProps(nextProps){
    if(nextProps.pageNumber==2){
        this.setState({userEmail:this.props.registerStore.register.email
            ,userGender:this.props.registerStore.register.gender,userPhone:this.props.registerStore.register.tel})
    }
   }
    componentDidMount(){
        //this.props.registerStore.register.tel = {...this.props.registerStore.register.tel};
        this.setState({userEmail:this.props.registerStore.register.email
            ,userGender:this.props.registerStore.register.gender,userPhone:this.props.registerStore.register.tel})
    }
    isShowSumbit(){
        if(''!=this.props.registerStore.register.name && ''!=this.props.registerStore.register.surname
            && ''!=this.state.userGender && ''!=this.state.userEmail
            && ''!=this.state.userPhone && this.state.checkBoxIsSelected
            && !this.state.emailErr && !this.state.telErr){
                return true;
        }else{
            return false;
        }
    }
    submitRegister(){
        this.props.registerStore.register.email = this.state.userEmail;
        this.props.registerStore.register.gender = this.state.userGender;
        this.props.registerStore.register.tel = this.state.userPhone;
        this.props.onSubmitRegister2Press();
    }
    
    render(){
        return(
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                automaticallyAdjustContentInsets={false}
                //keyboardShouldPersistTaps='always'
                enableOnAndroid={true}
                contentContainerStyle={{flexGrow:1,}}
                //style={{flex: 1}}
                scrollEnabled={true}
            >
                
            <View style={styles.registerStep1ContainerStyle}>
                <View style={styles.registerDirectionContainerStyle}>
                    <Text style={styles.registerTitleTextStyle}>ข้อมูลส่วนตัว</Text>
                    <Text style={styles.directionTextStyle}>กรุณากอรกข้อมูลส่วนตัวให้ครบถ้วน เพื่อสิทธิประโยชน์ของสมาชิก</Text>
                </View>
                <View style={styles.userDetailContainerStyle}>
                    <TextInputIcon
                        value={this.props.registerStore.register.name}
                        onChangeText={(userFirstName)=>this.props.registerStore.register.name=userFirstName}
                        leftLabelText='ชื่อ'
                        iconUri={require('./../source/icons/iconAvatar.png')}
                        containerStyle={styles.inputContainerStyle}
                        secondFlex={secondFlex}
                        thirdFlex={thirdFlex}
                        editable={false}
                    />
                    <TextInputIcon
                        value={this.props.registerStore.register.surname}
                        onChangeText={(userLastName)=>this.props.registerStore.register.surname=userLastName}
                        leftLabelText='นามสกุล'
                        iconUri={require('./../source/icons/iconAvatar.png')}
                        containerStyle={styles.inputContainerStyle}
                        secondFlex={secondFlex}
                        thirdFlex={thirdFlex}
                        editable={false}
                    />
                    <TextInputIcon
                        genderValue={this.state.userGender}
                        onSubmitEditing={(userGender)=>{this.setState({userGender:userGender})}}
                        leftLabelText='เพศ'
                        iconUri={require('./../source/icons/iconGender.png')}
                        containerStyle={styles.inputContainerStyle}
                        secondFlex={secondFlex}
                        thirdFlex={thirdFlex}
                        inputType='selector'
                    />
                    <TextInputIcon
                        value={this.state.userEmail}
                        onChangeText={(userEmail)=>this.setState({userEmail:userEmail})}
                        leftLabelText='อีเมล'
                        iconUri={require('./../source/icons/iconMail.png')}
                        containerStyle={!this.state.emailErr ?styles.inputContainerStyle:styles.inputContainerErrStyle}
                        secondFlex={secondFlex}
                        thirdFlex={thirdFlex}
                        keyboardType='email-address'
                        onBlur={()=>{
                            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(re.test(this.state.userEmail)){
                                this.setState({emailErr:false})
                            }else{
                                this.setState({emailErr:true})
                            }
                        }}
                        editable={!this.props.firstLogon}
                    />
                     {this.state.emailErr && <Text style={styles.errorMsg}>Email ไม่ถูกต้อง</Text>}
                    <TextInputIcon
                        value={this.state.userPhone}
                        onChangeText={(userPhone)=>this.setState({userPhone:userPhone})}
                        leftLabelText='โทรศัพท์'
                        iconUri={require('./../source/icons/iconPhone.png')}
                        containerStyle={!this.state.telErr ?styles.inputContainerStyle:styles.inputContainerErrStyle}
                        secondFlex={secondFlex}
                        thirdFlex={thirdFlex}
                        keyboardType='phone-pad'
                        returnKeyType='done'
                        onBlur={()=>{
                            if(this.state.userPhone.length!=10 && this.state.userPhone.length!=12){
                                this.setState({telErr:true})
                            }else{
                                this.setState({telErr:false})
                            }
                        }}
                        blurOnSubmit={true}
                        editable={!this.props.firstLogon}
                    />
                    {this.state.telErr && <Text style={styles.errorMsg}>เบอร์โทรศัพท์ ไม่ถูกต้อง</Text>}
                    <View style={{flexDirection: 'row',paddingTop:10}}>
                    <CheckBoxes
                        checkBoxTitleText='ยอบรับ เงื่อนไขการให้บริการ'
                        checked={this.state.checkBoxIsSelected}
                        checkedColor='#81c5e3'
                        uncheckedColor='#81c5e3'
                        checkBoxTextStyle={styles.checkBoxTextStyle}
                        textUnderLine={true}
                        onIconPress={()=>this.setState({checkBoxIsSelected: !this.state.checkBoxIsSelected})}
                        onHyperLinkPress={this.props.onHyperLinkPress}
                    />
                    </View>
                    <View style={{flexDirection: 'row',padding:5}}>
                    <Text style={styles.directionTextStyle}>กรณีพบข้อมูลไม่ถูกต้อง</Text>
                    <TouchableOpacity onPress={()=>this.props.openLeavingDialog()}>
                        <Text style={[styles.textUnderLineStyle]}>ติดต่อเรา</Text>
                    </TouchableOpacity>
                    </View>
                    {this.isShowSumbit() && <View style={styles.submitButtonContainerStyle}>
                        <MainSubmitButton
                            buttonTitleText='ยืนยันข้อมูล'
                            onPress={this.submitRegister}
                        />
                    </View>}
                </View>
            </View>
            </KeyboardAwareScrollView>
        )
    }
}

const secondFlex = 0.3,thirdFlex = 0.9

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
    checkBoxTextStyle:{
        color: "#0194d2",
        letterSpacing: 0,
        fontSize: responsiveFontSize(2.64),
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
    textUnderLineStyle:{
        textDecorationLine: 'underline',
        textDecorationColor: '#0194d2',
        textDecorationStyle: 'solid',
        color:'#0194d2',
        fontSize: responsiveFontSize(2.4)
    }

}

export {RegisterStep2}