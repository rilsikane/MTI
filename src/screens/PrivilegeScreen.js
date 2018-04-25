import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity,FlatList} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Spinner from 'react-native-loading-spinner-overlay';

import {Headers} from './../components/Headers';
import {MainSearchBox} from '../components/MainSearchBox';
import {LifeStyleTabs} from '../components/LifeStyleTabs';
import {DashboardActivityCard} from '../components/DashboardActivityCard';
import {post,authen,get} from '../api';

export default class PrivilegeScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            privilege:[], 
            privilegeOrg: [],
            privilegeHot: [],
            privilegeHealthy: [],
            privilegeBeauty: [],
            privilegeEat: [],
            privilegeTravel: [],
            privilegeAuto: [],
            privilegeEntertain: [],
            privilegeSport: [],
            privilegeOther: [],
            tabsList:[],
            tabIndex: 0,
            previousTabIndex: 0,
            isLoading: false,
        }
        this.openDetail = this.openDetail.bind(this);
        this.getPrivilegeForEachTabs = this.getPrivilegeForEachTabs.bind(this);
        this.openPrivilegeSearch = this.openPrivilegeSearch.bind(this)
    }
    async componentDidMount(){
        this.setState({isLoading: true})
        let privilege = await get("privileges?page=1&pagesize=20",{});
 
        let tabsList = await get('privilege/groups',{});
        tabsList.data.unshift({id: '99',name: 'All'},{id: '100',name: 'Hot'});
        this.setState({
            tabsList: tabsList.data
        })
        if(privilege){
            console.log(privilege.data);
            this.setState({
                privilege:privilege.data,
                privilegeOrg: privilege.data,
                isLoading: false,
            });
        }       
    }
    openDetail(id){
        this.props.navigator.push({
            screen: "mti.PrivilegeDetailScreen", // unique ID registered with Navigation.registerScreen
            passProps:{id:id},
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            animated: false, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
        })
    }
    renderPrivilegeList(){
        return(
            <FlatList
                style={{flexGrow: 0}}
                scrollEnabled={false}
                data={this.state.privilege}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        )
    }

    _renderItem = ({item}) => (
        <DashboardActivityCard 
            onPress={()=>this.openDetail(item.id)}
            bannerUri={item.picture_url ? {uri:item.picture_url}:null}
            groupId={item.group_id}
            iconUri={require('../source/icons/iconHealthySelected.png')}
            iconTitleText={item.lifeStyleTitleText}
            activityTitleText={item.name}
            style={[styles.dashboardActivityCardContainerStyle,]}
            // iconContainerStyle={i==0?{flex: 0.35}:{}}
            // detailContainerStyle={i==0?{flex: 0.65}:{}}
        />
    );

    _keyExtractor = (item, index) => item.id;

    _onChangeTab(index){
        if(index.i!=this.state.previousTabIndex){
            this.setState({
                previousTabIndex: index.i,
                privilege: [],
            })
            this.getPrivilegeForEachTabs(index.i)
        }
        this.setState({
            tabIndex: index.i,
        })
        
    }

    async getPrivilegeForEachTabs(index){
        if(index==8){
            index = 10;
        }
        let filter_group_id = index;
        let privilege = [];
        if(index==1){
            privilege = await get(`privileges?filter_set=hotdeal&page=1&pagesize=20`,{});
        }else{
            privilege = await get(`privileges?filter_group_id=${--filter_group_id}&page=1&pagesize=20`,{});
        }
        //console.log(privilege.data)
        if(index==0){
            this.setState({privilege:this.state.privilegeOrg});
        }else if(index==1){
            if(this.state.privilegeHot.length==0){
                this.setState({privilege: privilege.data,privilegeHot:privilege.data});
            }else{
                this.setState({privilege:this.state.privilegeHot});
            }
        }else if(index==2){
            if(this.state.privilegeHealthy.length==0){
                this.setState({privilege: privilege.data,privilegeHealthy:privilege.data});
            }else{
                this.setState({privilege:this.state.privilegeHealthy});
            }
        }else if(index==3){
            if(this.state.privilegeBeauty.length==0){
                this.setState({privilege: privilege.data,privilegeBeauty:privilege.data});
            }else{
                this.setState({privilege:this.state.privilegeBeauty});
            }
        }else if(index==4){
            if(this.state.privilegeEat.length==0){
                this.setState({privilege: privilege.data,privilegeEat:privilege.data});
            }else{
                this.setState({privilege:this.state.privilegeEat});
            }
        }else if(index==5){
            if(this.state.privilegeTravel.length==0){
                this.setState({privilege: privilege.data,privilegeTravel:privilege.data});
            }else{
                this.setState({privilege:this.state.privilegeTravel});
            }
        }else if(index==6){
            if(this.state.privilegeAuto.length==0){
                this.setState({privilege: privilege.data,privilegeAuto:privilege.data});
            }else{
                this.setState({privilege:this.state.privilegeAuto});
            }
        }else if(index==7){
            if(this.state.privilegeEntertain.length==0){
                this.setState({privilege: privilege.data,privilegeEntertain:privilege.data});
            }else{
                this.setState({privilege:this.state.privilegeEntertain});
            }
        }else if(index==10){
            if(this.state.privilegeOther.length==0){
                this.setState({privilege: privilege.data,privilegeOther:privilege.data});
            }else{
                this.setState({privilege:this.state.privilegeOther});
            }
        }
    }

    openPrivilegeSearch(){
        this.props.navigator.push({
            screen: "mti.PrivilegeSearchScreen", // unique ID registered with Navigation.registerScreen
            passProps:{},
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            animated: false, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
        })
    }

    render(){
        return(
            <View style={styles.privilegeScreenContainerStyle}>
                <Headers
                    leftIconName='menu'
                    headerTitleText='สิทธิพิเศษ'
                    rightIconName='iconBell'
                    withSearch
                />
                <MainSearchBox
                    //value={}
                    //onChangeText={}
                    onPress={this.openPrivilegeSearch}
                    placeholder='ค้นหาสิทธิพิเศษที่คุณต้องการ'
                />
                 <View style={{flex: 1}}>
                    <ScrollView style={{zIndex:3}}>
                    
                            <LifeStyleTabs
                                tabChildren={this.renderPrivilegeList()}
                                onChangeTab={(index)=>this._onChangeTab(index)}
                                tabIndex={this.state.tabIndex}
                                previousTabIndex={this.state.previousTabIndex}
                                data={this.state.tabsList}
                            />
                            <View style={styles.privilegeListContainerStyle}>
                                <Image
                                    source={require('./../source/images/promotionImg.png')}
                                    style={styles.promotionImageStyle}
                                    resizeMode='stretch'
                                />
                            </View>
                    </ScrollView>
                </View>
                {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
            </View>
        )
    }
}

const styles={
    privilegeScreenContainerStyle:{
        flex: 1,
    },
    privilegeListContainerStyle:{
        backgroundColor: '#FFF'
    },
    promotionImageStyle:{
        height: responsiveHeight(18.30),
        width: responsiveWidth(100),
        marginTop: responsiveHeight(2),
    },
    dashboardActivityCardContainerStyle:{
        marginBottom: responsiveHeight(2),
    }
}