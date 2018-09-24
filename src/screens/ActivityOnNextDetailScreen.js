import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity,FlatList,ImageBackground} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from '../components/Headers';
import {EventButtonGroup} from '../components/EventButtonGroup';
import {MainSubmitButton} from '../components/MainSubmitButton';
import {CommentCard} from '../components/CommentCard';
import {DashboardActivityCard} from './../components/DashboardActivityCard';
import {ImageListPopup} from '../components/ImageListPopup';

export default class ActivityOnNextDetailScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            showComment: true,
            showMoreImage: false,
        }
    }

    renderNewEventCard(){
        let activity=[
            
        ]

        return(
            <FlatList
                data={activity}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />

        )
    }

    _renderItem = ({item}) => (
        <DashboardActivityCard 
            bannerUri={item.bannerUri}
            iconText={item.iconText}
            iconTitleText={item.iconTitleText}
            activityTitleText={item.activityTitleText}
            activityDetailText={item.activityDetailText}
            style={styles.newEventImageStyle}
        />
    );

    _keyExtractor = (item, index) => index.toString();

    
    // renderMoreImagePopup(){
    //     const imageUriList=[
    //         {
    //             uri: require('../source/images/latestActImg.png')
    //         },
    //         {
    //             uri: require('../source/images/activityImg04.png')
    //         },
    //         {
    //             uri: require('../source/images/activityImg04.png')
    //         },
    //         {
    //             uri: require('../source/images/activityImg04.png')
    //         },
    //         {
    //             uri: require('../source/images/activityImg04.png')
    //         }
    //     ]
    //     return(
    //         <ImageListPopup
    //             data={imageUriList}
    //             show={this.state.showMoreImage}
    //             onClose={()=>this.setState({showMoreImage: false})}
    //             onDismissed={()=>this.setState({showMoreImage: false})}
    //             title={'Cupcake Workshops & Master classes'}
    //         />
    //     )

    // }

    render(){
        let comment = [
            {
                userThumbUri: require('../source/images/userCommentThumb01.png'),
                userName: 'ภิรยา',
                createDate: '5 มีนาคม 2561',
                commentDetail: 'กิจกรรมน่าสนใจมากเลยค้า แต่วันนั้นติดธุระ ไม่ทราบว่าจะเปิดอีกประมาณเมื่อไหร่คะ สนใจกิจกรรมสอนทำอาหารค่ะ'
            },
        ]

        return(
            <View style={styles.ActivityDetailScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='รายละเอียดกิจกรรมครั้งหน้า'
                    longTitle
                />
                <ScrollView style={{flex: 1,}}>
                    <View style={styles.activityDetailContainerStyle}>
                        <View style={styles.activityBannerImageContainerStyle}>
                            <ImageBackground
                                source={require('../source/images/banner-gift.jpg')}
                                //resizeMode='stretch'
                                borderRadius={3}
                                style={styles.bannerImageStyle}
                            >
                                <View style={styles.morePictureContainerStyle}/>
                                <TouchableOpacity style={styles.morePictureTextContainerStyle} onPress={()=>this.setState({showMoreImage: true})}>
                                    <Text style={styles.moreTextNumberStyle}>+ 5</Text>
                                    <Text style={styles.moreTextStyle}>ชมภาพเพิ่มเติม</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                        <View style={styles.activityContentContainerStyle}>
                            <Text style={styles.activityDescriptionTextStyle}>Chef for a Day</Text>
                            <Text style={styles.activityTitleTextStyle}>Cupcake Workshops & Master classes</Text>
                            <Text style={styles.activityLocationTextStyle}>สถานที่ : ห้องประชุม 1 อาคารสำนักงานใหญ่ เมืองไทยประกันภัย</Text>
                            <Text style={styles.activityDescriptionTextStyle}>เมืองไทยประกันภัยเชิญลูกค้า ร่วมกิจกรรม"เฉลิมฉลองครบรอบ 8 ปี พร้อมก้าวสู่ปีที่ 9 กับเมืองไทยประกันภัย"  โดยนำลูกค้าล่องเรือชมบรรยากาศริมแม่น้ำเจ้าพระยา พร้อมรับประทานอาหารค่ำและชมมินิคอนเสิร์ต จากศิลปินคู่ดูโอ แอน(ธิติมา) - ปิงปอง(ศิรศักดิ์) พร้อมกันนี้ ยังมีกิจกรรมให้ร่วมสนุกกันอย่างสนุกสนานอีกด้วย</Text>
                            <Image
                                source={require('../source/images/dotSectionHorizontal.png')}
                                resizeMode='contain'
                                style={styles.dotSectionImageStyle}
                            />
                            <View style={styles.eventButtonGroupContainerStyle}>
                                <Text style={styles.activityDateTextStyle}>วันที่ 15 มกราคม 2061</Text>
                                <EventButtonGroup
                                    isFavorite
                                    isShareSelected
                                />
                            </View>
                            <MainSubmitButton
                                buttonTitleText='จองสิทธิ์เข้าร่วมกิจกรรม'
                                onPress={()=>alert('submit')}
                                iconImageUri={require('../source/icons/iconAvatar01.png')}
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
                            <Text style={styles.otherActivityTitleTextStyle}>กิจกรรมมาใหม่อื่น</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAllTextStyle}>ดูทั้งหมด</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.otherActivityListContainerStyle}>
                            {this.renderNewEventCard()}
                        </View>
                    </View>
                </ScrollView>
                {this.renderMoreImagePopup()}
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
        marginBottom: responsiveHeight(2.5),
    },
    bannerImageStyle:{
        height: responsiveHeight(23.23),
        width: responsiveWidth(90),
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
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
    activityLocationTextStyle:{
        fontSize: responsiveFontSize(2.15),
        letterSpacing: 0.2,
        color: 'rgb(253,98,98)',
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
        alignItems: 'center',
    },
    newEventImageStyle:{
        width: responsiveWidth(90),
        marginBottom: responsiveHeight(2),
    },
    morePictureContainerStyle:{
        height: responsiveHeight(7),
        width: responsiveWidth(20),
        opacity: 0.6,
        backgroundColor: '#000',
    },
    morePictureTextContainerStyle:{
        width: responsiveWidth(20),
        height: responsiveHeight(7),
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    moreTextNumberStyle:{
        color: '#FFF',
        fontSize: responsiveFontSize(3.5),
    },
    moreTextStyle:{
        color: '#FFF',
        fontSize: responsiveFontSize(1.8),
    }
}