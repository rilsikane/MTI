import React,{Component} from 'react';
import {Text,View,Image,ImageBackground,Platform,TouchableOpacity,SafeAreaView} from 'react-native';
import PropTypes from "prop-types";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/FontAwesome'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { ifIphoneX,isIphoneX } from 'react-native-iphone-x-helper'
import { observer, inject } from 'mobx-react';

@inject('naviStore')
@observer
class Headers extends Component{

    constructor(props){
        super(props)

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
                <Text numberOfLines={1} style={styles.textTitleStyle}>{this.props.headerTitleText}</Text>
            )
        }else{
            return(
                <View/>
            )
        }
    }

    renderRightButton(){
        if(this.props.rightIconName=='iconBell'){
            return
            // (
                // <TouchableOpacity style={styles.rightIconContainerStyle}>
                //     {this.renderBadge()}
                //     <Image
                //         source={require('./../source/icons/iconBell.png')}
                //         style={styles.rightIconImageStyle}
                //         resizeMode='contain'
                //     />
                // </TouchableOpacity>
            // )
            null;
        }else if(this.props.rightIconName=='cancel'){
            return(
                <TouchableOpacity style={{backgroundColor:"transparent",flexDirection:"column"}} 
                  onPress={(e)=> this.props.cancel()}>
                      <Icon name="times" style={{fontSize: responsiveFontSize(3),paddingRight:10,color: '#FFF'}}></Icon>
                  </TouchableOpacity>
            )
        }
        else{
            return(
                <View style={styles.headersBlankItemStyle}/>
            )
        }
    }

    renderBadge(){
        let notify = this.props.notify

        if(notify!=null){
            return(
                <View style={styles.badgeTextContainerStyle}>
                    <Text style={styles.badgeTextStyle}>{notify}</Text>
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
                        <View style={[styles.headerCenterItemContainerStyle,this.props.longTitle&&{flex: 0.8}]}>
                            {this.renderCenterItems()}
                        </View>
                        <View style={[styles.headerRightItemContainerStyle,this.props.longTitle&&styles.sideItemWithLongTitleStyle,this.props.withSearch&&styles.rightItemWithSearchStyle]}>
                            {this.renderRightButton()}
                        </View>
                    </View>
                    <View style={styles.bannerBottomLineStyle}/>
                </ImageBackground>
            </View>
        )
    }
}

const padTop = Platform.OS === 'ios' ? isIphoneX() ? 50:20:30

const styles={
    headerImageBackgroundStyle:{
        height: isIphoneX() ? responsiveHeight(13) : responsiveHeight(9.85),
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
        marginTop: responsiveHeight(1),
    },
    rightItemWithSearchStyle:{
        marginTop: responsiveHeight(1),
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