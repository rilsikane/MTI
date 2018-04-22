import React from 'react';
import {Text,View,Image} from 'react-native';
import PropTypes from "prop-types";
import {Button} from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class MainSubmitButton extends React.Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <View>
                <Button 
                    full
                    style={[styles.buttonStyle,this.props.style]}
                    onPress={this.props.onPress}
                >
                    {this.props.iconImageUri&&<Image source={this.props.iconImageUri} style={styles.iconImageStyle} resizeMode='contain'/>}
                    <Text style={styles.buttonTextStyle}>{this.props.buttonTitleText}</Text>
                </Button>
            </View>
        )
    }
}

MainSubmitButton.propTypes={
    buttonTitleText: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
}

const styles={
    buttonStyle:{
        backgroundColor: '#fd6262',
        height: responsiveHeight(7),
        borderRadius: 3,
    },
    buttonTextStyle:{
        color: '#FFF',
        fontSize: responsiveFontSize(3),
    },
    iconImageStyle:{
        height: responsiveHeight(2.81),
    }
}
export {MainSubmitButton}