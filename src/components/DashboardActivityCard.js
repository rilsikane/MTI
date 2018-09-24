import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity,Alert} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import store from 'react-native-simple-store';
import FastImage from 'react-native-fast-image'
import ImageBackground from '../components/ImageBackground'
import {get,getBasic, post} from '../api';

class DashboardActivityCard extends Component{

    constructor(props){
        super(props)
        this.state = {groups:[],camGroups:[]}

    }
    async componentDidMount(){
        let group = await store.get("privilegeGroup");
        let campaignsGroup = await store.get("campaignsGroup");
        if(group){
            this.setState({groups:group});
        }
        if(campaignsGroup){
            this.setState({camGroups:campaignsGroup});
        }
    }

    renderCardIcon(groupId){
        const iconUri = this.props.iconUri

        
        const iconText = this.props.iconText
        
        if(iconText){
            return(
                <View>
                <Text style={styles.iconTextStyle}>{iconText}</Text>
                <Text style={styles.iconTitleTextStyle}>{this.props.iconTitleText}</Text>
                </View>
            )
        }else{
            
            return(
                <View>
                    {!this.props.isCampaign ? <FastImage
                        source={this.getIcon()}
                        resizeMode='contain'
                        style={styles.iconImageStyle}
                    />:null}
                    <Text style={styles.iconTitleTextStyle}>{this.getTitleText()}</Text>
                </View>
            )
        }

    }
    getTitleText(){
        if(!this.props.isCampaign){
            if(this.state.groups.length >0 && this.props.groupId){
                let group =  this.state.groups.filter(gp=>gp.id==this.props.groupId)
                return group && group.length>0 ? group[0].name:null;
            }else{
                return null;
            }
        }else{
            if(this.state.camGroups.length >0 && this.props.groupId){
                let group =  this.state.camGroups.filter(gp=>gp.id==this.props.groupId)
                return group && group.length>0 ? group[0].name:null;
            }else{
                return null;
            }
        }
    }
    getIcon(){
        if(!this.props.isCampaign){
            if(this.state.groups.length >0 && this.props.groupId){
                let group =  this.state.groups.filter(gp=>gp.id==this.props.groupId)
                return group && group.length>0 ? {uri:group[0].icon2_url,priority: FastImage.priority.high}:null;
            }else{
                return null;
            }
        }else{
            if(this.state.camGroups.length >0 && this.props.groupId){
                let group =  this.state.camGroups.filter(gp=>gp.id==this.props.groupId)
                return  group && group.length>0 ? {uri:group[0].icon2_url,priority: FastImage.priority.high}:null;
            }else{
                return null;
            }
        }
    }

    renderCardDetail(){
        const activityDetailText = this.props.activityDetailText

        if(activityDetailText){
            return(
                <View style={styles.eventDetailContainerStyle}>
                    <View style={styles.eventDetailTextContainerStyle}>
                        <Text numberOfLines={1} style={styles.activityDetailTitleTextStyle}>{this.props.activityTitleText}</Text>
                        <Text numberOfLines={1} style={styles.activityTitleTextStyle}>{activityDetailText}</Text>
                    </View>
                    <View style={styles.addEventIconContainerStyleStyle}>
                        <FastImage
                            source={this.getIcon()}
                            resizeMode='contain'
                            style={styles.addEventIconImageStyle}
                        />
                    </View>
                </View>
            )
        }else{
            return(
                <Text numberOfLines={2} style={styles.activityTitleTextStyle}>{this.props.activityTitleText}</Text>
            )
        }
    }
    async submitActivity(item){
        let param = {};
        param.action="add"
        let response = await post(`booking/activity/${item.activity_id}`,param);
        if(response && response.status=="ok"){
            this.props.navigator.showModal({
                screen: "mti.ActivitySubmitScreen", // unique ID registered with Navigation.registerScreen
                passProps:{
                    navigator: this.props.navigator,
                    data: item
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
        return(
            <TouchableOpacity onPress={this.props.onPress}
                style={[styles.dashboardActivityCardContainerStyle,this.props.style]}
            >
                <ImageBackground
                    source={this.props.bannerUri?this.props.bannerUri:require('../source/images/pic-default.jpg')}
                    resizeMode='stretch'
                    style={styles.bannerImageStyle}
                    borderRadius={3}
                >
                    {this.props.activityTitleText ? <Image
                        source={require('./../source/images/dashboardCardOverlayImg.png')}
                        style={styles.activityCardOverlayImageStyle}
                        resizeMode='stretch'
                        borderRadius={3}
                    />:null}
                    {this.props.activityTitleText ? 
                    <View style={styles.activityDetailContainerStyle}>
                        <View style={styles.activityDetailSectionStyle}>
                            <View style={[styles.activityIconContainerStyle,this.props.iconContainerStyle]}>
                                {this.renderCardIcon()}
                            </View>
                            <View style={{height: '80%',}}>
                                <Image
                                    source={require('./../source/images/dotSection.png')}
                                    resizeMode='contain'
                                    style={styles.dotSectionImageStyle}
                                />
                            </View>
                            <View style={[styles.activityTitleContainerStyle,this.props.detailContainerStyle]}>
                                {this.renderCardDetail()}
                            </View>
                            {/* {this.props.isJoin ?<TouchableOpacity style={{flex:0.5}} onPress={()=>this.submitActivity(this.props.isJoin)}>
                                <FastImage
                                    source={require('./../source/icons/iconEventAdd.png')}
                                    resizeMode='contain'
                                    style={styles.iconImageStyle}
                                />
                            </TouchableOpacity>:null} */}
                        </View>
                    </View>:null}
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}

const styles={
    dashboardActivityCardContainerStyle:{
        height: responsiveHeight(23.23),
        width: responsiveWidth(86.25),
        //borderRadius: 5,
    },
    bannerImageStyle:{
        flex: 1,
        justifyContent: 'flex-end',
    },
    activityCardOverlayImageStyle:{
        height: responsiveHeight(7.74),
        width: '100%',
        opacity: 0.6,

    },
    activityDetailContainerStyle:{
        position: 'absolute',
        width: responsiveWidth(98),
        height: responsiveHeight(8),
    },
    activityDetailSectionStyle:{
        //height: responsiveHeight(7.74),
        flex: 1,
        width: null,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
    },
    activityIconContainerStyle:{
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconTextStyle:{
        fontSize: responsiveFontSize(4),
        color: '#FFF',
        top: responsiveFontSize(1),
        textAlign: 'center',
    },
    iconImageStyle:{
        height: responsiveHeight(4),
        width: responsiveHeight(6),
        alignItems:'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    iconTitleTextStyle:{
        color: 'rgba(255, 255, 255, 0.6)',
        letterSpacing: 0,
        fontSize: responsiveFontSize(1.38),
        textAlign: 'center',

    },
    dotSectionImageStyle:{
        flex: 1,
    
    },
    activityTitleContainerStyle:{
        flex: 1,
        justifyContent: 'center',
    },
    eventDetailContainerStyle:{
        flexDirection: 'row',
        flex: 1,
    },
    eventDetailTextContainerStyle:{
        flex: 1,
        justifyContent: 'center',
    },
    activityDetailTitleTextStyle:{
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: responsiveFontSize(2.2),
        marginLeft: responsiveWidth(2),
    },
    activityTitleTextStyle:{
        color: '#FFF',
        fontSize: responsiveFontSize(2.2),
        marginLeft: responsiveWidth(2),
        marginRight: responsiveWidth(2),
        width:responsiveWidth(65)
    },
    addEventIconContainerStyleStyle:{
        justifyContent: 'center', 
        width: responsiveWidth(10),
        alignItems: 'center',
    },
    addEventIconImageStyle:{
        height: responsiveHeight(5.63),
 
    }
    
}

export {DashboardActivityCard}