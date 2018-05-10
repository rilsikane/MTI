import React,{Component} from 'react';
import {Text,View,ScrollView,TouchableOpacity,Image,BackHandler} from 'react-native';
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
            isLoading:true
        }
        this.props.naviStore.navigation = this.props.navigator;
        this.openDetail = this.openDetail.bind(this);
        this.goToPrivilleges = this.goToPrivilleges.bind(this);
        this.app = app;
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.backPress = this.backPress.bind(this);
    }
    async componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backPress)
       
    };
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backPress)
    }
    async init(){
        try{
        this.props.naviStore.navigation = this.props.navigator;
        let user = await store.get("user");
        this.setState({isLoading:true});
        if(user){
           
            let response = await get("me",{});
            if(response){
                await store.update("user",response);
                this.props.userStore.user = response; 
                this.setState({isLoading:false});
                let privilegeGroup = await getBasic("privilege/groups",{});
                if(privilegeGroup){
                    await store.save("privilegeGroup",privilegeGroup.data);
                }
                let hotDeal = await getBasic("privileges?filter_set=hotdeal&page=1&pagesize=5",{});
                if(hotDeal){
                    console.log(hotDeal.data);
                    this.setState({hotDeal:hotDeal.data});
                }
                let myLife = await get("memberprivileges?filter_set=lifestyle&page=1&pagesize=5",{});
                if(myLife){
                    this.setState({myLifeStyle:myLife.data});
                }
                let activityList = await getBasic('activity?filter_type_id=1&page=1&pagesize=5',{});
                if(activityList){
                    //console.log(activityList.data)
                    this.setState({pastEvent:activityList.data})
                }
            }else{
                // this.setState({isLoading:false});
                // setTimeout(()=>{
                //     this.app.logout();
                // },2500)
               
            }
           
        }else{
            this.setState({isLoading:false});
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
            let activityList = await getBasic('activity?filter_type_id=1&page=1&pagesize=5',{});
            if(activityList){
                //console.log(activityList.data)
                this.setState({pastEvent:activityList.data})
            }
        }
          // await store.save("policy",response2);
                        // get("me/policy",{})
        }catch(e){
            alert(e)
        }
    }
    openDetail(link,item){
        this.props.navigator.push({
            screen: link, // unique ID registered with Navigation.registerScreen
            passProps:{data:item},
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            animated: false, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
        })
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
                    onPress={()=>this.openDetail('mti.PrivilegeDetailScreen',hotdeal)}
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
                onPress={()=>this.openDetail('mti.PrivilegeDetailScreen',myLifeStyle)}
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

    renderNewEventCard(){
        return(
            <DashboardActivityCard 
                bannerUri={require('./../source/images/newEventImg.png')}
                iconText={'15'}
                iconTitleText={'มกราคม'}
                activityTitleText='Chef for a Day'
                activityDetailText='Cupcake Workshops & Master classes'
                style={styles.newEventImageStyle}
            />
        )
    }

    renderPastEventCard(){
        return this.state.pastEvent.map((pastEvent,i)=>
            <PastEventCard
                key={i}
                bannerUri={pastEvent.picture ? {uri:pastEvent.picture}:require('../source/images/pic-default.jpg')}
                eventTitleText={pastEvent.title}
                eventDetailText={pastEvent.title}
                style={[{marginRight: responsiveWidth(3)},i==0&&{marginLeft: responsiveWidth(3)}]}
                onPress={()=>this.openDetail('mti.ActivityDetailScreen',pastEvent)}
            />
        )
    }
    goToPrivilleges(){
        this.props.navigator.push({
            screen: "mti.PrivilegeScreen", // unique ID registered with Navigation.registerScreen
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            animated: false, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
        })
    }

    render(){
        return(
            <View style={styles.dashboardScreenContainerStyle}>
                <Headers
                    leftIconName='menu'
                    headerTitleText='หน้าหลัก'
                    rightIconName='iconBell'
                    notify='2'
                />
                {!this.state.isLoading && <UserShortDetailCard showQr navigator={this.props.navigator}/>}
                <ScrollView style={{flex: 1}}>
                    <View style={styles.dashboardDetailTopContainerStyle}>
                        <View style={styles.hotDealTitleTextContainerStyle}>
                            <Text style={styles.dashboardSectionTitleTextStyle}>HOT DEAL</Text>
                            {/* <TouchableOpacity style={styles.showAllContainerStyle} onPress={this.goToPrivilleges}>
                                <Text style={styles.showAllTextStyle}>ดูทั้งหมด</Text>
                            </TouchableOpacity> */}
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewActivityCardContainerStyle}>
                            {this.renderHotDealList()}
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
                    </View>
                    <Image
                        source={require('./../source/images/promotionImg.png')}
                        style={styles.promotionImageStyle}
                        resizeMode='stretch'
                    />
                    <View style={styles.dashboardDetailTopContainerStyle}>
                        <View style={styles.hotDealTitleTextContainerStyle}>
                            <Text style={styles.dashboardSectionTitleTextStyle}>กิจกรรมที่มาใหม่</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            {this.renderNewEventCard()}
                        </View>
                        <View style={styles.hotDealTitleTextContainerStyle}>
                            <Text style={styles.dashboardSectionTitleTextStyle}>กิจกรรมที่ผ่านมา</Text>
                            <TouchableOpacity style={styles.showAllContainerStyle}>
                                <Text style={styles.showAllTextStyle}>ดูทั้งหมด</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewActivityCardContainerStyle}>
                            {this.renderPastEventCard()}
                        </ScrollView>
                    </View>
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
                animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
                animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
              });
            this.init();
        }
        if (event.id === 'willDisappear') {
         
        }
        if (event.id === 'didAppear') {
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
        height: responsiveHeight(18.30),
        width: responsiveWidth(100),
        marginTop: responsiveHeight(2),
    }
}

