import React,{Component} from 'react';
import {Text,View,ScrollView,TouchableOpacity,Image,BackHandler,Platform,PushNotificationIOS} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {UserShortDetailCard} from './../components/UserShortDetailCard';
import {Headers} from './../components/Headers';
import {DashboardActivityCard} from './../components/DashboardActivityCard';
import {PastEventCard} from './../components/PastEventCard';
import { observer, inject } from 'mobx-react';
import {post,authen,get,getBasic} from '../api';
import store from 'react-native-simple-store';
import Spinner from 'react-native-loading-spinner-overlay';
import app from '../stores/app';
import moment from 'moment';
import localization from 'moment/locale/th'

@inject('naviStore','userStore')
@observer
export default class DashboardScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            hotDealDefault:[
                {
                    bannerUri: require('../source/images/pic-default.jpg'),
                    iconUri: require('../source/icons/iconHealthySelected.png'),
                    iconTitleText: 'Lifestyle',
                    activityTitleText: ''
                },
                {
                    bannerUri: require('../source/images/pic-default.jpg'),
                    iconUri: require('../source/icons/iconHealthySelected.png'),
                    iconTitleText: 'Lifestyle',
                    activityTitleText: ''
                },
            ],

            myLifeStyle:[],
            pastEvent:[
                {
                    bannerUri: require('../source/images/pic-default.jpg'),
                    eventTitleText: 'MTI 8 Anniversary "ยิ้มรับความสำเร็จ..ฉลอง ก้าวแห่งความภาคภูมิใจ" กับเมืองไทยประกันภัย',
                    eventDetailText: 'นำลูกค้าล่องเรือชมบรรยากาศริมแม่น้ำเจ้าพระยา พร้อมรับประทานอาหารค่ำและชมมินิคอนเสิร์ต จากศิลปินคู่ ดูโอ แอน(ธิติมา) - ปิงปอง(ศิรศักดิ์) พร้อมกันนี้ ยังมีกิจกรรม...'
                },
                {
                    bannerUri: require('../source/images/pic-default.jpg'),
                    eventTitleText: 'MTI 8 Anniversary "ยิ้มรับความสำเร็จ..ฉลอง ก้าวแห่งความภาคภูมิใจ" กับเมืองไทยประกันภัย',
                    eventDetailText: 'นำลูกค้าล่องเรือชมบรรยากาศริมแม่น้ำเจ้าพระยา พร้อมรับประทานอาหารค่ำและชมมินิคอนเสิร์ต จากศิลปินคู่ ดูโอ แอน(ธิติมา) - ปิงปอง(ศิรศักดิ์) พร้อมกันนี้ ยังมีกิจกรรม...'
                }
            ],
            hotDeal:[],
            isLoading:true,
            incomingActivityList:[],
            campaigns:[]
        }
        this.props.naviStore.navigation = this.props.navigator;
       
        this.openDetail = this.openDetail.bind(this);
        this.goToPrivilleges = this.goToPrivilleges.bind(this);
        this.goToCampaigns = this.goToCampaigns.bind(this);
        this.app = app;
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.backPress = this.backPress.bind(this);
    }
    async componentDidMount(){
        
        BackHandler.addEventListener('hardwareBackPress', this.backPress)
        //this.init();
    };
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backPress)
    }
    async init(){
        try{
        this.props.naviStore.navigation = this.props.navigator;
        this.props.naviStore.isPrivillege = "false";
        this.props.naviStore.isActivity = "false";
        let user = await store.get("user");
        this.setState({isLoading:true});
        if(user){
           
                // let response = await get("me",{});
                let myLife = await get("memberprivileges?filter_set=lifestyle&page=1&pagesize=5",{});
                if(myLife){
                let [privilegeGroup,hotDeal,incomingList,activityList,campaigns,campaignsGroup] = await Promise.all([
                 getBasic("privilege/groups",{})
                ,getBasic("privileges?filter_set=hotdeal&page=1&pagesize=5",{})
                ,getBasic("activity?filter_type=next&page=1&pagesize=1",{})
                ,getBasic("activity?filter_type=prev&page=1&pagesize=5",{})
                ,get(`membercampaign?page=1&pagesize=5`,{})
                ,getBasic(`campaign/groups`,{})]);
                // let privilegeGroup = await getBasic("privilege/groups",{});
                this.setState({isLoading:false});
                if(privilegeGroup) {
                    store.save("privilegeGroup",privilegeGroup.data)
                }
                // let hotDeal = await getBasic("privileges?filter_set=hotdeal&page=1&pagesize=5",{});
                if(hotDeal){
                    this.setState({hotDeal:hotDeal.data});
                }
                // let myLife = await get("memberprivileges?filter_set=lifestyle&page=1&pagesize=5",{});
                if(myLife){
                    this.setState({myLifeStyle:myLife.data});
                }
                //let activityList = await getBasic('activity?filter_type=prev&page=1&pagesize=5',{});
                // let [incomingList,activityList] =  await Promise.all([getBasic("activity?filter_type=next&page=1&pagesize=1",{}),getBasic("activity?filter_type=prev&page=1&pagesize=5",{})]);
                if(incomingList){
                    //console.log(activityList.data)
                    this.setState({incomingActivityList:incomingList.data})
                }
                if(activityList){
                    //console.log(activityList.data)
                    this.setState({pastEvent:activityList.data})
                }
                if(campaigns){
                    let data = this.transformToPrivillege(campaigns.data);
                    this.setState({campaigns:data})
                }
                if(campaignsGroup) {
                    store.save("campaignsGroup",campaignsGroup.data)
                }
                if(this.props.naviStore.badge==0){
                    let notis = await get("me/notifications");
                    if(notis && notis.data){
                        if(notis) {
                            this.app.badge = notis.data.filter(data=>data.status=="NEW").length;
                            if(Platform.OS === 'ios'){
                                PushNotificationIOS.setApplicationIconBadgeNumber(this.app.badge);
                            }else{
                                
                            }
                            store.save("badge", this.app.badge);
                        }
                    }
                }
                
               
            }else{
                setTimeout(()=>{
                    this.setState({isLoading:false});
                    this.app.logout();
                },500)
               
            }
        }else{
            
            let privilegeGroup = await getBasic("privilege/groups",{});
            if(privilegeGroup){
                await store.save("privilegeGroup",privilegeGroup.data);
            }
            let hotDeal = await getBasic("privileges?filter_set=hotdeal&page=1&pagesize=5",{});
            if(hotDeal){
                this.setState({hotDeal:hotDeal.data});
            }
            let myLife = await getBasic("privileges?filter_set=lifestyle&page=1&pagesize=5",{});
            if(myLife){
                this.setState({myLifeStyle:myLife.data});
            }
            let [incomingList,activityList] =  await Promise.all(
                [getBasic("activity?filter_type=next",{})
                ,getBasic("activity?filter_type=prev&page=1&pagesize=5",{})
                ]);
            if(incomingList){
                //console.log(activityList.data)
                this.setState({incomingActivityList:incomingList.data})
            }
            if(activityList){
                //console.log(activityList.data)
                this.setState({pastEvent:activityList.data})
            }
            // if(campaigns){
            //     let data = this.transformToPrivillege(campaigns.data);
            //     this.setState({campaigns:data})
            // }
            // if(campaignsGroup) {
            //     store.save("campaignsGroup",campaignsGroup.data)
            // }
            this.setState({isLoading:false});
        }
          // await store.save("policy",response2);
                        // get("me/policy",{})
        }catch(e){
            alert(e)
        }
    }
    openDetail(link,item,index){
        // this.props.navigator.resetTo({
        //     screen: link, // unique ID registered with Navigation.registerScreen
        //     passProps:{hotlink:true,data:item},
        //     title: undefined, // navigation bar title of the pushed screen (optional)
        //     titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
        //     animated: false, // does the push have transition animation or does it happen immediately (optional)
        //     backButtonTitle: undefined, // override the back button title (optional)
        //     backButtonHidden: false, // hide the back button altogether (optional)
        // })
        this.props.naviStore.hotdata = item;
        this.props.navigator.switchToTab({
            tabIndex:index// (optional) if missing, this screen's tab will become selected
        });
    }
    
    renderHotDealList(){
        if(this.state.hotDeal && this.state.hotDeal.length >0){    
            return this.state.hotDeal.map((hotdeal,i)=>
                <DashboardActivityCard 
                    key={i} 
                    bannerUri={hotdeal.picture_url ? {uri:hotdeal.picture_url}:null}
                    iconUri={hotdeal.iconUri}
                    iconTitleText={hotdeal.iconTitleText}
                    activityTitleText={hotdeal.name}
                    groupId={hotdeal.group_id}
                    style={[{marginRight: responsiveWidth(3)},i==0&&{marginLeft: responsiveWidth(3)}]}
                    onPress={()=>this.openDetail('mti.PrivilegeScreen',hotdeal,2)}
                />
            )
        }else{
            return this.state.hotDealDefault.map((hotdeal,i)=>
                <DashboardActivityCard 
                    key={i} 
                    bannerUri={hotdeal.bannerUri}
                    iconUri={hotdeal.iconUri}
                    iconTitleText={hotdeal.iconTitleText}
                    activityTitleText={hotdeal.activityTitleText}
                    style={[{marginRight: responsiveWidth(3)},i==0&&{marginLeft: responsiveWidth(3)}]}
                    groupId={hotdeal.group_id}
                />
            )
        }
    }
    renderCampaings(){
        if(this.state.campaigns && this.state.campaigns.length >0){    
            return this.state.campaigns.map((hotdeal,i)=>
                <DashboardActivityCard
                    isCampaign={true} 
                    key={i} 
                    bannerUri={hotdeal.picture_url ? {uri:hotdeal.picture_url}:null}
                    iconUri={hotdeal.iconUri}
                    iconTitleText={hotdeal.iconTitleText}
                    activityTitleText={hotdeal.name}
                    groupId={hotdeal.group_id}
                    style={[{marginRight: responsiveWidth(3)},i==0&&{marginLeft: responsiveWidth(3)}]}
                    onPress={()=>this.openDetail('mti.PrivilegeDetailScreen',hotdeal,1)}
                />
            )
        }else{
            return(
                <Image
                source={require('./../source/images/banner-03.png')}
                style={{width: responsiveWidth(93),height: responsiveWidth(45), marginLeft: responsiveWidth(3),marginRight: responsiveWidth(2),}}
                resizeMode='contain'
                />
            )
        }
    }

    renderMyLifeStyleList(){
        if(this.state.myLifeStyle && this.state.myLifeStyle.length >0){    
            return this.state.myLifeStyle.map((myLifeStyle,i)=>
                <DashboardActivityCard 
                key={i} 
                bannerUri={myLifeStyle.picture_url ? {uri:myLifeStyle.picture_url}:null}
                iconUri={myLifeStyle.iconUri}
                iconTitleText={myLifeStyle.iconTitleText}
                activityTitleText={myLifeStyle.name}
                style={[{marginRight: responsiveWidth(3)},i==0&&{marginLeft: responsiveWidth(3)}]}
                groupId={myLifeStyle.group_id}
                onPress={()=>this.openDetail('mti.PrivilegeDetailScreen',myLifeStyle,2)}
            />
            )
        }else{
            return this.state.hotDealDefault.map((hotdeal,i)=>
                    <DashboardActivityCard 
                    key={i} 
                    bannerUri={hotdeal.bannerUri}
                    iconUri={hotdeal.iconUri}
                    iconTitleText={hotdeal.iconTitleText}
                    activityTitleText={hotdeal.activityTitleText}
                    style={[{marginRight: responsiveWidth(3)},i==0&&{marginLeft: responsiveWidth(3)}]}
                    groupId={hotdeal.group_id}
                />
            )
        }
    }
    onActivityCardPress(item,filter_type){
        // this.props.navigator.push({
        //     screen: "mti.ActivityDetailScreen", // unique ID registered with Navigation.registerScreen
        //     passProps:{data:item,filter_type:filter_type},
        //     title: undefined, // navigation bar title of the pushed screen (optional)
        //     titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
        //     animated: false, // does the push have transition animation or does it happen immediately (optional)
        //     backButtonTitle: undefined, // override the back button title (optional)
        //     backButtonHidden: false, // hide the back button altogether (optional)
        // })
        this.props.naviStore.hotdata = item;
        this.props.naviStore.hotdata.filter_type = filter_type;
        this.props.navigator.switchToTab({
            tabIndex:3// (optional) if missing, this screen's tab will become selected
        });
    }
    renderNewEventCard(){
        if(this.state.incomingActivityList && this.state.incomingActivityList.length>0){
            let item = this.state.incomingActivityList[0];
            let startDate = moment(item.start_date).locale("th",localization).format("DD-MMMM-YYYY");
                return(
                    <DashboardActivityCard 
                    bannerUri={{uri:item.picture}}
                    iconText={startDate.split("-")[0]}
                    iconTitleText={startDate.split("-")[1]}
                    activityTitleText={item.title}
                    style={styles.newEventImageStyle}
                    isJoin={item.booking_status=='open' ? item:undefined}
                    onPress={()=>this.onActivityCardPress(item,'next')}
                    navigator={this.props.navigator}
                    />
                )
        }else{
            return(
                <DashboardActivityCard 
                bannerUri={require('../source/images/activityImg05.png')}
                style={styles.newEventImageStyle}
                />
            )
        }
        
    }

    renderPastEventCard(){
        return this.state.pastEvent.map((pastEvent,i)=>
            <PastEventCard
                key={i}
                bannerUri={pastEvent.picture ? {uri:pastEvent.picture}:require('../source/images/pic-default.jpg')}
                eventTitleText={pastEvent.title}
                style={[{marginRight: responsiveWidth(3)},i==0&&{marginLeft: responsiveWidth(3)}]}
                onPress={()=>this.onActivityCardPress(pastEvent,'prev')}
            />
        )
    }
    goToPrivilleges(){
        // this.props.navigator.push({
        //     screen: "mti.PrivilegeScreen", // unique ID registered with Navigation.registerScreen
        //     title: undefined, // navigation bar title of the pushed screen (optional)
        //     titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
        //     animated: false, // does the push have transition animation or does it happen immediately (optional)
        //     backButtonTitle: undefined, // override the back button title (optional)
        //     backButtonHidden: false, // hide the back button altogether (optional)
        // })
        this.props.navigator.switchToTab({
            tabIndex: 2// (optional) if missing, this screen's tab will become selected
        });
    }
    showAllActivity(isNext){
        // this.props.navigator.push({
        //     screen: "mti.ActivityListScreen", // unique ID registered with Navigation.registerScreen
        //     passProps:{next:isNext},
        //     animated: false, // does the push have transition animation or does it happen immediately (optional)
        // })
        this.props.naviStore.hotdata = {};
        this.props.naviStore.hotdata.isAll = true;
        this.props.naviStore.hotdata.filter_type = isNext;
        this.props.navigator.switchToTab({
            tabIndex:3// (optional) if missing, this screen's tab will become selected
        });
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
    goToCampaigns(){
        // this.props.navigator.push({
        //     screen: "mti.CampaignScreen", // unique ID registered with Navigation.registerScreen
        //     title: undefined, // navigation bar title of the pushed screen (optional)
        //     titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
        //     animated: false, // does the push have transition animation or does it happen immediately (optional)
        //     backButtonTitle: undefined, // override the back button title (optional)
        //     backButtonHidden: false, // hide the back button altogether (optional)
        // })
        this.props.navigator.switchToTab({
            tabIndex: 1// (optional) if missing, this screen's tab will become selected
        });
    }

    render(){
        return(
            <View style={styles.dashboardScreenContainerStyle}>
                <Headers
                    leftIconName='menu'
                    headerTitleText='หน้าหลัก'
                    rightIconName='iconBell'
                    // notify='2'
                />
                {!this.state.isLoading &&<UserShortDetailCard showQr navigator={this.props.navigator}/>}
                <ScrollView style={{flex: 1}}>
                {!this.state.isLoading &&<View style={styles.dashboardDetailTopContainerStyle}>
                        <View style={styles.hotDealTitleTextContainerStyle}>
                            <Text style={styles.dashboardSectionTitleTextStyle}>HOT DEAL</Text>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewActivityCardContainerStyle}>
                            {this.renderHotDealList()}
                        </ScrollView>
                        <View style={styles.hotDealTitleTextContainerStyle}>
                            <Text style={styles.dashboardSectionTitleTextStyle}>MY GIFT</Text>
                            <TouchableOpacity style={styles.showAllContainerStyle} onPress={this.goToCampaigns}>
                                <Text style={styles.showAllTextStyle}>ดูทั้งหมด</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewActivityCardContainerStyle}>
                            {this.renderCampaings()}
                        </ScrollView>
                        <View style={styles.hotDealTitleTextContainerStyle}>
                            <Text style={styles.dashboardSectionTitleTextStyle}>MY LIFESTYLE</Text>
                            <TouchableOpacity style={styles.showAllContainerStyle} onPress={this.goToPrivilleges}>
                                <Text style={styles.showAllTextStyle}>ดูทั้งหมด</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewActivityCardContainerStyle}>
                            {this.renderMyLifeStyleList()}
                        </ScrollView>
                    </View>}
                     {!this.state.isLoading &&<View style={styles.dashboardDetailTopContainerStyle}>
                        <View style={styles.hotDealTitleTextContainerStyle}>
                            <Text style={styles.dashboardSectionTitleTextStyle}>กิจกรรมถัดไป</Text>
                            <TouchableOpacity style={styles.showAllContainerStyle} onPress={()=>this.showAllActivity(true)}>
                                <Text style={styles.showAllTextStyle}>ดูทั้งหมด</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            {this.renderNewEventCard()}
                        </View>
                        <View style={[styles.hotDealTitleTextContainerStyle,{marginTop:responsiveHeight(0.5)}]}>
                            <Text style={styles.dashboardSectionTitleTextStyle}>กิจกรรมที่ผ่านมา</Text>
                            <TouchableOpacity style={styles.showAllContainerStyle} onPress={()=>this.showAllActivity()}>
                                <Text style={styles.showAllTextStyle}>ดูทั้งหมด</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewActivityCardContainerStyle}>
                            {this.renderPastEventCard()}
                        </ScrollView>
                    </View>}
                  
                </ScrollView>
                {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
            </View>
        )
    }
    onNavigatorEvent(event) {
        
        if (event.id === 'bottomTabReselected') {
           
        }
        if (event.id === 'bottomTabSelected') {
            this.props.naviStore.navigation.popToRoot({
                animated: false, // does the popToRoot have transition animation or does it happen immediately (optional)
                animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
              });
            //this.init();
        }
        if (event.id === 'willDisappear') {
         
        }
        if (event.id === 'willAppear') {
                this.init();
        }
    }
    backPress = () => {
        this.props.navigator.pop();
        return true;
    }
}

const styles={
    dashboardScreenContainerStyle:{
        flex: 1,
        backgroundColor:"#fff"
    },
    hotDealTitleTextContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(1),
        alignItems: 'center'
    },
    dashboardDetailTopContainerStyle:{
        flex: 1,

    },
    dashboardSectionTitleTextStyle:{
        fontSize: responsiveFontSize(3),
        color: '#1595d3',
        marginLeft: responsiveWidth(3),
    },
    newEventImageStyle:{
        width: responsiveWidth(90),
        height: responsiveWidth(45),
        marginBottom: responsiveHeight(2),
    },
    showAllContainerStyle:{
        marginRight: responsiveWidth(3),

    },
    showAllTextStyle:{
        color: '#919195',
        fontSize: responsiveFontSize(2),
    },
    scrollViewActivityCardContainerStyle:{
        flex:1

    },
    promotionImageStyle:{
        height: responsiveHeight(22),
        width: responsiveWidth(95),
        marginTop: responsiveHeight(2),
        marginLeft: responsiveWidth(3),
        marginRight: responsiveWidth(2),
    }
}

