import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity,FlatList,ScrollView,Platform} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Carousel from 'react-native-looped-carousel';

import {Headers} from '../components/Headers';
import {PastEventCard} from '../components/PastEventCard';
import {post,authen,get,getBasic} from '../api';
import store from 'react-native-simple-store';
import {DashboardActivityCard} from './../components/DashboardActivityCard';
import moment from 'moment';
import localization from 'moment/locale/th'
import { observer, inject } from 'mobx-react';
import app from '../stores/app';
import Spinner from 'react-native-loading-spinner-overlay';
import {MainSearchBox} from '../components/MainSearchBox';

@inject('naviStore','userStore')
@observer
export default class ActivityScreen extends Component{

    constructor(props){
        super(props)
        this.state = {incomingActivityList:[],pastActivityList:[],isLoading:false}

        this.showAllActivity = this.showAllActivity.bind(this);
        
        this._onSearchIconPress = this._onSearchIconPress.bind(this);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    componentDidMount(){
        if(Platform.OS=="android"){
            //this.init()
        }
    }
    async init(){
        this.setState({isLoading:true});
        if(!this.props.naviStore.hotdata){
        let user = await store.get("user");
        let [response1,response2] =  await Promise.all([getBasic("activity?filter_type=next",{}),getBasic("activity?filter_type=prev&page=1&pagesize=5",{})]);
        
        if(response1){
            this.setState({incomingActivityList:response1.data});
        }
        if(response2){
            this.setState({pastActivityList:response2.data});
        }
        this.setState({isLoading:false});
        this.props.naviStore.navigation = this.props.navigator;
        this.props.naviStore.isPrivillege = "false";
        this.props.naviStore.isActivity = true;
        }else{
           
            if(!this.props.naviStore.hotdata.isAll){
                this.props.naviStore.navigation = this.props.navigator;
                setTimeout(()=>{
                    let hotdata = {...this.props.naviStore.hotdata};
                    this.props.naviStore.hotdata = undefined;
                    this.openDetail(hotdata,hotdata.filter_type);
                },500)
            }else{
                setTimeout(()=>{
                    let hotdata = {...this.props.naviStore.hotdata};
                    this.props.naviStore.hotdata = undefined;
                    this.showAllActivity(hotdata.filter_type);
                    
                },500)
            }
            this.setState({isLoading:false});
        }
    }

    renderBannerImageList(){
        if(this.state.incomingActivityList.length>0){
            let bannerUri=this.state.incomingActivityList;
            return bannerUri.map((data,i)=>{
                let startDate = moment(data.start_date).locale("th",localization).format("DD-MMMM-YYYY");
                return(
                    <DashboardActivityCard 
                    key={i}
                    bannerUri={{uri:data.picture}}
                    iconText={startDate.split("-")[0]}
                    iconTitleText={startDate.split("-")[1]}
                    activityTitleText={data.title}
                    style={styles.bannerImageStyle}
                    onPress={()=>this.openDetail(data,'next')}
                    navigator={this.props.navigator}
                    />)
            }
            )
        }else{
            return (
                <DashboardActivityCard 
                bannerUri={require('../source/images/activityImg05.png')}
                style={styles.bannerImageStyle}
                />)
        }
    }

    renderPastEventCard(){
        
        return(
            <FlatList
                data={this.state.pastActivityList}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.activityListContainerStyle}
                renderItem={this._renderItem}
                keyExtractor={(item,index)=>index.toString()}
            />
        )
    }
    openDetail(item,filter_type){
        this.props.navigator.push({
            screen: "mti.ActivityDetailScreen", // unique ID registered with Navigation.registerScreen
            passProps:{data:item,filter_type:filter_type},
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            animated: false, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
        })
    }

    _renderItem=({item,index})=>(
        <PastEventCard
            onPress={()=>this.openDetail(item,'prev')}
            bannerUri={{uri:item.picture}}
            eventTitleText={item.title}
            style={[{marginRight: responsiveWidth(5),height:responsiveHeight(27)},index==0&&{marginLeft: responsiveWidth(5)}]}
        />
    )

    showAllActivity(isNext){
        this.props.navigator.push({
            screen: "mti.ActivityListScreen", // unique ID registered with Navigation.registerScreen
            passProps:{next:isNext},
            animated: true, // does the push have transition animation or does it happen immediately (optional)
        })
    }
    onNavigatorEvent(event) {
        console.log("onNavigatorEvent",event);
        if (event.id === 'bottomTabSelected') {
            this.props.naviStore.navigation.popToRoot({
                animated: false, // does the popToRoot have transition animation or does it happen immediately (optional)
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
    async _onSearchIconPress(){
        this.setState({isLoading:true}); 
        //let response =  await getBasic(`activity?search=${this.state.searchValue}`,{});
        
        this.props.navigator.push({
            screen: "mti.ActivityListScreen", // unique ID registered with Navigation.registerScreen
            passProps:{searchValue:this.state.searchValue,all:true},
            animated: false, // does the push have transition animation or does it happen immediately (optional)
        })
        this.setState({isLoading:false,searchValue:''});
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
                    onPress={()=>this.openDetail(item,'next')}
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

    render(){
        return(
            <View style={styles.activityScreenContainerStyle}>
                <Headers
                    leftIconName='menu'
                    headerTitleText='กิจกรรม'
                    rightIconName='iconBell'
                    withSearch
                />
                <MainSearchBox
                    value={this.state.searchValue}
                    onChangeText={(searchValue)=>this.setState({searchValue})}
                    onSearchIconPress={this._onSearchIconPress}
                    placeholder='ค้นหากิจกรรมคุณต้องการ'
                    noneMap
                />
                <ScrollView style={styles.activityContainerStyle}>
                    <View style={styles.activityContainerStyle}>
                        <View style={styles.bannerContainerStyle}>
                            <Carousel
                                delay={5000}
                                style={{flex: 1,}}
                                autoplay
                                bullets
                                bulletStyle={styles.bulletStyle}
                                chosenBulletStyle={styles.chosenBulletStyle}
                                bulletsContainerStyle={styles.bulletsContainerStyle}
                            >
                                {this.renderBannerImageList()}
                            </Carousel>
                        </View>
                        <View style={styles.titleTextContainerStyle}>
                            <Text style={styles.sectionTitleTextStyle}>กิจกรรมถัดไป</Text>
                            <TouchableOpacity style={styles.showAllContainerStyle} onPress={()=>this.showAllActivity(true)}>
                                <Text style={styles.showAllTextStyle}>ดูทั้งหมด</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center',marginBottom:5}}>
                            {this.renderNewEventCard()}
                        </View>
                        <View style={[styles.titleTextContainerStyle,{marginTop:5}]}>
                            <Text style={styles.sectionTitleTextStyle}>กิจกรรมที่ผ่านมา</Text>
                            <TouchableOpacity onPress={()=>this.showAllActivity()} style={styles.showAllContainerStyle}>
                                <Text style={styles.showAllTextStyle}>ดูทั้งหมด</Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.pastActivityList.length > 0 && this.renderPastEventCard()}
                        {/* <View style={styles.adContainerStylr}>
                            <Image
                                source={require('../source/images/promotionImg.png')}
                                style={styles.adContainerStylr}
                            />
                        </View> */}
                    </View>
                </ScrollView>
                <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />
            </View>
        )
    }
}

const styles={
    activityScreenContainerStyle:{
        flex: 1,
        backgroundColor:"#ffffff"
    },
    activityContainerStyle:{
        flex: 1,
    },
    bannerContainerStyle:{
        height: responsiveHeight(34),
    },
    bannerImageStyle:{
        height: responsiveHeight(29),
        width: responsiveWidth(100),
    },
    bulletStyle:{
        width: responsiveHeight(0.88),
        height: responsiveHeight(0.88),
        backgroundColor: "#c0bfbf",
        borderWidth: 0,
    },
    chosenBulletStyle:{
        backgroundColor: 'rgb(253,98,98)',
        width: responsiveHeight(0.88),
        height: responsiveHeight(0.88),
    },
    bulletsContainerStyle:{
        height: responsiveHeight(1),
    },
    titleTextContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: responsiveHeight(1),
        alignItems: 'center',
    },
    sectionTitleTextStyle:{
        fontSize: responsiveFontSize(3),
        color: '#1595d3',
        marginLeft: responsiveWidth(5),
    },
    showAllContainerStyle:{
        marginRight: responsiveWidth(5),
    },
    showAllTextStyle:{
        color: '#919195',
        fontSize: responsiveFontSize(2),
    },
    adContainerStylr:{
        height: responsiveHeight(18.3),
        width: '100%'
    },
    activityListContainerStyle:{
        height: responsiveHeight(27),
        marginBottom: responsiveHeight(2),
    }
}