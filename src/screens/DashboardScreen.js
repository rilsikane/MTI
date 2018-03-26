import React,{Component} from 'react';
import {Text,View,ScrollView,TouchableOpacity,Image} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {UserShortDetailCard} from './../components/UserShortDetailCard';
import {Headers} from './../components/Headers';
import {DashboardActivityCard} from './../components/DashboardActivityCard';
import {PastEventCard} from './../components/PastEventCard';
import { observer, inject } from 'mobx-react';

@inject('naviStore')
@observer
export default class DashboardScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            hotDeal:[
                {
                    bannerUri: require('./../source/images/wefitness-logo.png'),
                    iconUri: require('./../source/icons/iconHealthySelected.png'),
                    iconTitleText: 'Lifestyle',
                    activityTitleText: 'ออกกำลังกายฟรี ที่ WE Fitness 2 วัน พร้อมลด 10% เมื่อสมัครสมาชิก'
                },
                {
                    bannerUri: require('./../source/images/wefitness-logo.png'),
                    iconUri: require('./../source/icons/iconHealthySelected.png'),
                    iconTitleText: 'Lifestyle',
                    activityTitleText: 'ออกกำลังกายฟรี ที่ WE Fitness 2 วัน พร้อมลด 10% เมื่อสมัครสมาชิก'
                },
            ],

            myLifeStyle:[
                {
                    bannerUri: require('./../source/images/lifestyle-logo.png'),
                    iconUri: require('./../source/icons/iconDiningSelected.png'),
                    iconTitleText: 'Dining',
                    activityTitleText: 'ส่วนลด 20% ที่ร้าน iberry เมื่อสั่งเมนูขนมหวานครบ 1,000 บาท รับฟรีไอศครีม 1 ถ้วย'
                },
                {
                    bannerUri: require('./../source/images/lifestyle-logo.png'),
                    iconUri: require('./../source/icons/iconDiningSelected.png'),
                    iconTitleText: 'Dining',
                    activityTitleText: 'ส่วนลด 20% ที่ร้าน iberry เมื่อสั่งเมนูขนมหวานครบ 1,000 บาท รับฟรีไอศครีม 1 ถ้วย'
                }
            ],
            pastEvent:[
                {
                    bannerUri: require('./../source/images/latestActImg.png'),
                    eventTitleText: 'MTI 8 Anniversary "ยิ้มรับความสำเร็จ..ฉลอง ก้าวแห่งความภาคภูมิใจ" กับเมืองไทยประกันภัย',
                    eventDetailText: 'นำลูกค้าล่องเรือชมบรรยากาศริมแม่น้ำเจ้าพระยา พร้อมรับประทานอาหารค่ำและชมมินิคอนเสิร์ต จากศิลปินคู่ ดูโอ แอน(ธิติมา) - ปิงปอง(ศิรศักดิ์) พร้อมกันนี้ ยังมีกิจกรรม...'
                },
                {
                    bannerUri: require('./../source/images/latestActImg.png'),
                    eventTitleText: 'MTI 8 Anniversary "ยิ้มรับความสำเร็จ..ฉลอง ก้าวแห่งความภาคภูมิใจ" กับเมืองไทยประกันภัย',
                    eventDetailText: 'นำลูกค้าล่องเรือชมบรรยากาศริมแม่น้ำเจ้าพระยา พร้อมรับประทานอาหารค่ำและชมมินิคอนเสิร์ต จากศิลปินคู่ ดูโอ แอน(ธิติมา) - ปิงปอง(ศิรศักดิ์) พร้อมกันนี้ ยังมีกิจกรรม...'
                }
            ]
        }
        this.props.naviStore.navigation = this.props.navigator;
    }

    renderHotDealList(){
        return this.state.hotDeal.map((hotdeal,i)=>
            <DashboardActivityCard 
                key={i} 
                bannerUri={hotdeal.bannerUri}
                iconUri={hotdeal.iconUri}
                iconTitleText={hotdeal.iconTitleText}
                activityTitleText={hotdeal.activityTitleText}
                style={{marginLeft: responsiveWidth(3)}}
            />
        )
    }

    renderMyLifeStyleList(){
        return this.state.myLifeStyle.map((myLifeStyle,i)=>
            <DashboardActivityCard 
                key={i} 
                bannerUri={myLifeStyle.bannerUri}
                iconUri={myLifeStyle.iconUri}
                iconTitleText={myLifeStyle.iconTitleText}
                activityTitleText={myLifeStyle.activityTitleText}
                style={{marginLeft: responsiveWidth(3)}}
            />
        )
    }

    renderNewEventCard(){
        return(
            <DashboardActivityCard 
                bannerUri={require('./../source/images/newEventImg.png')}
                iconText={'15'}
                iconTitleText={'มกราคม'}
                activityTitleText='Chef for a Day'
                activityDetailText='Cupcake Workshops & Master classes'
                style={styles.newEventImageStyle}
            />
        )
    }

    renderPastEventCard(){
        return this.state.pastEvent.map((pastEvent,i)=>
            <PastEventCard
                key={i}
                bannerUri={pastEvent.bannerUri}
                eventTitleText={pastEvent.eventTitleText}
                eventDetailText={pastEvent.eventDetailText}
                style={{marginLeft: responsiveWidth(3)}}
            />
        )
    }

    render(){
        return(
            <View style={styles.dashboardScreenContainerStyle}>
                <Headers
                    leftIconName='menu'
                    headerTitleText='หน้าหลัก'
                    rightIconName='iconBell'
                    notify='2'
                />
                <ScrollView style={{flex: 1}}>
                    <UserShortDetailCard/>
                    <View style={styles.dashboardDetailTopContainerStyle}>
                        <View style={styles.hotDealTitleTextContainerStyle}>
                            <Text style={styles.dashboardSectionTitleTextStyle}>HOT DEAL</Text>
                            <TouchableOpacity style={styles.showAllContainerStyle}>
                                <Text style={styles.showAllTextStyle}>ดูทั้งหมด</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewActivityCardContainerStyle}>
                            {this.renderHotDealList()}
                        </ScrollView>
                        <View style={styles.hotDealTitleTextContainerStyle}>
                            <Text style={styles.dashboardSectionTitleTextStyle}>MY LIFESTYLE</Text>
                            <TouchableOpacity style={styles.showAllContainerStyle}>
                                <Text style={styles.showAllTextStyle}>ดูทั้งหมด</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewActivityCardContainerStyle}>
                            {this.renderMyLifeStyleList()}
                        </ScrollView>
                    </View>
                    <Image
                        source={require('./../source/images/promotionImg.png')}
                        style={styles.promotionImageStyle}
                        resizeMode='stretch'
                    />
                    <View style={styles.dashboardDetailTopContainerStyle}>
                        <View style={styles.hotDealTitleTextContainerStyle}>
                            <Text style={styles.dashboardSectionTitleTextStyle}>กิจกรรมที่มาใหม่</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            {this.renderNewEventCard()}
                        </View>
                        <View style={styles.hotDealTitleTextContainerStyle}>
                            <Text style={styles.dashboardSectionTitleTextStyle}>กิจกรรมที่ผ่านมา</Text>
                            <TouchableOpacity style={styles.showAllContainerStyle}>
                                <Text style={styles.showAllTextStyle}>ดูทั้งหมด</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewActivityCardContainerStyle}>
                            {this.renderPastEventCard()}
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles={
    dashboardScreenContainerStyle:{
        flex: 1,

    },
    hotDealTitleTextContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(1),
    },
    dashboardDetailTopContainerStyle:{
        flex: 1,
      
    },
    dashboardSectionTitleTextStyle:{
        fontSize: responsiveFontSize(3),
        color: '#1595d3',
        marginLeft: responsiveWidth(3),
    },
    newEventImageStyle:{
        width: responsiveWidth(90),

    },
    showAllContainerStyle:{
        marginRight: responsiveWidth(3),

    },
    showAllTextStyle:{
        color: '#919195',
        fontSize: responsiveFontSize(2),
    },
    scrollViewActivityCardContainerStyle:{
        flex:1
    },
    promotionImageStyle:{
        height: responsiveHeight(18.30),
        width: responsiveWidth(100),
        marginTop: responsiveHeight(2),
    }
}

