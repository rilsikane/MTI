import React,{Component} from 'react';
import {Text,View,Image} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {MainSubmitButton} from './MainSubmitButton';

class InsuranceShortDetailCard extends Component{

    constructor(props){
        super(props)

    }

    render(){
        return(
            <View style={this.props.style}>
                <Text style={styles.insuranceTitleTextStyle}>{this.props.index}. {this.props.insuranceTitleText}</Text>
                <Text style={styles.insuranceShortDetailTextStyle}>{this.props.insuranceShortDetailText}</Text>
                <Image
                    source={require('../source/images/dotSectionHorizontal.png')}
                    resizeMode='contain'
                    style={styles.dotSectionImageStyle}
                />
                <View style={styles.insuranceDetailContainerStyle}>
                    <View style={styles.insuranceDetailSectionStyle}>
                        <Text style={styles.insuranceTitleSectionTextStyle}>ทุนประกันภัย</Text>
                        <Text style={styles.insuranceValueSectionTextStyle}>{this.props.insuanceBudget}</Text>
                    </View>
                    <View style={styles.insuranceDetailSectionStyle}>
                        <Text style={styles.insuranceTitleSectionTextStyle}>เบี้ยประกันภัย</Text>
                        <Text style={styles.insuranceValueSectionTextStyle}>{this.props.insurancePremium}</Text>
                    </View> 
                    <View style={styles.insuranceDetailSectionStyle}>
                        <Text style={styles.insuranceTitleSectionTextStyle}>ระยะเวลาเอาประกันภัย</Text>
                        <Text style={styles.insuranceValueSectionTextStyle}>{this.props.insuranceDuring} ปี</Text>
                    </View>
                </View>
                <View style={styles.seeInsuranceDetailButtonContainerStyle}>
                    <MainSubmitButton
                        buttonTitleText='ดูรายละเอียดกรรมธรรม์'
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
        fontFamily: 'DBHelvethaicaX-Med',
        color: '#1595d3',
        fontSize: responsiveFontSize(3)
    },
    seeInsuranceDetailButtonContainerStyle:{
        marginTop: responsiveHeight(2),
    }
}

export {InsuranceShortDetailCard}