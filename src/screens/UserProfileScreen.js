import React,{Component} from 'react';
import {Text,View,Image,ImageBackground,TouchableOpacity,ScrollView,Alert} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PopupDialog,{ SlideAnimation }  from 'react-native-popup-dialog';
import Spinner from 'react-native-loading-spinner-overlay';

import {Headers} from './../components/Headers';
import {TextInputIcon} from './../components/TextInputIcon';
import {MainSubmitButton} from './../components/MainSubmitButton';
import {LifeStyleBox} from './../components/LifeStyleBox';
import store from 'react-native-simple-store';
import moment from 'moment';
import localization from 'moment/locale/th'
import {post,authen,get,put,getBasic} from '../api';
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'
import RNFS from 'react-native-fs'
import { observer, inject } from 'mobx-react';

@inject('userStore')
@observer
export default class UserProfileScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            userFirstName: '',
            userLastName: '',
            userGender: '',
            userBirthDate: '',
            userEmail: '',
            userPhone: '',
            userCareer: '',
            userEducation: '',
            userIncome: '',
            userLifeStyle: [],
            userPassword: '',
            rightIconName: '',
            member_type:'',
            userProfile:{},
            submitButtonText: 'แก้ไขข้อมูล',
            lifeStyleImage1:[],
            lifeStyleImage1Selected:[],
            lifeStyleImage2:[],
            lifeStyleImage2Selected:[],
            filterLifeStyleImage1: [],
            filterLifeStyleImage2: [],
            lifeStyleImage3:[],
            lifeStyleImage3Selected:[],
            filterLifeStyleImage3: [],
            lifestyle:[],
            orgUserLifeStyleId: [],
            dropDownCareer: [],
            dropDownEducation: [],
            dropDownIncome: [],
            saveLifeStyle:[],

            canEditProfile: false,
            isLifestyleModalVisible: false,
            isDateTimePickerVisible: false,
            isLoading: false,
            userImageBase64:"",
            user:{},
            profileImage:""
        }
        this.onUpdatePictureProfilePress = this.onUpdatePictureProfilePress.bind(this);
        this.onCloseModalPress = this.onCloseModalPress.bind(this);
        moment.locale("th");
    }

    async componentDidMount(){
        await this.getDropDownMaster();
        await this.init();
        
    }

    async getDropDownMaster(){
        this.setState({isLoading: true});
        let dropDownMaster = await get('masterdata/profile',{});
        dropDownMaster.career.map((data,i)=>{
            this.state.dropDownCareer.push({
                value: data,
                label: data,
            })
        })
        dropDownMaster.education.map((data,i)=>{
            this.state.dropDownEducation.push({
                value: data,
                label: data,
            })
        })
        dropDownMaster.income.map((data,i)=>{
            this.state.dropDownIncome.push({
                value: data,
                label: data,
            })
        })
    }

    getPickerOptions(type){
        if(type==='career'){
            return this.state.dropDownCareer
        }else if(type==='education'){
            return this.state.dropDownEducation
        }else if(type==='income'){
            return this.state.dropDownIncome
        }else{
            return [
                { value: "F", label: 'หญิง'},
                { value: "M", label: 'ชาย'},
            ]
        }
    }

    async init(){
        this.setState({isLoading:true});
        let user = await store.get("user");
        console.log(user)
        if(!user){
            user = {};
            user.name = "GUEST";
            user.surname = "GUEST";
        }
        let response = await getBasic("privilege/groups",{});
        let list = response.data;
        let list1=[],list2=[],list3=[];
        for(let i=0;i<list.length;i++){
            let filter = user.lifestyle.filter(item=>item.id==list[i].id);
            list[i].isSelected = filter && filter.length>0;    
            if(i<3){
                list1.push(list[i]);
            }else if(i<6){
                list2.push(list[i]);
            }else if(i<9){
                list3.push(list[i]);
            }
        }

        this.setState({lifeStyleImage1:list1,lifeStyleImage1Selected:list1});
        this.setState({lifeStyleImage2:list2,lifeStyleImage2Selected:list2});
        this.setState({lifeStyleImage3:list3,lifeStyleImage3Selected:list3,isLoading:false});
        this.setState({
            filterLifeStyleImage1: this.state.lifeStyleImage1,
            filterLifeStyleImage2: this.state.lifeStyleImage2,
            filterLifeStyleImage3: this.state.lifeStyleImage3
        })
       
        this.setState({
            userFirstName:user.name,
            userLastName:user.surname,
            userEmail:user.email,
            userPhone:user.tel,
            userBirthDate:user.birthdate,
            member_type:user.member_type,
            userGender:user.gender,
            userCareer:user.career,
            userEducation:user.education,
            userIncome:user.income,
            userLifeStyle:user.lifestyle.map(data=>data.title),
            orgUserLifeStyleId: user.lifestyle.map(data=>data.id),
            isLoading: false,
            user:user,
            profileImage:user.profile_img,
            lifestyle:user.lifestyle.map(data=>data.id)
        })
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })
  
    _handleDatePicked = (date) => {
        let dates = new Date(date).toLocaleDateString()
        this.setState({
            userBirthDate: dates
        })
        this._hideDateTimePicker()
    }

    async updateUserProfile(userEmail,userPhone,userBirthDate,userGender,userCareer,userEducation,userIncome,userLifeStyle){
        let params = {};
        //params.email = userEmail;
        //params.tel = userPhone;
        this.state.user.gender = userGender;
        this.state.user.income = userIncome;
        this.state.user.education = userEducation;
        this.state.user.career = userCareer;
        //params.lifestyle = userLifeStyle;


        let response = await put('me/profile',this.state.user);
        if(response){
            if(userLifeStyle.length>0){
                let lifeStyleUpdate = await put('me/lifestyle',{lifestyle:userLifeStyle});
            }
            if(this.state.userImageBase64 && this.state.userImageBase64!=""){
                 let pictureResponse = await post('me/picture',{image:`data:image/jpeg;base64,${this.state.userImageBase64}`});
                 console.log(pictureResponse);
            }
            let user = await get("me",{});
            if(user){
                await store.save("user",user);
                this.props.userStore.user = user; 
                //this.init();
            }
            return response;
        }else{
            return false;
        }
        //console.log(user);
        
    }

    async onSubmitButtonPress(){
        if(this.state.submitButtonText==='แก้ไขข้อมูล'){
            this.setState({
                submitButtonText: 'บันทึกข้อมูล',
                canEditProfile: true,
            })
        }else{
            this.setState({isLoading: true});
            let response = await this.updateUserProfile(
                this.state.userEmail,
                this.state.userPhone,
                this.state.userBirthDate,
                this.state.userGender,
                this.state.userCareer,
                this.state.userEducation,
                this.state.userIncome,
                this.state.lifestyle
            );
            if(response){
                Alert.alert(
                    'สำเร็จ',
                    'บันทึกข้อมูลเรียบร้อยแล้ว',
                    [
                    {text: 'OK', onPress: () => {this.setState({
                        submitButtonText: 'แก้ไขข้อมูล',
                        canEditProfile: false,
                        isLoading: false,
                    })}},
                    ]
                )
            }else{
                this.setState({
                    submitButtonText: 'แก้ไขข้อมูล',
                    canEditProfile: false,
                    isLoading: false,
                })
            }

            
        }
    }

    renderCancelButton(){
        if(this.state.submitButtonText==='แก้ไขข้อมูล'){
            return(
                <View/>
            )
        }else{
            return(
                <TouchableOpacity onPress={this.onCancelButtonPress.bind(this)}>
                    <Text style={styles.cancelTextStyle}>ยกเลิก</Text>
                </TouchableOpacity>
            )
        } 
    }

    onCancelButtonPress(){
        this.init();
        this.setState({
            submitButtonText: 'แก้ไขข้อมูล',
            canEditProfile: false,
        })
    }

    renderLifestyleModal(){
        const slideAnimation = new SlideAnimation({
            slideFrom: 'bottom',
          })

        return(
            <PopupDialog
                ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                //dialogAnimation={slideAnimation}
                width={responsiveWidth(90.15)}
                height={responsiveHeight(68)}
                dialogStyle={styles.popupContainerStyle}
                containerStyle={styles.lifestylePopupContainerStyle}
            >
                <View>
                    <TouchableOpacity onPress={this.onCloseModalPress}>
                        <Image
                            source={require('./../source/icons/btnClose.png')}
                            style={styles.btnCloseImageStyle}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <Text style={styles.lifestylePopupTitleTextStyle}>กรุณาเลือกไลฟ์ไตล์ที่ตรงกับคุณ{'\n'}(เลือกได้มากกว่า1 ข้อ)</Text>
                    <View style={styles.lifestyleBoxList1ContainerStyle}>
                        {this.renderLifeStyleBoxList1()}
                    </View>
                    <View style={styles.lifestyleBoxList2ContainerStyle}>
                        {this.renderLifeStyleBoxList2()}
                    </View>
                    <View style={[styles.lifestyleBoxList2ContainerStyle,{paddingTop:10}]}>
                        {this.renderLifeStyleBoxList3()}
                    </View>
                    <View style={styles.submitButtonContainerStyle}>
                        <MainSubmitButton
                            buttonTitleText='ตกลง'
                            onPress={this.onLifestyleModalSubmitButtonPress.bind(this)}
                        />
                    </View>
                </View>
            </PopupDialog>
        )
    }

    onCloseModalPress(){
        this.popupDialog.dismiss();
        this.setState({
            lifestyle: this.state.orgUserLifeStyleId,
        })
    }

    onLifestyleModalSubmitButtonPress(){
        console.log(this.state.lifestyle)
        if(this.state.lifestyle && this.state.lifestyle.length>0){
            this.popupDialog.dismiss();
            this.setState({isLoading: true});
            let filterLifeStyle = [];
            let filter
            this.state.filterLifeStyleImage1.map((data)=>{
                if(data.isSelected==true){
                    filterLifeStyle.push(data.name)
                }
            })
            this.state.filterLifeStyleImage2.map((data)=>{
                if(data.isSelected==true){
                    filterLifeStyle.push(data.name)
                }
            })
            this.state.filterLifeStyleImage3.map((data)=>{
                if(data.isSelected==true){
                    filterLifeStyle.push(data.name)
                }
            })
            console.log("filterLifeStyleImage2 "+this.state.filterLifeStyleImage2)
            console.log("filterLifeStyle" +filterLifeStyle)
            this.setState({
                userLifeStyle: filterLifeStyle,
                filterLifeStyleImage1: this.state.lifeStyleImage1,
                filterLifeStyleImage2: this.state.lifeStyleImage2,
                filterLifeStyleImage3: this.state.lifeStyleImage3,
                isLoading: false,
            })
            console.log(this.state.userLifeStyle)
        }else{
            Alert.alert(
                'แจ้งเตือน',
                'กรุณาเลือกอย่างน้อย 1 รายการ',
                [
                {text: 'OK', onPress: () => console.log('OK Pressed!')},
                ]
            )
        }
     
    }

    onLifeStylePress(index,list,title,isSelected){
        if(list=='1'){
            if(!isSelected){
                const lifeStyleImage1 = [...this.state.filterLifeStyleImage1]
                
                lifeStyleImage1[index].isSelected=true;
        
                this.setState({
                    filterLifeStyleImage1: lifeStyleImage1,
                    lifestyle:[...this.state.lifestyle,title]
                })
            }else{
                this._onCloseButtonPress(index,list,title);
            }   
        }else if(list=='2'){
            if(!isSelected){
                const lifeStyleImage2 = [...this.state.filterLifeStyleImage2]
                lifeStyleImage2[index].isSelected=true;
                
        
                this.setState({
                    filterLifeStyleImage2: lifeStyleImage2,
                    lifestyle:[...this.state.lifestyle,title]
                })
            }else{
                this._onCloseButtonPress(index,list,title);
            }
        }else{
            if(!isSelected){
                const lifeStyleImage3 = [...this.state.filterLifeStyleImage3]
                lifeStyleImage3[index].isSelected=true;
        
                this.setState({
                    filterLifeStyleImage3: lifeStyleImage3,
                    lifestyle:[...this.state.lifestyle,title]
                })
            }else{
                this._onCloseButtonPress(index,list,title);
            }
        }
      
    }

    _onCloseButtonPress(index,list,title){
        if(list=='1'){
            const lifeStyleImage1 = [...this.state.filterLifeStyleImage1]
            
            lifeStyleImage1[index].isSelected=false;
            this.setState({
                filterLifeStyleImage1: lifeStyleImage1,
                lifestyle:[...this.state.lifestyle.filter((item=>item!=title))]
            })
        }else if(list=='2'){
            const lifeStyleImage2 = [...this.state.filterLifeStyleImage2]
            
            lifeStyleImage2[index].isSelected = false;
            
            this.setState({
                filterLifeStyleImage2: lifeStyleImage2,
                lifestyle:[...this.state.lifestyle.filter((item=>item!=title))]
            })
        }else{
            const lifeStyleImage3 = [...this.state.filterLifeStyleImage3]
            
            lifeStyleImage3[index].isSelected=false;
            
            this.setState({
                filterLifeStyleImage3: lifeStyleImage3,
                lifestyle:[...this.state.lifestyle.filter((item=>item!=title))]
            })
        }
      
    }

    renderLifeStyleBoxList1(){
        const lifeStyleImage = [...this.state.filterLifeStyleImage1]

        return lifeStyleImage.map((lifeStyleImage,i)=>
            { 
            return( 
                <LifeStyleBox
                    key={i}
                    imageUri={lifeStyleImage.icon_url!="" ? {uri:lifeStyleImage.icon_url}:null}
                    boxTitle={lifeStyleImage.name}
                    isSelected={lifeStyleImage.isSelected}
                    onPress={()=>this.onLifeStylePress(i,'1',lifeStyleImage.id,lifeStyleImage.isSelected)}
                    onCloseButtonPress={()=>this._onCloseButtonPress(i,'1',lifeStyleImage.id)}
                    style={styles.boxListStyle}
                />
            )
            }
        )
    }

    renderLifeStyleBoxList2(){
        const lifeStyleImage = [...this.state.filterLifeStyleImage2]

        return lifeStyleImage.map((lifeStyleImage,i)=>
            {
            return( 
                <LifeStyleBox
                    key={i}
                    imageUri={lifeStyleImage.icon_url!="" ? {uri:lifeStyleImage.icon_url}:null}
                    boxTitle={lifeStyleImage.name}
                    isSelected={lifeStyleImage.isSelected}
                    onPress={()=>this.onLifeStylePress(i,'2',lifeStyleImage.id,lifeStyleImage.isSelected)}
                    onCloseButtonPress={()=>this._onCloseButtonPress(i,'2',lifeStyleImage.id)}
                    style={styles.boxListStyle}
                />
            )
            }
        )
    }

    renderLifeStyleBoxList3(){
        const lifeStyleImage = [...this.state.filterLifeStyleImage3]

        return lifeStyleImage.map((lifeStyleImage,i)=>
        {   
            return( 
                <LifeStyleBox
                    key={i}
                    imageUri={lifeStyleImage.icon_url!="" ? {uri:lifeStyleImage.icon_url}:null}
                    boxTitle={lifeStyleImage.name}
                    isSelected={lifeStyleImage.isSelected}
                    onPress={()=>this.onLifeStylePress(i,'3',lifeStyleImage.id,lifeStyleImage.isSelected)}
                    onCloseButtonPress={()=>this._onCloseButtonPress(i,'3',lifeStyleImage.id)}
                    style={styles.boxListStyle}
                />
            )
            }
        )
    }

    onUpdatePictureProfilePress(){
        const options = {
            title: 'เปลี่ยนรูปประจำตัว',
            noData:true,
            mediaType:'mixed',
            storageOptions: {
                skipBackup: true,
                path: 'construction cloud'
            }
        };
        ImagePicker.showImagePicker(options, async (response) => {
            //console.log('Response = ', response);
          
            if (response.didCancel) {
              //console.log('User cancelled image picker');
            }
            else if (response.error) {
              //console.log('ImagePicker Error: ', response.error);
            }
            else {
              const {originalRotation } = response;
              let rotation = 0
              if ( originalRotation === 90 ) {
                rotation = 90
              } else if ( originalRotation === 270 ) {
                rotation = -90
              }
      
              const fileResize = await ImageResizer.createResizedImage(response.uri, 720, 960, "JPEG",60,rotation);
              if(fileResize){
                let base64Img = await RNFS.readFile(fileResize.uri, "base64")  
                let success = await RNFS.unlink(fileResize.uri)
                this.setState({userImageBase64:base64Img});
              }
            }
          });
    }

    render(){
        return(
            <View style={styles.userProfileScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='ข้อมูลส่วนตัว'
                    rightIconName='iconBell'
                    //notify='2'
                />
                <ScrollView style={{flex: 1}}>
                    <View style={styles.userShortDetailContainerStyle}>
                        <View style={styles.userAvatarContainerStyle}>
                            <TouchableOpacity disabled={!this.state.canEditProfile} onPress={this.onUpdatePictureProfilePress} style={styles.userAvatarSectionStyle}>
                                <View style={styles.avatarBorderStyle}/>
                                <ImageBackground
                                    source={this.state.userImageBase64 ? {uri:`data:image/jpeg;base64,${this.state.userImageBase64}`} 
                                    : {uri:this.state.profileImage}}
                                    style={styles.userAvatarImageStyle}
                                    borderRadius= {responsiveHeight(5.235)}
                                >
                                    {this.state.canEditProfile&&
                                        <View style={styles.activityCardOverlayImageStyle}>
                                            <Image
                                                source={require('./../source/icons/iconCamera.png')}
                                                resizeMode='contain'
                                                style={styles.cameraIconStyle}
                                            />
                                        </View>
                                    }
                                </ImageBackground>
                            </TouchableOpacity>
                            <Text style={styles.userNameTextStyle}>{`${this.state.userFirstName} ${this.state.userLastName}`}</Text>
                            <Text style={styles.userLevelTextStyle}>สมาชิกระดับ {this.state.member_type}</Text>
                        </View>
                    </View>
                    <View style={styles.userDetailContainerStyle}>
                        <TextInputIcon
                            value={this.state.userFirstName}
                            onChangeText={(userFirstName)=>this.setState({userFirstName})}
                            leftLabelText='ชื่อ'
                            iconUri={require('./../source/icons/iconAvatar.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            rightIconName='pen'
                            editable={false}
                        /> 
                        <TextInputIcon
                            value={this.state.userLastName}
                            onChangeText={(userLastName)=>this.setState({userLastName})}
                            leftLabelText='นามสกุล'
                            iconUri={require('./../source/icons/iconAvatar.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            rightIconName='pen'
                            editable={false}
                        />
                        <TextInputIcon
                            genderValue={this.state.userGender}
                            onSubmitEditing={(userGender)=>this.setState({userGender})}
                            leftLabelText='เพศ'
                            iconUri={require('./../source/icons/iconGender.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            inputType='selector'
                            editable={this.state.canEditProfile}
                            //options={this.getPickerOptions()}
                        />
                        <TouchableOpacity disabled={true} onPress={this._showDateTimePicker}>
                            <View pointerEvents={this.state.isDateTimePickerVisible ? 'auto' : 'none'}>
                                <TextInputIcon
                                    value={this.state.userBirthDate ? moment(this.state.userBirthDate).locale("th",localization).format("DD MMMM YYYY"):null}
                                    leftLabelText='วันเกิด'
                                    iconUri={require('./../source/icons/iconBD.png')}
                                    containerStyle={styles.inputContainerStyle}
                                    editable={false}
                                    secondFlex={secondFlex}
                                    thirdFlex={thirdFlex}
                                />
                            </View>
                        </TouchableOpacity>
                        <TextInputIcon
                            value={this.state.userEmail}
                            onChangeText={(userEmail)=>this.setState({userEmail})}
                            leftLabelText='อีเมล'
                            iconUri={require('./../source/icons/iconMail.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            keyboardType='email-address'
                            rightIconName='pen'
                            editable={false}
                        />
                        <TextInputIcon
                            value={this.state.userPhone}
                            onChangeText={(userPhone)=>this.setState({userPhone})}
                            leftLabelText='โทรศัพท์'
                            iconUri={require('./../source/icons/iconPhone.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            editable={false}
                        />
                        <TextInputIcon
                            genderValue={this.state.userCareer}
                            onSubmitEditing={(userCareer)=>this.setState({userCareer})}
                            leftLabelText='อาชีพ'
                            iconUri={require('./../source/icons/iconCareer.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            rightIconName='pen'
                            editable={this.state.canEditProfile}
                            inputType='selector'
                            options={this.getPickerOptions('career')}
                        />
                        <TextInputIcon
                            genderValue={this.state.userEducation}
                            onSubmitEditing={(userEducation)=>this.setState({userEducation})}
                            leftLabelText='การศึกษา'
                            iconUri={require('./../source/icons/iconEducation.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            rightIconName='pen'
                            editable={this.state.canEditProfile}
                            inputType='selector'
                            options={this.getPickerOptions('education')}
                        />
                        <TextInputIcon
                            genderValue={this.state.userIncome}
                            onSubmitEditing={(userIncome)=>this.setState({userIncome})}
                            leftLabelText='รายได้'
                            iconUri={require('./../source/icons/iconIncome.png')}
                            containerStyle={styles.inputContainerStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            rightIconName='pen'
                            editable={this.state.canEditProfile}
                            inputType='selector'
                            options={this.getPickerOptions('income')}
                        />
                        <TouchableOpacity disabled={!this.state.canEditProfile} onPress={()=>this.popupDialog.show()}>
                            <View pointerEvents={this.state.isLifestyleModalVisible ? 'auto' : 'none'}>
                                <TextInputIcon
                                    value={this.state.userLifeStyle.sort().toString()}
                                    leftLabelText='ไลฟ์สไตล์'
                                    iconUri={require('./../source/icons/iconLifestyle.png')}
                                    containerStyle={styles.inputContainerStyle}
                                    secondFlex={secondFlex}
                                    thirdFlex={thirdFlex}
                                    editable={false}
                                    disabled={this.state.canEditProfile}
                                    rightIconName='pen'
                                />
                            </View>
                        </TouchableOpacity>
                        {/* <TextInputIcon
                            value={this.state.userPassword}
                            leftLabelText='รหัสผ่าน'
                            iconUri={require('./../source/icons/iconPass.png')}
                            containerStyle={styles.inputContainerStyle}
                            iconStyle={styles.iconStyle}
                            secondFlex={secondFlex}
                            thirdFlex={thirdFlex}
                            secureTextEntry={true}
                            onChangeText={(userPassword)=> this.setState({userPassword})}
                            rightIconName='pen'
                            editable={false}
                        /> */}
                        <View style={styles.submitButtonContainerStyle}>
                            <MainSubmitButton
                                buttonTitleText={this.state.submitButtonText}
                                onPress={this.onSubmitButtonPress.bind(this)}
                            />
                        </View>
                        {this.renderCancelButton()}
                        <DateTimePicker
                            titleIOS='วันเกิด'
                            titleStyle={styles.dateTitleTextStyle}
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                        />
                    </View>
                
                </ScrollView>
                {this.renderLifestyleModal()}
                {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
            </View>
        )
    }
}

const secondFlex = 0.3,thirdFlex = 0.9

const styles={
    userProfileScreenContainerStyle:{
        flex: 1,

    },
    userShortDetailContainerStyle:{
        height: responsiveHeight(26.05),
        backgroundColor: '#f6f6f6',
        borderBottomWidth: responsiveHeight(0.17),
        borderColor: '#dddddd',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userAvatarContainerStyle:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userAvatarSectionStyle:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarBorderStyle:{
        height: responsiveHeight(11.26),
        width: responsiveHeight(11.26),
        borderWidth: responsiveFontSize(0.4),
        borderRadius: responsiveHeight(5.63),
        borderColor: "#d8d8d9",
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
   
    },
    userAvatarImageStyle:{
        height: responsiveHeight(10.47),
        width: responsiveHeight(10.47),
        position: 'absolute',
        zIndex: 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: responsiveHeight(8),

    },  
    activityCardOverlayImageStyle:{
        height: responsiveHeight(3),
        width: '50%',
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.3,
        borderRadius: responsiveHeight(1),

    },
    cameraIconStyle:{
        height: responsiveHeight(2),
    },
    userNameTextStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(3.5),
        marginTop: responsiveHeight(1),

    },
    userLevelTextStyle:{
        color: '#919195',
        fontSize: responsiveFontSize(2),
    },
    userDetailContainerStyle:{
        flex: 1,
        paddingLeft: responsiveWidth(4),
        paddingRight: responsiveWidth(4),
    },
    inputContainerStyle:{
        borderBottomColor: '#C4C4C4',
        height: responsiveHeight(7.8)
    },
    iconStyle:{
        height: responsiveHeight(3)
    },
    submitButtonContainerStyle:{
        flex: 1,
        justifyContent: 'center',
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(3)
    },
    cancelTextStyle:{
        fontSize: responsiveFontSize(2.64),
        color: '#1595d3',
        textDecorationLine: 'underline',
        textDecorationColor: '#0194d2',
        textDecorationStyle: 'solid',
        textAlign: 'right',
        marginBottom: responsiveHeight(3)
    },
    dateTitleTextStyle:{
        fontSize: responsiveFontSize(2.64),
        color: '#1595d3'
    },
    popupContainerStyle:{
        borderRadius: 3,
        padding: responsiveWidth(4),
    },
    lifestylePopupContainerStyle:{
        justifyContent: 'flex-start',
        paddingTop: responsiveHeight(10),
    },
    btnCloseImageStyle:{
        height: responsiveHeight(2.81),
        alignSelf: 'flex-end'
    },
    lifestylePopupTitleTextStyle:{
        fontSize: responsiveFontSize(3),
        letterSpacing: -0.24,
        textAlign: "center",
        color: "#1595d3",
    },
    lifestyleBoxList1ContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: responsiveHeight(2),
        marginTop: responsiveHeight(3),
    },
    lifestyleBoxList2ContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    boxListStyle:{
        width: responsiveHeight(12),
        height: responsiveHeight(12),
    }
}