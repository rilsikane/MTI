import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity,Linking} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PopupDialog,{ SlideAnimation }  from 'react-native-popup-dialog';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {TextInputIcon} from './../components/TextInputIcon';
import {Headers} from '../components/Headers';
import {postBasic} from '../api'
import {MainSubmitButton} from '../components/MainSubmitButton';
import Communications from 'react-native-communications';

import { observer, inject } from 'mobx-react';
import app from '../stores/app';
import Spinner from 'react-native-loading-spinner-overlay';

@inject('naviStore')
@observer
export default class ServiceScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            emailErr:false,telErr:false,
            name:'',surname:'',email:'',tel:'',isLoading:false
        }
        this.gotoService = this.gotoService.bind(this);
        this.onServicePress = this.onServicePress.bind(this);
        this.openLeavingContactPopup = this.openLeavingContactPopup.bind(this);
        this.callCenter = this.callCenter.bind(this);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    init(){
        
        this.setState({isLoading:true});
        setTimeout(()=>{
            this.props.naviStore.navigation = this.props.navigator;
            this.setState({isLoading:false});
        },1000)
       
    }
    renderServiceList(){
        let serviceList = [
            {
                iconUri: require('../source/icons/iconPhone01.png'),
                title: 'Call Center 1484'
            },
            {
                iconUri: require('../source/icons/iconSearchHospital01.png'),
                title: 'ค้นหาโรงพยาบาล'
            },
            {
                iconUri: require('../source/icons/iconWork01.png'),
                title: 'ค้นหาอู่และศูนย์'
            },
            // {
            //     iconUri: require('../source/icons/iconQuestion01.png'),
            //     title: 'คำถามที่พบบ่อย'
            // }
        ]

        return serviceList.map((data,i)=>
            <View style={{width:responsiveWidth(90)}} key={i}>
                <TouchableOpacity onPress={()=>this.onServicePress(i)} style={styles.serviceSectionStyle}>
                    <Image
                        source={data.iconUri}
                        resizeMode='contain'
                        style={styles.serviceIconStyle}
                    />
                    <Text style={styles.serviceTitleTextStyle}>{data.title}</Text>
                </TouchableOpacity>
                {i!=3&&
                <Image
                    source={require('../source/images/dotSectionHorizontal.png')}
                    resizeMode='contain'
                    style={styles.dotSectionImageStyle}
                />}
            </View>
        )
    }
    callCenter(){
        Communications.phonecall("1484", true);
    }

    onServicePress(index){
        if(index==0){
            this.callCenter();
        }else if(index==1){
            this.gotoService('mti.ServiceSearchHospitalScreen');
        }else if(index==2){
            this.gotoService('mti.ServiceSearchCorpCenterScreen');
        }else{
            this.gotoService('mti.QAndAScreen');
        }
    }

    gotoService(link){
        this.props.navigator.push({
            screen: link, // unique ID registered with Navigation.registerScreen
            passProps:{isMap:false},
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            animated: false, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
        })
    }

    openLeavingContactPopup(){
        this.leavingDialog.show();
    }

    async requestContact(){
        let param = {};
        param.name = this.state.name;
        param.surname = this.state.surname;
        param.email = this.state.email;
        param.tel = this.state.tel;

        let response = await postBasic("member/request",param);
        if(response){
            Alert.alert(
                '',
                'ท่านได้ฝากข้อมูลติดต่อกลับเรียบร้อยแล้ว',
                [
                {text: 'ตกลง', onPress: () =>{
                    this.leavingDialog.dismiss();
                    this.props.navigator.dismissModal({
                        animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                    });
                    setTimeout(()=>{
                        this.props.navigator.resetTo({
                            screen: 'mti.LoginScreen', // unique ID registered with Navigation.registerScreen
                            title: undefined, // navigation bar title of the pushed screen (optional)
                            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                            animated: true, // does the push have transition animation or does it happen immediately (optional)
                            animationType: 'slide-down',
                            backButtonTitle: undefined, // override the back button title (optional)
                            backButtonHidden: false, // hide the back button altogether (optional)
                            })
                    },500)
                  }
                }
                ]
            )
        }else{

        }
    }

    renderLeavingContactPopup(){
        return(
            <PopupDialog
                ref={(leavingDialog) => { this.leavingDialog = leavingDialog; }}
                width={responsiveWidth(90)}
                height={responsiveHeight(60)}
                dialogStyle={styles.popupContainerStyle}
                containerStyle={styles.popupLayoutContainerStyle}
            >
             <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                automaticallyAdjustContentInsets={false}
                //keyboardShouldPersistTaps='always'
                enableOnAndroid={true}
                contentContainerStyle={{flexGrow:1,}}
                //style={{flex: 1}}
                scrollEnabled={true}
                >
                    <TouchableOpacity onPress={()=> this.leavingDialog.dismiss()}>
                        <Image
                            source={require('./../source/icons/btnClose.png')}
                            style={styles.btnCloseImageStyle}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.popupTitleTextStyle}>ฝากข้อมูลติดต่อกลับ</Text>
                        <Text style={styles.popupDetailTextStyle}>กรุณากรอกข้อมูลของคุณและรอการติดต่อกลับ</Text>
                        <TextInputIcon
                            value={this.state.name}
                            onChangeText={(userFirstName)=>this.setState({name:userFirstName})}
                            leftLabelText='ชื่อ'
                            iconUri={require('./../source/icons/iconAvatar.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                        />
                        <TextInputIcon
                            value={this.state.surname}
                            onChangeText={(userLastName)=>this.setState({surname:userLastName})}
                            leftLabelText='นามสกุล'
                            iconUri={require('./../source/icons/iconAvatar.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                        />
                        <TextInputIcon
                            value={this.state.tel}
                            onChangeText={(userPhone)=>this.setState({tel:userPhone})}
                            leftLabelText='เบอร์โทรศัพท์'
                            iconUri={require('./../source/icons/iconPhone.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            keyboardType='phone-pad'
                            onBlur={()=>{
                                if(this.state.tel.length!=10 && this.state.tel.length!=12){
                                    this.setState({telErr:true})
                                }else{
                                    this.setState({telErr:false})
                                }
                            }}
                            blurOnSubmit={true}
                        />
                        {this.state.telErr && <Text style={styles.errorMsg}>เบอร์โทรศัพท์ของท่านไม่ถูกต้อง    </Text>}
                        <TextInputIcon
                            value={this.state.email}
                            onChangeText={(email)=>this.setState({email:email})}
                            leftLabelText='อีเมล'
                            iconUri={require('../source/icons/iconMail.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            keyboardType='email-address'
                            onBlur={()=>{
                                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                if(re.test(this.state.email)){
                                    this.setState({emailErr:false})
                                }else{
                                    this.setState({emailErr:true})
                                }
                            }}
                            blurOnSubmit={true}
                            returnKeyType = {"done"}
                            
                        />
                        {this.state.emailErr && <Text style={styles.errorMsg}>รูปแบบ E-mail ของท่านไม่ถูกต้อง</Text>}
                    </View>
                    {this.isShowSumbit() && <View style={styles.submitButtonContainerStyle}>
                        <MainSubmitButton
                            buttonTitleText='ตกลง'
                            onPress={()=>this.requestContact()}
                        />
                    </View>}
                </KeyboardAwareScrollView>
            </PopupDialog>
        )
    }

    isShowSumbit(){
        if(''!=this.state.name && ''!=this.state.surname
            && ''!=this.state.email
            && ''!=this.state.tel
            && !this.state.emailErr && !this.state.telErr){
                return true;
        }else{
            return false;
        }
    }

    render(){
        return (
            <View style={styles.serviceScreenContainerStyle}>
                <Headers
                    leftIconName='menu'
                    headerTitleText='บริการ'
                    rightIconName='iconBell'
                />
                <View style={styles.serviceContainerStyle}>
                    <TouchableOpacity onPress={()=>Linking.openURL('http://www.muangthaiinsurance.com/index_mti.html')} style={styles.topBannerImageContainerStyle}>
                        <Image
                            source={require('../source/images/serviceBannerImg01.png')}
                            style={styles.topBannerImageContainerStyle}
                        />
                    </TouchableOpacity>
                    <View style={styles.serviceListContainerStyle}>
                        {this.renderServiceList()}
                    </View>
                    <TouchableOpacity onPress={()=>Linking.openURL('http://www.muangthaiinsurance.com/index_mti.html')} style={styles.topBannerImageContainerStyle}>
                        <Image
                            source={require('../source/images/serviceBannerImg02.png')}
                            style={styles.topBannerImageContainerStyle}
                        />
                    </TouchableOpacity>
                </View>
                {this.renderLeavingContactPopup()}
                {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
            </View>
        )
    }
    onNavigatorEvent(event) {
    
        if (event.id === 'bottomTabSelected') {
            
            this.props.naviStore.navigation.popToRoot({
                animated: false, // does the popToRoot have transition animation or does it happen immediately (optional)
                animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
              });
            this.init();
        }
        if (event.id === 'willDisappear') {
         
        }
        if (event.id === 'didAppear') {
          //this.init();
        }
    }
}

const secondFlex = 0.3,thirdFlex = 0.9

const styles={
    serviceScreenContainerStyle:{
        flex: 1,
        backgroundColor:"#fff"
    },
    serviceContainerStyle:{
        flex: 1,
    },
    topBannerImageContainerStyle:{
        height: responsiveHeight(18.30),
        width: responsiveWidth(100),
    },
    serviceListContainerStyle:{
        flex: 1,
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
        justifyContent: 'center',
    },
    serviceSectionStyle:{
        flexDirection: 'row',
    },
    serviceIconStyle:{
        height: responsiveHeight(4.92),
        opacity: 0.7,
        flex: 0.2,
    },
    serviceTitleTextStyle:{
         
        fontSize: responsiveFontSize(2.8),
        letterSpacing: 0,
        color: "#1595d3",
        flex: 0.8,
        textAlignVertical: 'center',
    },
    dotSectionImageStyle:{
        width: '100%',
        opacity: 0.3,
        marginTop: responsiveHeight(2.5),
        marginBottom: responsiveHeight(2.5),
    },
    popupContainerStyle:{
        borderRadius: 3,
        padding: responsiveWidth(4),

    },
    popupLayoutContainerStyle:{
        justifyContent: 'flex-start',
        paddingTop: responsiveHeight(10)
    },
    btnCloseImageStyle:{
        height: responsiveHeight(2.81),
        alignSelf: 'flex-end'
    },
    popupTitleTextStyle:{
        fontSize: responsiveFontSize(3),
        color: '#1595d3',
        textAlign: 'center',
        marginTop: responsiveHeight(2.5),
        marginBottom: responsiveHeight(2),

    },
    popupDetailTextStyle:{
        fontSize: responsiveFontSize(2.2),
        color: '#919195',
        textAlign: 'center',
        marginLeft: responsiveWidth(8),
        marginRight: responsiveWidth(8),
    },
    popupRefTextStyle:{
        fontSize: responsiveFontSize(2.6),
        color: '#1595d3',
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    submitButtonContainerStyle:{
        marginLeft: responsiveWidth(2),
        marginRight: responsiveWidth(2),
        justifyContent: 'center',
        marginTop: responsiveHeight(2),

    },
    inputContainerStyle:{
        borderBottomColor: '#C4C4C4',
        height: responsiveHeight(8),
    },
}