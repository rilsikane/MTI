import React,{Component} from 'react';
import {Text,View,Image} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';

export default class PrivilegeForMemberScreen extends Component{

    constructor(props){
        super(props)

    }

    renderPrivilegeDetailList(){
        let detail = [
            {
                title: 'โปรโมชั่น',
                description: 'คุณจะได้รับข่าวสารโปรโมชั่นล่าสุด พร้อมข้อเสนอและส่วนลดพิเศษในการซื้อสินค้า Panasonic เฉพาะสำหรับสมาชิกเท่านั้น'
            },
            {
                title: 'แคมเปญและกิจกรรม',
                description: 'เข้าร่วม workshop สุดพิเศษกับเรา พร้อมเป็นแขกรับเชิญระดับ VIP ในกิจกรรมต่างๆ ที่เราจัดขึ้น'
            },
            {
                title: 'รับข่าวสารจากเรา',
                description: 'เพียงสมัครรับข่าวสารจากเรา คุณจะไม่พลาดกับโปรโมชั่นล่าสุด workshop และกิจกรรมพิเศษต่างๆ นอกจากนั้นคุณจะพบวิธีการใหม่ๆที่ทำให้คุณได้รับสะสมคะแนนมากได้ยิ่งขึ้น'
            },
            {
                title: 'แบบสำรวจ',
                description: 'สมาชิกบางท่านจะได้รับสิทธิ์ในการทำแบบสอบถามสั้นๆ เกี่ยวกับสินค้า หรือในเรื่องทั่วไปอื่นๆ โดยคุณจะได้รับคะแนนพิเศษจากการตอบแบบสอบถาม อีกทั้งยังเป็นช่องทางให้สมาชิกออกความเห็นสำหรับเรื่องต่างๆอีกด้วย!'
            },
            {
                title: 'การแลกคะแนนสะสม',
                description: 'สมาชิกจะได้รับคะแนนจากการลงทะเบียน การตอบแบบสอบถาม และการทำแบบสำรวจ หรือจากกิจกรรมอื่นๆ โดยคะแนนสะสมนี้สมาชิกสามารถนำไปใช้แลกรางวัล หรือสิทธิ์ในการเข้าร่วมกิจกรรมต่างๆที่เราจัดขึ้น'
            },
        ]

        return detail.map((data,i)=>
            <View key={i}>
                <Text style={styles.privilegeDetailTitleTextStyle}>{`${++i}. ${data.title}`}</Text>
                <Text style={styles.privilegeDetailTextStyle}>{data.description}</Text>
            </View>
        )
    }

    render(){
        return(
            <View style={styles.privilegeForMemberScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='สิทธิพิเศษสำหรับสมาชิก'
                />
                <View style={styles.privilegeForMemberContainerStyle}>
                    <View style={styles.privilegeBannerContainerStyle}>
                        <Image
                            source={require('../source/images/extraPrivilegeImg.png')}
                            resizeMode='contain'
                            borderRadius={3}
                            style={styles.privilegeBannerStyle}
                        />
                    </View>
                    <View style={styles.privilegeDetailContainerStyle}>
                        {this.renderPrivilegeDetailList()}
                    </View>

                </View>
            </View>
        )
    }
}

const styles={
    privilegeForMemberScreenContainerStyle:{
        flex: 1,
    },
    privilegeForMemberContainerStyle:{
        flex: 1,
    },
    privilegeBannerContainerStyle:{
        height: responsiveHeight(12.67),
        width: '100%',
        marginTop: responsiveHeight(3.5),
        marginBottom: responsiveHeight(3.5),
    },
    privilegeBannerStyle:{
        flex: 1,
        alignSelf: 'center',
    },
    privilegeDetailContainerStyle:{
        flex: 1,
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
    },
    privilegeDetailTitleTextStyle:{
        fontSize: responsiveFontSize(2.4),
        color: "#1595d3",
        letterSpacing: 0,
    },
    privilegeDetailTextStyle:{
        fontSize: responsiveFontSize(2.15),
        color: "#919195",
        letterSpacing: 0,
        marginBottom: responsiveHeight(1),
    }
}