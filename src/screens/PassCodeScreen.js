import React,{Component} from 'react';
import {Text,View,ImageBackground,TouchableOpacity,Image} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PassCodePress from '../components/PassCodePress';

export default class PassCodeScreen extends Component{

    constructor(props){
        super(props)
    }


    render(){
        return(
            <View style={{flex:1}}>
                <PassCodePress cancelText="ยกเลิก" cancel={this.props.cancel} 
                isNext={true} title="ตั้งรหัส Pincode" next={this.props.next}/>
            </View>
        )
    }
}

const styles={
   
}