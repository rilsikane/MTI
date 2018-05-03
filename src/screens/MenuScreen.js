import React,{Component} from 'react';
import {Text,View,Image,ImageBackground,Platform,TouchableOpacity,Alert} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { ifIphoneX,isIphoneX } from 'react-native-iphone-x-helper'
import { observer, inject } from 'mobx-react';
import app from '../stores/app';
import store from 'react-native-simple-store';
@inject('naviStore','userStore')
@observer
export default class MenuScreen extends Component{

    constructor(props){
        super(props)
        this.app = app;
        this.state = {user:{}};
    }
    closeToggle(){
        this.props.naviStore.navigation.toggleDrawer({
            side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
            animated: true, // does the toggle have transition animation or does it happen immediately (optional)
            to: 'close' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
          });
    }
    async componentDidMount(){
        let user = await store.get("user");
        if(!user){
            user = {};
            user.name = "GUEST";
            user.surname = "GUEST";
        }
        this.setState({user:user});
    }
    gotoMenu(link){
        this.props.naviStore.navigation.push({
            screen: link, // unique ID registered with Navigation.registerScreen
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            animated: false, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
        })
        this.closeToggle();
    }

    render(){
        return(
            <View style={styles.menuScreenContainerStyle}>
                <ImageBackground 
                    source={require('./../source/images/menuBackground.png')}
                    resizeMode='stretch'
                    style={styles.menuBackgroundImageStyle}
                >
                <View style={{paddingTop:isIphoneX()?20:0,flex:1}}>
                    <View style={styles.userShortDetailContainerStyle}>
                        <View style={styles.userAvatarContainerStyle}>
                            <View style={styles.avatarBorderStyle}>
                                <Image
                                    source={{uri:this.props.userStore.user.profile_img}}
                                    style={styles.userAvatarImageStyle}
                                    resizeMode='cover'
                                />
                            </View>
                        </View>
                        <View style={styles.userShortDetailSectionStyle}>
                            <Text style={styles.userNameTextStyle}>{`${this.state.user.name} ${this.state.user.surname}`}</Text>
                            {this.state.user.name != "GUEST" && <TouchableOpacity onPress={()=>this.gotoMenu("mti.ProfileScreen")
                            }>
                                <Text style={styles.userPrivateDetailTextStyle}>ข้อมูลส่วนตัว</Text>
                            </TouchableOpacity>}
                        </View>
                    </View>
               
                    <View style={styles.menuContainerStyle}>
                        <View style={styles.mainBorderStyle}/>
                        <View style={styles.menuSectionStyle}>        
                            <TouchableOpacity style={styles.menuSubSectionStyle}
                                onPress={()=>this.gotoMenu("mti.UserInsuranceListScreen")
                                }
                            >
                                <Image
                                    source={require('./../source/icons/iconInsuranceWhite.png')}
                                    resizeMode='contain'
                                    style={styles.menuIconStyle}
                                />
                                <Text style={styles.menuTitleTextStyle}>ข้อมูลกรมธรรม์</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subBorderStyle}/>
                        <View style={styles.menuSectionStyle}>        
                            <TouchableOpacity style={styles.menuSubSectionStyle}>
                                <Image
                                    source={require('./../source/icons/iconHistoryWhite.png')}
                                    resizeMode='contain'
                                    style={styles.menuIconStyle}
                                />
                                <Text style={styles.menuTitleTextStyle}>ประวัติการใช้งาน</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subBorderStyle}/>
                        <View style={styles.menuSectionStyle}>        
                            <TouchableOpacity style={styles.menuSubSectionStyle}>
                                <Image
                                    source={require('./../source/icons/iconFavoriteWhite.png')}
                                    resizeMode='contain'
                                    style={styles.menuIconStyle}
                                />
                                <Text style={styles.menuTitleTextStyle}>รายการโปรด</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subBorderStyle}/>
                        <View style={styles.menuSectionStyle}>        
                            <TouchableOpacity style={styles.menuSubSectionStyle}>
                                <Image
                                    source={require('./../source/icons/iconNotificationWhite.png')}
                                    resizeMode='contain'
                                    style={styles.menuIconStyle}
                                />
                                <Text style={styles.menuTitleTextStyle}>การแจ้งเตือน</Text> 
                            </TouchableOpacity>
                        </View>
                        {/* <View style={styles.mainBorderStyle}/> */}
                        {/* <View style={styles.menuSectionStyle}>        
                            <TouchableOpacity style={styles.menuSubSectionStyle} 
                            onPress={()=>this.gotoMenu("mti.PrivilegeScreen")}>
                                <Image
                                    source={require('./../source/icons/iconPrivilegeWhite.png')}
                                    resizeMode='contain'
                                    style={styles.menuIconStyle}
                                />
                                <Text style={styles.menuTitleTextStyle}>สิทธิพิเศษ</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subBorderStyle}/> */}
                        <View style={styles.subBorderStyle}/>
                        <View style={styles.menuSectionStyle}>        
                            <TouchableOpacity style={styles.menuSubSectionStyle}>
                                <Image
                                    source={require('./../source/icons/iconActivityWhite.png')}
                                    resizeMode='contain'
                                    style={styles.menuIconStyle}
                                />
                                <Text style={styles.menuTitleTextStyle}>กิจกรรม</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subBorderStyle}/>
                        {/* <View style={styles.menuSectionStyle}>        
                            <TouchableOpacity onPress={()=>this.gotoMenu("mti.ServiceScreen")} style={styles.menuSubSectionStyle}>
                                <Image
                                    source={require('./../source/icons/iconServiceWhite.png')}
                                    resizeMode='contain'
                                    style={styles.menuIconStyle}
                                />
                                <Text style={styles.menuTitleTextStyle}>บริการ</Text> 
                            </TouchableOpacity>
                        </View> */}
                        {/* <View style={styles.mainBorderStyle}/> */}
                        <View style={styles.menuSectionStyle}>        
                            <TouchableOpacity style={styles.menuSubSectionStyle}
                                onPress={()=>this.gotoMenu("mti.ContactUsScreen")}
                            >
                                <Image
                                    source={require('./../source/icons/iconContactWhite.png')}
                                    resizeMode='contain'
                                    style={styles.menuIconStyle}
                                />
                                <Text style={styles.menuTitleTextStyle}>ติดต่อเรา</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subBorderStyle}/>
                        <View style={styles.menuSectionStyle}>        
                            <TouchableOpacity onPress={()=>this.gotoMenu("mti.SettingScreen")} style={styles.menuSubSectionStyle}>
                                <Image
                                    source={require('./../source/icons/iconSettingWhite.png')}
                                    resizeMode='contain'
                                    style={styles.menuIconStyle}
                                />
                                <Text style={styles.menuTitleTextStyle}>การตั้งค่า</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subBorderStyle}/>
                        <View style={styles.menuSectionStyle}>        
                            <TouchableOpacity onPress={()=>{
                                 Alert.alert(
                                    "คำเตือน",
                                    "ยืนยันการออกจาจากระบบใช่หรือไหม่",
                                    [
                                    {text: "ยกเลิก"},
                                    {text: "ออกจากระบบ", onPress: ()=> {
                                        store.delete("user");
                                        store.delete("token");
                                        this.props.userStore.user = {};
                                        this.props.naviStore.navigation.resetTo({
                                            screen: "mti.LoginScreen", // unique ID registered with Navigation.registerScreen
                                            title: undefined, // navigation bar title of the pushed screen (optional)
                                            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                                            animated: false, // does the push have transition animation or does it happen immediately (optional)
                                            backButtonTitle: undefined, // override the back button title (optional)
                                            backButtonHidden: false, // hide the back button altogether (optional)
                                        })
                                        this.app.logout();
                                        
                                    }},
                                    ],
                                    { cancelable: false }
                                  )
                            }}
                            style={styles.menuSubSectionStyle}>
                                <Image
                                    source={require('./../source/icons/iconLogoutWhite.png')}
                                    resizeMode='contain'
                                    style={styles.menuIconStyle}
                                />
                                <Text style={styles.menuTitleTextStyle}>ออกจากระบบ</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subBorderStyle}/>
                    </View>
                </View>
                </ImageBackground>
            </View>
        )
    }
}

const paddingTop = Platform.OS==='ios'?25:35

const styles={
    menuScreenContainerStyle:{
        flex: 1,
    },
    menuBackgroundImageStyle:{
        flex: 1,
        paddingTop: paddingTop,
        paddingBottom: responsiveHeight(2),
    },
    userShortDetailContainerStyle:{
        flexDirection: 'row',
    },
    userAvatarContainerStyle:{
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarBorderStyle:{
        height: responsiveHeight(7.7),
        width: responsiveHeight(7.7),
        borderWidth: responsiveFontSize(0.4),
        borderRadius: responsiveHeight(3.85),
        borderColor: "#d8d8d9",
        alignItems: 'center',
        justifyContent: 'center',
    },
    userAvatarImageStyle:{
        height: responsiveHeight(7.52),
        width: responsiveHeight(7.52),
        borderRadius: responsiveHeight(3.76),
    },  
    userShortDetailSectionStyle:{
        flex: 0.7,
        justifyContent: 'center',
    },
    userNameTextStyle:{
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: responsiveFontSize(3),
        opacity: 0.9,
    },
    userPrivateDetailTextStyle:{
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: responsiveFontSize(2),
        opacity: 0.9,
    },
    mainBorderStyle:{
        borderTopWidth: responsiveHeight(0.17),
        borderColor: '#FFF',
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
        opacity: 0.4,
    },
    menuContainerStyle:{
        flex: 1,
        paddingLeft: responsiveWidth(5),
        paddingRight: responsiveWidth(5)
    },
    menuSectionStyle:{
        flex: 1,
    },
    menuSubSectionStyle:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIconStyle:{
        height: responsiveHeight(3.52),
        opacity: 0.9,
        flex: 0.2,
    },
    menuTitleTextStyle:{
        color: 'rgba(255, 255, 255, 0.9)',
        opacity: 0.9,
        fontSize: responsiveFontSize(2),
        flex: 0.8,
    },
    subBorderStyle:{
        borderTopWidth: responsiveHeight(0.17),
        borderColor: '#FFF',
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
        opacity: 0.1,
    }
}
