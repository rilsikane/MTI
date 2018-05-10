import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity,ImageBackground} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Spinner from 'react-native-loading-spinner-overlay';

import {Headers} from '../components/Headers';
import {EventButtonGroup} from '../components/EventButtonGroup';
import {MainSubmitButton} from '../components/MainSubmitButton';
import {CommentCard} from '../components/CommentCard';
import {PastEventCard} from '../components/PastEventCard';
import {ImageListPopup} from '../components/ImageListPopup';

import store from 'react-native-simple-store';
import {get,getBasic} from '../api';

export default class ActivityDetailScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            showComment: true,
            showMoreImage: false,
            isLoading: true,
            user: {},
            detail: {},
            otherActivity: [],
        }   
        this.onMorePicturePress = this.onMorePicturePress.bind(this);
        this.goToQuestionnaire = this.goToQuestionnaire.bind(this);
    }

    async componentDidMount(){
        //const user = await store.get("user");
        let response = await getBasic(`activity/${this.props.data.activity_id}`,{})
        let response2 = await getBasic(`activity?filter_type_id=${this.props.data.group_id}&page=1&pagesize=3`,{});

        //let response2 = await post(`privilege/redeem`,{"privilege_id":this.props.id});
        this.setState({detail:response,isLoading:false,otherActivity:response2.data.filter((data)=>data.activity_id!=response.activity_id)})
        console.log(this.state.otherActivity);
    }

    renderOtherActivityList(){
        // if(this.state.otherActivity && this.state.otherActivity.length > 0 ){
        //     return (this.state.otherActivity.map((data,i)=>
        //         {
        //             if(data.activity_id != this.state.detail.activity_id){
        //                 return   
        //                 <PastEventCard
        //                     key={i}
        //                     bannerUri={data.picture ? {uri:data.picture}:null}
        //                     eventTitleText={data.title}
        //                     eventDetailText={data.title}
        //                     style={[styles.dashboardActivityCardContainerStyle,i==this.state.otherActivity.length-1&&styles.lastItemStyle]}
        //                     onPress={()=>this.openDetail(data)}
        //                 />
        //             }
        //         }
        //     ))
        // }else{
        //     return null;
        // }

        return this.state.otherActivity.map((data,i)=>
            <PastEventCard
                key={i}
                bannerUri={data.picture ? {uri:data.picture}:null}
                eventTitleText={data.title}
                eventDetailText={data.title}
                style={[styles.dashboardActivityCardContainerStyle,i==this.state.otherActivity.length-1&&styles.lastItemStyle]}
                onPress={()=>this.openDetail(data)}
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

    renderMoreImagePopup(){
        const imageUriList=[
            {
                uri: require('../source/images/latestActImg.png')
            },
            {
                uri: require('../source/images/activityImg04.png')
            },
            {
                uri: require('../source/images/activityImg04.png')
            },
            {
                uri: require('../source/images/activityImg04.png')
            },
            {
                uri: require('../source/images/activityImg04.png')
            }
        ]
        return(
            <ImageListPopup
                data={imageUriList}
                show={this.state.showMoreImage}
                onClose={()=>this.setState({showMoreImage: false})}
                onDismissed={()=>this.setState({showMoreImage: false})}
                title={'MTI 8 Anniversary "ยิ้มรับความสำเร็จ..ฉลอง ก้าวแห่งความภาคภูมิใจ"'}
            />
        )

    }

    onMorePicturePress(){
        this.props.navigator.push({
            screen: "mti.ActivityImageListScreen", // unique ID registered with Navigation.registerScreen
            passProps:{
                navigator: this.props.navigator
            },
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            animated: false, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
        })
    }

    goToQuestionnaire(){
        this.props.navigator.showModal({
            screen: "mti.ActivityFeedbackScreen", // unique ID registered with Navigation.registerScreen
            passProps:{
                navigator: this.props.navigator,
                data: this.state.detail
            },
            title: undefined, // title of the screen as appears in the nav bar (optional)
            passProps: {}, // simple serializable object that will pass as props to the modal (optional)
            navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
        })
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

        return !this.state.isLoading ? (
            <View style={styles.ActivityDetailScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='รายละเอียดกิจกรรม'
                />
                <ScrollView style={{flex: 1,}}>
                    <View style={styles.activityDetailContainerStyle}>
                        <View style={styles.activityBannerImageContainerStyle}>
                            <ImageBackground
                                source={this.state.detail && this.state.detail.picture?{uri:this.state.detail.picture}:null}
                                //resizeMode='stretch'
                                borderRadius={3}
                                style={styles.bannerImageStyle}
                            >
                                {/* <View style={styles.morePictureContainerStyle}/>
                                <TouchableOpacity style={styles.morePictureTextContainerStyle} onPress={()=>this.setState({showMoreImage: true})}>
                                    <Text style={styles.moreTextNumberStyle}>+ 5</Text>
                                    <Text style={styles.moreTextStyle}>ชมภาพเพิ่มเติม</Text>
                                </TouchableOpacity> */}
                            </ImageBackground>
                        </View>
                        <View style={styles.activityContentContainerStyle}>
                            <Text style={styles.activityTitleTextStyle}>{this.state.detail.title}</Text>
                            <Text style={styles.activityDescriptionTextStyle}>{this.state.detail.content}</Text>
                            <Text style={styles.activityDateTextStyle}>วันที่ 12 กุมภาพันธ์ 2061</Text>
                            <Image
                                source={require('../source/images/dotSectionHorizontal.png')}
                                resizeMode='contain'
                                style={styles.dotSectionImageStyle}
                            />
                            <View style={styles.eventButtonGroupContainerStyle}>
                                <TouchableOpacity style={styles.morePictureContainerStyle} onPress={this.onMorePicturePress}>
                                    <Image
                                        source={require('../source/icons/iconAlbum01.png')}
                                        resizeMode='contain'
                                        style={styles.albumIconStyle}
                                    />
                                    <Text style={styles.activityDateTextStyle}>ดูรูปกิจกรรมนี้</Text>
                                </TouchableOpacity>
                                <EventButtonGroup
                                    isFavorite
                                    isShareSelected
                                />
                            </View>
                            <MainSubmitButton
                                buttonTitleText='กรอกแบบสอบถามกิจกรรม'
                                onPress={this.goToQuestionnaire}
                                style={styles.submitButtonStyle}
                            />
                            {this.state.showComment&&
                            <CommentCard
                                commentList={comment}
                                onSendMessagePress={()=>alert('send')}
                            />}
                        </View>
                    </View>
                    {this.state.otherActivity.length==0?<View/>:
                        <View style={styles.otherActivityContainerStyle}>
                            <View style={styles.otherActivityTitleContainerStyle}>
                                <Text style={styles.otherActivityTitleTextStyle}>กิจกรรมอื่น</Text>
                                <TouchableOpacity>
                                    <Text style={styles.seeAllTextStyle}>ดูทั้งหมด</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.otherActivityListContainerStyle}>
                                <ScrollView horizontal style={{flex: 1,}} showsHorizontalScrollIndicator={false}>
                                    {!this.state.isLoading && this.renderOtherActivityList()}
                                </ScrollView>
                            </View>
                        </View>
                    }
             
                </ScrollView>
                {/* {this.renderMoreImagePopup()} */}
            </View>
        ): <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />
    }
}

const styles={
    ActivityDetailScreenContainerStyle:{
        flex: 1,
        backgroundColor:"#fff"
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
        color: "#919195",
        marginBottom: responsiveHeight(1),
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
    albumIconStyle:{
        height: responsiveHeight(3.16),
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
    },
    morePictureContainerStyle:{
        flexDirection: 'row'
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
    },
    dashboardActivityCardContainerStyle:{
        marginLeft: responsiveWidth(4.6),
    },
    lastItemStyle:{
        marginRight: responsiveWidth(9.12),
    }
}