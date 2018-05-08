import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity,Linking,Alert} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Spinner from 'react-native-loading-spinner-overlay';

import {Headers} from '../components/Headers';
import {MainSubmitButton} from '../components/MainSubmitButton';
import Communications from 'react-native-communications';

export default class ContactUsScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            isLoading: false,
            userLatitude: '',
            userLongitude: '',
        }
        this.getUserLocation = this.getUserLocation.bind(this);
    }

    async gotoBranchSearch(isMap,title){
        if(isMap){
            this.setState({isLoading: true})
            this.getUserLocation()
            if(this.state.userLatitude!=''&&this.state.userLongitude!=''){
                this.props.navigator.showModal({
                    screen: 'mti.ServiceSearchBranchScreen', // unique ID registered with Navigation.registerScreen
                    title: undefined, // navigation bar title of the pushed screen (optional)
                    titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                    passProps: {
                        isMap: isMap,
                        isDirect: true,
                        data:{
                            id: '1234',
                            coordinate:{latitude: 13.7864983,longitude: 100.57462710000004},
                            title: title,
                            address: '252 ถ.รัชดาภิเษก แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ  103101',
                            tel: '1484',
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

    getUserLocation(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                userLatitude: position.coords.latitude,
                userLongitude: position.coords.longitude,
                isLoading: false,
              })
            },
            (error) => {
                Alert.alert(
                    'แจ้งเตือน',
                    error.message,
                    [
                    {text: 'OK', onPress: () => {this.setState({
                        isLoading: false,
                    })}},
                    ]
                )
            },
            {maximumAge:60000, timeout:20000, enableHighAccuracy:false },
        )
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
                        <Text style={styles.contactTitleTextStyle}>ติดต่อเมืองไทยประกันภัย โทร. 1484</Text>
                        <Text style={styles.contactDesciptionTextStyle}>252 ถ.รัชดาภิเษก แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ  103101 โทร. 1484   แฟกซ์ : 0-2665-4166, 0-2274-9511, 0-2276-2033</Text>
                        <View style={styles.contactListSectionStyle}>
                            <View style={styles.iconGroupContainerStyle}>
                                <TouchableOpacity onPress={()=>Linking.openURL('mailto:info@muangthaiinsurance.com?subject=ติดต่อเรา&body=ติดต่อเรา')}>
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
                                <TouchableOpacity onPress={()=>this.gotoBranchSearch(true,'ติดต่อเมืองไทยประกันภัย')}>
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
                        <Text style={styles.contactTitleTextStyle}>ติดต่อแผนกลูกค้าสัมพันธ์ โทร. 1484 กด 3</Text>
                        <View style={styles.contactListSectionStyle}>
                            <View style={styles.iconGroupContainerStyle}>
                                <TouchableOpacity onPress={()=>Linking.openURL('mailto:crm@muangthaiinsurance.com?subject=ติดต่อเรา&body=ติดต่อเรา')}>
                                    <Image
                                        source={require('../source/icons/iconMessage01.png')}
                                        resizeMode='contain'
                                        style={styles.iconImageStyle}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.gotoBranchSearch(true,'ติดต่อแผนกลูกค้าสัมพันธ์')}>
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
                        <MainSubmitButton
                            buttonTitleText='ค้นหาสาขาย่อย'
                            onPress={()=>this.gotoBranchSearch(false)}
                        />
                    </View>
                    <TouchableOpacity onPress={()=>Linking.openURL('http://www.muangthaiinsurance.com/index_mti.html')} style={styles.topBannerImageContainerStyle} style={styles.topBannerImageContainerStyle}>
                        <Image
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
    },
    contactUsContainerStyle:{
        flex: 1,
    },
    topBannerImageContainerStyle:{
        height: responsiveHeight(18.30),
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