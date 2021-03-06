import React,{Component} from 'react';
import {Text,View,Image,ImageBackground,Platform,TouchableOpacity,SafeAreaView} from 'react-native';
import PropTypes from "prop-types";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/FontAwesome'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { ifIphoneX,isIphoneX } from 'react-native-iphone-x-helper'
import { observer, inject } from 'mobx-react';
import app from '../stores/app';
@inject('naviStore','userStore')
@observer
class Headers extends Component{

    constructor(props){
        super(props)
        this.app = app;
    }

    renderLeftButton(){
        if(this.props.leftIconName=='menu'){   
            return(  
                <TouchableOpacity style={{flexDirection:"column",justifyContent:"flex-start",paddingRight:5}} 
                onPress={(e)=> this.props.naviStore.navigation.toggleDrawer({
                    side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
                    animated: true, // does the toggle have transition animation or does it happen immediately (optional)
                    to: 'open' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
                  })}>        
                    <Image
                        source={require('./../source/icons/iconMenu.png')}
                        style={styles.leftIconImageStyle}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )
        }else if(this.props.leftIconName=='cancel'){
            return(
                <TouchableOpacity style={{backgroundColor:"transparent",flexDirection:"column",justifyContent:"flex-start",paddingRight:5}} 
                  onPress={(e)=> this.props.cancel()}>
                      <Icon name="chevron-left" style={{fontSize: responsiveFontSize(2.5),paddingLeft:5,color: '#FFF'}}></Icon>
                  </TouchableOpacity>
            )
        }else if(this.props.leftIconName=='back'){
            return(
                <TouchableOpacity style={{backgroundColor:"transparent",flexDirection:"column",justifyContent:"flex-start",paddingRight:5}} 
                onPress={this.props.back ? (e)=> this.props.back():(e)=> this.props.naviStore.navigation.pop()}>
                   <Icon name="chevron-left" style={{fontSize: responsiveFontSize(2.5),paddingLeft:5,color: '#FFF'}}></Icon>
                </TouchableOpacity>
            )
        }
        else if(this.props.leftIconName=='close'){
            return(
                <TouchableOpacity style={{backgroundColor:"transparent",flexDirection:"column",justifyContent:"flex-start",paddingRight:5}} 
                onPress={(e)=> this.props.naviStore.navigation.dismissModal({
                    animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                  })}>
                    <Icon name="chevron-left" style={{fontSize: responsiveFontSize(2.5),paddingLeft:5,color: '#FFF'}}></Icon>
                    
                </TouchableOpacity>
            )
        }else{
            return null;
        }
    }

    renderCenterItems(){
        if(this.props.headerTitleText!=null){
            return(
                <Text numberOfLines={1} style={[styles.textTitleStyle,this.props.titleStyle]}>{this.props.headerTitleText}</Text>
            )
        }else{
            return(
                <View/>
            )
        }
    }

    renderRightButton(){
       
        return <TouchableOpacity onPress={()=>{
            this.props.naviStore.navigation.push({
                screen: "mti.NotificationScreen", // unique ID registered with Navigation.registerScreen
                title: undefined, // navigation bar title of the pushed screen (optional)
                titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                animated: false, // does the push have transition animation or does it happen immediately (optional)
                backButtonTitle: undefined, // override the back button title (optional)
                backButtonHidden: false, // hide the back button altogether (optional)
            })
            }} style={styles.rightIconContainerStyle}>
                {this.renderBadge()}
                <Image
                    source={require('./../source/icons/iconBell.png')}
                    style={styles.rightIconImageStyle}
                    resizeMode='contain'
                />
            </TouchableOpacity>
    }

    renderBadge(){
        let notify = this.app.badge;

        if(notify!=null && notify!=0){
            
            return(
                <View style={styles.badgeTextContainerStyle}>
                    <Text style={styles.badgeTextStyle}>{this.app.badge}</Text>
                </View>
            )
        }else{
            return(
                <View/>
            )
          
        }
    }

    render(){
        return(
            <View>
                <ImageBackground
                    source={require('./../source/images/bg.png')}
                    style={[styles.headerImageBackgroundStyle,this.props.withSearch?styles.headerImageBackgroundWithSearchStyle:{}]}
                    resizeMode='stretch'
                >
                    <View style={[styles.headerItemsContainerStyle,this.props.withSearch?styles.headerItemsWithSearchContainerStyle:{}]}>
                        <View style={[styles.headerLeftItemContainerStyle,this.props.longTitle&&styles.sideItemWithLongTitleStyle,this.props.withSearch&&styles.leftItemWithSearchStyle]}>
                            {this.renderLeftButton()}
                        </View>
                        <View style={[styles.headerCenterItemContainerStyle,this.props.longTitle&&{flex: 0.6}]}>
                            {this.renderCenterItems()}
                        </View>
                        <View style={[styles.headerRightItemContainerStyle,this.props.longTitle&&styles.sideItemWithLongTitleStyle,this.props.withSearch&&styles.rightItemWithSearchStyle]}>
                            {!this.props.hideRightIcon && (this.props.userStore.user && this.props.userStore.user.name != "GUEST") && this.renderRightButton()}
                        </View>
                    </View>
                    <View style={styles.bannerBottomLineStyle}/>
                </ImageBackground>
            </View>
        )
    }
}

const padTop = Platform.OS === 'ios' ? isIphoneX() ? 30:20:30

const styles={
    headerImageBackgroundStyle:{
        height: isIphoneX() ? responsiveHeight(11) : responsiveHeight(9.85),
        paddingTop: padTop,
        //paddingBottom: responsiveHeight(1),

    },
    headerImageBackgroundWithSearchStyle:{
        height: responsiveHeight(14.78),
    },
    headerItemsContainerStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        // justifyContent: 'space-between',
        paddingLeft: responsiveWidth(2),
        paddingRight: responsiveWidth(2),
        marginBottom: responsiveHeight(1),
    },
    headerLeftItemContainerStyle:{
        flex: 0.2,
    },
    headerCenterItemContainerStyle:{
        flex: 0.6,
        alignItems: 'center',
      
    },
    headerRightItemContainerStyle:{
        flex: 0.2,
        alignItems: 'flex-end',

    },
    headerItemsWithSearchContainerStyle:{
        alignItems: 'flex-start',
    },
    sideItemWithLongTitleStyle:{
        flex: 0.1,
    },
    leftItemWithSearchStyle:{
        marginTop: responsiveHeight(2),
        flex: 0.2,
    },
    rightItemWithSearchStyle:{
        marginTop: responsiveHeight(2),
        flex: 0.2,
    },
    leftIconImageStyle:{
        height: responsiveHeight(2.46),
        opacity: 0.7,
    },
    textTitleStyle:{
        fontSize: responsiveFontSize(4),
        color: '#FFF',
    },
    rightIconContainerStyle:{
        flexDirection: 'row',
        
    },
    rightIconImageStyle:{
        height: responsiveHeight(2.81),
        width: responsiveHeight(2.81),
        opacity: 0.7,
        zIndex: 1,
    },
    badgeTextContainerStyle:{
        backgroundColor: 'red',
        width: responsiveHeight(2),
        height: responsiveHeight(2),
        borderRadius: responsiveHeight(2),
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 5,

    },
    badgeTextStyle:{
        color: '#FFF',
        textAlign: 'center',
        textAlignVertical: 'center',


    },
    bannerBottomLineStyle:{
        height: responsiveHeight(0.35),
        backgroundColor: '#000',
        opacity: 0.2,
        //alignSelf: 'flex-end'
    },
    headersBlankItemStyle:{
        //width: responsiveWidth(8),
    }
}

export {Headers}