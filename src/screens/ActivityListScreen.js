import React,{Component} from 'react';
import {Text,View,FlatList,Alert} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Spinner from 'react-native-loading-spinner-overlay';

import {Headers} from '../components/Headers';
import {MainSearchBox} from '../components/MainSearchBox';
import {DashboardActivityCard} from '../components/DashboardActivityCard';
import {NoDataCard} from '../components/NoDataCard';
import {post,authen,get,getBasic} from '../api';
import store from 'react-native-simple-store';
import moment from 'moment';
import localization from 'moment/locale/th'


export default class ActivityListScreen extends Component{

    constructor(props){
        super(props)
        moment.locale("th");
        this.state={
            searchValue: '',
            isLoading: false,
            activities:[]
        }
        this._onSearchIconPress = this._onSearchIconPress.bind(this);
    }

    async _onSearchIconPress(){
       this.setState({isLoading:true}); 
       let response =  [];
       if(this.props.searchValue){
        response = await getBasic(`activity?search=${this.state.searchValue}`,{});
       }else{
        response = await getBasic(`activity?filter_type=${this.props.next?'next':'prev'}&search=${this.state.searchValue}`,{});
       }
       this.setState({isLoading:false,searchValue:''});
       if(response.data && response.data.length>0){
        this.setState({activities:response.data});
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
    async componentDidMount(){
        this.setState({isLoading:true});
        if(this.props.searchValue){
            this.setState({searchValue:this.props.searchValue})
            let response =  await getBasic(`activity?search=${this.props.searchValue}`,{});
            this.setState({isLoading:false});
            if(response.data && response.data.length>0){
                this.setState({activities:response.data});
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
        }else{
            this.init();
        }
    }
    async init(){
       let response =  await getBasic(`activity?filter_type=${this.props.next?'next':'prev'}`,{});
       this.setState({isLoading:false});
       this.setState({activities:response.data});
    }
   

    renderActivityList(){  
        return this.state.activities.length > 0 ? (
            <FlatList
                data={this.state.activities}
                renderItem={this.renderActivityCard}
                keyExtractor={(item,index)=>index.toString()}
                contentContainerStyle={styles.activityContainerStyle}
            />
        ):<NoDataCard></NoDataCard>
    }

    renderActivityCard=({item,index})=>{
        let startDate = moment(item.start_date).locale("th",localization).format("DD-MMMM-YYYY");
        return(
        <DashboardActivityCard 
            bannerUri={{uri:item.picture}}
            iconText={startDate.split("-")[0]}
            iconTitleText={startDate.split("-")[1]}
            activityTitleText={item.title}
            style={[styles.activityCardStyle,index==0&&styles.firstItemStyle]}
            onPress={()=>this.onActivityCardPress(item)}
            isJoin={item.booking_status=='open' ? item:undefined}
            navigator={this.props.navigator}
        />
        )
    }

    onActivityCardPress(item){
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

    render(){
        return(
            <View style={styles.activityListScreenContainerStyle}>
                <Headers
                    leftIconName='cancel'
                    headerTitleText={this.props.searchValue ? 'กิจกรรมทั้งหมด':(this.props.next?'กิจกรรมถัดไป':'กิจกรรมที่ผ่านมา')}
                    rightIconName='iconBell'
                    cancel={()=>this.props.navigator.pop()}
                    withSearch
                />
                <MainSearchBox
                    value={this.state.searchValue}
                    onChangeText={(searchValue)=>this.setState({searchValue})}
                    onSearchIconPress={this._onSearchIconPress}
                    placeholder='ค้นหากิจกรรมคุณต้องการ'
                    noneMap
                />
                <View style={styles.activityListContainerStyle}>
                    {this.renderActivityList()}
                </View>
                {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
            </View>
        )
    }
}

const styles={
    activityListScreenContainerStyle:{
        flex: 1,
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

}