import React,{Component} from 'react';
import {Text,View,Image} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {DashboardActivityCard} from './../components/DashboardActivityCard';
import {MainSubmitButton} from './../components/MainSubmitButton';
import {EventButtonGroup} from '../components/EventButtonGroup';

export default class PrivilegeDetailScreen extends Component{

    constructor(props){
        super(props)

    }

    renderPrivilegeDetailList(){
        let data=[
            'ตรวจสุขภาพสายตาฟรี มูลค่า 1,000 บาท (เฉพาะวันพฤหัสและนัดหมายล่วงหน้า ตรวจวัดสุขภาพสายตา, ตรวจวัดความดันตา, ตรวจจอประสาทตา, ตรวจสุขภาพกระจกตา',
            'ส่วนลดแว่นตาสูงสุด 55%',
            'รับประกัน 1 ปี หลังการซื้อแว่นทุกประเภท (ปกติรับประกัน 3 เดือน)',
        ]

        return data.map((data,i)=>
            <Text key={i}>{`${++i} ${data}`}</Text>
        )
    }

    render(){
        return(
            <View style={styles.privilegeDetailScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='รายละเอียดสิทธิพิเศษ'
                />
                <View style={styles.privilegeDetainContainerStyle}>
                    <View style={styles.bannerImageContainerStyle}>
                        <View style={styles.bannerImageSectionStyle}>
                            <Image
                                source={require('../source/images/privilegeImg01.png')}
                                style={styles.bannerImageStyle}
                                borderRadius={3}
                            />
                        </View>
                        <View style={styles.iconEventContainerStyle}>
                            <View style={styles.privilegeTitleContainerStyle}>
                                <Image
                                    source={require('../source/icons/iconHealthy.png')}
                                    resizeMode='contain'
                                    style={styles.titleIconStyle}
                                />
                                <Text style={styles.titleTextStyle}>Healthy</Text>
                            </View>
                            <View style={styles.eventButtonGroupContainerStyle}>
                                <EventButtonGroup/>
                            </View>
                        </View>
                        <Image
                            source={require('../source/images/dotSectionHorizontal.png')}
                            resizeMode='contain'
                            style={styles.dotSectionImageStyle}
                        />
                        <View>
                            <Text>ตรวจสุขภาพสายตาฟรี (มูลค่า 1,000 บาท) ส่วนลดแว่นตาสูงสุด 55% พร้อมรับประกัน 1 ปี</Text>
                            <Text>ระยะเวลาสิทธิพิเศษ : 15 - 31 ธันวาคม 2561</Text>
                            {this.renderPrivilegeDetailList()}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles={
    privilegeDetailScreenContainerStyle:{
        flex: 1,
    },
    privilegeDetainContainerStyle:{
        flex: 1,
    },
    bannerImageContainerStyle:{
        alignItems: 'center',
        paddingTop: responsiveHeight(4),
        backgroundColor: '#f6f6f6',
    },
    bannerImageSectionStyle:{
        height: responsiveHeight(23.23),
    },
    bannerImageStyle:{
        height: responsiveHeight(23.23),
        width: responsiveWidth(90),
    },
    iconEventContainerStyle:{
        flexDirection: 'row',
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
        marginTop: responsiveHeight(1.5),
    },
    privilegeTitleContainerStyle:{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
    },
    titleIconStyle:{
        height: responsiveHeight(2.81),
        width: responsiveWidth(5),
    },
    titleTextStyle:{
        color: 'rgba(85, 86, 90, 0.6)',
        letterSpacing: 0,
        opacity: 0.6,
        fontSize: responsiveFontSize(2.15),
        marginLeft: responsiveWidth(2.5),
    },
    eventButtonGroupContainerStyle:{
        flex: 1,
        alignItems: 'flex-end',
    },
    dotSectionImageStyle:{
        width: '90%',
        opacity: 0.3,
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(2),
    },

}