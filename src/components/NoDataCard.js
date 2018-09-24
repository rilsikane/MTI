import React from 'react';
import {Text,View,Image} from 'react-native';
import PropTypes from "prop-types";
import {Button} from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class NoDataCard extends React.Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize: responsiveFontSize(3),}}>ไม่พบข้อมูล</Text>
            </View>
        )
    }
}


const styles={
   
}
export  {NoDataCard}