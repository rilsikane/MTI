import React,{Component} from 'react';
import {Text,View,TextInput,Image,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { Container, Header, Content, Item, Input, Icon } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import SelectInput from 'react-native-select-input-ios';
import TextInputMask from 'react-native-text-input-mask';

import {post,authen,get} from '../api';

class TextInputIcon extends Component{

    constructor(props){
        super(props)
        this.state={
            dropDownCareer: [],
            dropDownEducation: [],
            dropDownIncome: [],
        }
    }

    async componentDidMount(){
        if(this.props.options){
            let dropDownMaster = await get('masterdata/profile',{});
            dropDownMaster.career.map((data,i)=>{
                this.state.dropDownCareer.push({
                    value: data,
                    label: data,
                })
            })
            dropDownMaster.education.map((data,i)=>{
                this.state.dropDownEducation.push({
                    value: data,
                    label: data,
                })
            })
            dropDownMaster.income.map((data,i)=>{
                this.state.dropDownIncome.push({
                    value: data,
                    label: data,
                })
            })

            //console.log(dropDownMaster)
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
                    options={this.getPickerOptions()}
                    onCancelEditing={() => console.log('onCancel')}
                    onSubmitEditing={this.props.onSubmitEditing}
                    style={[styles.selectorStyle,{flex: this.props.thirdFlex}]}
                    labelStyle={styles.selectorLabelStyle}
                    itemStyle={styles.itemStyle}
                    buttonsTextSize={responsiveFontSize(3)}
                    placeholder={this.props.leftLabelText}
                    enabled={this.props.editable}
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
        if(this.props.options==='career'){
            return this.state.dropDownCareer
        }else if(this.props.options==='education'){
            return this.state.dropDownEducation
        }else if(this.props.options==='income'){
            return this.state.dropDownIncome
        }else{
            return [
                { value: "F", label: 'หญิง'},
                { value: "M", label: 'ชาย'},
            ]
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

    }
}
export {TextInputIcon};