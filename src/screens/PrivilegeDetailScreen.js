import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import {Item,Input} from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {DashboardActivityCard} from './../components/DashboardActivityCard';
import {MainSubmitButton} from './../components/MainSubmitButton';
import {EventButtonGroup} from '../components/EventButtonGroup';

export default class PrivilegeDetailScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            showComment: false,
        }
    }

    renderPrivilegeDetailList(){
        let data=[
            'ตรวจสุขภาพสายตาฟรี มูลค่า 1,000 บาท (เฉพาะวันพฤหัสและนัดหมายล่วงหน้า ตรวจวัดสุขภาพสายตา, ตรวจวัดความดันตา, ตรวจจอประสาทตา, ตรวจสุขภาพกระจกตา',
            'ส่วนลดแว่นตาสูงสุด 55%',
            'รับประกัน 1 ปี หลังการซื้อแว่นทุกประเภท (ปกติรับประกัน 3 เดือน)',
        ]

        return data.map((data,i)=>
            <View key={i} style={styles.privilegeTextContainerStyle}>
                <Text style={styles.privilegeDetailSubTextStyle}>{`${++i}. `}</Text>
                <Text style={styles.privilegeDetailSubTextStyle}>{data}</Text>
            </View>
        )
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
                            <Image
                                source={require('../source/icons/iconSendMessage.png')}
                                resizeMode='contain'
                                style={styles.sendMessageIconStyle}
                            />
                        </Item>
                    </View>
                </View>
            </View>
        )
    }

    render(){
        return(
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
                                    source={require('../source/images/privilegeImg01.png')}
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
                                <Text style={styles.privilegeTitleTextStyle}>ตรวจสุขภาพสายตาฟรี (มูลค่า 1,000 บาท) ส่วนลดแว่นตาสูงสุด 55% พร้อมรับประกัน 1 ปี</Text>
                                <Text style={styles.privilegeDurationTextStyle}>ระยะเวลาสิทธิพิเศษ : 15 - 31 ธันวาคม 2561</Text>
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
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
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
        fontFamily: 'DBHelvethaicaX-Med',
        letterSpacing: 0,
        color: '#1595d3',
        fontSize: responsiveFontSize(3),
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
    },
    recommendTitleTextStyle:{
        fontFamily: "DBHelvethaicaX-Med",
        letterSpacing: 0,
        color: "#1595d3",
        fontSize: responsiveFontSize(2.8),
    },
    seeAllTextStyle:{
        color: "rgba(85, 86, 90, 0.6)",
        fontSize: responsiveFontSize(2),
    }

}