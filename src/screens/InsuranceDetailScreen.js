import React,{Component} from 'react';
import {Text,View,Image,ScrollView,Linking,Alert} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {MainSubmitButton} from '../components/MainSubmitButton';
import moment from 'moment';
import localization from 'moment/locale/th'
import {post} from '../api'
import Spinner from 'react-native-loading-spinner-overlay';

export default class InsuranceDetailScreen extends Component{

    constructor(props){
        super(props)
        moment.locale("th");
        this.openPolicyDocument = this.openPolicyDocument.bind(this);
        this.state = {isLoading:false};
    }

    renderProtectRules(rules){
        return rules.map((data,i)=>
            <View key={i} style={styles.rulesListContainerStyle}>
                <Text style={styles.bulletStyle}>{'\u2022'}  </Text>
                <View>
                    {/* <Text style={styles.protectRuleTextStyle}>{data.ruleTitle}</Text>
                    {
                        data.ruleIgnoreCase&&
                        data.ruleIgnoreCase.map((rule)=><Text key={rule} style={styles.protectRuleTextStyle}>- {rule.Cover_Desc}</Text>)
                    }
                    {data.note&&<Text style={styles.protectRuleTextStyle}>** {data.note}</Text>} */}
                    <Text style={styles.protectRuleTextStyle}>{data.Cover_Desc}</Text>
                </View>
            </View>
        )
    }
    numberWithCommas(x){
        return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    calculateInsuranceDuring(effectiveDt,expDate){
        let date1 = moment(effectiveDt, 'YYYYMMDD').toDate();
        let date2 = moment(expDate, 'YYYYMMDD').toDate();
        return this.calcDate(date1,date2);
    }
    calcDate(date1,date2) {
        var diff = Math.floor(date2.getTime() - date1.getTime());
        var day = 1000 * 60 * 60 * 24;
        var days = Math.floor(diff/day);
        days+=1;
        var months = Math.floor(days/31);
        var years = Math.floor(months/12);
        
        var message = "";
        if(years>0 || months ==11){
            message = `${years||1}  ปี`;
        }else if(months>0){
            message = months + " เดือน";
        }else if(days>0){
            message = days + " วัน";
        }

        return message
    }
    async openPolicyDocument(pol_no,tran_no){
        let param = {};
        param.pol_no = pol_no;
        param.tran_no = tran_no;
        this.setState({isLoading:true});
        let response = await post("me/policy/document",param);
        this.setState({isLoading:false});
        if(response.url_file && response.url_file!=""){
            Linking.openURL(response.url_file);
        }else{
            setTimeout(()=>{
                Alert.alert(
                    'เกิดข้อผิดพลาด',
                    'ไม่พบเอกสาร',
                    [
                    {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    ]
                )
            },500)
            
        }
    }


    render(){
        let header = this.props.data.Policy_Header[0];
        let detail = this.props.data.Policy_Detail;

        return(
            <View style={styles.InsuranceDetailScreenContainerStyle}>
                <Headers
                    leftIconName='close'
                    headerTitleText='รายละเอียดกรมธรรม์'
                />
                <ScrollView style={{flex: 1,}}>
                    <View style={styles.insuranceShortDetailContainerStyle}>
                        <Text style={styles.insuranceIdTextStyle}>เลขที่กรมธรรม์ : {header.Policy_NO}</Text>
                        <Text style={styles.insuranceIdTextStyle}>ชื่อกรมธรรม์ :{header.Product_Name}</Text>
                    </View>
                    <View style={styles.insuranceDetailContainerStyle}>
                        {header.FLAG == 'Y' && <View style={styles.insuranceDetailStyle}>
                            <View style={styles.insuranceDetailSectionStyle}>
                                <Text style={styles.insuranceTitleSectionTextStyle}>ทุนประกันภัย</Text>
                                {isNaN(header.Sum_insured)?
                                <Text style={styles.insuranceValueLabelTextStyle}>{'ตามรายละเอียดกรมธรรม์'}</Text>:
                                <Text style={styles.insuranceValueSectionTextStyle}>{this.numberWithCommas(header.Sum_insured)}</Text>}
                            </View>
                            <View style={styles.insuranceDetailSectionStyle}>
                                <Text style={styles.insuranceTitleSectionTextStyle}>เบี้ยประกันภัย</Text>
                                <Text style={styles.insuranceValueSectionTextStyle}>{this.numberWithCommas(header.Total_Premium)}</Text>
                            </View> 
                            <View style={styles.insuranceDetailSectionStyle}>
                                <Text style={styles.insuranceTitleSectionTextStyle}>ระยะเวลาเอาประกันภัย</Text>
                                <Text style={styles.insuranceValueSectionTextStyle}>{this.calculateInsuranceDuring(header.Effective_Date,header.Expiry_Date)}</Text>
                            </View>
                        </View>
                        }
                        {header.FLAG == 'Y' && <Image
                            source={require('../source/images/dotSectionHorizontal.png')}
                            resizeMode='contain'
                            style={styles.dotSectionImageStyle}
                        />}
                        <Text style={styles.insuranceShortDetailTextStyle}>วันที่เริ่มต้นและสิ้นสุดกรมธรรม์</Text>
                        <Text style={styles.insuranceDateTextStyle}>{`${moment(header.Effective_Date).locale("th",localization).format("DD MMMM YYYY")} - ${moment(header.Expiry_Date).locale("th",localization).format("DD MMMM YYYY")}`}</Text>
                        {/* <Text style={styles.insuanceDueDateTextStyle}>กรมธรรม์ใกล้หมดอายุในอีก 15 วัน</Text> */}
                        <Image
                            source={require('../source/images/dotSectionHorizontal.png')}
                            resizeMode='contain'
                            style={styles.dotSectionImageStyle}
                        />
                         {header.FLAG == 'N' &&<Text style={styles.insuranceShortDetailTextStyle}>ต้องการข้อมูลเพิ่มเติมกรุณาติดต่อเจ้าหน้าที่โทร 1484</Text>}
                        {header.FLAG == 'Y' &&<View style={styles.protectionRulesContainerstyle}>
                            <Text style={styles.insuranceProtectRuleTextStyle}>คุ้มครองภัยหลัก</Text>
                            {this.renderProtectRules(detail)}
                        </View>}
                        {/* <View style={styles.protectionRulesContainerstyle}>
                            <Text style={styles.insuranceProtectRuleTextStyle}>คุ้มครองภัยธรรมชาติ</Text>
                            {this.renderProtectRules(rules2)}
                        </View> */}
                        {/* <Text style={styles.insuranceProtectRuleTextStyle}>การชดใช้ค่าสินไหมทดแทนสำหรับค่าเช่าที่อยู่ชั่วคราว</Text>
                        <Text style={styles.damageTitleTextStyle}>เสียหายทั้งหมด 100%</Text>
                        <Text style={styles.protectRuleTextStyle}>จ่ายตามจริง ไม่เกินวันละ 1,000 บาท และสูงสุดรวมกันไม่เกิน 100,000 บาท ตลอดระยะเวลาเอาประกันภัย</Text>
                        <Text style={styles.damageTitleTextStyle}>เสียหายเกินกว่าร้อยละ 50</Text>
                        <Text style={styles.protectRuleTextStyle}>จ่ายตามจริง ไม่เกินวันละ 1,000 บาท และสูงสุดรวมกันไม่เกิน 50,000 บาท ตลอดระยะเวลาเอาประกันภัย</Text>
                        <Image
                            source={require('../source/images/dotSectionHorizontal.png')}
                            resizeMode='contain'
                            style={styles.dotSectionImageStyle}
                        /> */}
                        {header.FLAG == 'Y' && <MainSubmitButton
                            buttonTitleText='ดาวน์โหลดเอกสาร'
                            iconImageUri={require('../source/icons/iconDownload.png')}
                            onPress={()=>this.openPolicyDocument(header.Policy_NO,header.TranNo)}
                        />}
                    </View> 
                    <Image
                        source={require('../source/images/promotionImg.png')}
                        resizeMode='stretch'
                        style={styles.advertiseImageStyle}
                    />
                </ScrollView>
                {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
            </View>
        )
    }
}

const styles={
    InsuranceDetailScreenContainerStyle:{
        flex: 1,
        backgroundColor:"#fff"
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
        color: '#1595d3',
        fontSize: responsiveFontSize(3)
    },
    insuranceValueLabelTextStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(2.1),
        alignItems: 'center',
        paddingTop:5
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
        alignItems: 'center',
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
