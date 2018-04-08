import React,{Component} from 'react';
import {Text,View,Image,ScrollView} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {MainSubmitButton} from '../components/MainSubmitButton';

export default class InsuranceDetailScreen extends Component{

    constructor(props){
        super(props)

    }

    renderProtectRules(rules){
        return rules.map((data,i)=>
            <View key={i} style={styles.rulesListContainerStyle}>
                <Text style={styles.bulletStyle}>{'\u2022'}  </Text>
                <View>
                    <Text style={styles.protectRuleTextStyle}>{data.ruleTitle}</Text>
                    {
                        data.ruleIgnoreCase&&
                        data.ruleIgnoreCase.map((rule)=><Text key={rule} style={styles.protectRuleTextStyle}>- {rule}</Text>)
                    }
                    {data.note&&<Text style={styles.protectRuleTextStyle}>** {data.note}</Text>}
                </View>
            </View>
        )
    }

    render(){
        let rules1 =[
            {
                ruleTitle: 'ภัยจากไฟไหม้',
            },
            {
                ruleTitle: 'ภัยจากฟ้าผ่า (รวมถึงความเสียหายต่อเครื่องใช้ไฟฟ้า และอุปกรณ์ไฟฟ้าที่เกิดจากการลัดวงจรจากฟ้าผ่า)',
            },
            {
                ruleTitle: 'ภัยจากระเบิด',
            },
            {
                ruleTitle: 'ภัยจากการเฉี่ยว หรือ การชน จากยวดยานพาหนะของบุคคลภายนอก',
            },
            {
                ruleTitle: 'ภัยจากอากาศยาน',
            },
            {
                ruleTitle: 'ภัยเนื่องจากน้ำ (ไม่รวมน้ำท่วม) ภัยจากน้ำที่เกิดขึ้นจากการรั่วไหลของน้ำจากท่อน้ำ รวมถึงน้ำฝนที่สาดเข้ามาภายในบ้านแต่จะยกเว้นไม่คุ้มครอง',
                ruleIgnoreCase: [
                    'กรณีภัยจากน้ำท่วม',
                    'การแตกหรือรั่วไหลของน้ำจากระบบท่อประปาใต้ดิน',
                    'ระบบดับเพลิง',
                ],
                note: 'คุ้มครองตามทุนประกันภัย',
            }
        ]

        let rules2=[
            {
                ruleTitle: 'ภัยจากลมพายุ',
            },
            {
                ruleTitle: 'ภัยจากน้ำท่วม',
            },
            {
                ruleTitle: 'ภัยจากแผ่นดินไหว หรือภูเขาไฟระเบิด หรือคลื่นใต้น้ำ หรือสึนามิที่มีสาเหตุจากธรรมชาติ',
            },
            {
                ruleTitle: 'ภัยจากการเฉี่ยว หรือ การชน จากยวดยานพาหนะของบุคคลภายนอก',
            },
            {
                ruleTitle: 'ภัยจากอากาศยาน',
            },
            {
                ruleTitle: 'ภัยจากลูกเห็บ',
                note: 'คุ้มครองทุกภัยรวมกันไม่เกิน 20,000 บาท/ปี',
            }
        ]

        return(
            <View style={styles.InsuranceDetailScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='รายละเอียดกรมธรรม์'
                />
                <ScrollView style={{flex: 1,}}>
                    <View style={styles.insuranceShortDetailContainerStyle}>
                        <Text style={styles.insuranceIdTextStyle}>เลขที่กรมธรรม์ : 453688653687</Text>
                        <Text style={styles.insuranceTitleTextStyle}>ประกันอัคคีภัยสำหรับบ้านอยู่อาศัย</Text>
                        <Text style={styles.insuranceShortDetailTextStyle}>สำหรับกรมธรรม์ประกันอัคคีภัยรวมภัยบ้านอยู่อาศัย (เฉพาะบ้านเดี่ยว และทาวน์เฮาส์) ประเภทสิ่งปลูกสร้างชั้น 1 (ผนังคอนกรีตล้วน)</Text>
                    </View>
                    <View style={styles.insuranceDetailContainerStyle}>
                        <View style={styles.insuranceDetailStyle}>
                            <View style={styles.insuranceDetailSectionStyle}>
                                <Text style={styles.insuranceTitleSectionTextStyle}>ทุนประกันภัย</Text>
                                <Text style={styles.insuranceValueSectionTextStyle}>1,000,000</Text>
                            </View>
                            <View style={styles.insuranceDetailSectionStyle}>
                                <Text style={styles.insuranceTitleSectionTextStyle}>เบี้ยประกันภัย</Text>
                                <Text style={styles.insuranceValueSectionTextStyle}>1,063.58</Text>
                            </View> 
                            <View style={styles.insuranceDetailSectionStyle}>
                                <Text style={styles.insuranceTitleSectionTextStyle}>ระยะเวลาเอาประกันภัย</Text>
                                <Text style={styles.insuranceValueSectionTextStyle}>1 ปี</Text>
                            </View>
                        </View>
                        <Image
                            source={require('../source/images/dotSectionHorizontal.png')}
                            resizeMode='contain'
                            style={styles.dotSectionImageStyle}
                        />
                        <Text style={styles.insuranceShortDetailTextStyle}>วันที่เริ่มต้นและสิ้นสุดกรมธรรม์</Text>
                        <Text style={styles.insuranceDateTextStyle}>30 ธันวาคม 2559 - 30 ธันวาคม 2560</Text>
                        <Text style={styles.insuanceDueDateTextStyle}>กรมธรรม์ใกล้หมดอายุในอีก 15 วัน</Text>
                        <Image
                            source={require('../source/images/dotSectionHorizontal.png')}
                            resizeMode='contain'
                            style={styles.dotSectionImageStyle}
                        />
                        <View style={styles.protectionRulesContainerstyle}>
                            <Text style={styles.insuranceProtectRuleTextStyle}>คุ้มครองภัยหลัก</Text>
                            {this.renderProtectRules(rules1)}
                        </View>
                        <View style={styles.protectionRulesContainerstyle}>
                            <Text style={styles.insuranceProtectRuleTextStyle}>คุ้มครองภัยธรรมชาติ</Text>
                            {this.renderProtectRules(rules2)}
                        </View>
                        <Text style={styles.insuranceProtectRuleTextStyle}>การชดใช้ค่าสินไหมทดแทนสำหรับค่าเช่าที่อยู่ชั่วคราว</Text>
                        <Text style={styles.damageTitleTextStyle}>เสียหายทั้งหมด 100%</Text>
                        <Text style={styles.protectRuleTextStyle}>จ่ายตามจริง ไม่เกินวันละ 1,000 บาท และสูงสุดรวมกันไม่เกิน 100,000 บาท ตลอดระยะเวลาเอาประกันภัย</Text>
                        <Text style={styles.damageTitleTextStyle}>เสียหายเกินกว่าร้อยละ 50</Text>
                        <Text style={styles.protectRuleTextStyle}>จ่ายตามจริง ไม่เกินวันละ 1,000 บาท และสูงสุดรวมกันไม่เกิน 50,000 บาท ตลอดระยะเวลาเอาประกันภัย</Text>
                        <Image
                            source={require('../source/images/dotSectionHorizontal.png')}
                            resizeMode='contain'
                            style={styles.dotSectionImageStyle}
                        />
                        <MainSubmitButton
                            buttonTitleText='ดาวน์โหลดเอกสาร'
                            iconImageUri={require('../source/icons/iconDownload.png')}
                            onPress={()=>alert('submit')}
                        />
                    </View> 
                    <Image
                        source={require('../source/images/promotionImg.png')}
                        resizeMode='stretch'
                        style={styles.advertiseImageStyle}
                    />
                </ScrollView>
            </View>
        )
    }
}

const styles={
    InsuranceDetailScreenContainerStyle:{
        flex: 1,
    },
    insuranceShortDetailContainerStyle:{
        height: responsiveHeight(19.71),
        backgroundColor: '#f6f6f6',
        borderBottomWidth: responsiveHeight(0.17),
        borderColor: '#dddddd',
        justifyContent: 'center',
        paddingLeft: responsiveWidth(5),
        paddingRight: responsiveWidth(5),
    },
    insuranceIdTextStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(2.5),
    },
    insuranceTitleTextStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(3.2),
        marginTop: responsiveHeight(0.4),
        marginBottom: responsiveHeight(0.4),
    },
    insuranceShortDetailTextStyle:{
        color: '#777777',
        fontSize: responsiveFontSize(2.35),
    },
    insuranceDateTextStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(2.5),
    },
    insuanceDueDateTextStyle:{
        color: 'rgb(253,98,98)',
        fontSize: responsiveFontSize(2.2),
    },
    insuranceDetailContainerStyle:{
        padding: responsiveWidth(5),
    },
    insuranceDetailStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    insuranceDetailSectionStyle:{
        alignItems: 'center',
    },
    insuranceTitleSectionTextStyle:{
        color: '#777777',
        fontSize: responsiveFontSize(2),
    },
    insuranceValueSectionTextStyle:{
        fontFamily: 'DBHelvethaicaX-Med',
        color: '#1595d3',
        fontSize: responsiveFontSize(3)
    },
    dotSectionImageStyle:{
        width: '100%',
        opacity: 0.3,
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
    },
    protectionRulesContainerstyle:{
        marginBottom: responsiveHeight(2),
    },
    insuranceProtectRuleTextStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(3.2),
    },
    damageTitleTextStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(2.5),
        marginTop: responsiveHeight(2),
    },
    rulesListContainerStyle:{
        flexDirection: 'row',
    },
    bulletStyle:{
        color: '#777777',
    },
    protectRuleTextStyle:{
        color: '#777777',
        fontSize: responsiveFontSize(2.3),
    },
    advertiseImageStyle:{
        height: responsiveHeight(18.30),
        width: '100%',
        marginTop: responsiveHeight(1),
    },

}
