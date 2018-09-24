import React,{Component} from 'react';
import {Text,View,FlatList,BackHandler,Image,Alert} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Spinner from 'react-native-loading-spinner-overlay';

import {Headers} from '../components/Headers';
import {MainSearchBox} from '../components/MainSearchBox';
import {DashboardActivityCard} from '../components/DashboardActivityCard';
import {post,authen,get,getBasic} from '../api';
import store from 'react-native-simple-store';
import moment from 'moment';
import localization from 'moment/locale/th'
import { observer, inject } from 'mobx-react';
import {NoDataCard} from '../components/NoDataCard';

@inject('naviStore','userStore')
@observer
export default class CampaignScreen extends Component{

    constructor(props){
        super(props)
        moment.locale("th");
        this.state={
            searchValue: '',
            isLoading: false,
            campaigns:[],
            user:undefined
        }
        this.props.naviStore.navigation = this.props.navigator;
        
        this._onSearchIconPress = this._onSearchIconPress.bind(this);
        this.openDetail = this.openDetail.bind(this);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        
    }

    async _onSearchIconPress(){
       this.setState({isLoading:true}); 
       let response =  [];
       if(this.state.user && this.state.user.name!="GUEST"){
            response = await get(`membercampaign?search=${this.state.searchValue}`,{});
       }
       this.setState({isLoading:false,searchValue:''});
        if(response.data && response.data.length > 0){
            this.setState({campaigns:this.transformToPrivillege(response.data)});
        }else{
            setTimeout(()=>{
                Alert.alert(
                    ' ',
                    'ไม่พบข้อมูลที่ค้นหา',
                    [
                    {text: 'OK', onPress: () => {this.setState({
                        isLoading: false,
                    })}},
                    ]
                )
            },200)
        }
       
    }
    componentDidMount(){
        
    }

    async init(){
        this.setState({isLoading:true}); 
        if(!this.props.naviStore.hotdata){
        this.props.naviStore.navigation = this.props.navigator;
        this.props.naviStore.isPrivillege = "false";
    this.props.naviStore.isActivity = "false";
        const user = await store.get("user");
        if(user && user.name!="GUEST"){
            let response =  await get(`membercampaign`,{});
            this.setState({campaigns:this.transformToPrivillege(response.data),user:user});
        }    
        
       
        }else{
            this.props.naviStore.navigation = this.props.navigator;
            this.props.naviStore.isPrivillege = "false";
            setTimeout(()=>{
                this.openDetail(this.props.naviStore.hotdata);
                this.props.naviStore.hotdata = undefined;
            })
        }
        setTimeout(()=>{
            this.setState({isLoading:false});
        },2000);
    }
   

    renderActivityList(){
        if(this.state.campaigns.length >0){  
            return (
                <FlatList
                    data={this.state.campaigns}
                    renderItem={this.renderActivityCard}
                    keyExtractor={(item,index)=>index.toString()}
                    contentContainerStyle={styles.activityContainerStyle}
                />
            )
        }else{
            return (<Image
            source={require('./../source/images/banner-03.png')}
            style={styles.promotionImageStyle}
            resizeMode='stretch'
            />)
        }
    }

    renderActivityCard=({item,index})=>{
        return(
            <DashboardActivityCard 
                bannerUri={item.picture_url ? {uri:item.picture_url}:null}
                groupId={item.group_id}
                iconTitleText={item.lifeStyleTitleText}
                activityTitleText={item.name}
                style={[styles.activityCardStyle,index==0&&styles.firstItemStyle]}
                onPress={()=>this.openDetail(item)}
                navigator={this.props.navigator}
                isCampaign={true}
            />
        )
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

    render(){
        return(
            <View style={styles.activityListScreenContainerStyle}>
                <Headers
                    leftIconName='menu'
                    headerTitleText={'ของขวัญ'}
                    withSearch
                />
                <MainSearchBox
                    value={this.state.searchValue}
                    onChangeText={(searchValue)=>this.setState({searchValue})}
                    onSearchIconPress={this._onSearchIconPress}
                    placeholder='ค้นหาของขวัญ'
                    noneMap
                />

                {!this.state.isLoading ?<View style={styles.activityListContainerStyle}>
                    {this.renderActivityList()}
                </View> :null}
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
        if (event.id === 'didAppear') {
          this.init();
        }
    }
}

const styles={
    activityListScreenContainerStyle:{
        flex: 1,
        backgroundColor:"#ffffff"
    },
    activityListContainerStyle:{
        flex: 1,
    },
    activityCardStyle:{
        width: responsiveWidth(90),
        marginBottom: responsiveHeight(1),
    },
    firstItemStyle:{
        marginTop: responsiveHeight(5)
    },
    activityContainerStyle:{
        alignItems: 'center',
    },
    promotionImageStyle:{
        height: responsiveHeight(22),
        width: responsiveWidth(95),
        marginTop: responsiveHeight(7),
        marginLeft: responsiveWidth(3),
        marginRight: responsiveWidth(2),
    }

}