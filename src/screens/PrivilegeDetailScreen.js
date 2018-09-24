import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity,ImageBackground,Alert,FlatList,Keyboard,KeyboardAvoidingView,Platform} from 'react-native';
import PropTypes from "prop-types";
import {Item,Input} from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {DashboardActivityCard} from './../components/DashboardActivityCard';
import {MainSubmitButton} from './../components/MainSubmitButton';
import {EventButtonGroup} from '../components/EventButtonGroup';
import {post,authen,get,getBasic} from '../api';
import Spinner from 'react-native-loading-spinner-overlay';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import localization from 'moment/locale/th'
import store from 'react-native-simple-store';
import Share, {ShareSheet, Button} from 'react-native-share';
import FastImage from 'react-native-fast-image'
import Dimensions from 'Dimensions';
export default class PrivilegeDetailScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            showComment: false,
            detail:{},
            recommend:[],
            isLoading:true,
            groups:[],
            user:{},
            shareVisible:false,
            comments:[],
            commentTxt:'',
            showRecommend:true,
            showFav:false
        }
        this.scrollView = {};
        this.retrivePrivillege = this.retrivePrivillege.bind(this);
        this.renderRecommendPrivilegeList = this.renderRecommendPrivilegeList.bind(this);
        this.addComment = this.addComment.bind(this);
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
    }
    async componentDidMount(){
        const user = await store.get("user");
        if(this.props.data && this.props.data.id){
        if(!this.props.data.isCampaign){
        let group = await store.get("privilegeGroup");
        let response = await getBasic(`privilege/${this.props.data.id}`,{})
        let response2 = await getBasic(`privileges?filter_group_id=${this.props.data.group_id}&page=1&pagesize=3`,{});
        let comments = await getBasic(`privilege/${this.props.data.id}/comments?page=1&pagesize=20`);
        let favorite = undefined
        if(user && user.name != "GUEST"){
            favorite = await get(`favorite/privilege/${this.props.data.id}`);
            this.setState({showFav:true})
        }
        
        this.setState({isLoading:false})
        if(!comments || comments==undefined){
            comments = [];
        }
        if(favorite){
            response.isFavorite = favorite.is_favorite;
        }
        if(response2 && response2.data.length<=1){
            response2 = await getBasic(`privileges?page=1&pagesize=3`,{});
        }
        this.setState({detail:response,recommend:response2.data,groups:group,user:user,isLoading:false,comments:comments.data})
       
        //this.setState({isLoading:false})
        }else{
            let campaignsGroup = await store.get("campaignsGroup");
            let response = await getBasic(`campaign/${this.props.data.campaign_id}`,{})
            response.name = response.subject;
            response.isCampaign = true;
            response.id = response.campaign_id;
            response.picture_url = response.picture;
            let response2 = await get(`membercampaign?page=1&pagesize=3`,{});
            let recommend = this.transformToPrivillege(response2.data);
            this.setState({detail:response,isLoading:false,recommend:recommend,groups:campaignsGroup,user:user}) 
        }
        setTimeout(()=>{
            this.setState({isLoading:false})
        },1000)
        }else{
            this.setState({isLoading:false})
        }
    }
    getTitleText(){
        if(this.state.groups.length >0 && this.props.data.group_id){
            let group =  this.state.groups.filter(gp=>gp.id==this.props.data.group_id)
            return group && group.length>0 ? group[0].name:null;
        }else{
            return null;
        }
    }
    getIcon(){
        if(this.state.groups.length >0 && this.props.data.group_id){
            let group =  this.state.groups.filter(gp=>gp.id==this.props.data.group_id)
            return group && group.length>0 ? {uri:group[0].icon_url}:null;
        }else{
            return null;
        }
    }
    renderPrivilegeDetailList(){
        let content1 = this.state.detail.content1;
        content1 +=this.state.detail.content3;
        if(content1){
            let data = content1.split("|");
            if(data.length>1){
                return data.map((data,i)=>
                    <View key={i} style={styles.privilegeTextContainerStyle}>
                        <Text style={styles.privilegeDetailSubTextStyle}>{data}</Text>
                    </View>
                
                )

            }else{
                return <View style={styles.privilegeTextContainerStyle}><Text style={styles.privilegeDetailSubTextStyle}>{this.state.detail.content1}</Text></View>
            }
        }
        // return         
        //     (<View  style={styles.privilegeTextContainerStyle}>
        //         {/* <Text style={styles.privilegeDetailSubTextStyle}>{`${++i}. `}</Text> */}
        //         <Text style={styles.privilegeDetailSubTextStyle}>{this.state.detail.content2}</Text>
        //     </View>)
    }
    retrivePrivillege(){
        this.props.navigator.showModal({
            screen: 'mti.PrivilegeAgreementScreen', // unique ID registered with Navigation.registerScreen
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            passProps: {navigator:this.props.navigator,data:this.state.detail
                ,item:this.props.item,isCampaign:this.props.data.isCampaign}, // Object that will be passed as props to the pushed screen (optional)
            animated: true, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
            
        })
    }
    async addComment(){
        let response =  await post(`comment/privilege/${this.props.data.id}`,{"message":this.state.commentTxt});
        if(response){
            Alert.alert(
                ' ',
                   'คุณได้แสดงความคิดเห็นเรียบร้อย',
                [
                {text: 'OK', onPress: async () => {
                    let comments = await getBasic(`privilege/${this.props.data.id}/comments?page=1&pagesize=20`);
                    this.setState({comments:comments.data,commentTxt:""});
                }},
                ]
                )
        }
    }
     keyboardWillShow = async (event) => {
        setTimeout(()=>{
            this.scrollView.scrollToEnd({animated: true});
        },100)
        
        
      };
    
      keyboardWillHide = (event) => {
        this.scrollView.scrollTo({ x: 0});
        this.setState({showRecommend:true});
      };
   
    renderCommentList(){
       
        return(
            <FlatList
                data={this.state.comments}
                renderItem={this._renderComment}
                keyExtractor={(item, index) => index.toString()}
            />
        )
    }
    _renderComment = ({item}) => (
        <View style={{flex: 1,}}>
            <View style={styles.commentListSectionStyle}>
                <View style={styles.userThumbnailContainerStyle}>
                    <FastImage
                        source={{uri:item.member_profile_img}}
                        style={styles.userThumbnailStyle}
                    />
                </View>
                <View style={styles.commentDetailContainerStyle}>
                    <View style={styles.commentTitleContainerStyle}>
                        <Text style={styles.userNameTextStyle}>{item.member_name}</Text>
                        <Text style={styles.commentDateTextStyle}>{moment(item.date).locale('th').format("DD MMM YYYY")}</Text>
                    </View>
                    <Text style={styles.commentDetailTextStyle}>{item.msg}</Text>
                </View>
            </View>
            <Image
                source={require('../source/images/dotSectionHorizontal.png')}
                resizeMode='contain'
                style={styles.commentDotSectionBottomImageStyle}
            />
        </View>
    )
    renderCommentSection(){
        return(
            <ScrollView style={styles.commentContainerStyle}>
                <Image
                    source={require('../source/images/dotSectionHorizontal.png')}
                    resizeMode='contain'
                    style={styles.commentDotSectionImageStyle}
                />
                {(this.state.user||(!this.state.user && this.state.comments.length > 0)) && <View style={styles.totalCommentContainerStyle}>
                    <Image
                        source={require('../source/icons/iconCommentSelected.png')}
                        resizeMode='contain'
                        style={styles.commentIconStyle}
                    />
                    <Text style={styles.totalCommentTextStyle}>ความคิดเห็น {this.state.comments.length > 0 ? '['+this.state.comments.length+']':""}</Text>
                </View>}
                <View style={styles.commentListContainerStyle}>
                    {this.state.comments.length > 0 && 
                        <View style={{height:responsiveHeight(30)}}>
                            {this.renderCommentList()}
                        </View>
                    }   
                    {this.state.user && this.state.user.name != "GUEST" ?<View style={styles.commentListSectionStyle}>
                        <View style={styles.userThumbnailContainerStyle}>
                            <Image
                                source={{uri:this.state.user.profile_img}}
                                style={styles.userThumbnailStyle}
                            />
                        </View>
                        <Item style={styles.commentInputContainerStyle}>
                            <Input 
                                placeholder='ความคิดเห็นของคุณ...'
                                placeholderTextColor='rgba(145, 145, 149, 0.44)'
                                value={this.state.commentTxt}
                                onChangeText={val=>this.setState({commentTxt:val})}
                                onSubmitEditing={() => {
                                   this.addComment();
                                }}
                                returnKeyType="send"
                                onSubmitEditing={()=> {
                                    this.addComment();
                                 }}
                            />
                            <TouchableOpacity onPress={this.addComment}>
                                <Image
                                    source={require('../source/icons/iconSendMessage.png')}
                                    resizeMode='contain'
                                    style={styles.sendMessageIconStyle}
                                />
                            </TouchableOpacity>
                        </Item>
                    </View>:null}
                </View>
            </ScrollView>
        )
    }
    openDetail(item){
        this.props.navigator.push({
            screen: "mti.PrivilegeDetailScreen", // unique ID registered with Navigation.registerScreen
            passProps:{data:item},
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            animated: false, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
        })
    }
    renderRecommendPrivilegeList(){
        console.log(this.state.recommend);
        if(this.state.recommend && this.state.recommend.length > 0 ){
        return (this.state.recommend.map((data,i)=>
                {
                    if(data.id != this.state.detail.id){
                        return <DashboardActivityCard 
                        key={i} 
                        bannerUri={data.picture_url ? {uri:data.picture_url}:null}
                        iconUri={data.iconUri}
                        iconTitleText={data.iconTitleText}
                        activityTitleText={data.name}
                        groupId={data.group_id}
                        onPress={()=>this.openDetail(data)}
                        style={[styles.dashboardActivityCardContainerStyle,i==this.state.recommend.length-1&&styles.lastItemStyle]}
                        />
                    }
                }))
        }else{
            return null;
        }
    }
    getexpireDate(){
        return `${moment(this.state.detail.start_date).locale('th').format("DD MMM YYYY")} - ${moment(this.state.detail.end_date).locale('th').format("DD MMM YYYY")}`
    }
    transformToPrivillege(datas){
        let privileges = [];
        if(datas){
            datas.map(data=>{
                data.id = data.campaign_id;
                data.picture_url = data.picture;
                data.name = data.subject;
                data.group_id = data.campaign_grp_id;
                data.isCampaign = true;
                privileges.push(data);
            })
            
        }
        return privileges;
    }
    onCancel() {
        console.log("CANCEL")
        this.setState({shareVisible:false});
      }
      onOpen() {
        console.log("OPEN")
        this.setState({shareVisible:true});
      }
    async favPress() {
        let param = {};
        let isFavorite = this.state.detail.isFavorite;
        if(!isFavorite){
            param.action = "add";
        }else{
            param.action = "delete";
        }
        let response = await post("favorite/privilege/"+this.state.detail.id,param);
        let detail = {...this.state.detail};
        detail.isFavorite = !isFavorite;
        this.setState({detail:detail});
    }
    render(){
        let shareOptions = {
            title: "React Native",
            message: "Hola mundo",
            url: "http://facebook.github.io/react-native/",
            subject: "Share Link" //  for email
          };
        return !this.state.isLoading ? (
            <View style={styles.privilegeDetailScreenContainerStyle}>
                <Headers
                    leftIconName='cancel'
                    cancelTxt={'กลับ'}
                    cancel={()=>this.props.navigator.pop()}
                    headerTitleText='รายละเอียดสิทธิพิเศษ'
                />
                <ScrollView style={{flex: 1,}}  ref={ref => this.scrollView = ref}>
                    <View behavior="padding" style={styles.privilegeDetailContainerStyle}>
                         <View style={styles.bannerImageContainerStyle}>
                            {/* <View style={styles.bannerImageSectionStyle}>
                                <Image
                                    source={this.state.detail && this.state.detail.picture_url ? {uri:this.state.detail.picture_url}:null}
                                    style={styles.bannerImageStyle}
                                    borderRadius={3}
                                />
                            </View>  */}
                            <ImageBackground
                                source={this.state.detail && this.state.detail.picture_url ? {uri:this.state.detail.picture_url}:require('../source/images/pic-default.jpg')}
                                resizeMode='stretch'
                                style={styles.bannerImageSectionStyle}
                                borderRadius={3}
                            />
                            
                            <View style={styles.iconEventContainerStyle}>
                                <View style={styles.privilegeTitleContainerStyle}>
                                    <Image
                                        source={this.getIcon()}
                                        resizeMode='contain'
                                        style={styles.titleIconStyle}
                                    />
                                    <Text style={styles.titleTextStyle}>{this.getTitleText()}</Text>
                                </View>
                                <View style={styles.eventButtonGroupContainerStyle}>
                                    <EventButtonGroup
                                        isFavorite={this.state.detail.isFavorite}
                                        isShareSelected
                                        onSharePress={()=>this.onOpen()}
                                        onFavPress={()=>this.favPress()}
                                        showFav={this.state.showFav}
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
                                <Text style={styles.privilegeDurationTextStyle}>ระยะเวลาการใช้สิทธิ์ : {this.getexpireDate()}</Text>
                                <Text style={styles.privilegeDetailTextStyle}>รายละเอียดสิทธิพิเศษ</Text>
                                {this.renderPrivilegeDetailList()}
                                {this.state.user && this.state.user.name!="GUEST" && <MainSubmitButton
                                    buttonTitleText='ขอรับสิทธิ์'
                                    onPress={this.retrivePrivillege}
                                    style={styles.submitButtonStyle}
                                />}
                                {this.state.showComment&&this.renderCommentSection()}
                            </View>
                        </View>
                        {this.state.showRecommend && this.state.recommend.length==1?<View/>:
                            <View style={styles.recommendPrivilegeContainerStyle}>
                                <View style={styles.recommendTitleContainerStyle}>
                                    <Text style={styles.recommendTitleTextStyle}>สิทธิพิเศษที่แนะนำให้คุณ</Text>
                                </View>
                                <View style={styles.recommendPrivilegeListContainerStyle}>
                                    <ScrollView horizontal style={{flex: 1}} contentContainerStyle={{marginLeft: responsiveWidth(4.6)}} showsHorizontalScrollIndicator={false}>
                                        {!this.state.isLoading && this.renderRecommendPrivilegeList()}
                                    </ScrollView>
                                </View>
                            </View>
                        }
                    </View>
                </ScrollView>
                <ShareSheet visible={this.state.shareVisible} onCancel={this.onCancel.bind(this)}>
                    <Button iconSrc={{ uri: TWITTER_ICON }}
                            onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            Share.shareSingle(Object.assign(shareOptions, {
                            "social": "twitter"
                            }));
                        },300);
                        }}>Twitter</Button>
                    <Button iconSrc={{ uri: FACEBOOK_ICON }}
                            onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            Share.shareSingle(Object.assign(shareOptions, {
                            "social": "facebook"
                            }));
                        },300);
                        }}>Facebook</Button>
                    <Button iconSrc={{ uri: EMAIL_ICON }}
                            onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            Share.shareSingle(Object.assign(shareOptions, {
                            "social": "email"
                            }));
                        },300);
                        }}>Email</Button>
                    <Button
                        iconSrc={{ uri: CLIPBOARD_ICON }}
                        onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            if(typeof shareOptions["url"] !== undefined) {
                            Clipboard.setString(shareOptions["url"]);
                            if (Platform.OS === "android") {
                                ToastAndroid.show('Link copiado al portapapeles', ToastAndroid.SHORT);
                            } else if (Platform.OS === "ios") {
                                AlertIOS.alert('Link copiado al portapapeles');
                            }
                            }
                        },300);
                        }}>Copy Link</Button>
                    <Button iconSrc={{ uri: MORE_ICON }}
                        onPress={()=>{
                        this.onCancel();
                        setTimeout(() => {
                            Share.open(shareOptions)
                        },300);
                        }}>More</Button>
                    </ShareSheet>
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
        paddingTop: responsiveHeight(2),
        backgroundColor: '#f6f6f6',
        borderBottomWidth: responsiveHeight(0.17),
        borderColor: '#dddddd',
    },
    bannerImageSectionStyle:{
        height: responsiveHeight(23.23),
        alignItems: 'center',
        marginLeft: responsiveWidth(3.5),
        marginRight: responsiveWidth(3.5),
    },
    bannerImageStyle:{
        height: "100%",
        width: responsiveWidth(90),
    },
    iconEventContainerStyle:{
        flexDirection: 'row',
        marginLeft: responsiveWidth(3.5),
        marginRight: responsiveWidth(3.5),
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
        backgroundColor:"#fff"
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
    },
    lastItemStyle:{
        marginRight: responsiveWidth(9.12),
    }

}
const TWITTER_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABvFBMVEUAAAAA//8AnuwAnOsAneoAm+oAm+oAm+oAm+oAm+kAnuwAmf8An+0AqtUAku0AnesAm+oAm+oAnesAqv8An+oAnuoAneoAnOkAmOoAm+oAm+oAn98AnOoAm+oAm+oAmuoAm+oAmekAnOsAm+sAmeYAnusAm+oAnOoAme0AnOoAnesAp+0Av/8Am+oAm+sAmuoAn+oAm+oAnOoAgP8Am+sAm+oAmuoAm+oAmusAmucAnOwAm+oAmusAm+oAm+oAm+kAmusAougAnOsAmukAn+wAm+sAnesAmeoAnekAmewAm+oAnOkAl+cAm+oAm+oAmukAn+sAmukAn+0Am+oAmOoAmesAm+oAm+oAm+kAme4AmesAm+oAjuMAmusAmuwAm+kAm+oAmuoAsesAm+0Am+oAneoAm+wAmusAm+oAm+oAm+gAnewAm+oAle0Am+oAm+oAmeYAmeoAmukAoOcAmuoAm+oAm+wAmuoAneoAnOkAgP8Am+oAm+oAn+8An+wAmusAnuwAs+YAmegAm+oAm+oAm+oAmuwAm+oAm+kAnesAmuoAmukAm+sAnukAnusAm+oAmuoAnOsAmukAqv9m+G5fAAAAlHRSTlMAAUSj3/v625IuNwVVBg6Z//J1Axhft5ol9ZEIrP7P8eIjZJcKdOU+RoO0HQTjtblK3VUCM/dg/a8rXesm9vSkTAtnaJ/gom5GKGNdINz4U1hRRdc+gPDm+R5L0wnQnUXzVg04uoVSW6HuIZGFHd7WFDxHK7P8eIbFsQRhrhBQtJAKN0prnKLvjBowjn8igenQfkQGdD8A7wAAAXRJREFUSMdjYBgFo2AUDCXAyMTMwsrGzsEJ5nBx41HKw4smwMfPKgAGgkLCIqJi4nj0SkhKoRotLSMAA7Jy8gIKing0KwkIKKsgC6gKIAM1dREN3Jo1gSq0tBF8HV1kvax6+moG+DULGBoZw/gmAqjA1Ay/s4HA3MISyrdC1WtthC9ebGwhquzsHRxBfCdUzc74Y9UFrtDVzd3D0wtVszd+zT6+KKr9UDX749UbEBgULIAbhODVHCoQFo5bb0QkXs1RAvhAtDFezTGx+DTHEchD8Ql4NCcSyoGJYTj1siQRzL/JKeY4NKcSzvxp6RmSWPVmZhHWnI3L1TlEFDu5edj15hcQU2gVqmHTa1pEXJFXXFKKqbmM2ALTuLC8Ak1vZRXRxa1xtS6q3ppaYrXG1NWjai1taCRCG6dJU3NLqy+ak10DGImx07LNFCOk2js6iXVyVzcLai7s6SWlbnIs6rOIbi8ViOifIDNx0uTRynoUjIIRAgALIFStaR5YjgAAAABJRU5ErkJggg==";

//  facebook icon
const FACEBOOK_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEUAAAAAQIAAWpwAX5kAX5gAX5gAX5gAXJwAXpgAWZ8AX5gAXaIAX5gAXpkAVaoAX5gAXJsAX5gAX5gAYJkAYJkAXpoAX5gAX5gAX5kAXpcAX5kAX5gAX5gAX5YAXpoAYJijtTrqAAAAIHRSTlMABFis4vv/JL0o4QvSegbnQPx8UHWwj4OUgo7Px061qCrcMv8AAAB0SURBVEjH7dK3DoAwDEVRqum9BwL//5dIscQEEjFiCPhubziTbVkc98dsx/V8UGnbIIQjXRvFQMZJCnScAR3nxQNcIqrqRqWHW8Qd6cY94oGER8STMVioZsQLLnEXw1mMr5OqFdGGS378wxgzZvwO5jiz2wFnjxABOufdfQAAAABJRU5ErkJggg==";

//  whatsapp icon
const WHATSAPP_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAACzVBMVEUAAAAArQAArgAArwAAsAAAsAAAsAAAsAAAsAAAsAAAsAAAsAAArwAAtgAAgAAAsAAArwAAsAAAsAAAsAAAsAAAsgAArwAAsAAAsAAAsAAAsQAAsAAAswAAqgAArQAAsAAAsAAArwAArwAAsAAAsQAArgAAtgAAsQAAuAAAtAAArwAAsgAAsAAArAAA/wAAsQAAsAAAsAAAsAAAzAAArwAAsAAAswAAsAAAsAAArQAAqgAAsAAAsQAAsAAAsAAAsAAAqgAAsQAAsAAAsAAArwAAtAAAvwAAsAAAuwAAsQAAsAAAsAAAswAAqgAAswAAsQAAswAAsgAAsAAArgAAsAAAsAAAtwAAswAAsAAAuQAAvwAArwAAsQAAsQAAswAAuQAAsAAAsAAArgAAsAAArgAArAAAsAAArgAArgAAsAAAswAArwAAsAAAsQAArQAArwAArwAAsQAAsAAAsQAAsQAAqgAAsAAAsAAAsAAAtAAAsAAAsQAAsAAAsAAAsAAArgAAsAAAsQAAqgAAsAAAsQAAsAAAswAArwAAsgAAsgAAsgAApQAArQAAuAAAsAAArwAAugAArwAAtQAArwAAsAAArgAAsAAAsgAAqgAAsAAAsgAAsAAAzAAAsQAArwAAswAAsAAArwAArgAAtwAAsAAArwAAsAAArwAArwAArwAAqgAAsQAAsAAAsQAAnwAAsgAArgAAsgAArwAAsAAArwAArgAAtAAArwAArwAArQAAsAAArwAArwAArwAAsAAAsAAAtAAAsAAAswAAsgAAtAAArQAAtgAAsQAAsQAAsAAAswAAsQAAsQAAuAAAsAAArwAAmQAAsgAAsQAAsgAAsAAAsgAAsAAArwAAqgAArwAArwAAsgAAsQAAsQAArQAAtAAAsQAAsQAAsgAAswAAsQAAsgAAsQAArwAAsQAAsAAArQAAuQAAsAAAsQAArQCMtzPzAAAA73RSTlMAGV+dyen6/vbfvIhJBwJEoO//1oQhpfz98Or0eQZX5ve5dkckEw4XL1WM0LsuAX35pC0FVuQ5etFEDHg+dPufFTHZKjOnBNcPDce3Hg827H9q6yax5y5y7B0I0HyjhgvGfkjlFjTVTNSVgG9X3UvNMHmbj4weXlG+QfNl4ayiL+3BA+KrYaBDxLWBER8k4yAazBi28k/BKyrg2mQKl4YUipCYNdR92FBT2hhfPd8I1nVMys7AcSKfoyJqIxBGSh0shzLMepwjLsJUG1zhErmTBU+2RtvGsmYJQIDN69BREUuz65OCklJwpvhdFq5BHA9KmUcAAALeSURBVEjH7Zb5Q0xRFMdDNZZU861EyUxk7IRSDY0piSJLiSwJpUTM2MlS2bdERskSWbLva8qWNVv2new7f4Pz3sw09eq9GT8395dz7jnzeXc5554zFhbmYR41bNSqXcfSylpUt179BjYN/4u0tbMXwzAcHJ1MZ50aObNQ4yYurlrcpambics2k9DPpe7NW3i0lLVq3aZtOwZv38EUtmMnWtazcxeDpauXJdHe3UxgfYj19atslHenK/DuYRT2VwA9lVXMAYF08F5G2CBPoHdwNQ6PPoBlX0E2JBToF0JKcP8wjmvAQGCQIDwYCI8gqRziHDmU4xsGRA0XYEeMBEYx0Yqm6x3NccaMAcYKwOOA2DiS45kkiedmZQIwQSBTE4GJjJzEplUSN4qTgSn8MVYBakaZysLTuP7pwAxeeKYUYltGmcWwrnZc/2xgDi88FwjVvoxkQDSvij9Cgfm8sBewQKstJNivil/uAikvTLuN1mopqUCanOtftBgiXjgJWKJTl9Khl9lyI20lsPJyYIX+4lcSvYpN8tVr9P50BdbywhlSROlXW7eejm2fSQfdoEnUPe6NQBZ/nH2BbP1kUw6tvXnL1m0kNLnbGdMOII8/w3YCPuWTXbuZaEtEbMLsYTI+H9jLD+8D9svKZwfcDQX0IM0PAYfl/PCRo8CxCsc4fkLHnqRPup0CHIXe82l6VmcqvlGbs7FA8rkC0s8DqYVCcBFV3YTKprALFy8x8nI4cEWwkhRTJGXVegquAiqlIHwNuF6t44YD7f6mcNG+BZSQvJ3OSeo7dwFxiXDhDVAg516Q/32NuDTbYH3w8BEFW/LYSNWmCvLkqbbJSZ89V78gU9zLVypm/rrYWKtJ04X1DfsBUWT820ANawjPLTLWatTWbELavyt7/8G5Qn/++KnQeJP7DFH+l69l7CbU376rrH4oXHOySn/+MqW7/s77U6mHx/zNyAw2/8Myjxo4/gFbtKaSEfjiiQAAAABJRU5ErkJggg==";

//  gplus icon
const GOOGLE_PLUS_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAACQ1BMVEUAAAD/RDP/STX9Sjb+STT+SjX+SjX+SjX+STT/SzP/Sjb/SzX/VVX/SDb+SDP+SjX9RzT9STT9SjT+STX+SjT9SjT/SST/TTP+SjX+SjX/RDP/RzP+SjX+SjX/STf9SDX/SjX/TU3+Sjb+SjX/Qyz/Szb+SjX/TTP+SjX9STX+SjP/TTX9Szb+Szb/YCD/SzX/SzX+Sjb+STX/TTX/SzX/Szb/TDT+SjX9SzX/STf+TDX/SjT9SzX9Szb+SjX/SjX/SzX/STT9SjT9TDT+SDT/VQD9STX/STX9SjX+SjX9STX+SzT/UDD9Sjb+SjX9RzT/QED+SjT+SjX/XS7+SjX/Ui7/RC3+SjX/TTz/RzP+SjX/TTP/STf+SjX/STT/RjP+Sjb/SzX/Szz/Rjr/RzL+RzP+SjX/Szf/SjX9Sjb+SjX+Sjb+SjX+SjX+SjX/STf/SjT/SjT9SjX9SzT+RzT+STT/STT+SjX/STP/Tjf+SjX/Szb/SjX/STX9SjX/SjT/AAD/SjH/STb+SzX+Sjb+SjT9SDT+Sjb+SjX9STf9STT/SDX/TDf+STb/TjT/TjH+SjX+SDT/Sjb9SzX9RzX+TDT/TUD/STX+SjX+STX/VTn/QjH/SjX+SjX/Ri7+Szb/TTP+SjX/SDX/STT9SjX+SjX/SDL/TjT9Sjb/RjL+SjX9SzX/QED/TDT+SjX+SjX9STX/RjX/VSv/Rzb/STX/ORz/UDD9SzX+Sjb/STT9SzP+SzX+SjX+SjX9Szb/Ti//ZjPPn7DtAAAAwXRSTlMAD1uiy+j5/8FBZHQDY9zvnYSc5dGhBwr+1S0Zqu44mz4KtNkXY7Yo8YLcfp3bCGZ+sLhWaks2z4wO6VOklrtWRFSXos4DoD+D/ZnoEKasjwS7+gvfHC3kHmjtMlTXYjfZXBEWa+/nQRiK5u7c8vVGRWepp6+5eulQF/dfSHSQdQEfdrzguZzm+4KSQyW1JxrAvCaCiLYUc8nGCR9h6gvzFM41MZHhYDGYTMejCEDi3osdBj1+CSCWyGyp1PC3hUEF/yhErwAAAjFJREFUSMft1tdfE0EQB/ADJD+JKAomHoqKxhJLFCnSpdgIxobYgqhYaJKIHVQUsSFiBSuCvWPv3T/N2ZPD3EucvVcyL3sz2W8+l73ZvShKKEIxcCIsPGJQpAV9MThK1KzAEAaNHjosZviI2DgBR9psVrvCx6Ni1fjRNI5JIDx2nF5m4ejxsCRqVxMmknZMksGTVUzpu5zqJD1NAodNB2boyUzCrlnK7CSKOUCyGJOC4BSan6onaWLN5irpCIwgOAMBt5eZRVk2H+fQx7n92TzK8pT8AopCwCbGgiB4Pk1fsFDPFlG2mL9gRTTdnahnxcASDx/nq6SX6tkyYLnEo1qxknBJ2t9kVSlcq2WaZM1a0qXrtOv18Jbp9Q3l5Rv/39ubHKQ3V2xRtm7bXlkluyGra2qJ76jzwb/TxH721O9K3U1fsMfsgbCXcLFZvI+wL8ok3i/6+ECDOdxYJ/TBQ9Kw+nDTkRyHtodKjjbLyGMtx304cTKi8NRpoVutfJp5xgtv21ntxGw/J7T3PNdeuAhcuqxn9o5W0p1Ma78CpF/9lzdfI3ydiStobrjhIL4BRN7k4WRa3i5D5RbQ3cPDMcDtO4ZKGXCXedtuQL1nqNwHHjDxQ/rNGYbKI/gfM/ETwv6ngafSM3RwH3O7eK86Wzz9L582PO9lN9iLl6KpXr2uf9P7tvHde4e75oNEZ3/85NQ2hKUyzg/1c57klur68vXbd9XtdP34+et36C9WKAZo/AEHHmXeIIIUCQAAAABJRU5ErkJggg==";

//  email icon
const EMAIL_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABC1BMVEUAAAA/Pz8/Pz9AQEA/Pz8/Pz8+Pj4+Pj4/Pz8/Pz8/Pz8/Pz8+Pj4+Pj4/Pz8/Pz8/Pz9AQEA+Pj5AQEA/Pz87Ozs7Ozs/Pz8+Pj47OztAQEA/Pz89PT01NTVBQUFBQUE/Pz8/Pz8+Pj4/Pz9BQUE+Pj4/Pz8/Pz89PT0+Pj4/Pz9BQUFAQEA9PT09PT0/Pz87Ozs9PT05OTk/Pz8+Pj4/Pz9AQEA/Pz8/Pz8/Pz8/Pz+AgIA+Pj4/Pz8/Pz9AQEA/Pz8/Pz8/Pz8/Pz8+Pj4/Pz8/Pz8/Pz9AQEA+Pj4/Pz8+Pj4/Pz85OTk/Pz8/Pz8/Pz8/Pz88PDw9PT0/Pz88PDw8PDw+Pj45OTlktUJVAAAAWXRSTlMA/7N4w+lCWvSx8etGX/XlnmRO7+1KY/fjOGj44DU7UvndMec/VvLbLj7YKyiJdu9O7jZ6Um1w7DnzWQJz+tpE6uY9t8D9QehAOt7PVRt5q6duEVDwSEysSPRjqHMAAAEfSURBVEjH7ZTXUgIxGEa/TwURUFyKYgMURLCvbe2gYAV7ff8nMRksgEDiKl7lXOxM5p8zO3s2CWAwGAx/CjXontzT25Y+pezxtpv2+xTygJ+BYOvh4BBDwx1lKxxhNNZqNjLK+JjVWUYsykj4+2h8gpNTUMkIBuhPNE+SKU7PQC3D62E60ziYzXIuBx0Z+XRTc9F5fgF6MhKNzWXnRejKWGJdc9GZy8AP3kyurH52Ju01XTkjvnldNN+Qi03RecthfFtPlrXz8rmzi739Ax7mUCjy6FhH/vjPonmqVD6pdT718excLX/tsItLeRAqtc7VLIsFlVy/t6+ub27v7t8XD490niy3p+rZpv3i+jy/Or+5SUrdvcNcywaDwfD/vAF2TBl+G6XvQwAAAABJRU5ErkJggg==";

//  clipboard icon
const CLIPBOARD_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAB5lBMVEUAAAA8PDw+Pj4/Pz8/Pz8/Pz8/Pz8+Pj47OzsAAAA5OTk+Pj4/Pz8/Pz8+Pj49PT0/Pz8/Pz85OTlAQEA/Pz87Ozs+Pj4+Pj4/Pz8/Pz8/Pz8zMzNBQUE/Pz8/Pz8/Pz9AQEA7Ozs9PT0/Pz9AQEA+Pj4/Pz8+Pj4AAABAQEA/Pz87OztBQUE/Pz8+Pj4zMzNDQ0M/Pz89PT03Nzc/Pz8/Pz8/Pz8/Pz88PDw8PDwAAABCQkI7Ozs9PT0/Pz9AQEA/Pz8uLi4rKytAQEA/Pz89PT0+Pj4/Pz8/Pz8/Pz9CQkJAQEA/Pz9CQkI/Pz8/Pz8/Pz8+Pj49PT0/Pz8yMjI/Pz88PDw/Pz9BQUE8PDw/Pz9AQEA/Pz8/Pz8/Pz89PT0/Pz9CQkI9PT1EREQ9PT08PDw4ODg+Pj6AgIA/Pz8/Pz82NjZVVVU7Ozs/Pz81NTVAQEA/Pz8+Pj49PT1BQUE/Pz8/Pz8/Pz8vLy8/Pz87OztAQEA3Nzc9PT0+Pj4/Pz89PT0/Pz8/Pz89PT1AQEA9PT04ODgzMzM/Pz8/Pz9AQEA/Pz9AQEA/Pz83Nzc9PT0/Pz9AQEA/Pz8+Pj4+Pj5AQEA/Pz89PT1FRUU5OTk/Pz8/Pz8+Pj47Ozs/Pz89PT08PDw+Pj6z1Mg0AAAAonRSTlMAEXTG8/7pslICKMn//J0u2LcSLNu9Y0523KoKL9b7hggauZsEOuJ/ARS7VifkiwUX0bEq1f1p6KGQAz4NpnpY8AsGtMIyb46NbSOMcRuh+fGTFc0z1yKFKy/dpKff1CqKMoYPp+lAgAKd6kIDhdorJJExNjflktMr3nkQDoXbvaCe2d2EijIUn3JsbjDDF1jjOOdWvIDhmhoJfWrAK7bYnMgx8fGWAAACNUlEQVRIx+2W6V8SURSGBxEVeydMbVER1DCwRNTCEhMNsywqExXcUrNVU9NK2wy1fd9sMyvrP+1cmYH5eK5f5f3APef85hnuvfPeM6MoaaW1dWXKMGdasrJzrJtgc7dhQ+p2kzRry4OuHfmSbEEhUTt37d5TRGNxiRRrLwUczjKKyiuI3uuSYCv3ARa3ZyOu2k/xAT5b7aXra3xaVlsH1LPZg4cAvzM10wbgMBs+QqtsDKTyJroXGz7a7AgandECtPLXfKzFY8hCbcBxFudpP3Gy49RpQ8UXtgBnOOzZc53CU+e7Ism7uYnt5ji0p1e3pDmqzTnmAEr7GGz/AGEDg0MXaBgeERXrKIWFBQz2IvlYHbtEh/EycOUqVQLXVCDPxvGz+MPYdRGWjE/coGFyyg9M32SwM8PkydlQIim7JX6DxHpvM9g7c+SjoLESmqd9vjvDYO9NEzs1aahYY7SK+3Zm31Ddmp8jDx4qysIj2qt4O6dviH4xqvk5soj40vJjqjzh7HOf6BtPtb1SnulG6X3O6bHdqb5BejHbKtDOl+UcQ78iNuwzFKKvwx1v3npYJ+kd0BYynqz3Eu2OZvnB+IyCRVE+TD5qSmWBRuDjJzb8GWhIJq4xv36kWKoH6mr1vlFDnvRW86e9Qtd/qUrs1VeKv1VKbJjrOz3Wih8UrTpF37ArMlotFmfg58raLxrjvyXfifl/ku/TdZsiK9NfNcH+y93Ed4A1JzvLkmnOMClppbV19R+iQFSQ2tNASwAAAABJRU5ErkJggg==";

//  more icon
const MORE_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAQlBMVEUAAABEREQ9PT0/Pz8/Pz9AQEA7OzszMzM/Pz8/Pz9FRUU/Pz8/Pz9VVVUAAAA/Pz8+Pj4/Pz8/Pz9BQUFAQEA/Pz+e9yGtAAAAFnRSTlMAD5bv9KgaFJ/yGv+zAwGltPH9LyD5QNQoVwAAAF5JREFUSMft0EkKwCAQRFHHqEnUON3/qkmDuHMlZlVv95GCRsYAAAD+xYVU+hhprHPWjDy1koJPx+L63L5XiJQx9PQPpZiOEz3n0qs2ylZ7lkyZ9oyXzl76MAAAgD1eJM8FMZg0rF4AAAAASUVORK5CYII=";