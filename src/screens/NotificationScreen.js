import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity,ScrollView,PushNotificationIOS,Platform} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from '../components/Headers';
import {get,post} from '../api';
import store from 'react-native-simple-store';
import { observer, inject } from 'mobx-react';
import FastImage from 'react-native-fast-image'
import app from '../stores/app';
@inject('naviStore')
@observer
export default class NotificationScreen extends Component{

    constructor(props){
        super(props)
        this.state = {notifications:[],isLoading:true}
        this.app = app;
    }
    async componentDidMount(){
        let response = await get("me/notifications");
        if(response && response.data){
          this.app.badge = response.data.filter(data=>data.status=="NEW").length;
          if(Platform.OS === 'ios'){
            PushNotificationIOS.setApplicationIconBadgeNumber(this.app.badge);
          }else{
            
          }
          store.save("badge",this.app.badge);
          this.setState({notifications:response.data});
        }else{
          this.setState({isLoading:false});
        }
    };
    
    async openDetail(item){
        await post(`me/notification/${item.id}/read`);
        item.status="READ"
        if(item.ref_type=="notification" && item.ref_content_id=="0"){
            
            return
        }
        this.app.badge = this.state.notifications.filter(data=>data.status=="NEW").length;

        // this.props.naviStore.navigation.popToRoot({
        //     animated: false, // does the popToRoot have transition animation or does it happen immediately (optional)
        //     animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
        // });

        item.id = item.ref_content_id;
        if(item.ref_type!='activity'){
            // if(this.props.naviStore.isPrivillege=="false"){
            //     this.props.naviStore.hotdata = item;
            //     setTimeout(()=>{
            //         this.props.navigator.switchToTab({
            //             tabIndex:2// (optional) if missing, this screen's tab will become selected
            //         });
            //     },500)
                
            // }else{
            //     setTimeout(()=>{
            //          this.props.navigator.push({
            //             screen: "mti.PrivilegeDetailScreen", // unique ID registered with Navigation.registerScreen
            //             passProps:{data:item},
            //             title: undefined, // navigation bar title of the pushed screen (optional)
            //             titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            //             animated: false, // does the push have transition animation or does it happen immediately (optional)
            //             backButtonTitle: undefined, // override the back button title (optional)
            //             backButtonHidden: false, // hide the back button altogether (optional)
            //         })
            //     },500)
               
            // }
            setTimeout(()=>{
                 this.props.navigator.push({
                    screen: "mti.PrivilegeDetailScreen", // unique ID registered with Navigation.registerScreen
                    passProps:{data:item,fromOther:true},
                    title: undefined, // navigation bar title of the pushed screen (optional)
                    titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                    animated: false, // does the push have transition animation or does it happen immediately (optional)
                    backButtonTitle: undefined, // override the back button title (optional)
                    backButtonHidden: false, // hide the back button altogether (optional)
                })
            },500)
        }else{
           
            // if(this.props.naviStore.isActivity=="false"){
            //     setTimeout(()=>{
            //         this.props.naviStore.hotdata = item;
            //         this.props.naviStore.hotdata.activity_id = item.ref_content_id;
            //         this.props.navigator.switchToTab({
            //             tabIndex:3// (optional) if missing, this screen's tab will become selected
            //         });
            //     },500)
            // }else{
                

            // }
            setTimeout(()=>{
                    item.activity_id = item.ref_content_id;
                    this.props.navigator.push({
                        screen: "mti.ActivityDetailScreen", // unique ID registered with Navigation.registerScreen
                        passProps:{data:item,filter_type:'next',fromOther:"mti.NotificationScreen"},
                        title: undefined, // navigation bar title of the pushed screen (optional)
                        titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                        animated: false, // does the push have transition animation or does it happen immediately (optional)
                        backButtonTitle: undefined, // override the back button title (optional)
                        backButtonHidden: false, // hide the back button altogether (optional)
                    })
            },500)
        }
    }
    renderPrivilegeNotification(){
       
        return this.state.notifications.map((data,i)=>
            <View  key={i}>
                <TouchableOpacity   onPress={()=>this.openDetail(data)} 
                style={[styles.notificationCardContainerStyle]}>
                    <View style={styles.readedIconContainerStyle}>
                        {"NEW"!=data.status?
                          <View/>:<Image
                            source={require('../source/icons/iconNotificationUnread.png')}
                            resizeMode='contain'
                            style={styles.unreadIconStyle}/>
                        }
                    </View>
                    <View style={styles.notifyThumbnailContainerStyle}>
                        <FastImage
                            source={data.picture_url ? {uri:data.picture_url}:require("../source/icons/iconApp01.png")}
                            resizeMode='contain'
                            style={styles.notifyThumbnailStyle}
                            borderRadius={3}
                        />
                    </View>
                    <View style={styles.notifyDetailContainerStyle}>
                        <Text numberOfLines={1} style={styles.notifyTitleTextStyle}>{`${data.content_title}`}</Text>
                        <Text numberOfLines={3} style={styles.notifyShortDesTextStyle}>{data.message}</Text>
                    </View>
                </TouchableOpacity>
                <Image
                    source={require('../source/images/dotSectionHorizontal.png')}
                    resizeMode='contain'
                    style={styles.dotSectionImageStyle}
                />
            </View>
        )
    }

    renderUserInsuranceNotfication(){
        let notifications=[
            {
                title: 'กรมธรรม์ของคุณ',
                shortDescription: 'กรมธรรม์ประกันอัคคีภัยสำหรับบ้านอยู่อาศัย ของคุณ กำลังจะหมดอายุในอีก 15 วัน'
            }
        ]

        return notifications.map((data,i)=>
            <TouchableOpacity key={i}>
                <View style={styles.userNotificationContainerStyle}>
                    <Text style={styles.userNotificationTextStyle}>โปรไฟล์ : {data.title}</Text>
                    <Text style={styles.notifyShortDesTextStyle}>{data.shortDescription}</Text>
                </View>
                <Image
                    source={require('../source/images/dotSectionHorizontal.png')}
                    resizeMode='contain'
                    style={styles.dotSectionImageStyle}
                />
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style={styles.notificationScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='การแจ้งเตือน'
                    back={()=>this.props.naviStore.navigation.popToRoot({
                        animated: true,
                        animationType: 'fade',
                    })}
                />
                <ScrollView style={{flex: 1,}}>
                    <View style={styles.notificationDetailContainerStyle}>
                        {this.renderPrivilegeNotification()}
                        {/* {this.renderUserInsuranceNotfication()} */}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles={
    notificationScreenContainerStyle:{
        flex: 1,
        backgroundColor:"#fff"
    },
    notificationDetailContainerStyle:{
        flex: 1,
        marginLeft: responsiveWidth(2.5),
        marginRight: responsiveWidth(2.5),
        marginTop: responsiveWidth(5),
    },
    notificationCardContainerStyle:{
        flexDirection: 'row',
        flex: 1,
    },
    readedIconContainerStyle:{
        flex: 0.02,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unreadIconStyle:{
        height: responsiveHeight(0.88),
        width: responsiveWidth(1.56),
    },
    notifyThumbnailContainerStyle:{
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notifyThumbnailStyle:{
        height: responsiveHeight(11),
        width:responsiveHeight(11)
    },
    notifyDetailContainerStyle:{
        flex: 0.68,
    },
    notifyTitleTextStyle:{
        fontSize: responsiveFontSize(2.15),
        color: '#fd6262',
        letterSpacing: 0.2,
    },
    notifyShortDesTextStyle:{
        fontSize: responsiveFontSize(2.2),
        color: '#1595d3',
        letterSpacing: -0.15,
    },
    dotSectionImageStyle:{
        width: responsiveWidth(90.31),
        opacity: 0.3,
        alignSelf: 'flex-end',
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
    },
    userNotificationContainerStyle:{
        width: responsiveWidth(90.31),
        alignSelf: 'flex-end',
    },
    userNotificationTextStyle:{
        fontSize: responsiveFontSize(2.15),
        color: '#919195',
        letterSpacing: 0.2,
    }
}
