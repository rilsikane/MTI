import React,{Component} from 'react';
import {Text,View,Image} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import QRCode from 'react-native-qrcode';

import {Headers} from './../components/Headers';

export default class PrivilegeQrCodeScreen extends Component{

    constructor(props){
        super(props)

    }

    render(){
        return(
            <View style={styles.privilegeQrCodeSreenContainerStyle}>
                <Headers
                    leftIconName='cancel'
                    headerTitleText='QR Code สำหรับใช้สิทธิ์'
                    cancel={()=>
                        this.props.navigator.dismissAllModals({
                            animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                        })
                    }
                />
                <View style={styles.privilegeQrCodeContainerStyle}>
                    <View style={styles.privilegeLogoContainerStyle}>
                        <Image
                            source={require('../source/images/privilegeLogo01.png')}
                            resizeMode='contain'
                            style={styles.privilegeLogoStyle}
                        />
                    </View>
                    <View style={styles.lifeStyleContainerStyle}>
                        <Image
                            source={require('../source/icons/iconHealthy.png')}
                            resizeMode='contain'
                            style={styles.lifeStyleIconStyle}
                        />
                        <Text style={styles.lifeStyleTextStyle}>Healthy</Text>
                    </View>
                    <Text style={styles.privilegeTitleTextStyle}>{this.props.data.name}</Text>
                    <Text style={styles.privilegeDetailTextStyle}>คุณสามารถรับสิทธิพิเศษได้โดยการแสดง QR Code ที่หน้าร้านหรือบันทึก QR Code เพื่อใช้สิทธิพิเศษนี้ในภายหลัง</Text>
                </View>
                <View style={styles.qrCodeContainerStyle}>
                    <Text style={styles.qrRefCodeTextStyle}>Reference Code : {this.props.redeem.redeem_code}</Text>
                    <View style={styles.qrCodeImageContainerStyle}>
                        {/* <Image
                            source={require('../source/images/myCardQrImg.png')}
                            resizeMode='contain'
                            style={styles.qrCodeImageStyle}
                        /> */}
                        <QRCode
                            value={this.props.redeem.redeem_code}
                            size={responsiveHeight(29.66)}
                            bgColor='#000'
                            fgColor='#FFF'
                        />
                    </View>
                    <Text style={styles.qrCodeExpTextStyle}>สิทธิพิเศษของสิทธิ์นี้มีระยะเวลาในการใช้งาน 15 นาที</Text>
                </View>
            </View>
        )
    }
}

const styles={
    privilegeQrCodeSreenContainerStyle:{
        flex: 1,
        backgroundColor: '#FFF',
    },
    privilegeQrCodeContainerStyle:{
        height: responsiveHeight(41),
    },
    privilegeLogoContainerStyle:{
        height: responsiveHeight(6.33),
        marginTop: responsiveHeight(3.5),
        marginBottom: responsiveHeight(3.5),
    },
    privilegeLogoStyle:{
        flex: 1,
        alignSelf: 'center'
    },
    lifeStyleContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lifeStyleIconStyle:{
        height: responsiveHeight(2.81),
        width: responsiveHeight(3),
    },
    lifeStyleTextStyle:{
        letterSpacing: 0,
        color: "rgba(85, 86, 90, 0.6)",
        fontSize: responsiveFontSize(2.15),
        marginLeft: responsiveWidth(1.5),
    },
    privilegeTitleTextStyle:{
        letterSpacing: 0,
        textAlign: "center",
        color: "#1595d3",
        fontSize: responsiveFontSize(2),
        fontFamily: "DBHelvethaicaX-Med",
        marginTop: responsiveHeight(2.4),
        marginBottom: responsiveHeight(2.4),
    },
    privilegeDetailTextStyle:{
        letterSpacing: 0,
        textAlign: "center",
        color: "#919195",
        fontSize: responsiveFontSize(2.15),
        marginLeft: responsiveWidth(11),
        marginRight: responsiveWidth(11),
    },
    qrCodeContainerStyle:{
        flex: 1,
        backgroundColor: '#f6f6f6',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    qrRefCodeTextStyle:{
        textAlign: 'center',
        color: "#1595d3",
        letterSpacing: 0,
        fontSize: responsiveFontSize(2.2),
        marginTop: responsiveHeight(2.5),
    },
    qrCodeImageContainerStyle:{
        height: responsiveHeight(29.66),
        alignItems: 'center',
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(1),
    },
    qrCodeImageStyle:{
       flex: 1,
       alignSelf: 'center',
    },
    qrCodeExpTextStyle:{
        letterSpacing: 0,
        color: 'rgb(253, 98, 98)',
        fontSize: responsiveFontSize(2.2),
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 3,
        backgroundColor: "#e6e6e6",
        width: responsiveWidth(70),
        marginTop: responsiveHeight(1),
    }
}