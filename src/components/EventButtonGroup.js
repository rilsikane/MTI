import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class EventButtonGroup extends Component{

    constructor(props){
        super(props)

    }

    render(){
        return(
            <View style={styles.eventButtonGroupContainerStyle}>
                <TouchableOpacity>
                    <Image
                        source={require('../source/icons/iconComment.png')}
                        resizeMode='contain'
                        style={styles.eventIconStyle}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={require('../source/icons/iconFavorite.png')}
                        resizeMode='contain'
                        style={styles.eventIconStyle}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={require('../source/icons/iconShare.png')}
                        resizeMode='contain'
                        style={styles.eventIconStyle}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles={
    eventButtonGroupContainerStyle:{
        flexDirection: 'row',
    },
    eventIconStyle:{
        height: responsiveHeight(2.81),
        width: responsiveWidth(5.2),
        marginLeft: responsiveWidth(2.5),
        opacity: 0.5,
    }
}

export {EventButtonGroup}