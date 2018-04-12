import React,{Component} from 'react';
import {Text,View,Image,ScrollView} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {MainSearchBox} from '../components/MainSearchBox';
import {LifeStyleTabs} from '../components/LifeStyleTabs';
import {DashboardActivityCard} from '../components/DashboardActivityCard';

export default class PrivilegeScreen extends Component{

    constructor(props){
        super(props)

    }

    renderPrivilegeList(){
        let privilege=[
            {
                imageUri: require('../source/images/privilegeImg01.png'),
                lifeStyleIconUri: require('../source/icons/iconTabsActiveHealthWhite.png'),
                lifeStyleTitleText: 'Health and Beauty',
                detail: 'ตรวจสุขภาพสายตาฟรี (มูลค่า 1,000 บาท) พร้อมส่วนลดแว่นตาสูงสุด 55%',
            },
            {
                imageUri: require('../source/images/wefitness-logo.png'),
                lifeStyleIconUri: require('../source/icons/iconHealthySelected.png'),
                lifeStyleTitleText: 'Healthy',
                detail: 'ออกกำลังกายฟรี ที่ WE Fitness 2 วัน พร้อมลด 10% เมื่อสมัครสมาชิก',
            },
            {
                imageUri: require('../source/images/lifestyle-logo.png'),
                lifeStyleIconUri: require('../source/icons/iconDiningSelected.png'),
                lifeStyleTitleText: 'Dining',
                detail: 'ส่วนลด 20% ที่ร้าน iberry เมื่อสั่งเมนูขนมหวานครบ 1,000 บาท รับฟรีไอศครีม 1 ถ้วย',
            },
            {
                imageUri: require('../source/images/privilegeImg02.png'),
                lifeStyleIconUri: require('../source/icons/iconBeautySelected.png'),
                lifeStyleTitleText: 'Beauty',
                detail: 'ส่วนลด 20% เมื่อซื้อชุดของขวัญ Estee Lauder Set Makeup',
            },
            {
                imageUri: require('../source/images/privilegeImg03.png'),
                lifeStyleIconUri: require('../source/icons/iconTravelSelected.png'),
                lifeStyleTitleText: 'Travel',
                detail: 'ส่วนลด 20% ที่ร้าน iberry เมื่อสั่งเมนูขนมหวานครบ 1,000 บาท รับฟรีไอศครีม 1 ถ้วย',
            },
        ]

        return privilege.map((privilege,i)=>
            <DashboardActivityCard 
                key={i} 
                bannerUri={privilege.imageUri}
                iconUri={privilege.lifeStyleIconUri}
                iconTitleText={privilege.lifeStyleTitleText}
                activityTitleText={privilege.detail}
                style={[styles.dashboardActivityCardContainerStyle,i==0?{marginTop: responsiveHeight(3)}:{}]}
                iconContainerStyle={i==0?{flex: 0.35}:{}}
                detailContainerStyle={i==0?{flex: 0.65}:{}}
            />
        )
    }

    render(){
        return(
            <View style={styles.privilegeScreenContainerStyle}>
                <Headers
                    leftIconName='menu'
                    headerTitleText='สิทธิพิเศษ'
                    rightIconName='iconBell'
                    withSearch
                />
                <MainSearchBox
                    onPress={()=>alert('search')}
                />
                <ScrollView>
                    <LifeStyleTabs
                        tabChildren={this.renderPrivilegeList()}
                    />
                    <View style={styles.privilegeListContainerStyle}>
                        <Image
                            source={require('./../source/images/promotionImg.png')}
                            style={styles.promotionImageStyle}
                            resizeMode='stretch'
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles={
    privilegeScreenContainerStyle:{
        flex: 1,
    },
    privilegeListContainerStyle:{
  
    },
    promotionImageStyle:{
        height: responsiveHeight(18.30),
        width: responsiveWidth(100),
        marginTop: responsiveHeight(2),
    },
    dashboardActivityCardContainerStyle:{
        marginBottom: responsiveHeight(2),
    }
}