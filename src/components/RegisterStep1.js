import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity,Animated,Keyboard,KeyboardAvoidingView} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {TextInputIcon} from './../components/TextInputIcon';
import {MainSubmitButton} from './../components/MainSubmitButton';
import moment from 'moment';
import localization from 'moment/locale/th'


class RegisterStep1 extends Component{

    constructor(props){
        super(props)
        moment.locale("th");
        this.state={
            userIdNumber: '',
            userFirstName: '',
            userLastName: '',
            userBirthDate: '',
            isDateTimePickerVisible: false,

        }
        this.focusNextField = this.focusNextField.bind(this); 
        this.inputs = {};
        this.imageHeight = new Animated.Value(responsiveHeight(20.51),);
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
        this.onSubmit = this.onSubmit.bind(this);
       
    }
    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
      }
    _showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true })
    }

    _hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false })
    }
    _handleDatePicked = (date) => {
        let dates = new Date(date)
        this.setState({
            userBirthDate: dates
        })
        this._hideDateTimePicker();
    }
    focusNextField(key){
        this.inputs[key].focus();
    }
    keyboardWillShow = (event) => {
        Animated.timing(this.imageHeight, {
          duration: event.duration,
          toValue: responsiveHeight(10.51),
        }).start();
      };
    
      keyboardWillHide = (event) => {
        Animated.timing(this.imageHeight, {
          duration: event.duration,
          toValue: responsiveHeight(20.51),
        }).start();
      };
    isShowSubmit(){
        if(this.state.userIdNumber!=''&&this.state.userFirstName!=''&&this.state.userLastName!=''
            &&this.state.userBirthDate!=''){
                return true;
        }else{
            return false;
        }
    }
    onSubmit(){
        let register = {};
        register.idcard = this.state.userIdNumber.replace(/\s/g, "");
        register.birthdate = moment(this.state.userBirthDate).format("YYYY-MM-DD");
        register.name = this.state.userFirstName;
        register.surname = this.state.userLastName;
        this.props.onSubmitRegister1Press(register);
    }
    

    render(){
        return(
            <KeyboardAvoidingView style={{flex:1}} behavior="padding">
                    <View style={styles.registerStep1ContainerStyle}>
                    
          
                        <Animated.Image
                            source={require('./../source/images/mascot.png')}
                            style={[styles.mascotImageStyle,{ height: this.imageHeight }]}
                            resizeMode='contain'
                        />
                        <View style={styles.registerDirectionContainerStyle}>
                            <Text style={styles.registerTitleTextStyle}>ยินดีต้อนรับเข้าสู่ เมืองไทย เฟรนด์ คลับ</Text>
                            <Text style={styles.directionTextStyle}>กรุณากรอกเลขที่บัตรประชาชน และ วันเกิด เพื่อทำการตรวจสอบข้อมูลสถานะของสมาชิก</Text>
                        </View>
                        <View style={styles.userDetailContainerStyle}>
                            <TextInputIcon
                                inputType="mask"
                                value={this.state.userIdNumber}
                                mask={"[000] [000000] [000] [0]"}
                                onChangeText={(userIdNumber)=>this.setState({userIdNumber})}
                                leftLabelText='เลขที่บัตรประชาชน'
                                iconUri={require('./../source/icons/iconAvatar.png')}
                                containerStyle={styles.inputContainerStyle}
                                secondFlex={secondFlex}
                                thirdFlex={thirdFlex}
                                keyboardType='numeric'
                                returnKeyType = {"next"}
                               
                            />
                            <TextInputIcon
                                value={this.state.userFirstName}
                                onChangeText={(userFirstName)=>this.setState({userFirstName})}
                                leftLabelText='ชื่อ'
                                iconUri={require('./../source/icons/iconAvatar.png')}
                                containerStyle={styles.inputContainerStyle}
                                secondFlex={secondFlex}
                                thirdFlex={thirdFlex}
                                returnKeyType = {"next"}
                                onSubmitEditing={() => {
                                    Keyboard.dismiss();
                                    this.focusNextField('userLastName');
                                }}
                               
                            />
                            <TextInputIcon
                                refs={ input => {
                                    this.inputs['userLastName'] = input;
                                 }}
                                value={this.state.userLastName}
                                onChangeText={(userLastName)=>this.setState({userLastName})}
                                leftLabelText='นามสกุล'
                                iconUri={require('./../source/icons/iconAvatar.png')}
                                containerStyle={styles.inputContainerStyle}
                                secondFlex={secondFlex}
                                thirdFlex={thirdFlex}
                                returnKeyType = {"next"}
                                onSubmitEditing={() => {
                                    Keyboard.dismiss();
                                    this.inputs['userLastName'].blur();
                                    setTimeout(()=>{
                                        this.setState({ isDateTimePickerVisible: true })
                                    },500)
                                }}
                            />

                            <TouchableOpacity  onPress={this._showDateTimePicker}>
                                <View pointerEvents={this.state.isDateTimePickerVisible ? 'auto' : 'none'}>
                                    <TextInputIcon
                                        value={""!=this.state.userBirthDate && moment(this.state.userBirthDate).locale("th",localization).format("DD MMMM YYYY")}
                                        leftLabelText='วันเกิด'
                                        iconUri={require('./../source/icons/iconBD.png')}
                                        containerStyle={styles.inputContainerStyle}
                                        editable={false}
                                        secondFlex={secondFlex}
                                        thirdFlex={thirdFlex}
                                    />
                                </View>
                            </TouchableOpacity>
                            {this.isShowSubmit() && <View style={styles.submitButtonContainerStyle}>
                                <MainSubmitButton
                                    buttonTitleText='ตรวจสอบข้อมูลสมาชิก'
                                    onPress={this.onSubmit}
                                />
                            </View>}
                            <DateTimePicker
                                titleIOS='วันเกิด'
                                titleStyle={styles.dateTitleTextStyle}
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this._handleDatePicked}
                                onCancel={this._hideDateTimePicker}
                            />
                        </View>
                  
           
                    </View>
                    </KeyboardAvoidingView>
         
        )
    }
}

const secondFlex = 0.4,thirdFlex = 0.5

const styles={
    registerStep1ContainerStyle:{
        flex: 1,

    },
    mascotImageStyle:{
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
        height: responsiveHeight(7)
    },
    submitButtonContainerStyle:{
        flex: 1,
        justifyContent: 'center',
        borderRadius: 3,
    },
    dateTitleTextStyle:{
        fontSize: responsiveFontSize(2.64),
        color: '#1595d3'
    }

}

export {RegisterStep1}