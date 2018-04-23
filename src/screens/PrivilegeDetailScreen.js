import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import {Item,Input} from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {DashboardActivityCard} from './../components/DashboardActivityCard';
import {MainSubmitButton} from './../components/MainSubmitButton';
import {EventButtonGroup} from '../components/EventButtonGroup';
import {post,authen,get} from '../api';
import Spinner from 'react-native-loading-spinner-overlay';
import HTMLView from 'react-native-htmlview';
export default class PrivilegeDetailScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            showComment: true,
            detail:{},
            isLoading:true
        }
    }
    async componentDidMount(){

        //let response = await get(`privilege/${this.props.id}`,{})
        let response2 = await post(`privilege/redeem`,{"privilege_id":this.props.id});
        console.log(response2);
        // this.setState({detail:response,isLoading:false})
        this.setState({isLoading:false})
    }
    renderPrivilegeDetailList(){
        let data=[
            'ตรวจสุขภาพสายตาฟรี มูลค่า 1,000 บาท (เฉพาะวันพฤหัสและนัดหมายล่วงหน้า ตรวจวัดสุขภาพสายตา, ตรวจวัดความดันตา, ตรวจจอประสาทตา, ตรวจสุขภาพกระจกตา',
            'ส่วนลดแว่นตาสูงสุด 55%',
            'รับประกัน 1 ปี หลังการซื้อแว่นทุกประเภท (ปกติรับประกัน 3 เดือน)',
        ]

        // return data.map((data,i)=>
        //     // <View key={i} style={styles.privilegeTextContainerStyle}>
        //     //     <Text style={styles.privilegeDetailSubTextStyle}>{`${++i}. `}</Text>
        //     //     <Text style={styles.privilegeDetailSubTextStyle}>{data}</Text>
        //     // </View>
          
        // )
        return <HTMLView
            value={this.state.detail.content1}
            stylesheet={styles.privilegeDetailSubTextStyle}
        />
    }

    renderCommentSection(){
        let comment = [
            {
                userThumbUri: require('../source/images/userCommentThumb01.png'),
                userName: 'ภิรยา',
                createDate: '5 มีนาคม 2061',
                commentDetail: 'ไปใช้บริการมาแล้วค่ะ ตรวจละเอียดมากเลย เราใช้ส่วนลดซื้อแว่นกลับมาด้วย'
            },
            {
                userThumbUri: require('../source/images/userCommentThumb02.png'),
                userName: 'บัณฑิต',
                createDate: '5 มีนาคม 2061',
                commentDetail: 'น่าสนใจมากครับ'
            },
        ]

        return(
            <View style={styles.commentContainerStyle}>
                <Image
                    source={require('../source/images/dotSectionHorizontal.png')}
                    resizeMode='contain'
                    style={styles.commentDotSectionImageStyle}
                />
                <View style={styles.totalCommentContainerStyle}>
                    <Image
                        source={require('../source/icons/iconCommentSelected.png')}
                        resizeMode='contain'
                        style={styles.commentIconStyle}
                    />
                    <Text style={styles.totalCommentTextStyle}>ความคิดเห็น [ 2 ]</Text>
                </View>
                <View style={styles.commentListContainerStyle}>
                    {comment.map((data,i)=>
                        <View key={i} style={{flex: 1,}}>
                            <View style={styles.commentListSectionStyle}>
                                <View style={styles.userThumbnailContainerStyle}>
                                    <Image
                                        source={data.userThumbUri}
                                        style={styles.userThumbnailStyle}
                                    />
                                </View>
                                <View style={styles.commentDetailContainerStyle}>
                                    <View style={styles.commentTitleContainerStyle}>
                                        <Text style={styles.userNameTextStyle}>{data.userName}</Text>
                                        <Text style={styles.commentDateTextStyle}>{data.createDate}</Text>
                                    </View>
                                    <Text style={styles.commentDetailTextStyle}>{data.commentDetail}</Text>
                                </View>
                            </View>
                            <Image
                                source={require('../source/images/dotSectionHorizontal.png')}
                                resizeMode='contain'
                                style={styles.commentDotSectionBottomImageStyle}
                            />
                        </View>
                    )}   
                    <View style={styles.commentListSectionStyle}>
                        <View style={styles.userThumbnailContainerStyle}>
                            <Image
                                source={require('../source/images/userAvatarImg.png')}
                                style={styles.userThumbnailStyle}
                            />
                        </View>
                        <Item style={styles.commentInputContainerStyle}>
                            <Input 
                                placeholder='ความคิดเห็นของคุณ...'
                                placeholderTextColor='rgba(145, 145, 149, 0.44)'
                            />
                            <TouchableOpacity>
                                <Image
                                    source={require('../source/icons/iconSendMessage.png')}
                                    resizeMode='contain'
                                    style={styles.sendMessageIconStyle}
                                />
                            </TouchableOpacity>
                        </Item>
                    </View>
                </View>
            </View>
        )
    }

    renderRecommendPrivilegeList(){
        let privilege = [
            {
                bannerUri: require('./../source/images/wefitness-logo.png'),
                iconUri: require('./../source/icons/iconHealthySelected.png'),
                iconTitleText: 'Lifestyle',
                activityTitleText: 'ออกกำลังกายฟรี ที่ WE Fitness 2 วัน พร้อมลด 10% เมื่อสมัครสมาชิก'
            },
            {
                bannerUri: require('./../source/images/privilegeImg02.png'),
                iconUri: require('./../source/icons/iconBeautySelected.png'),
                iconTitleText: 'Beauty',
                activityTitleText: 'ส่วนลด 20% เมื่อซื้อชุดของขวัญ Estee Lauder Set Makeup'
            },
        ]

        return privilege.map((data,i)=>
            <DashboardActivityCard 
                key={i} 
                bannerUri={data.bannerUri}
                iconUri={data.iconUri}
                iconTitleText={data.iconTitleText}
                activityTitleText={data.activityTitleText}
                style={[styles.dashboardActivityCardContainerStyle,i==0&&{marginLeft: responsiveWidth(4.6)}]}
            />
        )
    }

    render(){
        return !this.state.isLoading ? (
            <View style={styles.privilegeDetailScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='รายละเอียดสิทธิพิเศษ'
                />
                <ScrollView style={{flex: 1,}}>
                    <View style={styles.privilegeDetailContainerStyle}>
                        <View style={styles.bannerImageContainerStyle}>
                            <View style={styles.bannerImageSectionStyle}>
                                <Image
                                    source={this.state.detail && this.state.detail.picture_url ? {uri:this.state.detail.picture_url}:null}
                                    style={styles.bannerImageStyle}
                                    borderRadius={3}
                                />
                            </View>
                            <View style={styles.iconEventContainerStyle}>
                                <View style={styles.privilegeTitleContainerStyle}>
                                    <Image
                                        source={require('../source/icons/iconHealthy.png')}
                                        resizeMode='contain'
                                        style={styles.titleIconStyle}
                                    />
                                    <Text style={styles.titleTextStyle}>Healthy</Text>
                                </View>
                                <View style={styles.eventButtonGroupContainerStyle}>
                                    <EventButtonGroup
                                        isFavorite
                                        isShareSelected
                                    />
                                </View>
                            </View>
                            <Image
                                source={require('../source/images/dotSectionHorizontal.png')}
                                resizeMode='contain'
                                style={styles.dotSectionImageStyle}
                            />
                            <View style={styles.detailContainerStyle}>
                                <Text style={styles.privilegeTitleTextStyle}>{this.state.detail.name}</Text>
                                <Text style={styles.privilegeDurationTextStyle}>ระยะเวลาสิทธิพิเศษ : </Text>
                                <Text style={styles.privilegeDetailTextStyle}>รายละเอียดสิทธิพิเศษ</Text>
                                {this.renderPrivilegeDetailList()}
                                <MainSubmitButton
                                    buttonTitleText='ขอรับสิทธิ'
                                    onPress={()=>alert('submit')}
                                    style={styles.submitButtonStyle}
                                />
                                {this.state.showComment&&this.renderCommentSection()}
                            </View>
                        </View>
                        <View style={styles.recommendPrivilegeContainerStyle}>
                            <View style={styles.recommendTitleContainerStyle}>
                                <Text style={styles.recommendTitleTextStyle}>สิทธิพิเศษที่แนะนำให้คุณ</Text>
                                <TouchableOpacity>
                                    <Text style={styles.seeAllTextStyle}>ดูทั้งหมด</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.recommendPrivilegeListContainerStyle}>
                                <ScrollView horizontal style={{flex: 1,}} showsHorizontalScrollIndicator={false}>
                                    {this.renderRecommendPrivilegeList()}
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        ): <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />

    }
}

const styles={
    privilegeDetailScreenContainerStyle:{
        flex: 1,
    },
    privilegeDetailContainerStyle:{
        flex: 1,
    },
    bannerImageContainerStyle:{
        flex: 1,
        paddingTop: responsiveHeight(4),
        backgroundColor: '#f6f6f6',
        borderBottomWidth: responsiveHeight(0.17),
        borderColor: '#dddddd',
    },
    bannerImageSectionStyle:{
        height: responsiveHeight(23.23),
        alignItems: 'center',
    },
    bannerImageStyle:{
        height: responsiveHeight(23.23),
        width: responsiveWidth(90),
    },
    iconEventContainerStyle:{
        flexDirection: 'row',
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
        marginTop: responsiveHeight(1.5),
    },
    privilegeTitleContainerStyle:{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
    },
    titleIconStyle:{
        height: responsiveHeight(2.81),
        width: responsiveWidth(5),
    },
    titleTextStyle:{
        color: 'rgba(85, 86, 90, 0.6)',
        letterSpacing: 0,
        opacity: 0.6,
        fontSize: responsiveFontSize(2.15),
        marginLeft: responsiveWidth(2.5),
    },
    eventButtonGroupContainerStyle:{
        flex: 1,
        alignItems: 'flex-end',
    },
    dotSectionImageStyle:{
        width: '90%',
        opacity: 0.3,
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(2),
        alignSelf: 'center',
    },
    commentDotSectionImageStyle:{
        width: '100%',
        opacity: 0.3,
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(2),
        alignSelf: 'center',
    },
    commentDotSectionBottomImageStyle:{
        width: '100%',
        opacity: 0.3,
        alignSelf: 'center',
    },
    detailContainerStyle:{
        flex: 1,
    },
    privilegeTitleTextStyle:{
        letterSpacing: 0,
        color: '#1595d3',
        fontSize: responsiveFontSize(2.7),
        marginLeft: responsiveWidth(4.6),
        marginRight: responsiveWidth(4.6),
    },
    privilegeDurationTextStyle:{
        fontSize: responsiveFontSize(2.15),
        color: '#fd6262',
        letterSpacing: 0,
        marginLeft: responsiveWidth(4.6),
        marginRight: responsiveWidth(4.6),
    },
    privilegeTextContainerStyle:{
        flexDirection: 'row',
        width: responsiveWidth(90.8),
        alignSelf: 'center',
    },
    privilegeDetailTextStyle:{
        color: "#919195",
        letterSpacing: 0,
        fontSize: responsiveFontSize(2.15),
        textAlign: 'left',
        marginLeft: responsiveWidth(4.6),
        marginRight: responsiveWidth(4.6),
        marginTop: responsiveHeight(0.5),
        marginBottom: responsiveHeight(0.5),
    },
    privilegeDetailSubTextStyle:{
        letterSpacing: 0,
        color: "#919195",
        fontSize: responsiveFontSize(2.15),
    },
    submitButtonStyle:{
        marginLeft: responsiveWidth(4.6),
        marginRight: responsiveWidth(4.6),
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
    },
    commentContainerStyle:{
        flex: 1,
        marginLeft: responsiveWidth(4.6),
        marginRight: responsiveWidth(4.6),

    },
    totalCommentContainerStyle:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentIconStyle:{
        height: responsiveHeight(2.81),
        width: responsiveWidth(5.15),
        marginRight: responsiveWidth(1.5),
    },
    totalCommentTextStyle:{
        letterSpacing: 0,
        color: "#1595d3",
        fontSize: responsiveFontSize(2.8)
    },
    commentListContainerStyle:{
        flex: 1,
    },
    commentListSectionStyle:{
        flex: 1,
        flexDirection: 'row',
        marginTop: responsiveHeight(1.8),
        marginBottom: responsiveHeight(1.8),
    },
    userThumbnailContainerStyle:{
        height: responsiveHeight(3.96),
        flex: 0.1,
    },
    commentDetailContainerStyle:{
        flex: 0.9,
    },
    commentTitleContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userNameTextStyle:{
        letterSpacing: 0,
        color: "#1595d3",
        fontSize: responsiveFontSize(2.2),
    },
    commentDateTextStyle:{
        letterSpacing: 0,
        color: "rgba(145, 145, 149, 0.69)",
        fontSize: responsiveFontSize(2),
    },
    commentDetailTextStyle:{
        letterSpacing: 0,
        color: "#919195",
        fontSize: responsiveFontSize(2.15),
    },
    userThumbnailStyle:{
        height: responsiveHeight(3.96),
        width: responsiveHeight(3.96),
        borderRadius: responsiveHeight(1.98),
        borderWidth: 1,
        borderColor: "rgba(168, 168, 170, 0.5)",
        marginTop: responsiveHeight(0.5),
    },
    commentInputContainerStyle:{
        flex: 0.9,
        height: responsiveHeight(4.1)
    },
    sendMessageIconStyle:{
        height: responsiveHeight(2.81),
    },
    recommendPrivilegeContainerStyle:{
        flex: 1,
    },
    recommendTitleContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: responsiveWidth(4.6),
        marginRight: responsiveWidth(4.6),
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(1.5),
    },
    recommendTitleTextStyle:{
        letterSpacing: 0,
        color: "#1595d3",
        fontSize: responsiveFontSize(2.8),
    },
    seeAllTextStyle:{
        color: "rgba(85, 86, 90, 0.6)",
        fontSize: responsiveFontSize(2),
    },
    recommendPrivilegeListContainerStyle:{
        flex: 1,
        marginBottom: responsiveHeight(2),
    },
    dashboardActivityCardContainerStyle:{
        marginRight: responsiveWidth(4.6),
    }

}