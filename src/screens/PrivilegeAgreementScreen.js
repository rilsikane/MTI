import React,{Component} from 'react';
import {Text,View,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {MainSubmitButton} from './../components/MainSubmitButton';

export default class PrivilegeAgreementScreen extends Component{

    constructor(props){
        super(props)

    }

    renderAgreementList(){
        let agreementList = [
            {
                description: 'แสดงบัตร Member Card หรือบัตร Virtual Card บน Mobile application'
            },
            {
                description: 'สามารถใช้บริการเช็คสุขภาพสายตาฟรี 10 ราย ต่อวัน ทุกวันพฤหัส (กรุณาโทรนัดหมายล่วงหน้าก่อนการเข้าใช้บริการ'
            },
            {
                description: 'รับส่วนลดพิเศษเพิ่มอีก 5% จากส่วนลดปกติ 30-50%'
            },
            {
                description: 'สิทธิพิเศษนี้ไม่สามารถใช้ร่วมกับโปรโมชั่นอื่นๆ ได้'
            },
            {
                description: 'เงื่อนไขในการใช้บริการ หรือการรับสิทธิ์ส่วนลดเป็นไปตามที่ร้านค้ากำหนด'
            },
            {
                description: 'จำกัดสิทธิพิเศษส่วนลดต่อบัตรสมาชิก Member Club 1 ท่าน / 1 สิทธิ์'
            },
            {
                description: 'บริษัทขอสวงสิทธิ์ไม่สามารถแลกเปลี่ยนเป็นเงินสด หรือใช้ร่วมกับกิจกรรมส่งเสริมการขายอื่นๆ ได้'
            },
        ]

        return agreementList.map((data,i)=>
            <View key={i} style={styles.agreementListTextContainerStyle}>
                <Text style={styles.agreementTitleTextStyle}>{++i}. </Text>
                <Text style={styles.agreementTitleTextStyle}>{data.description}</Text>
            </View>
        )
    }

    render(){
        return(
            <View style={styles.privilegeAgreementScreenContainerStyle}>
                <Headers
                    leftIconName='cancel'
                    headerTitleText='เงื่อนไขสำหรับใช้สิทธิ์'
                />
                <View style={styles.privilegeAgreementContainerStyle}>
                    <Text style={styles.privilegeTitleTextStyle}>ตรวจสุขภาพสายตาฟรี (มูลค่า 1,000 บาท) ส่วนลดแว่นตาสูงสุด 55% พร้อมรับประกัน 1 ปี</Text>
                    <Text style={styles.privilegeDurationTextStyle}>ระยะเวลาสิทธิพิเศษ : 15 -  31 ธันวาคม 2561</Text>
                    <Text style={styles.agreementTitleTextStyle}>เงื่อนไขสำหรับใช้สิทธิ์</Text>
                    {this.renderAgreementList()}
                    <MainSubmitButton
                        buttonTitleText='ตกลง'
                        onPress={()=>alert('submit')}
                        style={styles.submitButtonStyle}
                    />
                    <TouchableOpacity>
                        <Text style={styles.cancelTextStyle}>ยกเลิก</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles={
    privilegeAgreementScreenContainerStyle:{
        flex: 1,
    },
    privilegeAgreementContainerStyle:{
        flex: 1,
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
    },
    privilegeTitleTextStyle:{
        letterSpacing: 0,
        color: "#1595d3",
        fontSize: responsiveFontSize(3),
        fontFamily: "DBHelvethaicaX-Med",
        marginTop: responsiveHeight(3.5),
        marginBottom: responsiveHeight(2.4)
    },
    privilegeDurationTextStyle:{
        letterSpacing: 0,
        fontSize: responsiveFontSize(2.15),
        color: 'rgb(253,98,98)',
        marginBottom: responsiveHeight(2.4),
    },
    agreementTitleTextStyle:{
        letterSpacing: 0,
        color: "#919195",
        fontSize: responsiveFontSize(2.15),
    },
    agreementListTextContainerStyle:{
        flexDirection: 'row',
    },
    submitButtonStyle:{
        marginTop: responsiveHeight(2.5),
        marginBottom: responsiveHeight(2.5),
    },
    cancelTextStyle:{
        letterSpacing: 0,
        textAlign: "right",
        color: "#1595d3",
        textDecorationLine: 'underline',
        fontSize: responsiveFontSize(2.8),
    }
}