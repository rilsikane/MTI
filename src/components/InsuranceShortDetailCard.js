import React,{Component} from 'react';
import {Text,View,Image} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {MainSubmitButton} from './MainSubmitButton';

class InsuranceShortDetailCard extends Component{

    constructor(props){
        super(props)

    }
    numberWithCommas(x){
        return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    // checkNumber(num){
    //     if(isNaN(num)){
    //         return 'ตามรายละเอียดกรมธรรม์'
    //     }else{
    //         return this.numberWithCommas(num);
    //     }
    // }   
    // this.props.expire && {backgroundColor:"#eff1f2"}

    render(){
        return(
            <View style={[this.props.style]}>
                <Text style={styles.insuranceTitleTextStyle}>{this.props.index}. {this.props.insuranceTitleText}</Text>
                <Text style={styles.insuranceIdTextStyle}>เลขที่กรมธรรม์ : {this.props.Policy_NO}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.insuranceIdTextStyle}>สถานะกรมธรรม์ประกันภัย :</Text>
                    {!this.props.expire && <Text style={styles.insuranceIdTextStyle}>Active</Text>}
                    {this.props.expire && <Text style={[styles.insuranceIdTextStyle,{color:"red"}]}>Expired</Text>}
                </View>
                <Image
                    source={require('../source/images/dotSectionHorizontal.png')}
                    resizeMode='contain'
                    style={styles.dotSectionImageStyle}
                />
                {this.props.FLAG=='Y' && <View style={styles.insuranceDetailContainerStyle}>
                    <View style={styles.insuranceDetailSectionStyle}>
                        <Text style={styles.insuranceTitleSectionTextStyle}>ทุนประกันภัย</Text>
                        {isNaN(this.props.insuanceBudget)?
                        <Text style={styles.insuranceValueLabelTextStyle}>{'ตามรายละเอียดกรมธรรม์'}</Text>:
                        <Text style={styles.insuranceValueSectionTextStyle}>{this.numberWithCommas(this.props.insuanceBudget)}</Text>}
                    </View>
                    <View style={styles.insuranceDetailSectionStyle}>
                        <Text style={styles.insuranceTitleSectionTextStyle}>เบี้ยประกันภัย</Text>
                        <Text style={styles.insuranceValueSectionTextStyle}>{this.numberWithCommas(this.props.insurancePremium)}</Text>
                    </View> 
                    <View style={styles.insuranceDetailSectionStyle}>
                        <Text style={styles.insuranceTitleSectionTextStyle}>ระยะเวลาเอาประกันภัย</Text>
                        <Text style={styles.insuranceValueSectionTextStyle}>{this.props.insuranceDuring}</Text>
                    </View>
                </View>}
                <View style={styles.seeInsuranceDetailButtonContainerStyle}>
                    <MainSubmitButton
                        buttonTitleText='รายละเอียดกรมธรรม์'
                        onPress={this.props.onSeeInsuranceDetailButtonPress}
                    />
                </View>
            </View>
        )
    }
}

const styles={
    insuranceTitleTextStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(2.5),
        marginBottom: responsiveHeight(1.5),
    },
    insuranceShortDetailTextStyle:{
        color: '#919195',
        fontSize: responsiveFontSize(2.15),
    },
    dotSectionImageStyle:{
        width: '100%',
        opacity: 0.3,
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
    },
    insuranceDetailContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    insuranceDetailSectionStyle:{
        alignItems: 'center',
    },
    insuranceTitleSectionTextStyle:{
        color: '#919195',
        fontSize: responsiveFontSize(2),
    },
    insuranceValueSectionTextStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(3),
        alignItems: 'center',
    },
    insuranceValueLabelTextStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(2.1),
        alignItems: 'center',
        paddingTop:5
    },
    seeInsuranceDetailButtonContainerStyle:{
        marginTop: responsiveHeight(2),
    },
    insuranceIdTextStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(2),
    }
}

export {InsuranceShortDetailCard}