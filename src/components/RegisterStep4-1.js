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
class RegisterStep4_1 extends Component{

    constructor(props){
        super(props)
        this.state={
            telErr:false,
            tel:""
        }
        this.onSubmitRegister4_1Press = this.onSubmitRegister4_1Press.bind(this);
    }
    onSubmitRegister4_1Press(){
        this.props.registerStore.register.tel = this.state.tel;
        this.props.onSubmitRegister4_1Press();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.pageNumber==4){
            this.setState({tel:this.props.registerStore.register.tel})
        }
    }
    componentDidMount(){
        this.setState({tel: this.props.registerStore.register.tel})
      };
    render(){
        return(
            <View style={styles.registerStep1ContainerStyle}>
                <View style={styles.registerDirectionContainerStyle}>
                    <Text style={styles.registerTitleTextStyle}>ยืนยันตัวตนด้วยรหัส OTP</Text>
                    <Text style={styles.directionTextStyle}>กดรับรหัส OTP จากเบอร์โทรศัพท์ของคุณ</Text>
                </View>
                <View style={styles.userDetailContainerStyle}>
                {this.props.firstLogon &&
                    <View>
                        <TextInputIcon
                                value={this.state.tel}
                                onChangeText={(userPhone)=>this.setState({tel:userPhone})}
                                leftLabelText='โทรศัพท์'
                                iconUri={require('./../source/icons/iconPhone.png')}
                                containerStyle={!this.state.telErr ?styles.inputContainerStyle:styles.inputContainerErrStyle}
                                secondFlex={secondFlex}
                                thirdFlex={thirdFlex}
                                keyboardType='phone-pad'
                                returnKeyType='done'
                                onChangeText={(userPhone)=>{
                                    if(userPhone.length<10){
                                        this.setState({telErr:true,tel:userPhone})
                                    }else{
                                        this.setState({telErr:false,tel:userPhone})
                                    }
                                }}
                                blurOnSubmit={true}
                                maxLength={10}
                            />
                        {this.state.telErr && <Text style={styles.errorMsg}>เบอร์โทรศัพท์ของท่านไม่ถูกต้อง    </Text>}
                        </View>
                    }
                    <View style={styles.submitButtonContainerStyle}>
                        {!this.state.telErr ? <MainSubmitButton
                            buttonTitleText='รับรหัส OTP'
                            onPress={this.onSubmitRegister4_1Press}
                        />:null}
                    </View>
                </View>
            </View>
        )
    }
}

const secondFlex = 0.4,thirdFlex = 0.5

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
        marginTop: responsiveHeight(2),
        // justifyContent: 'center',
    },
    errorMsg:{
        fontSize:responsiveFontSize(2.2),
        color:"red",
        padding:2
    }

}

export {RegisterStep4_1}