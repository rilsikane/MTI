import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity,ScrollView} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from '../components/Headers';

export default class NotificationScreen extends Component{

    constructor(props){
        super(props)

    }

    renderPrivilegeNotification(){
        let notifications =[
            {
                title: 'สิทธิพิเศษแนะนำสำหรับคุณ',
                cat: 'Lifstyle',
                shortDescription: 'ออกกำลังกายฟรี ที่ WE Fitness 2 วัน พร้อมลด 10% เมื่อสมัครสมาชิก',
                thumbnailUri: require('../source/images/notificationImg01.png'),
                isReaded: false,
            },
            {
                title: 'สิทธิพิเศษมาใหม่',
                cat: 'Dining',
                shortDescription: 'ส่วนลด 20% ที่ร้าน iberry เมื่อสั่งเมนูขนมหวานครบ 1,000 บาท รับฟรีไอศครีม 1 ถ้วย',
                thumbnailUri: require('../source/images/notificationImg02.png'),
                isReaded: false,
            }
        ]

        return notifications.map((data,i)=>
            <View key={i}>
                <TouchableOpacity style={styles.notificationCardContainerStyle}>
                    <View style={styles.readedIconContainerStyle}>
                        {data.isReaded?
                          <View/>:<Image
                            source={require('../source/icons/iconNotificationUnread.png')}
                            resizeMode='contain'
                            style={styles.unreadIconStyle}/>
                        }
                    </View>
                    <View style={styles.notifyThumbnailContainerStyle}>
                        <Image
                            source={data.thumbnailUri}
                            resizeMode='contain'
                            style={styles.notifyThumbnailStyle}
                            borderRadius={3}
                        />
                    </View>
                    <View style={styles.notifyDetailContainerStyle}>
                        <Text style={styles.notifyTitleTextStyle}>{`${data.title} หมวด : ${data.cat}`}</Text>
                        <Text numberOfLines={2} style={styles.notifyShortDesTextStyle}>{data.shortDescription}</Text>
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
            <View key={i}>
                <TouchableOpacity style={styles.userNotificationContainerStyle}>
                    <Text style={styles.userNotificationTextStyle}>โปรไฟล์ : {data.title}</Text>
                    <Text style={styles.notifyShortDesTextStyle}>{data.shortDescription}</Text>
                </TouchableOpacity>
                <Image
                    source={require('../source/images/dotSectionHorizontal.png')}
                    resizeMode='contain'
                    style={styles.dotSectionImageStyle}
                />
            </View>
        )
    }

    render(){
        return(
            <View style={styles.notificationScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='การ '
                    cancel={()=>this.props.navigator.pop()}
                />
                <ScrollView style={{flex: 1,}}>
                    <View style={styles.notificationDetailContainerStyle}>
                        {this.renderPrivilegeNotification()}
                        {this.renderUserInsuranceNotfication()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles={
    notificationScreenContainerStyle:{
        flex: 1,
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
        height: responsiveHeight(8.45),

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
