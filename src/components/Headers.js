import React,{Component} from 'react';
import {Text,View,Image,ImageBackground,Platform,TouchableOpacity,SafeAreaView} from 'react-native';
import PropTypes from "prop-types";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { ifIphoneX,isIphoneX } from 'react-native-iphone-x-helper'
import Icon from 'react-native-vector-icons/FontAwesome';
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
                      <Text style={{fontSize: responsiveFontSize(3),color: '#FFF'}}>ยกเลิก</Text>
                  </TouchableOpacity>
            )
        }else if(this.props.leftIconName=='back'){
            return(
                <TouchableOpacity style={{backgroundColor:"transparent",flexDirection:"column",justifyContent:"flex-start",paddingRight:5}} 
                onPress={(e)=> this.props.naviStore.navigation.pop()}>
                    <Text style={{fontSize: responsiveFontSize(3),color: '#FFF'}}>กลับ</Text>
                </TouchableOpacity>
            )
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
            return(
                <View style={styles.rightIconContainerStyle}>
                    {this.renderBadge()}
                    <Image
                        source={require('./../source/icons/iconBell.png')}
                        style={styles.rightIconImageStyle}
                        resizeMode='contain'
                    />
                </View>
            )
        }else{
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
                    style={styles.headerImageBackgroundStyle}
                    resizeMode='stretch'
                >
                    <View style={styles.headerItemsContainerStyle}>
                        <View>
                            {this.renderLeftButton()}
                        </View>
                        <View>
                            {this.renderCenterItems()}
                        </View>
                        <View>
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
    headerItemsContainerStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        paddingLeft: responsiveWidth(2),
        paddingRight: responsiveWidth(2),
        marginBottom: responsiveHeight(1),
    },
    leftIconImageStyle:{
        height: responsiveHeight(2.46),
        opacity: 0.7,
    },
    textTitleStyle:{
        fontSize: responsiveFontSize(4),
        color: '#FFF'
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
        width: responsiveWidth(4.53),
    }
}

export {Headers}