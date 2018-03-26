import React,{Component} from 'react';
import {Text,View,TouchableOpacity,Platform} from 'react-native';
import PropTypes from "prop-types";
import {CheckBox} from 'react-native-elements'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class CheckBoxes extends Component{

    constructor(props){
        super(props)

    }

    renderCheckBoxTitle(){
        let textUnderLine = this.props.textUnderLine
        let checkBoxTitleText = this.props.checkBoxTitleText
        if(textUnderLine){
            return(
                <View style={styles.textUnderLineContainerStyle}>
                    <Text style={this.props.checkBoxTextStyle}>{checkBoxTitleText.split(' ')[0]} </Text>
                    <TouchableOpacity>
                        <Text style={[this.props.checkBoxTextStyle,styles.textUnderLineStyle]}>{checkBoxTitleText.split(' ')[1]}</Text>
                    </TouchableOpacity>
                </View>
            )
        }else{
            return(
            
                <Text style={this.props.checkBoxTextStyle}>{checkBoxTitleText}</Text>
            )
        }
      
    }

    render(){
        return(
            <View style={styles.checkBoxMainContainerStyle}>
                <CheckBox
                    {...this.props} 
                    fontFamily={Platform.OS === 'android' ?'DBHelvethaicaX':'DBHelvethaicaX-Reg'}
                    containerStyle={styles.checkBoxContainerStyle}
                    size={responsiveFontSize(3)}
                    iconType='material-community'
                    checkedIcon='checkbox-marked-outline'
                    uncheckedIcon='checkbox-blank-outline'
                />
                {this.renderCheckBoxTitle()}
            </View>
        )
    }
}

const styles={
    checkBoxMainContainerStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: responsiveHeight(1),
    },
    checkBoxContainerStyle:{
        backgroundColor: 'transparent',
        borderWidth: 0,
        paddingRight: 0,
        marginRight: 0,
        borderColor: 'transparent',

    },
    textUnderLineContainerStyle:{
        flexDirection: 'row',

    },
    textUnderLineStyle:{
        textDecorationLine: 'underline',
        textDecorationColor: '#0194d2',
        textDecorationStyle: 'solid',

    }
}

export {CheckBoxes}