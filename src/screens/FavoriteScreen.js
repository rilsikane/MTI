import React,{Component} from 'react';
import {Text,View,ScrollView,FlatList} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {DashboardActivityCard} from './../components/DashboardActivityCard';
import {PastEventCard} from '../components/PastEventCard';

export default class FavoriteScreen extends Component{

    constructor(props){
        super(props)

    }

    renderFavoriteList(){
        let favorite = [
            {
                bannerUri: require('../source/images/privilegeImg01.png'),
                iconUri: require('./../source/icons/iconHealthySelected.png'),
                iconTitleText: 'Healthy',
                activityTitleText: 'ตรวจสุขภาพสายตาฟรี (มูลค่า 1,000 บาท) พร้อมส่วนลดแว่นตาสูงสุด 55%'
            },
            {
                bannerUri: require('../source/images/wefitness-logo.png'),
                iconUri: require('./../source/icons/iconHealthySelected.png'),
                iconTitleText: 'Healthy',
                activityTitleText: 'ออกกำลังกายฟรี ที่ WE Fitness 2 วัน พร้อมลด 10% เมื่อสมัครสมาชิก'
            },
            {
                bannerUri: require('../source/images/lifestyle-logo.png'),
                iconUri: require('./../source/icons/iconDiningSelected.png'),
                iconTitleText: 'Dining',
                activityTitleText: 'ส่วนลด 20% ที่ร้าน iberry เมื่อสั่งเมนูขนมหวานครบ 1,000 บาท รับฟรีไอศครีม 1 ถ้วย'
            },
        ]

        return(
            <FlatList
                data={favorite}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
            />
        )
    }

    _renderItem = ({item}) => (
        <DashboardActivityCard 
            bannerUri={item.bannerUri}
            iconUri={item.iconUri}
            iconTitleText={item.iconTitleText}
            activityTitleText={item.activityTitleText}
            style={styles.favoriteItemStyle}
        />
    );

    _keyExtractor = (item, index) => index.toString();

    renderPastedEvent(){
        let pastedEvent = [
            {
                bannerUri: require('../source/images/latestActImg.png'),
                eventTitleText: 'MTI 8 Anniversary "ยิ้มรับความสำเร็จ..ฉลอง ก้าวแห่งความภาคภูมิใจ" กับเมืองไทยประกันภัย',
                eventDetailText: 'นำลูกค้าล่องเรือชมบรรยากาศริมแม่น้ำเจ้าพระยา พร้อมรับประทานอาหารค่ำและชมมินิคอนเสิร์ต จากศิลปินคู่ ดูโอ แอน(ธิติมา) - ปิงปอง(ศิรศักดิ์) พร้อมกันนี้ ยังมีกิจกรรม...',
            }
        ]

        return(
            <FlatList
                data={pastedEvent}
                renderItem={this.renderEventCardItem}
                keyExtractor={this.eventCardkeyExtractor}
            />
        )
    }   

    renderEventCardItem = ({item}) =>(
        <PastEventCard
            bannerUri={item.bannerUri}
            eventTitleText={item.eventTitleText}
            eventDetailText={item.eventDetailText}
            style={styles.pastedEventContainerStyle}
        />
    )

    eventCardkeyExtractor = (item, index) => index.toString();

    renderNewEvent(){
        let newEvent = [
            {
                bannerUri: require('../source/images/newEventImg.png'),
                day: '15',
                month: 'มกราคม',
                activityTitleText: 'Chef for a Day',
                activityDetailText: 'Cupcake Workshops & Master classes'
            },
            {
                bannerUri: require('../source/images/privilegeImg02.png'),
                iconUri: require('./../source/icons/iconBeautySelected.png'),
                iconTitleText: 'Beauty',
                activityTitleText: 'ส่วนลด 20% เมื่อซื้อชุดของขวัญ Estee Lauder Set Makeup'
            },
        ]

        return(
            <FlatList
                data={newEvent}
                renderItem={this.renderNewEventCardItem}
                keyExtractor={this.newEventCardkeyExtractor}
            />
        )
    }   

    renderNewEventCardItem = ({item}) =>(
        <DashboardActivityCard 
            bannerUri={item.bannerUri}
            iconUri={item.iconUri}
            iconText={item.day}
            iconTitleText={item.month?item.month:item.iconTitleText}
            activityTitleText={item.activityTitleText}
            activityDetailText={item.activityDetailText}
            style={styles.newEventImageStyle}
        />
    )

    newEventCardkeyExtractor = (item, index) => index.toString();

    render(){
        return(
            <View style={styles.favoriteScreenContainerStyle}>
                <Headers
                    leftIconName='menu'
                    headerTitleText='รายการโปรด'
                    rightIconName='iconBell'
                />
                <ScrollView style={{flex: 1,}}>
                    <View style={styles.favoriteContainerStyle}>
                        {this.renderFavoriteList()}
                        {this.renderPastedEvent()}
                        {this.renderNewEvent()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles={
    favoriteScreenContainerStyle:{
        flex: 1,
    },
    favoriteContainerStyle:{
        flex: 1,
        alignItems: 'center',
        marginTop: responsiveHeight(3.5),
    },
    favoriteItemStyle:{
        marginBottom: responsiveHeight(2),
    },
    newEventImageStyle:{
        width: responsiveWidth(90),
        marginBottom: responsiveHeight(2),
    },
    pastedEventContainerStyle:{
        marginBottom: responsiveHeight(2),
    }
}