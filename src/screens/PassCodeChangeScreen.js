import React,{Component} from 'react';
import {Text,View,ImageBackground,TouchableOpacity,Image} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PassCodePress from '../components/PassCodePress';

export default class PassCodeChangeScreen extends Component{

    constructor(props){
        super(props)
    }


    render(){
        return(
            <View style={{flex:1}}>
                <PassCodePress cancelText="กลับ" cancel={this.props.cancel} next={this.props.next}
                isNext={true} title="ใส่่รหัส Pincode เดิม" passCode={this.props.passCode}/>
            </View>
        )
    }
}

const styles={
   
}