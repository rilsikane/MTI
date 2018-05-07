import React,{Component} from 'react';
import {Text,View,ScrollView,FlatList} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {MainSubmitButton} from './../components/MainSubmitButton';
import {agreements} from './RegisterScreen';

export default class ServicePolicyScreen extends Component{

    constructor(props){
        super(props)

    }

    renderPolicyDetail(){
        return(
            <FlatList
                data={agreements}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderAgreements}
            />
        )
    }

    _renderAgreements = ({item,index}) => (
        <View>
            <Text style={[styles.popupAgreementSubTitleTextStyle,{textAlign: 'left'}]}>{`${++index}.   ${item.title}`}</Text>
            {item.titleDesc&&<Text style={[styles.popupAgreementDetailTextStyle,{marginLeft: responsiveWidth(3)}]}>{`${item.titleDesc}`}</Text>}      
            <FlatList
                data={item.subTitle}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderSubTitle}
            />
        </View>
    );

    _keyExtractor = (item, index) => index.toString();

    _renderSubTitle=({item,index})=>(
        <Text style={[styles.popupAgreementDetailTextStyle,{marginLeft: responsiveWidth(2)}]}>{`${item}`}</Text>
    )

    render(){

        return(
            <View style={styles.servicePolicyScreenContainerStyle}>
                <Headers
                    leftIconName='cancel'
                    headerTitleText='เงื่อนไขการให้บริการ'
                    cancel={()=>this.props.navigator.dismissModal()}
                />
                <ScrollView style={{flex: 1,}}>
                    <View style={styles.policyContentContainerStyle}>
                        <Text style={styles.agreementTitleTextStyle}>ข้อตกลงและเงื่อนไขของสมาชิก Muang Thai {'\n'}Friends Club (เมืองไทย เฟรนด์สส คลับ)</Text>
                        <Text style={styles.popupAgreementDetailTextStyle}>โปรดอ่านข้อตกลงและเงื่อนไขการเป็นสมาชิก Muang Thai Friends Club (เมืองไทย เฟรนด์ส คลับ) อย่างระมัดระวัง  เนื่องจากข้อตกลงและเงื่อนไขนี้ระบุถึงข้อมูลสำคัญเกี่ยวกับสิทธิและหน้าที่ต่างๆของท่าน  รวมถึงข้อจำกัดและข้อยกเว้นต่างๆ ซึ่งมีผลใช้บังคับการธุรกรรมและกิจกรรมทั้งหมด{'\n'}</Text>
                        <Text style={styles.popupAgreementDetailTextStyle}>การที่ท่านสมัครใช้บริการ  ไม่ว่าในลักษณะใดๆ หรือโดยการเลือก “ตกลง”  เพื่อยอมรับตามข้อตกลงและเงื่อนไขนี้  ถือว่าท่านได้รับทราบและรับรู้ถึงเนื้อหาของข้อตกลงและเงื่อนไขนี้โดยครบถ้วนสมบูรณ์แล้ว  และตกลงที่จะผูกพันโดยข้อตกลงและเงื่อนไขนี้ด้วย  รวมถึงกฎระเบียบ นโยบายและมาตรการต่างๆที่ Muang Thai Friends Club (เมืองไทย เฟรนด์ส คลับ)ที่จัดการจาก Muang Thai Friends Club (เมืองไทย เฟรนด์ส คลับ) อาจประกาศบนเว็บไซต์และแอปพลิเคชันเป็นครั้งคราว  ซึ่งการประกาศดังกล่าวถือเป็นส่วนหนึ่งของข้อตกลงและเงื่อนไขโดยการอ้างอิง และMuang Thai Friends Club (เมืองไทย เฟรนด์ส คลับ) อาจแก้ไขประกาศดังกล่าวได้เป็นครั้งคราวโดยไม่จำเป็นต้องแจ้งให้ทราบล่วงหน้า  นอกจากนี้สิทธิประโยชน์/บริการบางอย่างที่เสนอให้กับสมาชิกได้ใช้งานผ่านเว็บไซต์หรือโปรแกรม อาจอยู่ภายใต้ข้อบังคับของข้อตกลงและเงื่อนไขเฉพาะเพิ่มเติมซึ่งการใช้สิทธิประโยชน์/บริการของท่านจะต้องอยู่ภายใต้บังคับของข้อตกลงและเงื่อนไขเพิ่มเติมดังกล่าวด้วย  โดยถือเป็นส่วนหนึ่งของข้อตกลงและเงื่อนไขนี้โดยการอ้างอิง  นอกจากนี้ท่านตกลงว่าธุรกรรมอิเล็กทรอนิกส์/อินเตอร์เน็ต (Electronic/internet transactions) ที่ได้มีการประมวลผลและดำเนินการจนเสร็จสิ้นแล้ว  โดยผ่านทางเว็บไซต์หรือโปรแกรมนี้  มีผลบังคับใช้ได้อย่างสมบูรณ์ตามกฏหมายและผูกพันคู่สัญญาตามพระราชบัญญัติว่าด้วยธุรกรรมทางอิเล็กทรอนิกส์ พุทธศักราช 2544 ของประเทศไทย{'\n'}</Text>
                        {this.renderPolicyDetail()}
                        <MainSubmitButton
                            buttonTitleText='ตกลง'
                            onPress={()=>this.props.navigator.dismissModal({
                                animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                            })}
                            style={styles.submitButtonStyle}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles={
    servicePolicyScreenContainerStyle:{
        flex: 1,
        backgroundColor: '#FFF',
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
    popupAgreementDetailTextStyle:{
        fontSize: responsiveFontSize(2.1),
        color: '#919195',
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
        marginBottom: responsiveHeight(2),
    },
    popupAgreementSubTitleTextStyle:{
        fontSize: responsiveFontSize(2.1),
        color: '#1595d3',
        textAlign: 'center',
    },
    popupAgreementDetailTextStyle:{
        fontSize: responsiveFontSize(2.1),
        color: '#919195',
    },
}
