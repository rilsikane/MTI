import React,{Component} from 'react';
import {Text,View,ScrollView,Image,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {UserShortDetailCard} from './../components/UserShortDetailCard';
import {InsuranceShortDetailCard} from '../components/InsuranceShortDetailCard';

export default class UserInsuranceListScreen extends Component{

    constructor(props){
        super(props)
    }

    renderInsuranceShortDetailCard(){
        let userInsuranceDetail=[
            {
                insuranceTitleText: 'ประกันอัคคีภัยสำหรับบ้านอยู่อาศัย',
                insuranceShortDetailText: 'สำหรับกรมธรรม์ประกันอัคคีภัยรวมภัยบ้านอยู่อาศัย (เฉพาะบ้านเดี่ยว และทาวน์เฮาส์) ประเภทสิ่งปลูกสร้างชั้น 1 (ผนังคอนกรีตล้วน)',
                insuanceBudget: '1,000,000',
                insurancePremium: '1,063.58',
                insuranceDuring: '1'
            },
            {
                insuranceTitleText: 'ประกันอัคคีภัยสำหรับบ้านอยู่อาศัย',
                insuranceShortDetailText: 'สำหรับกรมธรรม์ประกันอัคคีภัยรวมภัยบ้านอยู่อาศัย (เฉพาะบ้านเดี่ยว และทาวน์เฮาส์) ประเภทสิ่งปลูกสร้างชั้น 1 (ผนังคอนกรีตล้วน)',
                insuanceBudget: '1,000,000',
                insurancePremium: '1,063.58',
                insuranceDuring: '1'
            }
        ]

        return userInsuranceDetail.map((data,i)=>
            <InsuranceShortDetailCard
                key={i}
                index={++i}
                insuranceTitleText={data.insuranceTitleText}
                insuranceShortDetailText={data.insuranceShortDetailText}
                insuanceBudget={data.insuanceBudget}
                insurancePremium={data.insurancePremium}
                insuranceDuring={data.insuranceDuring}
                onSeeInsuranceDetailButtonPress={()=>alert('See insurance')}
                style={styles.insuranceCardContainerStyle}
            />
        )
    }

    render(){
        return(
            <View style={styles.userInsuranceListScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='รายละเอียดกรมธรรม์'
                />
                <ScrollView style={{flex: 1,}}>
                    <UserShortDetailCard/>
                    <View style={styles.userInsuranceListContainerStyle}>
                        <View style={styles.insuranceTitleContainerStyle}>
                            <Image
                                source={require('../source/icons/iconInsuranceBlue.png')}
                                resizeMode='contain'
                                style={styles.insuranceTitleIconStyle}
                            />
                            <Text style={styles.insuranceTitleTextStyle}>กรมธรรม์ของคุณ</Text>
                        </View>
                        {this.renderInsuranceShortDetailCard()}
                    </View>
                    <Image
                        source={require('../source/images/promotionImg.png')}
                        resizeMode='stretch'
                        style={styles.advertiseImageStyle}
                    />
                    <View style={styles.extraPrivilegeContainerStyle}>
                        <TouchableOpacity>
                            <Image
                                source={require('../source/images/extraPrivilegeImg.png')}
                                resizeMode='stretch'
                                style={styles.extraPrivilegeImageStyle}
                                borderRadius={2}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles={
    userInsuranceListScreenContainerStyle:{
        flex: 1,
    },
    userInsuranceListContainerStyle:{
        flex: 1,
        paddingLeft: responsiveWidth(5),
        paddingRight: responsiveWidth(5),
    },
    insuranceTitleContainerStyle:{
        flexDirection: 'row',
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
    },
    insuranceTitleIconStyle:{
        height: responsiveHeight(3.25),
        width: responsiveWidth(4.53),

    },
    insuranceTitleTextStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(2.5),
        marginLeft: responsiveWidth(1.5),

    },
    insuranceCardContainerStyle:{
        marginBottom: responsiveHeight(3.5),
    },
    advertiseImageStyle:{
        height: responsiveHeight(18.30),
        width: '100%',
    },
    extraPrivilegeContainerStyle:{
        alignItems: 'center',
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(3),
    },
    extraPrivilegeImageStyle:{
        height: responsiveHeight(12.67),
        width: responsiveWidth(90),
    }
}
