import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity,ImageBackground,Alert} from 'react-native';
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
import {get,getBasic, post} from '../api';
import moment from 'moment';
import localization from 'moment/locale/th'

export default class ActivityDetailScreen extends Component{

    constructor(props){
        super(props)
        moment.locale("th");
        this.state={
            showComment: false,
            showMoreImage: false,
            isLoading: true,
            user: {},
            detail: {},
            otherActivity: [],
            commentList:[],
            showFav:false
        } 
        this.scrollView = {};  
        this.onMorePicturePress = this.onMorePicturePress.bind(this);
        this.goToQuestionnaire = this.goToQuestionnaire.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    async componentDidMount(){
        if(this.props.data && this.props.data.activity_id){
            console.log(this.props.data);
            const user = await store.get("user");
            let response = await getBasic(`activity/${this.props.data.activity_id}`,{})
            let response2 = await getBasic(`activity?filter_type=${this.props.filter_type}&page=1&pagesize=4`,{});
            let comments = await getBasic(`activity/${this.props.data.activity_id}/comments?page=1&pagesize=5`,{})
            //let response2 = await post(`privilege/redeem`,{"privilege_id":this.props.id});
            let favorite = undefined
            if(user && user.name != "GUEST"){
                favorite = await get(`favorite/activity/${this.props.data.activity_id}`);
                this.setState({showFav:true})
            }
            if(response && response2){
                if(favorite){
                    response.isFavorite = favorite.is_favorite;
                }
                this.setState({
                    detail:response,
                    isLoading:false,
                    otherActivity:response2.data.filter((data)=>data.activity_id!=response.activity_id),
                    commentList: comments.data,
                    user:user
                })
            }else{
                this.setState({detail:{gallery:[]}});
            }
        }
        
        this.setState({isLoading:false});
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
    //             title={'MTI 8 Anniversary "ยิ้มรับความสำเร็จ..ฉลอง ก้าวแห่งความภาคภูมิใจ"'}
    //         />
    //     )

    // }

    onMorePicturePress(){
        this.props.navigator.push({
            screen: "mti.ActivityImageListScreen", // unique ID registered with Navigation.registerScreen
            passProps:{
                navigator: this.props.navigator,
                detail:this.state.detail
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
    async favPress() {
        let param = {};
        let isFavorite = this.state.detail.isFavorite;
        if(!isFavorite){
            param.action = "add";
        }else{
            param.action = "delete";
        }
        let response = await post("favorite/activity/"+this.state.detail.activity_id,param);
        let detail = {...this.state.detail};
        detail.isFavorite = !isFavorite;
        this.setState({detail:detail});
    }
    async addComment(txt){
        let response =  await post(`comment/activity/${this.props.data.activity_id}`,{"message":txt});
        if(response){
            Alert.alert(
                ' ',
                   'คุณได้แสดงความคิดเห็นเรียบร้อย',
                [
                {text: 'OK', onPress: async () => {
                    let comments = await getBasic(`activity/${this.props.data.activity_id}/comments?page=1&pagesize=20`);
                    this.setState({commentList:comments.data});
                }},
                ]
                )
        }
    }
    renderCommentCard(){
        return this.state.showComment?(
            <CommentCard
                commentList={this.state.commentList}
                onSendMessagePress={this.addComment}
            />
        ):null
    }
    rederContent(){
        let content1 = this.state.detail.content;
        if(content1){
            let data = content1.split("|");
            return data.map((item,i)=>
                <View key={i} style={styles.privilegeTextContainerStyle}>
                    <Text style={styles.activityDescriptionTextStyle}>{item}</Text>
                </View>
            
            )
        }else{
            return null;
        }
    }
    async submitActivity(){
        let param = {};
        param.action="add"
        let response = await post(`booking/activity/${this.state.detail.activity_id}`,param);
        if(response && response.status=="ok"){
            this.props.navigator.showModal({
                screen: "mti.ActivitySubmitScreen", // unique ID registered with Navigation.registerScreen
                passProps:{
                    navigator: this.props.navigator,
                    data: this.state.detail
                },
                title: undefined, // title of the screen as appears in the nav bar (optional)
                passProps: {}, // simple serializable object that will pass as props to the modal (optional)
                navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
            })
       }else{
       }
    }

    render(){
  

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
                            {this.rederContent()}
                            <Text style={styles.activityDateTextStyle}>{moment(this.state.detail.start_date).locale("th",localization).format("DD MMMM YYYY")}</Text>
                            <Image
                                source={require('../source/images/dotSectionHorizontal.png')}
                                resizeMode='contain'
                                style={styles.dotSectionImageStyle}
                            />
                            <View style={styles.eventButtonGroupContainerStyle}>
                                {this.state.detail.gallery && this.state.detail.gallery.length> 0 ? <TouchableOpacity style={styles.morePictureContainerStyle} onPress={this.onMorePicturePress}>
                                    <Image
                                        source={require('../source/icons/iconAlbum01.png')}
                                        resizeMode='contain'
                                        style={styles.albumIconStyle}
                                    />
                                    <Text style={styles.activityDateTextStyle}>ดูรูปกิจกรรมนี้</Text>
                                </TouchableOpacity>: <Text style={styles.activityDescriptionTextStyle}>ไม่มีรูปในกิจกรรมนี้</Text>}
                                <EventButtonGroup
                                        isFavorite={this.state.detail.isFavorite}
                                        isShareSelected
                                        onSharePress={()=>this.onOpen()}
                                        onFavPress={()=>this.favPress()}
                                        showFav={this.state.showFav}
                                />
                            </View>
                            {(this.state.user && this.state.user.name != "GUEST" && this.state.detail.booking_status=='open') ? <MainSubmitButton
                                buttonTitleText='จองสิทธิ์เข้าร่วมกิจกรรม'
                                onPress={()=>this.submitActivity()}
                                iconImageUri={require('../source/icons/iconAvatar01.png')}
                                style={styles.submitButtonStyle}
                            />:null}
                            {/* <MainSubmitButton
                                buttonTitleText='กรอกแบบสอบถามกิจกรรม'
                                onPress={this.goToQuestionnaire}
                                style={styles.submitButtonStyle} */}
                            {/* /> */}
                            {(this.state.user||(!this.state.user && this.state.commentList.length > 0)) && this.renderCommentCard()}
                        </View>
                    </View>
                    {this.state.otherActivity.length==0?null:
                        <View style={styles.otherActivityContainerStyle}>
                            <View style={styles.otherActivityTitleContainerStyle}>
                                <Text style={styles.otherActivityTitleTextStyle}>กิจกรรมอื่น</Text>
                                {/* <TouchableOpacity>
                                    <Text style={styles.seeAllTextStyle}>ดูทั้งหมด</Text>
                                </TouchableOpacity> */}
                            </View>
                            <View style={styles.otherActivityListContainerStyle}>
                                <ScrollView horizontal style={{flex: 1,}} showsHorizontalScrollIndicator={false}>
                                    {!this.state.isLoading ? this.renderOtherActivityList():null}
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