import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class LifeStyleBox extends Component{

    constructor(props){
        super(props)

    }

    renderBox(){
        let isSelected = this.props.isSelected
        if(isSelected){
            return(
                <TouchableOpacity style={[styles.boxContainerStyle,{backgroundColor: '#1595d3'},this.props.style]} onPress={this.props.onPress}>
                    <TouchableOpacity onPress={this.props.onCloseButtonPress} style={styles.closeIconContainerStyle}>
                        <Image
                            source={require('./../source/icons/btnCloseWhite.png')}
                            style={styles.closeButtonImageStyle}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.onPress} style={styles.iconImageContainerStyle}>
                        <Image
                            source={this.props.imageUri}
                            style={styles.iconImageStyle}
                            resizeMode='contain'
                        />
                        <Text style={[styles.lifestyleTextStyle,{color: '#FFF'}]}>{this.props.boxTitle}</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity style={[styles.boxContainerStyle,{backgroundColor: '#f6f6f6'},this.props.style]} onPress={this.props.onPress}>
                    <TouchableOpacity onPress={this.props.onPress} style={styles.iconImageContainerStyle}>
                        <Image
                            source={this.props.imageUri}
                            style={styles.iconImageStyle}
                            resizeMode='contain'
                        />
                        <Text style={[styles.lifestyleTextStyle,{color: '#919195'}]}>{this.props.boxTitle}</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            )
        }
  
  
    }

    render(){
        return(
            <View>
                {this.renderBox()}
            </View>
        )
    }
}

const styles={
    lifestyleBoxContainerStyle:{
        
    },
    boxContainerStyle:{
        width: responsiveHeight(13.49),
        height: responsiveHeight(13.49),
        borderRadius: 4.8,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#dddddd",
        paddingTop: responsiveHeight(1),

    },
    closeIconContainerStyle:{
        alignItems: 'flex-end',

    },
    closeButtonImageStyle:{
        height: responsiveHeight(2),
    },
    iconImageContainerStyle:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    iconImageStyle:{
        height: responsiveHeight(6.92),
        width:responsiveHeight(9)

    },
    lifestyleTextStyle:{
        fontSize: responsiveFontSize(2),

    }
}

export {LifeStyleBox}