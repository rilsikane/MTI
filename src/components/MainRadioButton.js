import React,{Component} from 'react';
import {Text,View} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
//import {SelectMultipleGroupButton} from 'react-native-selectmultiple-button'

class MainRadioButton extends Component{

    constructor(props){
        super(props)
        this.state={
            radioSelectedData_group: '',
        }
    }

    renderRadioButton(){     
        return(
            // <SelectMultipleGroupButton
            //     multiple={false}
            //     //defaultSelectedIndexes={0}
            //     containerViewStyle={styles.containerViewStyle}
            //     highLightStyle={styles.highLightStyle}
            //     buttonViewStyle={styles.buttonViewStyle}
            //     textStyle={styles.textStyle}
            //     singleTap={this.props.singleTap}
            //     group={this.props.group} 
            // />
            <View></View>
        )
    }


    render(){
        return(
            <View style={[styles.mainRadioButtonContainerStyle,this.props.style]}>
                {this.renderRadioButton()}
            </View>
        )
    }
}

const styles={
    mainRadioButtonContainerStyle:{

    },
    containerViewStyle:{
        flexDirection: 'row',
        //justifyContent: 'flex-start',
        backgroundColor: 'transparent',
    },
    highLightStyle:{
        borderColor: '#c5c6c8',
        backgroundColor: '#FFF',
        textColor: 'rgba(145, 145, 149, 0.4)',
        borderTintColor: 'rgb(253,98,98)',
        backgroundTintColor: 'rgb(253,98,98)',
        textTintColor: '#FFF',
    },
    buttonViewStyle:{
        width: responsiveHeight(3.52),
        height: responsiveHeight(3.52),
        borderRadius: 5,
        margin: responsiveWidth(1),
    },
    textStyle:{
        fontSize: responsiveFontSize(2.8),
        fontFamily: "DBHelvethaicaX-Bd",
        textAlignVertical: 'center',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
    }
}

export {MainRadioButton}