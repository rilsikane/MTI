import React,{Component} from 'react';
import {Text,View,FlatList,Image,ScrollView,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {Pages} from 'react-native-pages';

import {Headers} from '../components/Headers';
import {PageIndicators} from './../components/PageIndicators';
import {MainRadioButton} from '../components/MainRadioButton';
import {MainSubmitButton} from './../components/MainSubmitButton';
import {CommentCard} from '../components/CommentCard';
import {PastEventCard} from '../components/PastEventCard';

export default class ActivityFeedbackScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            pageNumber: 1,
            enable: true,
            questionGroup:[],
        }
        this.onScrollEnd = this.onScrollEnd.bind(this);
        this.updateRef = this.updateRef.bind(this);
        this.onNextButtonPress = this.onNextButtonPress.bind(this);
    }

    onScrollEnd(index) {
        this.setState({pageNumber: index+1})   
    }

    updateRef(ref) {
        this._pages = ref;
    }

    renderCriteriaList(){
        let criteria = [
            {
                desc: 'ความเหมาะสมของกิจกรรม'
            },
            {
                desc: 'ความเหมาะสมของสถานที่'
            },
            {
                desc: 'การประชาสัมพันธ์ผ่าน Email / SMS'
            },
            {
                desc: 'ความน่าสนใจของกิจกรรม'
            },
            {
                desc: 'ความพอใจของคุณต่อภาพรวมของกิจกรรม'
            },
        ]

        // return(
        //     <FlatList
        //         data={criteria}
        //         style={{flexGrow: 1,}}
        //         scrollEnabled={false}
        //         contentContainerStyle={{flexGrow: 1,flex: 1,}}
        //         showsVerticalScrollIndicator={false}
        //         keyExtractor={this._keyExtractor}
        //         renderItem={this._renderItem}
        //     />
        // )
        return criteria.map((item,index)=>
            <View key={index} style={styles.criteriaContainerStyle}>
                <View style={styles.criteriaListContainerStyle}>
                    <Text style={styles.criteriaTextStyle}>{`${++index} ${item.desc}`}</Text>
                    <MainRadioButton
                        group={radioGroupData}
                        singleTap={(valueTap)=>{this._onRadioGroupButtonSingleTap(valueTap)}}
                    />
                </View>
                <Image
                    source={require('../source/images/dotSectionHorizontal.png')}
                    resizeMode='contain'
                    style={styles.dotSectionHorizontalStyle}
                />
            </View>
        )
    }

    _renderItem = ({item,index}) => ( 
        <View style={styles.criteriaContainerStyle}>
            <View style={styles.criteriaListContainerStyle}>
                <Text style={styles.criteriaTextStyle}>{`${++index} ${item.desc}`}</Text>
                <MainRadioButton
                    group={radioGroupData}
                    singleTap={(valueTap)=>{this._onRadioGroupButtonSingleTap(valueTap)}}
                />
            </View>
            <Image
                source={require('../source/images/dotSectionHorizontal.png')}
                resizeMode='contain'
                style={styles.dotSectionHorizontalStyle}
            />
        </View>
    );

    _keyExtractor = (item, index) => index.toString();

    _onRadioGroupButtonSingleTap(valueTap) {
        let questionGroup = []
        questionGroup[valueTap] = valueTap

        this.setState({questionGroup:questionGroup})
        console.log(this.state.questionGroup)
    }

    onNextButtonPress(){
        this.setState({enable:true});
        setTimeout(()=>{
            this.setState({enable:true,pageNumber:1});
            this._pages.scrollToPage(1);
            this.setState({enable:false});
        },100);
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
        return(
            <View style={styles.activityFeedbackScreenContainerStyle}>
                <Headers
                    leftIconName='cancel'
                    headerTitleText='แบบฟอร์มกิจกรรม'
                />
                {/* <ScrollView 
                    style={{flex: 1}}
                    //pointerEvents='box-only'
                    //contentContainerStyle={{flex: 1,}}
            
                > */}
                    <View style={styles.activityFeedbackContainerStyle}>
                        <PageIndicators
                            pageNumber={this.state.pageNumber}
                            numberOfPage={2}
                            style={styles.indicatorStyle}
                            containerStyle={styles.indicatorContainerStyle}
                        />
                        <View style={styles.titleContainerStyle}>
                            <Text style={styles.activityTitleTextStyle}>MTI 8 Anniversary "ยิ้มรับความสำเร็จ..ฉลองก้าวแห่งความภาคภูมิใจ" </Text>
                            <Text style={styles.activitySubtitleTextStyle}>{`${this.state.pageNumber==1?'ระดับความพึงพอใจที่คุณมีต่อกิจกรรมนี้':'กิจกรรมที่คุณสนใจ'}`}</Text>
                        </View>
                        <Pages
                            indicatorPosition='none'
                            isDragging={false} 
                            scrollEnabled={this.state.enable}
                            onScrollEnd={this.onScrollEnd}
                            ref={this.updateRef} 
                            //style={{flex: 1,}}
                            //contentContainerStyle={{flex: 1}}
                        >
                            <View style={styles.contentContainerStyle}>
                                <Image
                                    source={require('../source/images/dotSectionHorizontal.png')}
                                    resizeMode='contain'
                                    style={styles.dotSectionHorizontalStyle}
                                />
                                {this.renderCriteriaList()}
                                <MainSubmitButton
                                    buttonTitleText='ถัดไป'
                                    onPress={this.onNextButtonPress}
                                    style={styles.submitButtonStyle}
                                />
                            </View>
                            <View style={styles.contentContainerStyle}>
                            
                            </View>
                        </Pages>
                        {/* <View style={styles.commentContainerStyle}>
                            <CommentCard
                                commentList={comment}
                                onSendMessagePress={()=>alert('send')}
                            />
                        </View> */}
                    </View>
                    {/* <View style={styles.otherActivityContainerStyle}>
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
                    </View> */}
                {/* </ScrollView> */}
            </View>
        )
    }
}

const radioGroupData = [{value: '1'},{value: '2'},{value: '3'},{value: '4'},{value: '5'},]
const comment = [
    {
        userThumbUri: require('../source/images/userCommentThumb01.png'),
        userName: 'ภิรยา',
        createDate: '5 มีนาคม 2061',
        commentDetail: 'กิจกรรมนี้สนุกมากเลยค่ะ เป็นกันเองสุดๆเลย อยากให้จัดแบบนี้บ่อยๆ จังเลยค่ะ'
    },
]

const styles={
    activityFeedbackScreenContainerStyle:{
        flex: 1,
    },
    activityFeedbackContainerStyle:{
        flex: 1,
        backgroundColor: '#f6f6f6',
        borderBottomWidth: responsiveHeight(0.17),
        borderColor: '#dddddd',
        paddingBottom: responsiveHeight(2.5),
    },
    indicatorStyle:{
        width: responsiveWidth(43.25),
    },
    indicatorContainerStyle:{
        marginBottom: responsiveHeight(3),
    },
    titleContainerStyle:{
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
    },
    activityTitleTextStyle:{
         
        fontSize: responsiveFontSize(3.1),
        letterSpacing: 0,
        textAlign: "center",
        color: "#1595d3",
    },
    activitySubtitleTextStyle:{
        fontSize: responsiveFontSize(3.1),
        letterSpacing: 0,
        textAlign: "center",
        color: 'rgb(253, 98, 98)'
    },
    criteriaContainerStyle:{
        //flex: 1,
    },
    criteriaListContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    criteriaTextStyle:{
        fontSize: responsiveFontSize(2.2),
        letterSpacing: 0,
        textAlignVertical: "center",
        color: "#919195",
        flex: 1,
    },
    contentContainerStyle:{
        flex: 1,
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
        backgroundColor: 'transparent',
    },
    dotSectionHorizontalStyle:{
        width: '100%',
        opacity: 0.3,
        alignSelf: 'center',
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
    },
    submitButtonStyle:{
        marginTop: responsiveHeight(1),
    },
    commentContainerStyle:{
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
    },
    otherActivityContainerStyle:{
        //flex: 1,
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