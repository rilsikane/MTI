import React,{Component} from 'react';
import {Text,View,ImageBackground,Image,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class DashboardActivityCard extends Component{

    constructor(props){
        super(props)

    }

    renderCardIcon(){
        const iconUri = this.props.iconUri
        const iconText = this.props.iconText

        if(iconText){
            return(
                <Text style={styles.iconTextStyle}>{iconText}</Text>
            )
        }else{
            return(
                <Image
                    source={this.props.iconUri}
                    resizeMode='contain'
                    style={styles.iconImageStyle}
                />
            )
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
                        <Image
                            source={require('./../source/icons/iconEventAdd.png')}
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

    render(){
        return(
            <TouchableOpacity
                style={[styles.dashboardActivityCardContainerStyle,this.props.style]}
            >
                <ImageBackground
                    source={this.props.bannerUri}
                    resizeMode='stretch'
                    style={styles.bannerImageStyle}
                    borderRadius={3}
                >
                    <Image
                        source={require('./../source/images/dashboardCardOverlayImg.png')}
                        style={styles.activityCardOverlayImageStyle}
                        resizeMode='stretch'
                        borderRadius={3}
                    />
                    <View style={styles.activityDetailContainerStyle}>
                        <View style={styles.activityDetailSectionStyle}>
                            <View style={styles.activityIconContainerStyle}>
                                {this.renderCardIcon()}
                                <Text style={styles.iconTitleTextStyle}>{this.props.iconTitleText}</Text>
                            </View>
                            <View style={{height: '80%',}}>
                                <Image
                                    source={require('./../source/images/dotSection.png')}
                                    resizeMode='contain'
                                    style={styles.dotSectionImageStyle}
                                />
                            </View>
                            <View style={styles.activityTitleContainerStyle}>
                                {this.renderCardDetail()}
                            </View>
                        </View>
                    </View>
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
        width: responsiveWidth(86.25),
        height: responsiveHeight(7.74),
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
        height: responsiveHeight(2.46),

    },
    iconTitleTextStyle:{
        color: 'rgba(255, 255, 255, 0.6)',
        letterSpacing: 0,
        fontSize: responsiveFontSize(2.2),
        textAlign: 'center',

    },
    dotSectionImageStyle:{
        flex: 1,
    
    },
    activityTitleContainerStyle:{
        flex: 0.8,
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