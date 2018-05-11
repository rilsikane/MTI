import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity,Alert,FlatList} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Pages } from 'react-native-pages';
import PopupDialog,{ SlideAnimation }  from 'react-native-popup-dialog';

import LifeStyleScreen from './LifeStyleScreen';
import {TextInputIcon} from './../components/TextInputIcon';
import {MainSubmitButton} from './../components/MainSubmitButton';
import {PageIndicators} from './../components/PageIndicators';
import {Headers} from './../components/Headers';
import {RegisterStep1} from './../components/RegisterStep1';
import {RegisterStep2} from './../components/RegisterStep2';
import {RegisterStep3} from './../components/RegisterStep3';
import {RegisterStep4_1} from './../components/RegisterStep4-1';
import {RegisterStep4_2} from './../components/RegisterStep4-2';
import {postBasic,put} from '../api'
import { observer, inject } from 'mobx-react';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import app from '../stores/app';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {CheckBoxes} from './../components/CheckBoxes';

@inject('registerStore')
@observer
export default class RegisterScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            pageNumber: 1,
            enable:false,
            isLoading:false,
            firstLogon:false,
            emailErr:false,telErr:false,
            name:'',surname:'',email:'',tel:'',
            agreementCheckBoxSelected: false,
        }
        if(!this.props.registerStore.register){
            this.props.registerStore.register = {};
        }
        this.updateRef = this.updateRef.bind(this);
        this.gotoWelcome = this.gotoWelcome.bind(this);
        this.app = app;
        this.requestContact = this.requestContact.bind(this);
        this.openLeavingContactPopup = this.openLeavingContactPopup.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }
    async componentDidMount(){
        if(this.props.user){
            this.setState({isLoading:true})
            this.props.registerStore.register = {...this.props.user};
            setTimeout(()=>{
                this.setState({pageNumber:2,firstLogon:true});
                this._pages.scrollToPage(1);
                this.setState({isLoading:false});
            },2500)
         
        }
    }

    updateRef(ref) {
        this._pages = ref;
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
                'ฝากข้อมูลติดต่อกลับเรียบร้อย',
                [
                {text: 'ตกลง', onPress: () =>{
                    this.leavingDialog.dismiss();
                    setTimeout(()=>{
                        this.props.navigator.dismissModal({
                            animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                        });
                    },50)
                    setTimeout(()=>{
                        this.app.first();
                    },120)
                    
                  }
                }
                ]
            )
        }else{

        }
    }

    renderPopup(){
        return(
            <PopupDialog
                ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                dialogAnimation={slideAnimation}
                width={responsiveWidth(90.15)}
                height={responsiveHeight(58.05)}
                dialogStyle={styles.popupContainerStyle}
            >
                <View>
                    <TouchableOpacity onPress={()=> this.popupDialog.dismiss()}>
                        <Image
                            source={require('./../source/icons/btnClose.png')}
                            style={styles.btnCloseImageStyle}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <Image
                        source={require('./../source/images/mascot.png')}
                        style={styles.mascotImageStyle}
                        resizeMode='contain'
                    />
                    <View>
                        <Text style={styles.popupTitleTextStyle}>ขออภัยค่ะ ไม่พบข้อมูลสมาชิกของคุณ</Text>
                        <Text style={styles.popupDetailTextStyle}>กรุณาตรวจสอบข้อมูลของคุณให้ถูกต้องหรือสอบถามข้อมูลสมาชิกเพิ่มเติมได้ที่</Text>
                        <TouchableOpacity>
                            <Text style={styles.popupRefTextStyle}>www.mticonnect.com/Contact/Information</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.submitButtonContainerStyle}>
                        <MainSubmitButton
                            buttonTitleText='เข้าใช้งานโดยไม่เป็นสมาชิก'
                            onPress={this.gotoWelcome}
                        />
                    </View>
                </View>
            </PopupDialog>
        )
    }
    openLeavingContactPopup(){
        this.setState({name:this.props.registerStore.register.name,surname:this.props.registerStore.register.surname})
        this.leavingDialog.show();
    }
    renderLeavingContactPopup(){
        return(
            <PopupDialog
                ref={(leavingDialog) => { this.leavingDialog = leavingDialog; }}
                width={responsiveWidth(90)}
                height={responsiveHeight(75)}
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
                            onChangeText={(userPhone)=>{
                                if(userPhone.length<10){
                                    this.setState({telErr:true,tel:userPhone})
                                }else{
                                    this.setState({telErr:false,tel:userPhone})
                                }
                            }}
                            leftLabelText='เบอร์โทรศัพท์'
                            iconUri={require('./../source/icons/iconPhone.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            keyboardType='phone-pad'
                            blurOnSubmit={true}
                            maxLength={10}
                        />
                        {this.state.telErr && <Text style={styles.errorMsg}>เบอร์โทรศัพท์ ไม่ถูกต้อง</Text>}
                        <TextInputIcon
                            value={this.state.email}
                            onChangeText={(email)=>this.setState({email:email})}
                            leftLabelText='อีเมล'
                            iconUri={require('../source/icons/iconMail.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            keyboardType='email-address'
                            onChangeText={(email)=>{
                                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                if(re.test(email)){
                                    this.setState({emailErr:false,email:email})
                                }else{
                                    this.setState({emailErr:true,email:email})
                                }
                            }}
                            blurOnSubmit={true}
                            returnKeyType = {"done"}
                            
                        />
                        {this.state.emailErr && <Text style={styles.errorMsg}>Email ไม่ถูกต้อง</Text>}
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

    renderAgreementPopup(){

        return(
            <PopupDialog
                ref={(agreementDialog) => { this.agreementDialog = agreementDialog; }}
                width={responsiveWidth(90)}
                height={responsiveHeight(70)}
                dialogStyle={styles.popupContainerStyle}
                containerStyle={styles.popupLayoutContainerStyle}
            >
                <TouchableOpacity onPress={()=> this.agreementDialog.dismiss()}>
                    <Image
                        source={require('./../source/icons/btnClose.png')}
                        style={styles.btnCloseImageStyle}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                <View style={{flex: 1,}}>
                    <Text style={styles.popupTitleTextStyle}>ข้อตกลงและเงื่อนไข</Text>
                    <Text style={styles.popupAgreementSubTitleTextStyle}>ของสมาชิก Muang Thai Friends Club (เมืองไทย เฟรนด์ส คลับ)</Text>
                    <ScrollView style={{flex: 1,backgroundColor: '#fafafa',padding: responsiveWidth(2.5)}}>
                        <Text style={styles.popupAgreementDetailTextStyle}>โปรดอ่านข้อตกลงและเงื่อนไขการเป็นสมาชิก Muang Thai Friends Club (เมืองไทย เฟรนด์ส คลับ) อย่างระมัดระวัง  เนื่องจากข้อตกลงและเงื่อนไขนี้ระบุถึงข้อมูลสำคัญเกี่ยวกับสิทธิและหน้าที่ต่างๆของท่าน  รวมถึงข้อจำกัดและข้อยกเว้นต่างๆ ซึ่งมีผลใช้บังคับการธุรกรรมและกิจกรรมทั้งหมด{'\n'}</Text>
                        <Text style={styles.popupAgreementDetailTextStyle}>การที่ท่านสมัครใช้บริการ  ไม่ว่าในลักษณะใดๆ หรือโดยการเลือก “ตกลง”  เพื่อยอมรับตามข้อตกลงและเงื่อนไขนี้  ถือว่าท่านได้รับทราบและรับรู้ถึงเนื้อหาของข้อตกลงและเงื่อนไขนี้โดยครบถ้วนสมบูรณ์แล้ว  และตกลงที่จะผูกพันโดยข้อตกลงและเงื่อนไขนี้ด้วย  รวมถึงกฎระเบียบ นโยบายและมาตรการต่างๆที่ Muang Thai Friends Club (เมืองไทย เฟรนด์ส คลับ)ที่จัดการจาก Muang Thai Friends Club (เมืองไทย เฟรนด์ส คลับ) อาจประกาศบนเว็บไซต์และแอปพลิเคชันเป็นครั้งคราว  ซึ่งการประกาศดังกล่าวถือเป็นส่วนหนึ่งของข้อตกลงและเงื่อนไขโดยการอ้างอิง และMuang Thai Friends Club (เมืองไทย เฟรนด์ส คลับ) อาจแก้ไขประกาศดังกล่าวได้เป็นครั้งคราวโดยไม่จำเป็นต้องแจ้งให้ทราบล่วงหน้า  นอกจากนี้สิทธิประโยชน์/บริการบางอย่างที่เสนอให้กับสมาชิกได้ใช้งานผ่านเว็บไซต์หรือโปรแกรม อาจอยู่ภายใต้ข้อบังคับของข้อตกลงและเงื่อนไขเฉพาะเพิ่มเติมซึ่งการใช้สิทธิประโยชน์/บริการของท่านจะต้องอยู่ภายใต้บังคับของข้อตกลงและเงื่อนไขเพิ่มเติมดังกล่าวด้วย  โดยถือเป็นส่วนหนึ่งของข้อตกลงและเงื่อนไขนี้โดยการอ้างอิง  นอกจากนี้ท่านตกลงว่าธุรกรรมอิเล็กทรอนิกส์/อินเตอร์เน็ต (Electronic/internet transactions) ที่ได้มีการประมวลผลและดำเนินการจนเสร็จสิ้นแล้ว  โดยผ่านทางเว็บไซต์หรือโปรแกรมนี้  มีผลบังคับใช้ได้อย่างสมบูรณ์ตามกฏหมายและผูกพันคู่สัญญาตามพระราชบัญญัติว่าด้วยธุรกรรมทางอิเล็กทรอนิกส์ พุทธศักราช 2544 ของประเทศไทย{'\n'}</Text>
                        <FlatList
                            data={agreements}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderAgreements}
                        />
                    </ScrollView>
                </View>
                {/* <CheckBoxes
                    checkBoxTitleText='ยอบรับ เงื่อนไขการให้บริการ'
                    checked={this.state.agreementCheckBoxSelected}
                    checkedColor='#81c5e3'
                    uncheckedColor='#81c5e3'
                    checkBoxTextStyle={styles.checkBoxTextStyle}
                    textUnderLine={true}
                    onIconPress={()=>this.setState({agreementCheckBoxSelected: !this.state.agreementCheckBoxSelected})}
                    containerStyle={{justifyContent: 'center',marginTop: responsiveHeight(2)}}
                />

                <View style={styles.submitButtonContainerStyle}>
                    {this.state.agreementCheckBoxSelected&&
                    <MainSubmitButton
                        buttonTitleText='ยืนยันข้อมูล'
                        onPress={()=>this.agreementDialog.dismiss()}
                    />}
                </View> */}
            </PopupDialog>
        )
    }

    
    _renderAgreements = ({item,index}) => (
        <View>
            <Text style={[styles.popupAgreementSubTitleTextStyle,{textAlign: 'left'}]}>{`${++index}.   ${item.title}`}</Text>
            {item.titleDesc&&<Text style={[styles.popupAgreementDetailTextStyle,{marginLeft: responsiveWidth(3)}]}>{`${item.titleDesc}`}</Text>}      
            <FlatList
                data={item.subTitle}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderSubTitle}
            />
        </View>
    );

    _keyExtractor = (item, index) => index.toString();

    _renderSubTitle=({item,index})=>(
        <Text style={[styles.popupAgreementDetailTextStyle,{marginLeft: responsiveWidth(2)}]}>{`${item}`}</Text>
    )

    async _onSubmitRegister1Press(param){
        if (this._pages) {
            this.setState({isLoading:true})
            let response = await postBasic("mti/checkinfo",param,true);
            this.setState({isLoading:false});
            if(response){
                if(!response.message && "checkMember"!=response.data_source){
                    this.props.registerStore.register = {...response};
                    this.props.registerStore.register.idcard = param.idcard;
                    this.props.registerStore.register.birthdate = param.birthdate;
                    this.setState({enable:true});
                    setTimeout(()=>{
                        this.setState({enable:true,pageNumber:1});
                        this._pages.scrollToPage(1);
                        this.setState({enable:false});
                    },100);
                    
                }else{
                    this.setState({isLoading:false});
                    if("checkMember"==response.data_source){
                        setTimeout(()=>{
                        Alert.alert(
                            ' ',
                            'ท่านเป็นสมาชิกของเราอยู่แล้วรบกวนlog in เพื่อเข้าระบบ สอบถามเพิ่มเติมติดต่อ 1484',
                            [
                            {text: 'ตกลง', onPress: () =>{
                               
                                this.app.first();
                               
                            }
                            }
                            ]
                        )
                        },500)
                    }
                }
            }else{
                this.props.registerStore.register = {...param};
                setTimeout(()=>{
                this.props.navigator.showModal({
                    screen: 'mti.NoRegisterDataScreen', // unique ID registered with Navigation.registerScreen
                    title: undefined, // navigation bar title of the pushed screen (optional)
                    titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                    passProps: {navigator:this.props.navigator}, // Object that will be passed as props to the pushed screen (optional)
                    animated: true, // does the push have transition animation or does it happen immediately (optional)
                    backButtonTitle: undefined, // override the back button title (optional)
                    backButtonHidden: false, // hide the back button altogether (optional)
                    
                })
                },500)
            }
        }
    }

    async _onSubmitRegister2Press(){
        if (this._pages) {
            let param = {};
            param.mobile_no = this.props.registerStore.register.tel;
            param.email = this.props.registerStore.register.email;
            //this.setState({isLoading:true})
            if(!this.state.firstLogon){
            let response = await postBasic("mti/checktelephone",param);
            //this.setState({isLoading:false});
                if(response){
                    //this.setState({isLoading:true})
                    let response2 = await postBasic("mti/checkemail",param);
                    //this.setState({isLoading:false});
                    if(response2){
                        this.setState({isLoading:false});
                        this.props.registerStore.register.username = this.props.registerStore.register.tel;
                        this.setState({enable:true});
                        setTimeout(()=>{
                            this.setState({enable:true,pageNumber:2});
                            this._pages.scrollToPage(2);
                            this.setState({enable:false});
                        },100)
                       
                        
                    }
                }else{
                    this.setState({isLoading:false});
                }
            }else{
                this.setState({enable:true,pageNumber:3});
                this._pages.scrollToPage(3);
                this.setState({enable:false});
            }
           
        }
    }

    async _onSubmitRegister3Press(){
        if (this._pages) {
            this.setState({enable:true,pageNumber:4});
            this._pages.scrollToPage(3);
            this.setState({enable:false});
        }
    }

   async _onSubmitRegister4_1Press(){
        if (this._pages) {
            this.setState({isLoading:true})
            let param = {};
            param.mobile_no = this.props.registerStore.register.tel;
            let response = await postBasic("otp/request",param);
            if(response){
                this.setState({isLoading:false});
                if(!response.message){
                    this.props.registerStore.register.refcode = response.refcode;
                    this.setState({enable:true,pageNumber:4});
                    setTimeout(()=>{
                        this._pages.scrollToPage(4);
                    },100)
                    this.setState({enable:false});
                }else{
                    Alert.alert(
                        ' ',
                        response.message,
                        [
                        {text: 'OK', onPress: () => console.log('OK Pressed!')},
                        ]
                    )
                }
            }
            
        }
    }

    async _onSubmitRegister4_2Press(otp){
        this.setState({isLoading:false});
        let param = {};
        param.refcode = this.props.registerStore.register.refcode;
        param.otp = otp;
        //this.setState({isLoading:true})
        let response = await postBasic("otp/check",param);
        this.setState({isLoading:false});
        if(response){
            if(!response.message){
               if(response.status=='ok'){

                this.setState({isLoading:true})
                    let param2 = this.props.registerStore.register;
                    let response2 = {};
                    if(!this.state.firstLogon){
                        response2 = await postBasic("member",param2);
                    }else{
                        response2 = await put("me/profile",param2);
                    }
                    this.setState({isLoading:false});
                    if(response2){
                        if(!response2.message){
                            this.setState({isLoading:false});
                            this.props.navigator.resetTo({
                                screen: 'mti.WelcomeScreen', // unique ID registered with Navigation.registerScreen
                                title: undefined, // navigation bar title of the pushed screen (optional)
                                passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
                                animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
                                animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
                                navigatorStyle: {
                                    drawUnderStatusBar: true,
                                    statusBarColor: 'transparent',
                                    tabBarHidden: true,
                                }, // override the navigator style for the pushed screen (optional)
                                navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                              });
                        }else{
                            this.setState({isLoading:false});
                            Alert.alert(
                                ' ',
                                response.message,
                                [
                                {text: 'OK', onPress: () => console.log('OK Pressed!')},
                                ]
                            )
                        }
                    }
                
                }
            }else{
                this.setState({isLoading:false});
                Alert.alert(
                    ' ',
                    response.message,
                    [
                    {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    ]
                )
            }
        }
        this.setState({isLoading:false});
    }

    async _onRequestNewOtpButtonPress(){
            let param = {};
            param.mobile_no = this.props.registerStore.register.tel;
            this.setState({isLoading:true})
            let response = await postBasic("otp/request",param);
            this.setState({isLoading:false});
            if(response){
                this.setState({isLoading:false});
                if(!response.message){
                    setTimeout(()=>{Alert.alert(
                        ' ',
                        `ส่ง OTP ไปยังหมายเลข ${ this.props.registerStore.register.tel} เรียบร้อยแล้ว`,
                        [
                        {text: 'OK', onPress: () => console.log('OK Pressed!')},
                        ]
                    )},150)
                    this.props.registerStore.register.refcode = response.refcode;
                }
            }
    }

    onScrollEnd(index) {
        if(index<5&&index!=3){
            this.setState({pageNumber: index+1})
        }
      
    }
    gotoWelcome(){

        this.props.navigator.resetTo({
			screen: 'mti.WelcomeScreen', // unique ID registered with Navigation.registerScreen
			title: undefined, // navigation bar title of the pushed screen (optional)
			titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
			passProps: {}, // Object that will be passed as props to the pushed screen (optional)
			animated: true, // does the push have transition animation or does it happen immediately (optional)
			backButtonTitle: undefined, // override the back button title (optional)
			backButtonHidden: false, // hide the back button altogether (optional)
		});
    }

    onCancel(){
        console.log(this.state.pageNumber);
        if(this.state.pageNumber==1){
            if(this.props.fromGuest){
                this.app.first();
            }else{
               this.app.first();
            }
        }else{
            if(this.state.pageNumber==2 && this.props.user){
                this.props.registerStore.register = {};
                this.app.first();
            }else{
                this.setState({enable:true});
                this._pages.scrollToPage(this.state.pageNumber-2);
                this.setState({enable:false,pageNumber:this.state.pageNumber-1});
            }
        }

    }

    render(){
        return(
            <View style={styles.registerScreenContainerStyle}>
                <Headers
                    leftIconName='cancel'
                    headerTitleText='ลงทะเบียนสมาชิก'
                    cancel={this.onCancel}
                    cancelTxt={this.state.pageNumber==1?'ยกเลิก':'กลับ'}
                    //rightIconName='iconBell'
                />
                <PageIndicators
                    pageNumber={this.state.pageNumber}
                />
                {this.props.registerStore.register && <Pages
                    ref={this.updateRef} 
                    indicatorPosition='none'
                    onScrollEnd={this.onScrollEnd.bind(this)}
                    isDragging={false} 
                    scrollEnabled={this.state.enable}
                >
                    <RegisterStep1
                        onSubmitRegister1Press={this._onSubmitRegister1Press.bind(this)}
                    />
                    <RegisterStep2 firstLogon={this.state.firstLogon} pageNumber={this.state.pageNumber}
                        onSubmitRegister2Press={this._onSubmitRegister2Press.bind(this)} 
                        openLeavingDialog={this.openLeavingContactPopup} 
                        closeLeavingDialog={()=>this.leavingDialog.close()}
                        onHyperLinkPress={()=>this.agreementDialog.show()}
                    />     
                    <RegisterStep3
                        onSubmitRegister3Press={this._onSubmitRegister3Press.bind(this)}
                    />
                    <RegisterStep4_1 firstLogon={this.state.firstLogon}
                        onSubmitRegister4_1Press={this._onSubmitRegister4_1Press.bind(this)}
                    />
                    <RegisterStep4_2
                        onSubmitRegister4_2Press={this._onSubmitRegister4_2Press.bind(this)}
                        onRequestNewOtpButtonPress={this._onRequestNewOtpButtonPress.bind(this)}
                    />
                        
                </Pages>}
                       
                {this.renderLeavingContactPopup()}
                {this.renderPopup()}
                {this.renderAgreementPopup()}
                {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
            </View>
            
        )
    }
}

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
})

const secondFlex = 0.3,thirdFlex = 0.9

const styles={
    registerScreenContainerStyle:{
        flex: 1,
    },
    popupContainerStyle:{
        borderRadius: 3,
        padding: responsiveWidth(4),

    },
    popupLayoutContainerStyle:{
        justifyContent: 'flex-start',
        paddingTop: responsiveHeight(10),
        paddingBottom: responsiveHeight(10)
    },
    btnCloseImageStyle:{
        height: responsiveHeight(2.81),
        alignSelf: 'flex-end'
    },
    mascotImageStyle:{
        height: responsiveHeight(20.51),
        alignSelf: 'center'
    },
    popupTitleTextStyle:{
        fontSize: responsiveFontSize(3),
        color: '#1595d3',
        textAlign: 'center',
        marginTop: responsiveHeight(2.5),
        marginBottom: responsiveHeight(2),

    },
    popupAgreementSubTitleTextStyle:{
        fontSize: responsiveFontSize(2.1),
        color: '#1595d3',
        textAlign: 'center',
    },
    popupSubTitleTextStyle:{
        fontSize: responsiveFontSize(2.2),
        color: '#1595d3',
        textAlign: 'center',
    },
    popupAgreementDetailTextStyle:{
        fontSize: responsiveFontSize(2.1),
        color: '#919195',
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
        height: responsiveHeight(8),
    },
    inputContainerStyle:{
        borderBottomColor: '#C4C4C4',
        height: responsiveHeight(8),
    },
    checkBoxTextStyle:{
        color: "#0194d2",
        letterSpacing: 0,
        fontSize: responsiveFontSize(2.64),
    },
    errorMsg:{
        fontSize:responsiveFontSize(2.2),
        color:"red",
        padding:2
    }
}

export const agreements=[
    {
        title: 'นิยามศัพท์',
        subTitle: [
            '1.1   “สัญญา” (Agreement) หรือ “ข้อตกลงและเงื่อนไข”\n (Terms and Conditions) หมายถึงข้อตกลงและเงื่อนไขนี้',
            '1.2   “โฆษณา” (Advertising) หรือ“การโฆษณา”  (Advertising) หมายถึง  โฆษณาที่สร้างโดยผู้สนับสนุนเพื่อส่งเสริมการขายหรือเพื่อการตลาดสินค้าหรือบริการของผู้สนับสนุน  โดยผ่านเว็บไซต์หรือโปรแกรม  โดยที่ไม่มีการเสนอแลกสินค้าหรือบริการ(Redemption) แก่ผู้ใช้งาน',
            '1.3   “โปรแกรม” (Application) หมายถึง โปรแกรมต่างๆบนระบบใดๆ  รวมถึงแต่ไม่จำกัดเพียงระบบปฏิบัติการแอนดรอยด์(Android) หรือระบบปฏิบัติการอื่นๆที่ Muang Thai Friends Club อาจพัฒนาขึ้นในอนาคต  สำหรับผู้ใช้งาน  ใช้เพื่อเข้าถึงการบริการผ่านอุปกรณ์พกพา (Mobile devices) ที่เชื่อมต่อกับเว็บไซต์หรือระบบ',
            '1.4   “Muang Thai Friends Club App” หมายถึง  แอปพลิเคชันที่มีแคมเปญหลากหลายให้ผู้ใช้งาน ใช้งานใน   แอปพลิเคชัน Muang Thai Friends Club เท่านั้น',
            '1.5   “แคมเปญ” (Campaign) หมายถึงกิจกรรมส่งเสริมที่ผู้สนับสนุนประกาศลงบนเว็บไซต์ หรือโปรแกรมสำหรับผู้ใช้งานรับสิทธิภายในระยะเวลาที่ผู้สนับสนุนกำหนดภายใต้ข้อตกลงและเงื่อนไขนี้',
            '1.6   “ผู้สนับสนุน” (Sponsor) หมายถึง  นิติบุคคลหรือบุคคลธรรมดาที่เป็นผู้สร้างและประกาศแคมเปญ โฆษณา หรือกิจกรรมทางการตลาดใดๆ  เพื่อส่งเสริมสินค้าหรือธุรกิจของผู้สนับสนุนบนเว็บไซต์  หรือโปรแกรมสำหรับผู้ใช้งานรับสิทธิ  และตกลงและยอมรับที่จะส่งมอบสินค้า บริการ คูปองอิเล็กทรอนิกส์ (E-Coupon) เป็นต้น ',
            '1.7   “ระบบ” (System)  หมายถึง  ระบบ Muang Thai Friends Club Application   รวมถึงฐานและการทำงานของเว็บไซต์  และการทำงานของแอปพลิเคชัน',
            '1.8   “ธุรกรรม” (Transaction)  หมายถึง  ธุรกรรมการรับรางวัลระหว่างผู้ใช้งานและผู้สนับสนุนโดยผ่านระบบ',
            '1.9   “ผู้ใช้งาน” (User)  หมายถึง  ท่านซึ่งผู้ที่เข้าชมและใช้งานบนแอปพลิเคชัน Muang Thai Friends Club บนอุปกรณ์พกพา\n',
        ],            
    },
    {
        title: 'บททั่วไป',
        subTitle: [
            '2.1   เอกสารนี้เป็นสัญญาตามกฎหมายระหว่างผู้ใช้งานกับ Muang Thai Friends Club Application   ',
            '2.2   บรรดาเนื้อหาทั้งหมดที่ผู้สนับสนุนประกาศบนเว็บไซต์หรือโปรแกรมจะเป็นความรับผิดชอบโดยตรงของผู้สนับสนุนแต่เพียงผู้เดียว  โดยผู้ใช้งานตกลงว่าเนื้อหาทั้งหมดที่ผู้ใช้งานเข้าถึงได้โดยการใช้บริการนั้น  ถือเป็นความเสี่ยงภัยของผู้ใช้งานเอง  และผู้ใช้งานจะต้องรับผิดชอบในความเสียหายหรือสูญหายใดๆที่เกิดขึ้นกับผู้ใช้งานหรือบุคคลอื่นอันเนื่องมาจากเนื้อหาดังกล่าว  อนึ่ง  เพื่อวัตถุประสงค์ของข้อตกลงและเงื่อนไขนี้คำว่า “เนื้อหา” ให้รวมถึงแต่ไม่จำกัดเพียงข้อมูลเกี่ยวกับสถานที่อยู่  วีดีโอ  ข้อความเสียง  ข้อวิจารณ์  ข้อมูล  ข้อความ  รูปภาพ  โปรแกรมต่างๆ  ที่ใช้กับคอมพิวเตอร์  สคริปท์  กราฟฟิก  และสิ่งที่ใช้ระหว่างกันอื่นใดที่   Muang Thai Friends Club Application   เป็นผู้สร้างขึ้น  จัดหา  หรือทำให้เข้าถึงได้ในหรือผ่านทางบริการ',
            '2.3   Muang Thai Friends Club Application   อาจจัดให้มีการบริการแก่ผู้ใช้งานโดยผ่านทางเฟสบุ๊คโปรแกรม  หรือโดยช่องทางอื่นใด  ในกรณีที่เป็นการใช้บริการโดยผ่านเว็บไซต์หรือโปรแกรมของบุคคลที่สาม เช่น Facebook ผู้ใช้งานอาจถูกร้องขอให้ตกลงและปฏิบัติตามข้อตกลงและเงื่อนไขในการใช้งานของบุคคลที่สามดังกล่าว\n',
        ],            
    },
    {
        title: 'บัญชี : การลงทะเบียนและการยกเลิก',
        subTitle: [
            '3.1   ผู้ใช้งานจำเป็นต้องลงทะเบียนบัญชีผู้ใช้งานสำหรับการเข้าชมแอปพลิเคชัน  หรือใช้บริการบางประเภท  ',
            '3.2   ในการลงทะเบียนผู้ใช้งาน  ผู้ใช้งานจะต้องมีชื่อ นามสกุล  อีเมล์  เบอร์โทรศัพท์ ที่ยังใช้งานได้อยู่  และหมายเลขบัตรประชาชน หรือข้อมูลส่วนตัวอื่นๆ  ทั้งนี้  โปรดดูรายละเอียดเพิ่มเติมในหัวข้อ  นโยบายความเป็นส่วนตัว',
            '3.3   ในขั้นตอนการลงทะเบียน  ผู้ใช้งานจะต้องสร้างรหัสผ่าน(Password) สำหรับผ่านเข้าบัญชีของผู้ใช้งาน  ผู้ใช้งานจะต้องเก็บรักษารหัสผ่านเป็นความลับ  และขอให้เปลี่ยนรหัสผ่านดังกล่าวเป็นประจำ  ผู้ใช้งาน    ตกลงว่าบุคคลอื่นที่เข้าใช้บริการ(และ/หรือทำธุรกรรม)  หรือเว็บไซต์  หรือโปรแกรม  โดยใช้ชื่อบัญชีและรหัสผ่านที่ผู้ใช้งานเป็นผู้เปิดเผยให้ทราบถือเป็นตัวแทนของผู้ใช้งาน  ทั้งนี้  ผู้ใช้งานจะเป็นผู้รับผิดชอบต่อความเสียหายที่เกิดขึ้นจากการไม่รักษารหัสผ่านของผู้ใช้งานเป็นความลับ',
            '3.4   ผู้ใช้งานจะต้องลงทะเบียนโดยใช้อีเมล์ส่วนตัวยังใช้งานได้และผู้ใช้งานยังคงใช้อีเมล์ดังกล่าวอยู่เป็นประจำ  ทั้งนี้เพื่อให้ Muang Thai Friends Club   สามารถส่งอีเมล์ยืนยันตัวบุคคลไปยังผู้ใช้งานได้  ในกรณีผู้ใช้งานลงทะเบียนโดยใช้อีเมล์ของบุคคลอื่น  Muang Thai Friends Club   อาจปิดบัญชีดังกล่าวได้โดยไม่ต้องแจ้งให้ทราบล่วงหน้า  นอกจากนี้ Muang Thai Friends Club    อาจขอให้ผู้ใช้งานยืนยันการใช้บัญชีอีกครั้งหาก Muang Thai Friends Club   เชื่อว่าผู้ใช้งานอีเมล์ที่ไม่สามารถใช้งานได้จริง',
            '3.5   ผู้ใช้งานจะต้องลงทะเบียนโดยใช้หมายเลขโทรศัพท์ที่ใช้งานได้  และผู้ใช้งานยังคงใช้หมายเลขโทรศัพท์ดังกล่าวอยู่เป็นประจำ  สำหรับผู้ใช้งานที่ประสงค์จะเปลี่ยนหมายเลขโทรศัพท์ในการลงทะเบียน  แต่ยังใช้เครื่องโทรศัพท์เดิม (หมายเลข IMEI ของตัวเครื่องโทรศัพท์เดิม)  ผู้ใช้งานจะสามารถเปลี่ยนหมายเลขโทรศัพท์ได้เพียงหนึ่งครั้งเท่านั้น  หากผู้ใช้งานประสงค์จะเปลี่ยนหมายเลขโทรศัพท์ในครั้งถัดไป  ผู้ใช้งานจะต้องปฏิบัติตามข้อกำหนด  เงื่อนไข  รวมถึงคำแนะนำของ Muang Thai Friends Club   ซึ่งจะได้แจ้งในคราวถัดไป  ทั้งนี้ Muang Thai Friends Club   ขอสงวนสิทธิ์ในการพิจารณาการเปลี่ยนหมายเลขโทรศัพท์ในการลงทะเบียนแต่เพียงผู้เดียว',
            '3.6   Muang Thai Friends Club   สงวนสิทธิ์จะปฏิเสธการลงทะเบียน  หรือยกเลิกบัญชีเมื่อใดก็ได้',
            '3.7   Muang Thai Friends Club   สงวนสิทธิ์ที่จะยกเลิกบัญชีของผู้ใช้งานได้โดยไม่ต้องแจ้งให้ทราบล่วงหน้า  ',
            '3.8   บัญชี Muang Thai Friends Club   ของผู้ใช้งานอาจถูกยกเลิกหาก Muang Thai Friends Club   พบว่าผู้ใช้งานประกาศหรือลงข้อความในลักษณะที่เป็นการละเมิดหรือก่อให้เกิดความเสียหายต่อสถาบันชาติ ศาสนา หรือ กษัตริย์',
            '3.9   Muang Thai Friends Club   สงวนสิทธิ์ที่จะยกเลิกบัญชีผู้ใช้งานได้โดยไม่ต้องแจ้งให้ทราบล่วงหน้า  ในกรณีที่มีเหตุสงสัยว่าเป็นการเปิดบัญชีผู้ใช้งานที่ทุจริต  หรือส่อเจตนาทุจริต\n',
        ],            
    },
    {
        title: 'การรับรางวัล',
        subTitle: [
            `4.1   แคมเปญและการรับรางวัล
            (1)  ผู้สนับสนุนจะเป็นผู้สร้างและประกาศแคมเปญลงบนแอปพลิเคชัน  เพื่อให้ผู้ใช้งานสามารถรับรางวัลตามที่ผู้สนับสนุนกำหนด  ทั้งนี้  แคมเปญแต่ละแคมเปญอาจมีข้อกำหนดหรือเงื่อนไขเฉพาะตามที่ผู้สนับสนุนจะกำหนดขึ้นเพิ่มเติม  ดังนั้นจึงเป็นหน้าที่ของผู้ใช้งานในการศึกษาและทำความเข้าใจข้อกำหนดและเงื่อนไขเฉพาะดังกล่าว  โดย Muang Thai Friends Club   จะไม่รับผิดชอบหากผู้ใช้งานเข้าใจผิดเกี่ยวกับเนื้อหาหรือข้อกำหนดหรือเงื่อนไขของแคมเปญ
            (2)  เมื่อผู้ใช้งานได้รับรางวัลและกำหนดให้ส่งรางวัลไปยังบุคคลอื่น ณ ที่อยู่ใดๆ นอกเหนือจากที่อยู่ของผู้ใช้งานเองได้สำหรับบางแคมเปญ  ผู้ใช้งานอาจได้รับทางเลือกในการรับรางวัล ณ สถานที่หรือที่อยู่ตามที่ผู้สนับสนุนกำหนดหรือโดยทางไปรษณีย์  ในกรณีดังกล่าวผู้ใช้งานจะต้องระบุและเลือกว่าต้องการรับรางวัลโดยวิธีใด
            (3)	 Muang Thai Friends Club   ไม่รับประกันเนื้อหาใดๆ หรือแคมเปญจะปรากฎบนแอปพลิเคชัน และ Muang Thai Friends Club   ไม่มีหน้าที่ในการตรวจสอบแอปพลิเคชัน บริการหรือแคมเปญ  อย่างไรก็ตาม Muang Thai Friends Club   สงวนสิทธิ์ในการที่จะลบทิ้ง  ระงับชั่วคราว  แก้ไขหรือเปลี่ยนแปลงเนื้อหาหรือแคมเปญใดๆ  ไม่ว่าในเวลาใดโดยเป็นดุลยพินิจของ Muang Thai Friends Club   แต่เพียงผู้เดียวโดยมิต้องแจ้งให้ทราบไม่ว่าด้วยเหตุใดๆก็ตาม
            (4)	 Muang Thai Friends Club   พยายามเท่าที่จะสามารถทำได้เพื่อให้การบริการสามารถใช้ได้ตลอดเวลา  แต่ Muang Thai Friends Club   ไม่รับประกันระดับของการให้บริการและจะไม่รับผิดชอบต่อความสูญเสียใดๆที่เกิดขึ้นในระหว่างที่ไม่สามารถให้บริการได้
            (5)	 หากผู้ใช้งานเข้าทำธุรกรรมกับผู้สนับสนุนและมีข้อพิพาทกับผู้สนับสนุนเกี่ยวกับรางวัล (สินค้า หรือบริการ หรือคูปอง) ที่ใช้บริการกับ Muang Thai Friends Club จะไม่รับผิดชอบเกี่ยวกับรางวัลดังกล่าวแต่อย่างใด
            (6)	 Muang Thai Friends Club   มีสิทธิ์ที่จะยกเลิกคำขอรับรางวัลได้ไม่ว่าในเวลาใดๆ  อันเนื่องมาจากความผิดพลาดในการพิมพ์หรือความผิดพลาดที่ไม่อาจคาดหมายได้อันเป็นผลให้แคมเปญ  หรือรางวัลบนเว็บไซต์หรือโปรแกรมถูกแสดงโดยผิดพลาด`,
            `4.2   การจัดส่ง
            (1)	 เมื่อระบบยืนยันการรับรางวัลถึงผู้ใช้งานเรียบร้อยแล้ว Muang Thai Friends Club   ผู้สนับสนุนก็จะดำเนินการจัดส่งรางวัลไปให้ผู้ใช้งาน
            (2)	 รางวัลจะถูกจัดส่งให้แก่ผู้ใช้งานเฉพาะที่อยู่ในประเทศเท่านั้น  และผู้ใช้งานจะต้องตรวจสอบให้แน่ใจว่าที่อยู่ที่แจ้งเป็นที่อยู่ที่ถูกต้องและมีอยู่จริง
            (3)	 ผู้ใช้งานจะได้รับรางวัลจาก   Muang Thai Friends Club   โดยตรง  โดยรางวัลจะถูกจัดส่งไปยังชื่อและที่อยู่  สำหรับการจัดส่งตามที่ผู้ใช้งานระบุในขั้นตอนการรับรางวัล
            (4)  Muang Thai Friends Club   จะไม่รับผิดชอบหากปรากฏว่าผลิตภัณฑ์ สินค้า ตัวอย่าง หรือของขวัญที่จัดส่งให้กับผู้ใช้งานแตกต่างจากที่ปรากฏในแคมเปญหรือรางวัลที่ไม่ถูกต้องหรืออาจมีสีที่แตกต่างหรือไม่มีสีที่ผู้ใช้งานเลือก  หรือชำรุดบกพร่อง
            (5)	 Muang Thai Friends Club   ไม่รับประกันคุณภาพ ปลอดภัย คุณสมบัติหรือคุณลักษณะใดๆ ของรางวัลที่ผู้ใช้งานได้รับ
            (6)	 ในกรณีที่มีปัญหาเกี่ยวกับการจัดส่งหรือรางวัล  ผู้ใช้บริการจะต้องติดต่อด้วยตนเองโดยตรง  ทั้งนี้ผู้ใช้งานจะได้รับข้อมูลสำหรับการติดต่อในขั้นตอนการรับรางวัล  ทั้งนี้ Muang Thai Friends Club   แนะนำให้ผู้ใช้งานจดรายละเอียดเกี่ยวกับข้อมูลการติดต่อเก็บไว้ด้วย`,
            `4.3   ภาษีอากร\n\tธุรกรรมที่เกี่ยวเนื่องกับแคมเปญ  เป็นธุรกรรมโดยตรงระหว่าง Muang Thai Friends Club   และผู้ใช้งานโดยแท้  ดังนั้นผู้ใช้งานรับทราบและตกลงว่าการรับรางวัลดังกล่าวอาจอยู่ภายใต้บังคับของภาษีอากรที่เกี่ยวข้อง เช่น การหักภาษี ณ ที่จ่าย  อากรแสตมป์  ภาษีมูลค่าเพิ่ม  เป็นต้น\n`
        ],         
    },
    {
        title: 'นโยบายความเป็นส่วนตัว',
        titleDesc: `Muang Thai Friends Club   เคารพในสิทธิความเป็นส่วนตัวของผู้ใช้งานทุกคน  โดยเฉพาะข้อมูลส่วนบุคคลของท่าน Muang Thai Friends Club   ทราบและเข้าใจดีว่าท่านประสงค์จะได้รับความปลอดภัยอย่างสูงสุดในการทำธุรกรรมผ่านเว็บไซต์หรือโปรแกรม  ดังนั้น  ข้อมูลต่างๆของท่านที่ Muang Thai Friends Club   ได้รับ  จะถูกนำไปใช้ตามวัตถุประสงค์ของ Muang Thai Friends Club     ตามนโยบายความเป็นส่วนตัวนี้เท่านั้น  โดยที่ Muang Thai Friends Club   จะดำเนินการตามมาตรฐานที่เข้มงวดในการรักษาความปลอดภัย  ตลอดจนป้องกันไม่ให้มีการนำข้อมูลไปใช้โดยไม่ได้รับอนุญาตจากท่านก่อน\nนโยบายความเป็นส่วนตัวตามที่ปรากฏด้านล่างนี้  ใช้บังคับกับบัญชีผู้ใช้งานและข้อมูลต่างๆของท่าน  เพื่อให้ท่านทราบอย่างชัดเจนว่า Muang Thai Friends Club   ใช้ข้อมูลของท่านอย่างไรและวิธีการที่ท่านสามารถใช้เพื่อปกป้องข้อมูลส่วนบุคคลของท่าน  ตามที่ท่านให้ไว้กับ Muang Thai Friends Club   และเว็บไซต์หรือโปรแกรมนี้`,
        subTitle: [
            `5.1   การเก็บรวบรวมข้อมูลส่วนบุคคล\n\tMuang Thai Friends Club เก็บรวบรวมข้อมูลของท่านเพื่อให้บริการที่ดีขึ้นแก่ผู้ใช้งานของ Muang Thai Friends Club ทั้งหมด  และเพื่อความสะดวกหรือเพื่อเป็นผลประโยชน์ในการใช้งานกับท่านมากที่สุด Muang Thai Friends Clubได้รวบรวมข้อมูลของท่านโดยใช้วิธีดังต่อไปนี้
            (1)   ข้อมูลที่ท่านให้เรา
                \tบริการของ Muang Thai Friends Club จำเป็นต้องให้ท่านลงชื่อสมัครใช้บริการของ Muang Thai Friends Club เพื่อความสะดวกแก่ผู้ใช้งานทุกราย  ท่านจะต้องแจ้งข้อมูลส่วนบุคคลของท่านที่จำเป็นให้แก่ Muang Thai Friends Club ทราบ เช่น ชื่อ-นามสกุล  ที่อยู่ ที่อยู่อีเมล หรือหมายเลขโทรศัพท์
            (2)	  ข้อมูลบันทึก
                \tเมื่อท่านใช้บริการของ Muang Thai Friends Club จะรวบรวมและเก็บข้อมูลบางอย่างไว้ในบันทึกของ Muang Thai Friends Club อัตโนมัติ เช่น ข้อมูลที่ท่านค้นหา  รายละเอียดการใช้บริการของ Muang Thai Friends Club
            (3)	  ข้อมูลตำแหน่ง
                \tMuang Thai Friends Club อาจรวบรวมและประมวลผลข้อมูลเกี่ยวกับตำแหน่งที่อยู่ของท่าน  โดยใช้เทคโนโลยีระบุตำแหน่ง เช่น ที่อยู่ IP, GPS
            (4)	  พื้นที่เก็บข้อมูลในตัวเครื่อง
                \tMuang Thai Friends Club อาจรวบรวมและจัดเก็บข้อมูล  รวมถึงข้อมูลส่วนบุคคลของท่าน  ที่อยู่ในอุปกรณ์ของท่านโดยใช้พื้นที่จัดเก็บข้อมูลเว็บเบราว์เซอร์ (รวมถึง HTML5) และแคชของข้อมูลแอปพลิเคชัน
            (5)	  คุ้กกี้(Cookies) และแคชไฟล์ (Cache File)
                \t“คุ้กกี้” คือไฟล์ข้อมูลเล็กๆ ที่ถูกส่งยังเครื่องคอมพิวเตอร์ของท่าน  เพื่อเป็นการอนุญาตให้ Muang Thai Friends Clubบันทึกข้อมูลเกี่ยวกับท่านในฐานะผู้ใช้บริการของ Muang Thai Friends Club เมื่อท่านได้กลับเข้ามายังหน้าเว็บไซต์หรือโปรแกรมของ Muang Thai Friends Club อีกครั้งโดยใช้โปรแกรมท่องอินเตอร์เน็ท (Web browser) และเครื่องคอมพิวเตอร์เครื่องเดิม  ระบบจะส่ง “คุ้กกี้” ไปยังเครื่องคอมพิวเตอร์ของท่านก็ต่อเมื่อท่านลงชื่อเข้าระบบเพื่อใช้งานบัญชีของท่านที่ได้สมัครไว้กับ Muang Thai Friends Club “คุ้กกี้” เหล่านี้สามารถทำให้ Muang Thai Friends Club จดจำท่านในขณะที่ท่านเข้าใช้บริการในหน้าต่างๆ ภายในเว็บไซต์หรือโปรแกรมของ Muang Thai Friends Club โดยท่านไม่จำเป็นต้องระบุชื่อออกจากระบบหรือปิดหน้า Web browser “คุ้กกี้” เหล่านี้จะสิ้นผลลง
                เว็บบราวเซอร์ (Web browser) หรือโปรแกรมอุปกรณ์พกพาที่ท่านใช้เชื่อมต่อกับเว็บไซต์หรือโปรแกรม  ระบบอาจเก็บและบันทึก “Cache File” รวมถึงข้อมูลส่วนบุคคลของท่านไว้  ซึ่ง Muang Thai Friends Club ไม่มีส่วนในการควบคุมหรือเข้าถึง “Cache File” ดังกล่าวแต่อย่างใด`,
            `5.2   วิธีการใช้ข้อมูลที่ Muang Thai Friends Club รวบรวม\n\tMuang Thai Friends Club ใช้ข้อมูลที่รวบรวมจากบริการทั้งหมดของ Muang Thai Friends Club เพื่อให้บริการ รักษา ป้องกัน และปรับปรุงบริการของ Muang Thai Friends Club ให้ดียิ่งขึ้น  รวมถึงนำข้อมูลไปใช้ในการวิเคราะห์เชิงสถิติ  หรือในกิจกรรมอื่นของ Muang Thai Friends Club เพื่อปรับปรุงคุณภาพการให้บริการของ Muang Thai Friends Club ต่อไป\n\tท่านมีสิทธิในความเป็นส่วนตัวของข้อมูลของท่าน Muang Thai Friends Club จะไม่อนุญาตให้มีการเปิดเผยข้อมูลเกี่ยวกับบัญชี Muang Thai Friends Club ของท่านให้กับบุคคลภายนอก  นอกเหนือจากพนักงานผู้ได้รับอนุญาตของ Muang Thai Friends Club\n\tMuang Thai Friends Club จะใช้ข้อมูลส่วนบุคคลของท่านเพียงเท่าที่จำเป็น เช่น ชื่อนามสกุล  ที่อยู่  และเบอร์โทรศัพท์  เพื่อใช้ในการติดต่อ ให้บริการ ประชาสัมพันธ์หรือให้ข้อมูลข่าวสารต่างๆ รวมทั้งสำรวจความคิดเห็นของท่านในกิจการหรือกิจกรรมของ Muang Thai Friends Club เท่านั้น\n\tMuang Thai Friends Club จะไม่นำข้อมูลส่วนบุคคลของท่านที่ Muang Thai Friends Club ได้เก็บรวบรวมไว้ไปขายหรือเผยแพร่ให้กับบุคคลภายนอกโดยเด็ดขาด เว้นแต่จะได้รับอนุญาตจากท่านเท่านั้น\n\tเว็บไซต์และโปรแกรมจะมีโฆษณาที่อาจเชื่อมต่อ (Link) ไปยังเว็บไซต์อื่นๆ ซึ่งอาจมีมาตราการหรือนโยบายเกี่ยวกับการคุ้มครองความเป็นส่วนตัวที่แตกต่างจาก Muang Thai Friends Club ท่านต้องตรวจสอบนโยบายความเป็นส่วนตัวของเว็บไซต์หรือโปรแกรมนี้ด้วย Muang Thai Friends Club ไม่สามารถรับรองข้อความหรือดำเนินการตามที่ได้มีประกาศไว้ในเว็บไซต์ดังกล่าวได้  และจะไม่รับผิดชอบใดๆ  หากเว็บไซต์เหล่านั้นไม่ได้ปฏิบัติการหรือดำเนินการใดๆ ตามนโยบายความเป็นส่วนตัวที่เว็บไซต์ดังกล่าวได้ประกาศไว้\n\tเมื่อท่านติดต่อหรือใช้บริการของ Muang Thai Friends Club จะเก็บบันทึกการติดต่อของท่าน เพื่อช่วยแก้ปัญหาใดๆ ก็ตามที่ท่านอาจพบ Muang Thai Friends Club อาจใช้ที่อยู่อีเมลของท่านเพื่อแจ้งให้ท่านทราบถึงบริการของ Muang Thai Friends Club เช่น แจ้งให้ท่านทราบเกี่ยวกับการเปลี่ยนแปลงหรือการปรับปรุงต่างๆ ที่กำลังจะเกิดขึ้น\n\tMuang Thai Friends Club จะขอคำยินยอมจากท่านก่อนใช้ข้อมูลเพื่อจุดประสงค์อื่นๆ นอกเหนือจากที่ระบุไว้ในนโยบายความเป็นส่วนตัวนี้`,
            `5.3   การเข้าถึงและการอัปเดต/เปลี่ยนแปลงข้อมูลส่วนบุคคล\n\tเมื่อใดก็ตามที่ท่านใช้บริการของ Muang Thai Friends Club ท่านสามารถตรวจสอบข้อมูลส่วนบุคคลของท่าน รวมทั้งสามารถอัปเดต/เปลี่ยนแปลงข้อมูลของท่านได้ทุกเวลา โดยการเข้าสู่ระบบมายังบัญชี Muang Thai Friends Club ของผู้ใช้งาน เว้นแต่กรณีที่ Muang Thai Friends Club ต้องเก็บข้อมูลนั้นไว้เพื่อประโยชน์ทางธุรกิจหรือจุดประสงค์ทางกฎหมาย เมื่ออัปเดต/เปลี่ยนแปลงข้อมูลส่วนบุคคลของท่าน Muang Thai Friends Club อาจขอให้ท่านยืนยันตัวตนก่อนที่ Muang Thai Friends Club จะสามารถดำเนินการตามคำขอของท่านได้\n\tMuang Thai Friends Club อาจปฏิเสธคำขอซ้ำซ้อนอันเกินควร หรือต้องใช้ความพยายามทางเทคนิคมากเกินไป เช่น การพัฒนาระบบใหม่หรือเปลี่ยนหลักปฏิบัติพื้นฐานที่มีอยู่เสี่ยงต่อข้อมูลส่วนบุคคลของผู้อื่น หรือไม่สามารถปฏิบัติได้จริง เช่น คำขอเกี่ยวกับข้อมูลที่อยู่ในระบบสำรอง\n\tMuang Thai Friends Club ให้ท่านเข้าถึงและอัปเดต/เปลี่ยนแปลงข้อมูลได้ฟรี ยกเว้นกรณีที่ต้องใช้ความพยายามอย่างเกินควร Muang Thai Friends Club มุ่งหวังที่จะรักษาบริการของ Muang Thai Friends Club ให้สามารถปกป้องข้อมูลจากการถูกทำลายโดยอุบัติเหตุหรือ การมุ่งร้ายอื่นๆ ด้วยเหตุนี้  หลังจากที่ท่านลบข้อมูลจากบริการของ Muang Thai Friends Club อาจจะยังไม่ลบสำเนาที่มีอยู่ออกจากเซิร์ฟเวอร์ที่ใช้งานอยู่หรือนำข้อมูลออกจากระบบสำรองของ Muang Thai Friends Club โดยทันที\n\tเมื่อบัญชี Muang Thai Friends Club ของท่านถูกปิดแล้ว Muang Thai Friends Club จะยังคงเก็บข้อมูลบัญชีของท่านไว้ในฐานข้อมูลของ Muang Thai Friends Club ต่อไปตามที่กฎหมายกำหนด เพื่อวัตถุประสงค์ในการตรวจสอบกรณีทุจริต และเป็นการป้องกันการปิดบัญชีเพื่อหลีกเลี่ยงการทุจริต โดยการปิดบัญชีเก่าและเปิดบัญชีใหม่ อย่างไรก็ตาม เมื่อบัญชีของท่านถูกปิดแล้ว Muang Thai Friends Club จะไม่ใช้ข้อมูลของท่านให้แก่บุคคลอื่น ยกเว้นกรณีที่ใช้ในกระบวนการทางกฎหมาย`,
            `5.4   การแบ่งปันข้อมูล\n\tMuang Thai Friends Club ไม่แบ่งปันข้อมูลส่วนบุคคลกับบริษัท องค์กร และบุคคลภายนอก ยกเว้นกรณีดังต่อไปนี้
            (1)	  เมื่อได้รับความยินยอมจากท่าน
                \tMuang Thai Friends Club จะแบ่งปันข้อมูลส่วนบุคคลกับบริษัท องค์กร และบุคคลภายนอก เมื่อได้รับความยินยอมจากท่าน Muang Thai Friends Club จำเป็นต้องได้รับความยินยอมสำหรับการแบ่งปันข้อมูลส่วนบุคคลที่ละเอียดอ่อน
            (2)	  สำหรับเหตุผลทางกฎหมาย
                \tMuang Thai Friends Club จะแบ่งปันข้อมูลส่วนบุคคลกับบริษัท องค์กร และบุคคลภายนอกหาก Muang Thai Friends Club เชื่อโดยสุจริตว่าการเข้าถึง เข้าใช้ การเก็บรักษา หรือการเปิดเผยข้อมูลนั้นมีเหตุจำเป็นอันสมควรดังนี้
            (ก)	เป็นไปตามกฎหมายที่เกี่ยวข้อง  ระเบียบข้อบังคับกระบวนการทางกฎหมาย หรือการร้องขอข้อมูลจากทางราชการ
            (ข)	บังคับใช้ข้อกำหนดในการให้บริการที่เกี่ยวข้อง รวมถึงการตรวจสอบการละเมิดที่อาจเกิดขึ้น
            (ค)	ตรวจจับ ป้องกัน หรือระบุการทุจริต ปัญหาด้านความปลอดภัยหรือด้านเทคนิค
            (ง)	ป้องกันอันตรายต่อสิทธิ ทรัพย์สิน หรือความปลอภัยผู้ใช้งานคนอื่นๆ ของ Muang Thai Friends Club หรือประชาชนตามที่กฎหมายกำหนดหรืออนุญาต`,
            `5.5   การปรับปรุงนโยบายความเป็นส่วนตัว\n\tMuang Thai Friends Club อาจทำการปรับปรุงหรือแก้ไขนโยบายความเป็นส่วนตัวเป็นระยะๆ Muang Thai Friends Club จะไม่ลดทอนสิทธิ์ของท่านภายใต้นโยบายความเป็นส่วนตัวนี้ Muang Thai Friends Club จะเผยแพร่การเปลี่ยนแปลงเกี่ยวกับนโยบายส่วนบุคคลในหน้าเว็บนี้ และหากมีการเปลี่ยนแปลงสำคัญ Muang Thai Friends Club จะแจ้งให้ทราบล่วงหน้าอย่างชัดเจน Muang Thai Friends Club ขอแนะนำให้ท่านอ่านนโยบายความป็นส่วนตัวทุกครั้งที่เข้าชมหรือรับรางวัลจากเว็บไซต์หรือโปรแกรม\n`,
        ],    
    },
    {
        title: 'การใช้เว็บไซต์และโปรแกรม',
        subTitle: [
            `6.1   Muang Thai Friends Club จะใช้ความพยายามตามสมควรในการที่จะแก้ไขข้อผิดพลาดหรือข้อตกหล่นต่างๆ ให้เร็วที่สุด หลังจากได้รับการแจ้งถึงข้อผิดพลาดนั้นๆ  อย่างไรก็ตาม Muang Thai Friends Club ไม่รับประกันว่า แอปพลิเคชันจะปราศจากข้อผิดพลาดหรือตกหล่นใดๆ`,
            `6.2   Muang Thai Friends Club ไม่รับประกันว่าบริการหรือเว็บไซต์หรือโปรแกรมจะปราศจากไวรัสคอมพิวเตอร์หรือสิ่งอื่นใดที่อาจส่งผลอันตรายต่อเทคโนโลยีต่างๆ`,
            `6.3   การเข้าถึงแอปพลิเคชันอาจถูกจำกัดในบางครั้ง ด้วยเหตุผลในการซ่อมบำรุง ซ่อมแซม  หรือเพิ่มอุปกรณ์หรือบริการใหม่ Muang Thai Friends Club  จะใช้ความพยายามในการที่จะทำให้การเข้าถึงแอปพลิเคชันดังกล่าวกลับมาใช้งานได้ดังเดิมโดยเร็วที่สุด ทั้งนี้ Muang Thai Friends Club จะไม่ต้องรับผิดชอบในระบบการทำงานที่ขึ้นอยู่กับบราวเซอร์หรือโปรแกรมอื่นของผู้สนับสนุนหรือบุคคลภายนอก  ทั้งนี้  Muang Thai Friends Club สามารถลบข้อมูลหรือแคมเปญออกจากแอปพลิเคชันได้ทุกเวลา`,
            `6.4   Muang Thai Friends Club สงวนสิทธิ์ที่จะปิดกั้นการเข้าถึง และ/หรือ แก้ไขหรือลบสิ่งใดๆที่ Muang Thai Friends Club เห็นว่าอาจเป็นเหตุให้มีการผิดข้อกำหนดของสัญญานี้`,
            `6.5   การใช้ข้อมูลหรือสื่อใดๆ บนเว็บไซต์หรือโปรแกรม  โดยผู้ใช้งานเป็นความเสี่ยงและเป็นความรับผิดชอบของผู้ใช้งานทั้งสิ้น`,
            `6.6   ผู้ใช้งานสามารถดาวน์โหลดโปรแกรมได้จาก Market (Play Store) สำหรับอุปกรณ์ที่ใช้ระบบปฏิบัติการ Android , ระบบ IOS หรือจากช่องทางอื่นที่  Muang Thai Friends Club กำหนด  ทั้งนี้ Muang Thai Friends Club จะไม่รับผิดชอบต่อความเสียหายหรือความผิดปกติของอุปกรณ์พกพาของผู้ใช้งานอันเป็นผลมาจากการติดตั้งโปรแกรมลงบนอุปกรณ์เคลื่อนที่ของผู้ใช้งาน`,
            `6.7   Muang Thai Friends Club จะไม่รับผิดชอบต่อสื่อต่างๆ ที่ประกาศลงบนพื้นที่สาธารณะโดยผู้ใช้งาน กระดานสนทนา หน้าต่างๆ ห้องสนทนา หรือพื้นที่สาธารณะอื่นๆ ที่อยู่บนเว็บไซต์หรือโปรแกรม ทั้งนี้ Muang Thai Friends Club ไม่มีหน้าที่ในการรับรอง พิจารณาหรืออนุมัติสื่อต่างๆ ที่ประกาศ  โดยผู้ใช้งานหรือผู้ใช้งานรายอื่นๆ อย่างไรก็ตาม Muang Thai Friends Club สงวนสิทธิ์ในการลบบรรดาสื่อต่างๆ ที่ประกาศโดยผู้ใช้งานลงในพื้นที่สาธารณะได้โดยไม่ต้องแจ้งให้ทราบล่วงหน้าหาก Muang Thai Friends Club พบว่าหรือเห็นว่ามีความเป็นไปได้ที่ผู้ใช้งานอาจมีพฤติกรรมดังต่อไปนี้
            (1)	  หมิ่นประมาท ข่มเหง รบกวน ติดตาม ข่มขู่ หรือกระทำการใดๆ อันมีลักษณะเป็นการละเมิดสิทธิ์ของบุคคลอื่น
            (2)	  ประกาศ ลงข้อความ แจกจ่ายหรือทำให้เผยแพร่ซึ่งข้อความ สื่อ หรือข้อมูลอันเป็นการหมิ่นประมาท ลามก อนาจาร หยาบคาย หรือผิดกฎหมาย
            (3)	  ลงข้อความหรือโอนถ่ายข้อมูล (upload) ไฟล์ข้อมูลที่มีไวรัส ไฟล์ข้อมูลที่ไม่สมบูรณ์ หรือซอฟท์แวร์หรือโปรแกรมที่มีลักษณะดังกล่าวที่อาจทำความเสียหายต่อการให้บริการของ Muang Thai Friends Club และ/หรือ ระบบคอมพิวเตอร์/เครือข่าย ของบุคคลภายนอก หรือ
            (4)	  ละเมิดลิขสิทธิ์ เครื่องหมายการค้า หรือทรัพย์สินทางปัญญาอื่นๆของ Muang Thai Friends Club หรือของบุคคลภายนอกไม่ว่าตามกฎหมายไทยหรือกฎหมายระหว่างประเทศ\n`,
        ],       
    },
    {
        title: 'การโฆษณา',
        subTitle: [
            `7.1   Muang Thai Friends Club อาจแสดงสื่อโฆษณาในตำแหน่งต่างๆ บนเว็บไซต์หรือบนโปรแกรม หรือจุดต่างๆ ในระหว่างที่ผู้ใช้งานใช้บริการ`,
            `7.2   ผู้ใช้งานสามารถเลือกหรือกดเพื่อเข้าชมสินค้าหรือบริการที่มีการโฆษณาดังกล่าว  หรือไม่ก็ได้โดยอิสระตามที่ผู้ใช้งานจะพิจารณา`,
            `7.3   จะไม่มีการใช้ข้อมูลส่วนตัว (เช่น ชื่อ ที่อยู่ อีเมล์ หรือหมายเลขโทรศัพท์) ในการแสดงข้อความโฆษณาแต่ทั้งนี้ ผู้ลงโฆษณาที่เป็นบุคคลที่สามหรือบริษัทในเครืออาจจะติดตั้งหรือจดจำ “cookie” บนเว็บบราวเซอร์ของผู้ใช้งาน (กรุณาดูในนโยบายความเป็นส่วนตัว) โดย “cookie” นี้จะไม่เก็บข้อมูลส่วนตัวของผู้ใช้งานหรือลิงค์เชื่อมต่อไปยังข้อมูลส่วนตัวของผู้ใช้งาน หากผู้ใช้งานต้องการข้อมูลเพิ่มเติมเกี่ยวกับวิธีปฏิบัติดังกล่าวและเลือกที่จะไม่ให้ใช้ข้อมูลดังกล่าวโดยบริษัทใดๆ กรุณาดูในนโยบายความเป็นส่วนตัวเกี่ยวกับเรื่องดังกล่าว\n`,
        ],       
    },
    {
        title: 'การชดเชยและชดใช้ค่าเสียหาย',
        numb: '8',
        titleDesc: 'ผู้ใช้งานตกลงที่จะชดใช้ความเสียหายให้แก่ Muang Thai Friends Club สำหรับบรรดาความสูญเสีย ความรับผิด และค่าใช้จ่ายทั้งปวงที่ Muang Thai Friends Club ได้รับ อันเป็นผลมาจาก',
        subTitle: [
            `8.1   การใช้สิทธิเรียกร้องหรือการดำเนินคดีใดๆ ต่อ Muang Thai Friends Club โดยผู้ใดก็ตามอันเป็นผลมาจาก
            (ก)	การใช้บริการโดยผู้ใช้งาน
            (ข)	การใช้บริการโดยใช้รหัสผ่านของผู้ใช้งาน`,
            `8.2   การที่ผู้ใช้งานละเมิดหรือผิดเงื่อนไขข้อใดๆ ในสัญญานี้\n`,
        ],       
    },
    {
        title: 'เหตุสุดวิสัย',
        numb: '9',
        titleDesc: 'Muang Thai Friends Club ไม่ต้องรับผิดในความล่าช้าหรือการไม่ปฏิบัติตามสัญญาเพราะเหตุสุดวิสัย อัคคีภัย อุทกภัย อุบัติเหตุ การจลาจล สงคราม การแทรกแซงของรัฐ การนัดหยุดงาน ปัญหาด้านแรงงาน ความบกพร่องของอุปกรณ์ หรือเหตุอื่นใดที่อยู่นอกเหนือการควบคุมของ Muang Thai Friends Club\n',    
    },
    {
        title: 'การไม่รับประกัน  ข้อยกเว้นความรับผิดและการปลดเปลื้องจากความรับผิด',
        numb: '10',
        subTitle: [
            `10.1   การไม่รับประกัน
            (1)	  เว้นแต่กฎหมายจะบัญญัติไว้โดยเฉพาะ Muang Thai Friends Club ไม่มีความสัมพันธ์พิเศษหรือหน้าที่เกี่ยวกับความซื่อสัตย์ต่อผู้ใช้งาน ผู้ใช้งานรับทราบว่า Muang Thai Friends Club ไม่มีอำนาจในการควบคุมหรือหน้าที่ในการปฏิบัติเกี่ยวกับว่าผู้ใช้งานรายใดจะเข้าใช้บริการ หรือเนื้อหาใดที่ผู้ใช้งานจะได้รับจากการใช้บริการ หรือผลกระทบของเนื้อหาที่มีต่อผู้ใช้งาน หรือการดำเนินการใดที่ผู้ใช้งานจะปฏิบัติอันเป็นผลมาจากการได้รับเนื้อหาดังกล่าว
            (2)	  บริการอาจประกอบไปด้วยหรือเชื่อมโยงผู้ใช้งานไปยังเว็บไซต์อื่นที่มีข้อมูลที่บุคคลบางคนรู้สึกไม่พอใจหรือเห็นว่าไม่เหมาะสม ดังนั้น  Muang Thai Friends Club จึงไม่อาจรับรองถึงรายละเอียดของเนื้อหาใดๆที่ปรากฎหรือสามารถเข้าถึงได้โดยการใช้บริการ และ Muang Thai Friends Club จะไม่รับผิดชอบหรือรับผิดต่อความถูกต้อง การร้องเรียนเกี่ยวกับลิขสิทธิ์ ความชอบด้วยกฎหมาย หรือความเหมาะสมของเนื้อหาที่แสดงหรือเข้าถึงได้โดยผ่านการใช้บริการ
            (3)	  แอปพลิเคชันและการบริการตลอดจนเนื้อหาต่างๆ ดังกล่าวเป็นการจัดให้มี “ตามสภาพ” และ “ตามที่ปรากฎ” โดยปราศจากคำรับรองหรือรับประกันไม่ว่าในลักษณะใดๆ และไม่ว่าโดยตรงหรือโดยปริยาย
            (4)	  Muang Thai Friends Club ตลอดจนกรรมการ ผู้ถือหุ้น พนักงาน ตัวแทน ผู้แทน หุ้นส่วน ไม่รับประกันว่า
            (ก)	บริการจะปลอดภัยและสามารถใช้งานได้ทุกที่หรือทุกเวลา
            (ข)	บรรดาความบกพร่องจะได้รับการแก้ไขให้ถูกต้อง
            (ค)	ผู้ใช้งานจะพึงพอใจผลการใช้บริการตามที่คาดหวังไว้และ
            (ง)	ผู้ใช้งานจะได้รับรางวัลจากผู้สนับสนุน หรือหากได้รับ รางวัลดังกล่าวจะมีสี คุณภาพ จำนวน หรือคุณสมบัติตรงตามที่ผู้สนันบสนุนแสดงหรือประกาศไว้ในแคมเปญ
            ผู้ใช้งานเป็นผู้รับความเสี่ยงภัยจากการใช้งานเว็บไซต์ โปรแกรม บริการ ระบบและเนื้อหาเองแต่เพียงผู้เดียว`,
            `10.2   ข้อยกเว้นความผิด\n\tMuang Thai Friends Club จะไม่รับผิดชอบต่อการสูญเสียรายได้ กำไร สัญญา ชื่อเสียง ธุรกิจ โอกาส ความเสียหายอันเนื่องมาจากความผิดพลาดของข้อมูล หรือความเสียหายใดๆ ไม่ว่าจะเป็นผลมาจากการละเมิด การผิดสัญญาหรือไม่ก็ตาม`,
            `10.3   การปลดเปลื้องจากความผิด
            (1)	  ผู้ใช้งานตกลงแบบเพิกถอนไม่ได้ในการปลดเปลื้อง Muang Thai Friends Club จากบรรดาความรับผิดหรือความเสียหายทั้งหมดทั้งปวงและโดยสิ้นเชิงที่เกิดขึ้นกับผู้ใช้งานอันเป็นผลมาจากการใช้บริการหรือแอปพลิเคชันหรือแคมเปญ
            (2)	  ผู้สนับสนุนตกลงจะปลดเปลื้อง Muang Thai Friends Club จากความรับผิดทั้งหมดและโดยสิ้นเชิงในความเสียหายที่เกิดขึ้นกับผู้ใช้งานอันเนื่องมาจากข้อความหรือเนื้อหาที่ได้รับจากแอปพลิเคชันและการบริการ
            (3)	  ผู้สนับสนุนตกลงจะปลดเปลื้อง Muang Thai Friends Club จากบรรดาความรับผิดที่เกี่ยวข้องกับความสัมพันธ์ระหว่างผู้ใช้งานกับผู้สนับสนุน\n`,
        ],  
    },
    {
        title: 'หน้าที่ของผู้ใช้งาน',
        numb: '11',
        subTitle: [
            `11.1   ผู้สนับสนุนอาจกำหนดข้อตกลงและเงื่อนไขเกี่ยวกับแคมเปญของผู้สนับสนุนเอง และผู้ใช้งานตกลงที่จะยอมรับและผูกพันตามข้อตกลงและเงื่อนไขดังกล่าว`,
            `11.2   ผู้ใช้งานรับรองว่าบรรดาข้อมูลที่ให้ไว้ในขณะลงทะเบียนและเป็นส่วนหนึ่งของบัญชี\n\tภายใต้ข้อตกลงและเงื่อนไขนี้เป็นข้อมูลที่แท้จริง ครบถ้วนและถูกต้อง และ\n\tผู้ใช้งานจะแจ้งให้ Muang Thai Friends Club ทราบในทันทีที่มีการเปลี่ยนแปลงข้อมูลดังกล่าว\n\tเพื่อทำให้ข้อมูลเกี่ยวกับบัญชีของผู้ใช้งานเป็นปัจจุบัน`,
            `11.3   ผู้ใช้งานมีหน้าที่ในการทำให้แน่ใจว่าบรรดารางวัล บริการ หรือข้อมูลที่แสดงบนเว็บไซต์หรือโปรแกรม หรือบริการเป็นไปตามความต้องการของผู้ใช้งาน`,
            `11.4   ผู้ใช้งานตกลงที่จะไม่ใช้หรืออนุญาตให้บุคคลอื่นใช้บริการ หรือเว็บไซต์หรือโปรแกรม โดยไม่จำกัดแต่เพียงในกรณีดังต่อไปนี้
            (1)	  ส่งหรือรับสื่อที่มีลักษณะเป็นการข่มขู่ ก้าวร้าว หยาบคาย ลามก คุกคาม ดูหมิ่นเหยียดหยามหรือหมิ่นประมาทบุคคลใดๆ ดูหมิ่นหรือละเมิดอำนาจศาล ลิขสิทธิ์ สิทธิบุคคล การเผยแพร่หรือความเป็นส่วนตัว หรือสิทธิของบุคคลอื่น
            (2)	  ส่งหรือรับสื่อที่ผู้ใช้งานโดยที่ไม่ได้รับอนุญาตหรือได้รับความยินยอม(จาก Muang Thai Friends Club หรือบุคคลอื่น) หรือซึ่งก่อให้เกิดหรือยุยงให้เกิดการกระทำผิดทางอาญา หรือความผิดในทางแพ่ง หรือไม่ว่าในลักษณะใดๆ ที่เป็นการขัดต่อกฎหมายหรือละเมิดสิทธิของบุคคลอื่นไม่ว่าจะอยู่ในประเทศใดในโลก
            (3)	  ส่งหรือรับสื่อใดๆ ที่เป็นอันตรายในทางเทคนิค (รวมถึงไวรัสคอมพิวเตอร์ logic bombs, Trojan horses, worms, ส่วนประกอบที่เป็นอันตราย ข้อมูลที่บกพร่องหรือซอฟท์แวร์ที่มีเจตนามุ่งร้ายหรือข้อมูลที่เป็นอันตราย)
            (4)	  ก่อให้เกิดความรำคาญ ไม่สะดวกสบาย หรือก่อให้เกิดความกังวลโดยไม่มีเหตุอันสมควร
            (5)	  สกัดกั้นหรือพยายามสกัดกั้นการส่งผ่านข้อมูลสำหรับการสื่อสารโดยระบบโทรคมนาคม
            (6)	  เพื่อประโยชน์อื่นนอกเหนือจากวัตถุประสงค์ที่ออกแบบมาหรือวัตถุประสงค์การใช้งาน
            (7)	  เพื่อวัตถุประสงค์ในการฉ้อโกง
            (8)	  ไม่เป็นไปตามหรือสอดคล้องกับวิธีปฏิบัติเกี่ยวกับอินเตอร์เน็ทหรือการเชื่อมต่อเน็ทเวิร์คอันเป็นที่ยอมรับ หรือ
            (9)	  การกระทำใดๆ ที่เป็นการก่อให้เกิดความเกลียดชังในเชื้อชาติ ศาสนา หรือคนกลุ่มน้อย หรืออันเป็นการทำให้เกิดผลอย่างมีนัยสำคัญต่อบุคคล กลุ่มบุคคล หรือเอกลักษณ์`,
            `11.5   การบริการดังต่อไปนี้ เป็นการกระทำที่ต้องห้ามโดยชัดแจ้งและผู้ใช้งานตกลงที่จะไม่กระทำการดังกล่าว (หรือยินยอมให้บุคคลอื่นกระทำการดังกล่าว)
            (1)	  ความพยายามในการหลีกเลี่ยงระบบความปลอดภัย หรือเครือข่ายรวมถึงการเข้าถึงข้อมูลที่มิได้มีไว้สำหรับผู้ใช้งาน การถึงเครื่องบริการ (Server) หรือบัญชีที่ผู้ใช้งานไม่ได้รับอนุญาตโดยชัดแจ้งให้เข้าถึงได้ หรือการแทรกแซงระบบความปลอดภัยของระบบเครือข่ายอื่น (เช่น running a post scan)
            (2)	  การเข้าถึงบริการ (หรือแอปพลิเคชัน) ในทางที่จะหรือกระทำการใดที่อาจหรือทำให้ หรือก่อให้เกิดการทำงานของโครงสร้างพื้นฐานของระบบ Muang Thai Friends Club เป็นอย่างมาก โดยไม่มีเหตุอันสมควรหรือไม่สมเหตุสมผล
            (3)	  การกระทำใดเพื่อตรวจดูเครือข่ายซึ่งจะสกัดกั้นข้อมูลที่ไม่ได้มีไว้สำหรับผู้ใช้งาน
            (4)	  ดำเนินการอันเป็นการกระทำที่ผิดกฎหมายเกี่ยวกับการใช้แอปพลิเคชัน และ/หรือ บริการ
            (5)	  ดำเนินการในลักษณะใดๆ (ตามความเห็นของ Muang Thai Friends Club แต่เพียงผู้เดียว) ที่เป็นการจำกัดหรือขัดขวางผู้ใช้งานรายอื่นจากการใช้งานหรือเพลิดเพลินกับการใช้แอปพลิเคชันและบริการ หรือ
            (6)	  ส่งข้อความใดๆ ในทางที่จะทำให้บุคคลอื่นเชื่อว่า หรือเข้าใจว่าข้อความดังกล่าวได้ถูกส่งหรือเปิดเผยโดยความสนับสนุนหรือยินยอมของ Muang Thai Friends Club\n`,
        ],  
    },
    {
        title: 'เบ็ดเตล็ด',
        numb: '12',
        subTitle: [
            `12.1   หัวข้อต่างๆ\n\tหัวข้อต่างๆ ที่ใช้ในสัญญานี้มีไว้เพื่อความสะดวกในการอ้างถึงเท่านั้น และไม่ถือเป็นส่วนหนึ่งของข้อกำหนดและเงื่อนไขนี้ และไม่มีผลต่อการตีความสัญญา`,
            `12.2   ความไม่เป็นหุ้นส่วนของตัวแทน\n\tไม่มีข้อความใดๆ ในสัญญานี้สามารถตีความได้ว่าผู้ใช้งาน Muang Thai Friends Club มีการร่วมทุน เข้าเป็นหุ้นส่วนบริษัท หรือมีความสัมพันธ์เป็นตัวการและเป็นตัวแทนในรูปแบบใดๆ โดย Muang Thai Friends Club และผู้ใช้งานไม่มีอำนาจที่จะกระทำการใดๆ แทนอีกฝ่ายในการที่จะก่อให้เกิดความรับผิดในหนี้ ค่าใช้จ่าย เข้าเป็นคู่สัญญา หรือการใดๆ แทนกัน`,
            `12.3   กฎหมายที่บังคับใช้\n\tข้อกำหนดและเงื่อนไขนี้อยู่ภายใต้บังคับและการตีความของกฎหมายแห่งราชอาณาจักรไทย โดยคู่สัญญาทั้งสองฝ่ายตกลงให้ศาลไทยเป็นผู้มีอำนาจในการชี้ขาดประเด็นข้อพิพาททั้งปวง`,
            `12.4   ทรัพยสิทธิ\n\tเนื้อหาที่อยู่บนแอปพลิเคชันรวมถึงข้อมูล โปรแกรม คอมพิวเตอร์ รูปภาพ กราฟ วีดีโอ หน้าตัวพิมพ์       กราฟฟิค ดนตรี หรือเสียงอื่นๆ (เรียกรวมกันว่า “เนื้อหา”) ได้รับความคุ้มครองจากลิขสิทธิ์ เครื่องหมายการค้า สิทธิบัตร หรือทรัพย์สินอื่น โดยเนื้อหาทั้งหมดถือเป็นลิขสิทธิ์ของ Muang Thai Friends Club ภายใต้กฎหมายลิขสิทธิ์ของประเทศไทย ผู้ใช้งานไม่สามารถที่จะทำซ้ำ ดัดแปลง ลบทิ้ง เพิ่มเติม เผยแพร่ ส่งต่อ หรือมีส่วนร่วมในการโอนหรือขาย ให้เช่าซื้อหรือเช่า หรือนำไปดัดแปลงเป็นผลงานอื่นไม่ว่าส่วนหนึ่งส่วนใดหรือทั้งหมด เว้นแต่จะได้รับอนุญาตโดยชัดแจ้งจากผู้มีอำนาจให้ความยินยอม`,
            `12.5   เจ้าของและการประกอบธุรกิจของ Muang Thai Friends Club\n\tบริษัท เมืองไทยประกันภัย จำกัด (มหาชน) เป็นเจ้าของและผู้ดำเนินการแอปพลิเคชัน โปรแกรม ระบบ และบริการ ซึ่งเป็นนิติบุคคลที่จัดตั้งขึ้นและคงอยู่ตามกฎหมายของประเทศไทย ดำเนินการโดย บริษัท เมืองไทยประกันภัย จำกัด (มหาชน) จดทะบียนภายใต้กฎหมายประเทศไทย ที่ทำการอยู่ที่ 252 อาคารเมืองไทยภัทร ถนนรัชดาภิเษก แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10310 ประเทศไทย `,
            `12.6   ความมีผลของสัญญา\n\tผู้ใช้งานและบริษัท เมืองไทยประกันภัย จำกัด (มหาชน) เข้าทำสัญญานี้ (หรือข้อตกลงและเงื่อนไข) โดยระบบอิเล็กทรอนิกส์ ซึ่งมีผลและใช้บังคับ ได้ตามพระราชบัญญัติ ว่าด้วยธุรกรรมทางอิเล็กทรอนิกส์ พุทธศักราช 2544 ด้วยเหตุนี้จึงจำต้องลงลายมือชื่อในทางกายภาพ\n`,
        ],  
    },
]