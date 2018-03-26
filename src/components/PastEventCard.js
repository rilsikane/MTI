import React,{Component} from 'react';
import {Text,View,TouchableOpacity,Image} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class PastEventCard extends Component{

    constructor(props){
        super(props)

    }

    render(){
        return(
            <TouchableOpacity style={[styles.pastEventCardContainerStyle,this.props.style]}>
                <Image
                    source={this.props.bannerUri}
                    resizeMode='stretch'
                    style={styles.bannerImageStyle}
                    borderRadius={3}
                />
                <Text numberOfLines={2} style={styles.eventTitleTextStyle}>{this.props.eventTitleText}</Text>
                <Text numberOfLines={3} style={styles.eventDetailTextStyle}>{this.props.eventDetailText}</Text>
            </TouchableOpacity>
        )
    }
}

const styles={
    pastEventCardContainerStyle:{
        width: responsiveWidth(86.25),
    },
    bannerImageStyle:{
        height: responsiveHeight(19.01),
        width: responsiveWidth(86.25),

    },
    eventTitleTextStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(3),

    },
    eventDetailTextStyle:{
        color: '#919195',
        fontSize: responsiveFontSize(2),
    }
}

export {PastEventCard}