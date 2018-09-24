import React,{Component} from 'react';
import {Text,View,ScrollView,FlatList} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {DashboardActivityCard} from './../components/DashboardActivityCard';
import {PastEventCard} from '../components/PastEventCard';
import {get} from '../api';
import store from 'react-native-simple-store';
import { observer, inject } from 'mobx-react';
import FastImage from 'react-native-fast-image'
import moment from 'moment';
import localization from 'moment/locale/th'
@inject('naviStore')
@observer
export default class FavoriteScreen extends Component{

    constructor(props){
        super(props)
        this.state = {favorites:[],groups:[],isLoading:true}
    }
    async componentDidMount(){
        let group = await store.get("privilegeGroup");
        let response = await get("favorites?page=1&pagesize=50");
        if(response && response.data){
          console.log(response.data);
          this.setState({favorites:response.data,groups:group,isLoading:true});
        }else{
          this.setState({isLoading:false});
        }
      };
      
      getTitleText(id){
          if(this.state.groups.length >0 && id){
              let group =  this.state.groups.filter(gp=>gp.id==id)
              return group && group.length>0 ? group[0].name:null;
          }else{
              return null;
          }
      }
      getIcon(id){
          
          if(this.state.groups.length >0 && id){
              let group =  this.state.groups.filter(gp=>gp.id==id)
              return group && group.length>0 ? {uri:group[0].icon_url}:null;
          }else{
              return null;
          }
      }
      openDetail(item){
        item.id = item.ref_id;
        this.props.naviStore.navigation.popToRoot({
            animated: false, // does the popToRoot have transition animation or does it happen immediately (optional)
            animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
          });
        if(item.ref_type!='activity'){
            if(this.props.naviStore.isPrivillege=="false"){
                this.props.naviStore.hotdata = item;
                this.props.navigator.switchToTab({
                    tabIndex:2// (optional) if missing, this screen's tab will become selected
                });
            }else{
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
        }else{
           
            if(this.props.naviStore.isActivity=="false"){
                this.props.naviStore.hotdata = item;
                this.props.naviStore.hotdata.activity_id = item.ref_id;
                this.props.navigator.switchToTab({
                    tabIndex:3// (optional) if missing, this screen's tab will become selected
                });
            }else{
                item.activity_id = item.ref_id;
                this.props.navigator.push({
                    screen: "mti.ActivityDetailScreen", // unique ID registered with Navigation.registerScreen
                    passProps:{data:item,filter_type:'next'},
                    title: undefined, // navigation bar title of the pushed screen (optional)
                    titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                    animated: false, // does the push have transition animation or does it happen immediately (optional)
                    backButtonTitle: undefined, // override the back button title (optional)
                    backButtonHidden: false, // hide the back button altogether (optional)
                })
            }
        }
    }
    renderFavoriteList(){
        // let favorite = [
        //     {
        //         bannerUri: require('../source/images/banner-gift.jpg'),
        //         iconUri: require('./../source/icons/iconHealthySelected.png'),
        //         iconTitleText: 'Healthy',
        //         activityTitleText: 'ตรวจสุขภาพสายตาฟรี (มูลค่า 1,000 บาท) พร้อมส่วนลดแว่นตาสูงสุด 55%'
        //     },
        //     {
        //         bannerUri: require('../source/images/wefitness-logo.png'),
        //         iconUri: require('./../source/icons/iconHealthySelected.png'),
        //         iconTitleText: 'Healthy',
        //         activityTitleText: 'ออกกำลังกายฟรี ที่ WE Fitness 2 วัน พร้อมลด 10% เมื่อสมัครสมาชิก'
        //     },
        //     {
        //         bannerUri: require('../source/images/banner-gift.jpg'),
        //         iconUri: require('./../source/icons/iconDiningSelected.png'),
        //         iconTitleText: 'Dining',
        //         activityTitleText: 'ส่วนลด 20% ที่ร้าน iberry เมื่อสั่งเมนูขนมหวานครบ 1,000 บาท รับฟรีไอศครีม 1 ถ้วย'
        //     },
        // ]

        return(
            <FlatList
                data={this.state.favorites}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
            />
        )
    }

    _renderItem = ({item}) => { 
        if(item.ref_type!='activity') 
        {
            return (
                <DashboardActivityCard
                    onPress={()=>this.openDetail(item)} 
                    bannerUri={item.picture_url ? {uri:item.picture_url}:null}
                    groupId={item.ref_content_group_id}
                    iconTitleText={item.lifeStyleTitleText}
                    activityTitleText={item.title}
                    style={styles.favoriteItemStyle}
                />
                
            )
        }else{
            let startDate = moment(item.date).locale("th",localization).format("DD-MMMM-YYYY");
            return (
                <DashboardActivityCard
                    iconText={startDate.split("-")[0]}
                    iconTitleText={startDate.split("-")[1]}
                    bannerUri={item.picture_url ? {uri:item.picture_url}:null}
                    activityTitleText={item.title}
                    style={styles.favoriteItemStyle}
                    onPress={()=>this.openDetail(item)}
                />
            );
        }
            
        
    }

    _keyExtractor = (item, index) => index.toString();

    renderPastedEvent(){
        let pastedEvent = [
            {
                bannerUri: require('../source/images/banner-gift.jpg'),
                eventTitleText: 'MTI 8 Anniversary "ยิ้มรับความสำเร็จ..ฉลอง ก้าวแห่งความภาคภูมิใจ" กับเมืองไทยประกันภัย',
                eventDetailText: 'นำลูกค้าล่องเรือชมบรรยากาศริมแม่น้ำเจ้าพระยา พร้อมรับประทานอาหารค่ำและชมมินิคอนเสิร์ต จากศิลปินคู่ ดูโอ แอน(ธิติมา) - ปิงปอง(ศิรศักดิ์) พร้อมกันนี้ ยังมีกิจกรรม...',
            }
        ]

        return(
            <FlatList
                data={pastedEvent}
                renderItem={this.renderEventCardItem}
                keyExtractor={this.eventCardkeyExtractor}
            />
        )
    }   

    renderEventCardItem = ({item}) =>(
        <PastEventCard
            bannerUri={item.bannerUri}
            eventTitleText={item.eventTitleText}
            eventDetailText={item.eventDetailText}
            style={styles.pastedEventContainerStyle}
        />
    )

    eventCardkeyExtractor = (item, index) => index.toString();

    renderNewEvent(){
        let newEvent = [
            {
                bannerUri: require('../source/images/banner-gift.jpg'),
                day: '15',
                month: 'มกราคม',
                activityTitleText: 'Chef for a Day',
                activityDetailText: 'Cupcake Workshops & Master classes'
            },
            {
                bannerUri: require('../source/images/privilegeImg02.png'),
                iconUri: require('./../source/icons/iconBeautySelected.png'),
                iconTitleText: 'Beauty',
                activityTitleText: 'ส่วนลด 20% เมื่อซื้อชุดของขวัญ Estee Lauder Set Makeup'
            },
        ]

        return(
            <FlatList
                data={newEvent}
                renderItem={this.renderNewEventCardItem}
                keyExtractor={this.newEventCardkeyExtractor}
            />
        )
    }   

    renderNewEventCardItem = ({item}) =>(
        <DashboardActivityCard 
            bannerUri={item.bannerUri}
            iconUri={item.iconUri}
            iconText={item.day}
            iconTitleText={item.month?item.month:item.iconTitleText}
            activityTitleText={item.activityTitleText}
            activityDetailText={item.activityDetailText}
            style={styles.newEventImageStyle}
        />
    )

    newEventCardkeyExtractor = (item, index) => index.toString();

    render(){
        return(
            <View style={styles.favoriteScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='รายการโปรด'
                    rightIconName='iconBell'
                />
                <ScrollView style={{flex: 1,}}>
                    <View style={styles.favoriteContainerStyle}>
                        {this.renderFavoriteList()}
                        {/* {this.renderPastedEvent()}
                        {this.renderNewEvent()} */}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles={
    favoriteScreenContainerStyle:{
        flex: 1,
        backgroundColor:"#fff"
    },
    favoriteContainerStyle:{
        flex: 1,
        alignItems: 'center',
        marginTop: responsiveHeight(3.5),
    },
    favoriteItemStyle:{
        marginBottom: responsiveHeight(2),
    },
    newEventImageStyle:{
        width: responsiveWidth(90),
        marginBottom: responsiveHeight(2),
    },
    pastedEventContainerStyle:{
        marginBottom: responsiveHeight(2),
    }
}