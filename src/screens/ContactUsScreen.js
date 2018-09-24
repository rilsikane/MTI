import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity,Linking,Alert,PermissionsAndroid,Platform} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Spinner from 'react-native-loading-spinner-overlay';

import {Headers} from '../components/Headers';
import {MainSubmitButton} from '../components/MainSubmitButton';
import Communications from 'react-native-communications';
import Geolocation from 'react-native-geolocation-service';
import { ifIphoneX,isIphoneX } from 'react-native-iphone-x-helper'
export default class ContactUsScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            isLoading: false,
            userLatitude: '',
            userLongitude: '',
            isLocationError:false
        }
    }

    async componentDidMount(){
        
        if(Platform.OS=="android"){
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);  
            this.setState({isLocationError:!result});
        }
        if(!this.state.isLocationError){
            this.setState({isLoading: true})
            Geolocation.getCurrentPosition(
                (position) => {
                this.setState({
                    userLatitude: position.coords.latitude,
                    userLongitude: position.coords.longitude,
                    isLoading: false,
                })
                },
                (error) => {
                    this.setState({isLoading:false})
                    Alert.alert(
                        ' ',
                        error.message,
                        [
                        {text: 'OK', onPress: () => {this.setState({
                            isLoading: false,
                        })}},
                        ]
                    )
                },
                {enableHighAccuracy: true,timeout: 20000,maxAge: 0,istanceFilter: 1 },
            )
        }else{
            setTimeout(()=>{
                Alert.alert(
                    ' ',
                    'คุณไม่ได้ทำการเปิด Location Service',
                    [
                    {text: 'OK', onPress: () => {this.setState({
                        isLoading: false,locationError:false
                    })}},
                    ]
                )
            },200)
        }
    }

    gotoBranchSearch(isMap,title,isFc){
        if(isMap){
            if(this.state.userLatitude!=''&&this.state.userLongitude!=''){
                setTimeout(()=>{
                    this.props.navigator.showModal({
                        screen: 'mti.ServiceSearchBranchScreen', // unique ID registered with Navigation.registerScreen
                        title: undefined, // navigation bar title of the pushed screen (optional)
                        titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                        passProps: {
                            isMap: isMap,
                            isDirect: true,
                            data:{
                                id: '1234',
                                //13.7858124 100.5745153
                                coordinate:{latitude: 13.7858604,longitude: 100.5747409},
                                title: title,
                                address: '252 ถ.รัชดาภิเษก แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ  10310',
                                tel: '1484',
                                latitude: 13.7858604,longtitude: 100.5747409,
                                callnow:isFc?'022903339':'1484'
                            },
                            userLocation:{
                                lat: this.state.userLatitude,
                                long: this.state.userLongitude,
                            },
                            headerTitleText: title,
                            navigator:this.props.navigator,
                        }, // Object that will be passed as props to the pushed screen (optional)
                        animated: true, // does the push have transition animation or does it happen immediately (optional)
                        backButtonTitle: undefined, // override the back button title (optional)
                        backButtonHidden: false, // hide the back button altogether (optional)
                        
                    })
                },100)
            }
        }else{
            this.props.navigator.push({
                screen: 'mti.ServiceSearchBranchScreen', // unique ID registered with Navigation.registerScreen
                passProps:{},
                title: undefined, // navigation bar title of the pushed screen (optional)
                titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                animated: false, // does the push have transition animation or does it happen immediately (optional)
                backButtonTitle: undefined, // override the back button title (optional)
                backButtonHidden: false, // hide the back button altogether (optional)
            })
        }   
    }

    render(){
        return(
            <View style={styles.contactUsScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='ติดต่อเรา'
                    rightIconName='iconBell'
                />
                <View style={styles.contactUsContainerStyle}>
                    <View style={styles.topBannerImageContainerStyle}>
                        <Image
                            source={require('../source/images/contactUsBanner01.png')}
                            style={styles.topBannerImageContainerStyle}
                        />
                    </View>
                    <View style={styles.contactListContainerStyle}>
                        <Text style={styles.contactTitleTextStyle}>บมจ. เมืองไทยประกันภัย โทร. 1484</Text>
                        <Text style={styles.contactDesciptionTextStyle}>252 ถ.รัชดาภิเษก แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ  10310 แฟกซ์ : 0-2665-4166, 0-2274-9511, 0-2276-2033</Text>
                        <View style={styles.contactListSectionStyle}>
                            <View style={styles.iconGroupContainerStyle}>
                                <TouchableOpacity onPress={()=>Linking.openURL(`mailto:info@muangthaiinsurance.com?subject=ติดต่อจากแอพ Muang Thai Friends
                                &body=ติดต่อเรื่อง : \n ชื่อ-สกุล : \n เบอร์ติดต่อกลับ : \n`)}>
                                    <Image
                                        source={require('../source/icons/iconMessage01.png')}
                                        resizeMode='contain'
                                        style={styles.iconImageStyle}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>Linking.openURL("https://www.facebook.com/MTIconnectDotCom/")}>
                                    <Image
                                        source={require('../source/icons/iconFacebook.png')}
                                        resizeMode='contain'
                                        style={styles.iconImageStyle}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.gotoBranchSearch(true,'บมจ. เมืองไทยประกันภัย')}>
                                    <Image
                                        source={require('../source/icons/iconMapMarker01.png')}
                                        resizeMode='contain'
                                        style={styles.iconImageStyle}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.iconGroupContainerStyle} onPress={()=>Communications.phonecall("1484", true)}>
                                <Image
                                    source={require('../source/icons/iconPhone02.png')}
                                    resizeMode='contain'
                                    style={styles.iconPhoneImageStyle}
                                />
                                <Text style={styles.callTextStyle}>Call Now</Text>
                            </TouchableOpacity>
                        </View>
                        <Image
                            source={require('../source/images/dotSectionHorizontal.png')}
                            resizeMode='contain'
                            style={styles.dotSectionImageStyle}
                        />
                        <Text style={styles.contactTitleTextStyle}>Muang Thai Friends Club โทร. 02-290-3339</Text>
                        <View style={styles.contactListSectionStyle}>
                            <View style={styles.iconGroupContainerStyle}>
                                <TouchableOpacity onPress={()=>Linking.openURL(`mailto:crm@muangthaiinsurance.com?subject=ติดต่อจากแอพ Muang Thai Friends
                                &body=ติดต่อเรื่อง : \n ชื่อ-สกุล : \n เบอร์ติดต่อกลับ : \n`)}>
                                    <Image
                                        source={require('../source/icons/iconMessage01.png')}
                                        resizeMode='contain'
                                        style={styles.iconImageStyle}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.gotoBranchSearch(true,'Muang Thai Friends Club',true)}>
                                    <Image
                                        source={require('../source/icons/iconMapMarker01.png')}
                                        resizeMode='contain'
                                        style={styles.iconImageStyle}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.iconGroupContainerStyle} onPress={()=>Communications.phonecall("02-290-3339", true)}>
                                <Image
                                    source={require('../source/icons/iconPhone02.png')}
                                    resizeMode='contain'
                                    style={styles.iconPhoneImageStyle}
                                />
                                <Text style={styles.callTextStyle}>Call Now</Text>
                            </TouchableOpacity>
                        </View>
                        <Image
                            source={require('../source/images/dotSectionHorizontal.png')}
                            resizeMode='contain'
                            style={styles.dotSectionImageStyle}
                        />
                        <MainSubmitButton
                            buttonTitleText='ค้นหาสาขาย่อย'
                            onPress={()=>this.gotoBranchSearch(false)}
                        />
                    </View>
                    <TouchableOpacity onPress={()=>Linking.openURL('http://www.muangthaiinsurance.com/index_mti.html')} style={styles.topBannerImageContainerStyle} style={styles.topBannerImageContainerStyle}>
                        <Image
                            resizeMode="contain"
                            source={require('../source/images/serviceBannerImg02.png')}
                            style={styles.topBannerImageContainerStyle}
                        />
                    </TouchableOpacity>
                </View>
                {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
            </View>
        )
    }
}

const styles={
    contactUsScreenContainerStyle:{
        flex: 1,
        backgroundColor:"#fff"
    },
    contactUsContainerStyle:{
        flex: 1,
    },
    topBannerImageContainerStyle:{
        height: responsiveHeight(isIphoneX() ? 16:18.30),
        width: responsiveWidth(100),
    },
    contactListContainerStyle:{
        flex: 1,
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
        justifyContent: 'center',
    },
    contactTitleTextStyle:{
        fontSize: responsiveFontSize(3),
        letterSpacing: 0,
        color: "#1595d3"
    },
    contactDesciptionTextStyle:{
        fontSize: responsiveFontSize(2.2),
        letterSpacing: 0,
        color: "#919195"
    },
    contactListSectionStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: responsiveHeight(1.5),
    },
    iconGroupContainerStyle:{
        flexDirection: 'row',

    },
    iconPhoneImageStyle:{
        height: responsiveHeight(2.81),
        width: responsiveHeight(2.81),
        marginRight: responsiveWidth(1),
    },
    dotSectionImageStyle:{
        width: '100%',
        opacity: 0.3,
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(1),
    },
    iconImageStyle:{
        height: responsiveHeight(4.22),
        width: responsiveHeight(4.22),
        marginRight: responsiveWidth(1.5),
    },
    callTextStyle:{
        fontSize: responsiveFontSize(2.2),
        letterSpacing: 0,
        color: 'rgb(253, 98, 98)',
    }
}