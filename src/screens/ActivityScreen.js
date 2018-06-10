import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity,FlatList,ScrollView} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Carousel from 'react-native-looped-carousel';

import {Headers} from '../components/Headers';
import {PastEventCard} from '../components/PastEventCard';

export default class ActivityScreen extends Component{

    constructor(props){
        super(props)
        this.showAllActivity = this.showAllActivity.bind(this);
    }

    renderBannerImageList(){
        const bannerUri=[
            {
                uri: require('../source/images/activityImg05.png')
            },
            {
                uri: require('../source/images/activityImg01.png')
            },
            {
                uri: require('../source/images/activityImg02.png')
            },
        ]

        return bannerUri.map((data,i)=>
            <Image
                key={i}
                source={data.uri}
                style={styles.bannerImageStyle}
            />
        )
    }

    renderPastEventCard(){
        let pastEvent=[
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

        return(
            <FlatList
                data={pastEvent}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.activityListContainerStyle}
                renderItem={this._renderItem}
                keyExtractor={(item,index)=>index.toString()}
            />
        )
    }

    _renderItem=({item,index})=>(
        <PastEventCard
            bannerUri={item.bannerUri}
            eventTitleText={item.eventTitleText}
            eventDetailText={item.eventDetailText}
            style={[{marginRight: responsiveWidth(5)},index==0&&{marginLeft: responsiveWidth(5)}]}
        />
    )

    showAllActivity(){
        this.props.navigator.push({
            screen: "mti.ActivityListScreen", // unique ID registered with Navigation.registerScreen
            passProps:{},
            animated: false, // does the push have transition animation or does it happen immediately (optional)
        })
    }

    render(){
        return(
            <View style={styles.activityScreenContainerStyle}>
                <Headers
                    leftIconName='menu'
                    headerTitleText='กิจกรรม'
                    rightIconName='iconBell'
                />
                <ScrollView style={styles.activityContainerStyle}>
                    <View style={styles.activityContainerStyle}>
                        <View style={styles.bannerContainerStyle}>
                            <Carousel
                                delay={2000}
                                style={{flex: 1,}}
                                autoplay
                                bullets
                                bulletStyle={styles.bulletStyle}
                                chosenBulletStyle={styles.chosenBulletStyle}
                                bulletsContainerStyle={styles.bulletsContainerStyle}
                            >
                                {this.renderBannerImageList()}
                            </Carousel>
                        </View>
                        <View style={styles.titleTextContainerStyle}>
                            <Text style={styles.sectionTitleTextStyle}>กิจกรรมที่ผ่านมา</Text>
                            <TouchableOpacity onPress={this.showAllActivity} style={styles.showAllContainerStyle}>
                                <Text style={styles.showAllTextStyle}>ดูทั้งหมด</Text>
                            </TouchableOpacity>
                        </View>
                        {this.renderPastEventCard()}
                        <View style={styles.adContainerStylr}>
                            <Image
                                source={require('../source/images/promotionImg.png')}
                                style={styles.adContainerStylr}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles={
    activityScreenContainerStyle:{
        flex: 1,
    },
    activityContainerStyle:{
        flex: 1,
    },
    bannerContainerStyle:{
        height: responsiveHeight(34),
    },
    bannerImageStyle:{
        height: responsiveHeight(29),
        width: responsiveWidth(100),
    },
    bulletStyle:{
        width: responsiveHeight(0.88),
        height: responsiveHeight(0.88),
        backgroundColor: "#c0bfbf",
        borderWidth: 0,
    },
    chosenBulletStyle:{
        backgroundColor: 'rgb(253,98,98)',
        width: responsiveHeight(0.88),
        height: responsiveHeight(0.88),
    },
    bulletsContainerStyle:{
        height: responsiveHeight(1),
    },
    titleTextContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: responsiveHeight(1),
    },
    sectionTitleTextStyle:{
        fontSize: responsiveFontSize(3),
        color: '#1595d3',
        marginLeft: responsiveWidth(5),
    },
    showAllContainerStyle:{
        marginRight: responsiveWidth(5),
    },
    showAllTextStyle:{
        color: '#919195',
        fontSize: responsiveFontSize(2),
    },
    adContainerStylr:{
        height: responsiveHeight(18.3),
        width: '100%'
    },
    activityListContainerStyle:{
        marginBottom: responsiveHeight(2),
    }
}