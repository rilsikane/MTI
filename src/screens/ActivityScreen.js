import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity,FlatList,ScrollView} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Carousel from 'react-native-looped-carousel';

import {Headers} from '../components/Headers';
import {PastEventCard} from '../components/PastEventCard';
import {post,authen,get,getBasic} from '../api';
import store from 'react-native-simple-store';

export default class ActivityScreen extends Component{

    constructor(props){
        super(props)
        this.state = {incomingActivityList:[],pastActivityList:[]}

        this.showAllActivity = this.showAllActivity.bind(this);
    }
    componentDidMount(){
        this.init();
    }
    async init(){
        let user = await store.get("user");
        let [response1,response2] =  await Promise.all([getBasic("activity?filter_group_id=3",{}),getBasic("activity?filter_group_id=1",{})]);
        
        if(response1){
            this.setState({incomingActivityList:response1.data});
        }
        if(response2){
            this.setState({pastActivityList:response2.data});
        }
    }

    renderBannerImageList(){
        let bannerUri=this.state.incomingActivityList.length>0 ? this.state.incomingActivityList:[
            {
                picture: '../source/images/activityImg05.png'
            }
        ]

        return bannerUri.map((data,i)=>
            <Image
                key={i}
                source={{uri:data.picture}}
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
                data={this.state.pastActivityList}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.activityListContainerStyle}
                renderItem={this._renderItem}
                keyExtractor={(item,index)=>index.toString()}
            />
        )
    }
    openDetail(item){
        this.props.navigator.push({
            screen: "mti.ActivityDetailScreen", // unique ID registered with Navigation.registerScreen
            passProps:{data:item},
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            animated: false, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
        })
    }

    _renderItem=({item,index})=>(
        <PastEventCard
            onPress={()=>this.openDetail(item)}
            bannerUri={{uri:item.picture}}
            eventTitleText={item.title}
            eventDetailText={item.detail}
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
                        {this.state.pastActivityList.length > 0 && this.renderPastEventCard()}
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