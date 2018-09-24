import React,{Component} from 'react';
import {Text,View,FlatList,Image,ScrollView,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {get} from '../api';
import store from 'react-native-simple-store';
import { observer, inject } from 'mobx-react';
import FastImage from 'react-native-fast-image'
import moment from 'moment';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../assets/fonts/config.json'
const IconTello = createIconSetFromFontello(fontelloConfig);
@inject('naviStore')
@observer
export default class UsageHistoryScreen extends Component{

    constructor(props){
        super(props)
        this.state = {history:[],groups:[],isLoading:true,bookings:[]}
    }
    async componentDidMount(){
      let group = await store.get("privilegeGroup");
      let response = await get("me/history");
      //let bookings = await get("booking/history");
      if(response && response.data){
        console.log(response.data);
        this.setState({history:response.data,groups:group,isLoading:true});
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
    renderUsageHistoryList(){
       
        return(
            <FlatList
                data={this.state.history}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
            />
        )
    }
    renderActivityHistoryList(){
       
        return(
            <FlatList
                data={this.state.bookings}
                renderItem={this._renderBooking}
                keyExtractor={this._keyExtractor}
            />
        )
    }
    openDetail(link,item,index){
        
        this.props.naviStore.navigation.popToRoot({
            animated: false, // does the popToRoot have transition animation or does it happen immediately (optional)
            animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
        });
        setTimeout(()=>{
            if(index==2){
                item.id = item.content_id;
                item.group_id = item.content_group_id;
                if(this.props.naviStore.isPrivillege=="false"){
                    this.props.naviStore.hotdata = item;
                    this.props.navigator.switchToTab({
                        tabIndex:index// (optional) if missing, this screen's tab will become selected
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
                
                item.activity_id = item.content_id;
                item.group_id = item.content_group_id;
                if(this.props.naviStore.isActivity=="false"){
                    this.props.naviStore.hotdata = item;
                    this.props.naviStore.hotdata.filter_type = 'next';
                    this.props.navigator.switchToTab({
                        tabIndex:3// (optional) if missing, this screen's tab will become selected
                    });
                }else{
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
            }
        },500)
       
    }
    _renderItem = ({item}) => {
        if("booking"!=item.history_type){
            return this._renderPrivillege(item);
        }else{
            return this._renderBooking(item);
        }
    }
    _renderPrivillege = (item) => (
        <TouchableOpacity onPress={()=>this.openDetail('mti.PrivilegeScreen',item,2)}>
            <View style={styles.historyListContainerStyle}>
                <View style={styles.thumbnailContainerStyle}>
                    <FastImage
                        source={{uri:item.picture_url}}
                        resizeMode='contain'
                        style={styles.thumbnailStyle}
                    />
                </View>
                <View style={styles.historyDetailContainerStyle}>
                    <View style={styles.historyTitleContainerStyle}>
                        <View style={styles.lifeStyleIconContainerStyle}>
                            <FastImage
                                source={this.getIcon(item.content_group_id)}
                                resizeMode='contain'
                                style={styles.lifeStyleIconStyle}
                            />
                            <Text style={styles.lifeStyleTitleTextStyle}>{this.getTitleText(item.content_group_id)}</Text>
                        </View>
                        <Text style={styles.usingDateTextStyle}>ใช้สิทธิ์วันที่ {`${moment(item.action_date).locale('th').format("DD MMM YYYY")}`}</Text>
                    </View>
                    <Text style={styles.historyDescriptionTextStyle}>{item.content_title}</Text>
                </View>
            </View>
            <Image
                source={require('../source/images/dotSectionHorizontal.png')}
                resizeMode='contain'
                style={styles.dotSectionImageStyle}
            />
        </TouchableOpacity>
    );
    _renderBooking = (item) => (
        <TouchableOpacity onPress={()=>this.openDetail('mti.ActivityScreen',item,3)}>
            <View style={styles.historyListContainerStyle}>
                <View style={styles.thumbnailContainerStyle}>
                    <FastImage
                        source={{uri:item.picture_url}}
                        resizeMode='contain'
                        style={styles.thumbnailStyle}
                    />
                </View>
                <View style={styles.historyDetailContainerStyle}>
                    <View style={styles.historyTitleContainerStyle}>
                        <View style={styles.lifeStyleIconContainerStyle}>
                            {/* <FastImage
                                source={require("../source/images/")}
                                resizeMode='contain'
                                style={styles.lifeStyleIconStyle}
                            /> */}
                            <IconTello name="icontap-04"  style={{fontSize:responsiveFontSize(2)}}/>
                            <Text style={styles.lifeStyleTitleTextStyle}>{'กิจกรรม'}</Text>
                        </View>
                        <Text style={styles.usingDateTextStyle}>จองกิจกรรมเมื่อวันที่ {`${moment(item.action_date).locale('th').format("DD MMM YYYY")}`}</Text>
                    </View>
                    <Text style={styles.historyDescriptionTextStyle}>{item.content_title}</Text>
                </View>
            </View>
            <Image
                source={require('../source/images/dotSectionHorizontal.png')}
                resizeMode='contain'
                style={styles.dotSectionImageStyle}
            />
        </TouchableOpacity>
    );

    _keyExtractor = (item, index) => index.toString();

    render(){
        return(
            <View style={styles.usageHistoryScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='ประวัติการใช้งาน'
                    rightIconName='iconBell'
                />
                <ScrollView style={{flex: 1,}}>
                    <View style={styles.usageHistoryContainerStyle}>
                        {this.renderUsageHistoryList()}
                        {/* {this.renderActivityHistoryList()} */}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles={
    usageHistoryScreenContainerStyle:{
        flex: 1,
        backgroundColor:"#fff"
    },
    usageHistoryContainerStyle:{
        flex: 1,
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
        marginTop: responsiveHeight(3.5),
    },
    historyListContainerStyle:{
        flexDirection: 'row',
    },
    thumbnailContainerStyle:{
        height: responsiveHeight(9.15),
        width: responsiveHeight(9.15),
        alignItems: 'center',
        marginRight: responsiveWidth(4),
    },
    thumbnailStyle:{
        height:74,
        width:74
    },
    historyDetailContainerStyle:{
        flex: 1,
    },
    historyTitleContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    lifeStyleIconContainerStyle:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    lifeStyleIconStyle:{
        height: responsiveHeight(2.11),
        width: responsiveHeight(2.11),
    },
    lifeStyleTitleTextStyle:{
        marginLeft: responsiveWidth(1.5),
        letterSpacing: 0,
        color: "rgba(85, 86, 90, 0.6)",
        fontSize: responsiveFontSize(2.15),
    },
    usingDateTextStyle:{
        letterSpacing: 0,
        textAlign: "right",
        color: 'rgb(253,98,98)'
    },
    historyDescriptionTextStyle:{
        letterSpacing: -0.15,
        color: "#1595d3",
        fontSize: responsiveFontSize(2.2),
        flex: 1,
    },
    dotSectionImageStyle:{
        width: '100%',
        opacity: 0.3,
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
        alignSelf: 'center',
    },
}