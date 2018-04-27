import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from '../components/Headers';
import {EventButtonGroup} from '../components/EventButtonGroup';
import {MainSubmitButton} from '../components/MainSubmitButton';
import {CommentCard} from '../components/CommentCard';
import {PastEventCard} from '../components/PastEventCard';

export default class ActivityDetailScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            showComment: true,
        }
    }

    renderOtherActivityList(){
        let event = [
            {
                bannerUri: require('../source/images/activityImg01.png'),
                eventTitleText: 'MTI 8 Anniversary "ยิ้มรับความสำเร็จ..ฉลอง ก้าวแห่งความภาคภูมิใจ" กับเมืองไทยประกันภัย',
                eventDetailText: 'นำลูกค้าล่องเรือชมบรรยากาศริมแม่น้ำเจ้าพระยา พร้อมรับประทานอาหารค่ำและชมมินิคอนเสิร์ต จากศิลปินคู่ ดูโอ แอน(ธิติมา) - ปิงปอง(ศิรศักดิ์) พร้อมกันนี้ ยังมีกิจกรรม...'
            },
            {
                bannerUri: require('../source/images/latestActImg.png'),
                eventTitleText: 'MTI 8 Anniversary "ยิ้มรับความสำเร็จ..ฉลอง ก้าวแห่งความภาคภูมิใจ" กับเมืองไทยประกันภัย',
                eventDetailText: 'นำลูกค้าล่องเรือชมบรรยากาศริมแม่น้ำเจ้าพระยา พร้อมรับประทานอาหารค่ำและชมมินิคอนเสิร์ต จากศิลปินคู่ ดูโอ แอน(ธิติมา) - ปิงปอง(ศิรศักดิ์) พร้อมกันนี้ ยังมีกิจกรรม...'
            }
        ]

        return event.map((data,i)=>
            <PastEventCard
                key={i}
                bannerUri={data.bannerUri}
                eventTitleText={data.eventTitleText}
                eventDetailText={data.eventDetailText}
                style={[{marginLeft: responsiveWidth(3)},i==event.length-1&&{marginRight: responsiveWidth(3)}]}
            />
        )
    }

    render(){
        let comment = [
            {
                userThumbUri: require('../source/images/userCommentThumb01.png'),
                userName: 'ภิรยา',
                createDate: '5 มีนาคม 2061',
                commentDetail: 'กิจกรรมนี้สนุกมากเลยค่ะ เป็นกันเองสุดๆเลย อยากให้จัดแบบนี้บ่อยๆ จังเลยค่ะ'
            },
        ]

        return(
            <View style={styles.ActivityDetailScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='รายละเอียดกิจกรรม'
                />
                <ScrollView style={{flex: 1,}}>
                    <View style={styles.activityDetailContainerStyle}>
                        <View style={styles.activityBannerImageContainerStyle}>
                            <Image
                                source={require('../source/images/latestActImg.png')}
                                //resizeMode='stretch'
                                borderRadius={3}
                                style={styles.bannerImageStyle}
                            />
                        </View>
                        <View style={styles.activityContentContainerStyle}>
                            <Text style={styles.activityTitleTextStyle}>MTI 8 Anniversary "ยิ้มรับความสำเร็จ..ฉลอง ก้าวแห่งความภาคภูมิใจ"</Text>
                            <Text style={styles.activityDescriptionTextStyle}>เมืองไทยประกันภัยเชิญลูกค้า ร่วมกิจกรรม"เฉลิมฉลองครบรอบ 8 ปี พร้อมก้าวสู่ปีที่ 9 กับเมืองไทยประกันภัย"  โดยนำลูกค้าล่องเรือชมบรรยากาศริมแม่น้ำเจ้าพระยา พร้อมรับประทานอาหารค่ำและชมมินิคอนเสิร์ต จากศิลปินคู่ดูโอ แอน(ธิติมา) - ปิงปอง(ศิรศักดิ์) พร้อมกันนี้ ยังมีกิจกรรมให้ร่วมสนุกกันอย่างสนุกสนานอีกด้วย</Text>
                            <Image
                                source={require('../source/images/dotSectionHorizontal.png')}
                                resizeMode='contain'
                                style={styles.dotSectionImageStyle}
                            />
                            <View style={styles.eventButtonGroupContainerStyle}>
                                <Text style={styles.activityDateTextStyle}>วันที่ 12 กุมภาพันธ์ 2061</Text>
                                <EventButtonGroup
                                    isFavorite
                                    isShareSelected
                                />
                            </View>
                            <MainSubmitButton
                                buttonTitleText='กรอกแบบสอบถามกิจกรรม'
                                onPress={()=>alert('submit')}
                                style={styles.submitButtonStyle}
                            />
                            {this.state.showComment&&
                            <CommentCard
                                commentList={comment}
                                onSendMessagePress={()=>alert('send')}
                            />}
                        </View>
                    </View>
                    <View style={styles.otherActivityContainerStyle}>
                        <View style={styles.otherActivityTitleContainerStyle}>
                            <Text style={styles.otherActivityTitleTextStyle}>กิจกรรมอื่น</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAllTextStyle}>ดูทั้งหมด</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.otherActivityListContainerStyle}>
                            <ScrollView horizontal style={{flex: 1,}} showsHorizontalScrollIndicator={false}>
                                {this.renderOtherActivityList()}
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles={
    ActivityDetailScreenContainerStyle:{
        flex: 1,
    },
    activityDetailContainerStyle:{
        flex: 1,
        backgroundColor: '#f6f6f6',
        borderBottomWidth: responsiveHeight(0.17),
        borderColor: '#dddddd',
        paddingBottom: responsiveHeight(2.5),
    },
    activityBannerImageContainerStyle:{
        height: responsiveHeight(23.23),
        width: responsiveWidth(90),
        alignSelf: 'center',
        marginTop: responsiveHeight(3.5),
    },
    bannerImageStyle:{
        height: responsiveHeight(23.23),
        width: responsiveWidth(90),
    },
    activityContentContainerStyle:{
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
    },
    activityTitleTextStyle:{
         
        fontSize: responsiveFontSize(3),
        letterSpacing: 0,
        color: "#1595d3",
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(1),
    },
    activityDescriptionTextStyle:{
        fontSize: responsiveFontSize(2.15),
        letterSpacing: 0.28,
        color: "#919195"
    },
    dotSectionImageStyle:{
        width: '100%',
        opacity: 0.3,
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(2),
        alignSelf: 'center',
    },
    dotSectionBottomImageStyle:{
        width: '100%',
        opacity: 0.3,
        marginTop: responsiveHeight(2.5),
        marginBottom: responsiveHeight(1),
    },
    eventButtonGroupContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    activityDateTextStyle:{
        fontSize: responsiveFontSize(2.15),
        letterSpacing: 0.2,
        color: "#1595d3"
    },
    submitButtonStyle:{
        marginTop: responsiveHeight(2),
    },
    otherActivityContainerStyle:{
        flex: 1,
    },
    otherActivityTitleContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: responsiveWidth(4.6),
        marginRight: responsiveWidth(4.6),
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(1.5),
    },
    otherActivityTitleTextStyle:{
        letterSpacing: 0,
        color: "#1595d3",
        fontSize: responsiveFontSize(2.8),
         
    },
    seeAllTextStyle:{
        color: "rgba(85, 86, 90, 0.6)",
        fontSize: responsiveFontSize(2),
    },
    otherActivityListContainerStyle:{
        flex: 1,
        marginBottom: responsiveHeight(2),
    }
}