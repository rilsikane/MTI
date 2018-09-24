import React,{Component} from 'react';
import {Text,View,ImageBackground,TouchableWithoutFeedback,Image} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { ifIphoneX,isIphoneX } from 'react-native-iphone-x-helper'
import { observer, inject } from 'mobx-react';

@inject('naviStore')
@observer
export default class MiddleButtonScreen extends Component{

    constructor(props){
        super(props)
    }


    render(){
        return null
            // <TouchableWithoutFeedback style={{flex:1,bottom:50}} onPress={()=> {
            //         this.props.naviStore.navigation.popToRoot({
            //             animated: false, // does the popToRoot have transition animation or does it happen immediately (optional)
            //             animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
            //         });
            //         this.props.navigator.switchToTab({
            //         tabIndex: 2})
            //     }}>
            //     <Image style={{width:55,height:55}} 
            //     source={require('../source/images/icon1.png')}/>
            // </TouchableWithoutFeedback>
            
        
    }
}

const styles={
   
}