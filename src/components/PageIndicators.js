import React,{Component} from 'react';
import {Text,View} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class PageIndicators extends Component{

    constructor(props){
        super(props)

    }

    renderIndicators(){
        let indicatorColor = ['#b2dff1','#b2dff1','#b2dff1','#b2dff1']
        let pageNumber = this.props.pageNumber
        for(let index=0;index<pageNumber;index++){
            indicatorColor[index] = '#0194d2'
        }

        return indicatorColor.map((indicatorColor,i)=>
            <View key={i} style={[styles.indicatorStyle,{backgroundColor: indicatorColor}]}/>
        )
    }

    render(){
        return(
            <View style={styles.indicatorContainerStyle}>
                {this.renderIndicators()}
            </View>
        )
    }
}

const styles={
    indicatorContainerStyle:{
        marginTop: responsiveHeight(4),
        marginBottom: responsiveHeight(5),
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    indicatorStyle:{
        width: responsiveWidth(20),
        height: responsiveHeight(0.7),
    }
}

export {PageIndicators}