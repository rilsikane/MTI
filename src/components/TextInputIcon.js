import React,{Component} from 'react';
import {Text,View,TextInput,Image,TouchableOpacity,Platform} from 'react-native';
import PropTypes from "prop-types";
import { Container, Header, Content, Item, Input, Icon } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import SelectInput from './SelectInput';
import TextInputMask from 'react-native-text-input-mask';

import {post,authen,get} from '../api';

class TextInputIcon extends Component{

    constructor(props){
        super(props)
        this.state={
            
        }
    }


    renderLeftLabel(){
        // let leftLabelText = this.props.leftLabelText
        // if(leftLabelText!=null){
        //     return(
        //         <Text style={[styles.leftLabelTextStyle,{flex: this.props.secondFlex}]}>{leftLabelText}</Text>
        //     )
        // }
    }

    renderInput(){
        let inputType = this.props.inputType
        if(inputType=='selector'){

            return(
                <SelectInput
                    value={this.props.genderValue}
                    options={this.props.options?this.props.options:this.getPickerOptions()}
                    onCancelEditing={() => console.log('onCancel')}
                    onSubmitEditing={this.props.onSubmitEditing}
                    style={[styles.selectorStyle,{flex: this.props.thirdFlex}]}
                    labelStyle={styles.selectorLabelStyle}
                    itemStyle={styles.itemStyle}
                    buttonsTextSize={responsiveFontSize(3)}
                    placeholder={this.props.leftLabelText}
                    enabled={this.props.editable!==false}
                />
            )
        
        }
        else  if(inputType=='mask'){
            return(
                <TextInputMask 
                {...this.props}
                placeholder={this.props.leftLabelText}               
                style={[styles.textInputStyle,{flex: this.props.thirdFlex}]}
                underlineColorAndroid='transparent'
                
            />
            )
        }
        else{
            return(
                <TextInput
                    placeholder={this.props.leftLabelText}
                    blurOnSubmit={ false }
                    ref={this.props.refs} 
                    {...this.props}               
                    style={[styles.textInputStyle,{flex: this.props.thirdFlex}]}
                    underlineColorAndroid='transparent'
                />
            )
        }
    }

    
    getPickerOptions(){
        return [
            { value: "F", label: 'หญิง'},
            { value: "M", label: 'ชาย'},
        ]
    }

    renderRightLabel(){
        if(this.props.rightIconName=='pen'&&this.props.disabled){
            return(
                <Image
                    source={require('../source/icons/iconTextEdit.png')}
                    resizeMode='contain'
                    style={styles.iconPenStyle}
                />
            )
        }else if(Platform.OS==='ios'&&this.props.inputType=='selector'&&this.props.editable!==false){
            return(
                <Image
                    source={require('../source/icons/iconTextEdit.png')}
                    resizeMode='contain'
                    style={styles.iconPenStyle}
                />
            )
        }
    }

    render(){
        return(
            <View>
                <Item
                    style={[styles.textInputContainerStyle,this.props.containerStyle]}
                >
                    <Image
                        source={this.props.iconUri}
                        style={[styles.emailIconStyle,this.props.iconStyle]}
                        resizeMode='contain'
                    />
                    {this.renderLeftLabel()}
                    {this.renderInput()}
                    {this.renderRightLabel()}
                </Item> 
            </View>
        )
    }
}


const styles={
    textInputContainerStyle:{
        borderBottomColor: '#67bfe5',
        
    },
    emailTextInputStyle:{

    },
    textInputStyle:{
        fontSize: responsiveFontSize(2.64),
        color: '#1595d3',
        height: responsiveHeight(10),
    },
    inputBottomlineStyle:{
        opacity: 0.2,
        backgroundColor: '#1c4c7e',
        height: 1.5,
    },
    emailIconStyle:{
        height: responsiveHeight(2.46),
        flex: 0.1,
        
    },
    leftLabelTextStyle:{
        fontSize: responsiveFontSize(2.64),
        color: 'rgba(145, 145, 149, 0.8)',
        textAlignVertical: 'center',

    },
    selectorStyle:{
        padding: 0,
        margin: 0,
        height: responsiveHeight(10),
        justifyContent: 'center',

    },
    selectorLabelStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(2.64),
        textAlignVertical: 'center',
    },
    itemStyle:{

    },
    iconPenStyle:{
        height: responsiveHeight(2.11)
    }
}
export {TextInputIcon};