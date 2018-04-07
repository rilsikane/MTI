import React,{Component} from 'react';
import {Text,View} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {MainSubmitButton} from './../components/MainSubmitButton';

export default class ServicePolicyScreen extends Component{

    constructor(props){
        super(props)

    }

    renderPolicyDetail(){
        let policy=[
            {
                title: 'คำนิยาม',
                detail:[
                    'ระบบคอมพิวเตอร์ หมายถึง อุปกรณ์หรือชุดอุปกรณ์ของคอมพิวเตอร์ที่เชื่อมการทำงานเข้าด้วยกัน โดยได้มีการกำหนดคำสั่ง ชุดคำสั่ง หรือสิ่งอื่นใด และแนวทางปฏิบัติงานให้อุปกรณ์หรือชุดอุปกรณ์ทำหน้าที่ประมวลผลข้อมูลอัตโนมัติที่ใช้ประกอบการจัดทำระบบ my AIS',
                    '“ผู้ใช้บริการ” หมายถึง ผู้ใช้บริการหมายเลขโทรศัพท์เคลื่อนที่ และ/หรือบริการต่างๆ ที่เกี่ยวข้องของผู้ให้บริการ และหรือบริษัทในเครือของผู้ให้บริการ รวมทั้งผู้ครอบครองใช้บริการหมายเลขโทรศัพท์เคลื่อนที่ ตลอดจนผู้ใช้หมายเลขโทรศัพท์เคลื่อนที่ และ OTP ของผู้ใช้บริการเพื่อทำธุรกรรมอิเล็กทรอนิกส์ในระบบ my AIS นี้'
                ]
            }
        ]

        return policy.map((policy,i)=>
            <View key={i}>
                <Text style={styles.policyTitleTextStyle}>{++i}. {policy.title}</Text>
                {policy.detail.map((detail,j)=><Text key={j} style={styles.policyDetailTextStyle}>{'\u0009'}({++j}) {detail}</Text>)}
            </View>
        )
    }

    render(){

        return(
            <View style={styles.servicePolicyScreenContainerStyle}>
                <Headers
                    leftIconName='cancel'
                    headerTitleText='เงื่อนไขการให้บริการ'
                    cancel={()=>this.props.navigator.pop()}
                />
                <View style={styles.policyContentContainerStyle}>
                    <Text style={styles.agreementTitleTextStyle}>ข้อตกลงและเงื่อนไขการใช้ Muang Thai Friends Club</Text>
                    <Text style={styles.policyDescriptionTextStyle}>ขอต้อนรับและขอขอบคุณท่านในการใช้ my AIS หรือระบบคอมพิวเตอร์ที่ช่วย
                            อำนวยความสะดวกให้แก่ผู้ใช้บริการในการทำธุรกรรม-อิเล็กทรอนิกส์รายการ
                            ต่างๆ อันเกี่ยวกับการใช้บริการโทรศัพท์เคลื่อนที่ บริการอินเตอร์เน็ท บริการ
                            mPAY รวมทั้งบริการต่างๆ ที่เกี่ยวข้อง เช่น เลือกดูรายการส่งเสริมการขาย
                            (Promotion Package) สมัคร-เปลี่ยนแปลง-ยกเลิกการใช้บริการ เรียกดูราย
                            ละเอียดการใช้บริการ และหรือสิทธิประโยชน์ (Privilege) ของการใช้บริการ
                            ต่างๆ ดังล่าวข้างต้น หากมีผู้ใดกระทำการใดๆ ให้เกิดความเสียหายแก่ระบบ
                            my AIS หรือผู้ใช้บริการ หรือบุคคลใดผ่าน my AIS นี้ ผู้กระทำการดังกล่าว
                            จะต้องรับผิดทั้งทางแพ่งและทางอาญา
                    </Text>
                    {this.renderPolicyDetail()}
                    <MainSubmitButton
                        buttonTitleText='ตกลง'
                        onPress={()=>alert('Submit')}
                        style={styles.submitButtonStyle}
                    />
                </View>
            </View>
        )
    }
}

const styles={
    servicePolicyScreenContainerStyle:{
        flex: 1,
    },
    policyContentContainerStyle:{
        flex: 1,
        marginLeft: responsiveWidth(3.9),
        marginRight: responsiveWidth(3.9),
    },
    agreementTitleTextStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(3),
        letterSpacing: 0.14,
        textAlign: 'center',
        marginTop: responsiveHeight(2.5),
        marginBottom: responsiveHeight(2.5),
    },
    policyDescriptionTextStyle:{
        color: '#919195',
        fontSize: responsiveFontSize(2.1),
    },
    policyTitleTextStyle:{
        color: '#919195',
        fontSize: responsiveFontSize(2.1),
        marginTop: responsiveHeight(2.5),
        marginBottom: responsiveHeight(2.5),
    },
    policyDetailTextStyle:{
        color: '#919195',
        fontSize: responsiveFontSize(2.1),
        marginBottom: responsiveHeight(2),
    },
    submitButtonStyle:{
        height: responsiveHeight(7.04),
    }
}
