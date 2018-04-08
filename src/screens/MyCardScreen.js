import React,{Component} from 'react';
import {Text,View,Image} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {UserShortDetailCard} from './../components/UserShortDetailCard';
import {CheckBoxes} from '../components/CheckBoxes';

export default class MyCardScreen extends Component{

    constructor(props){
        super(props)

    }

    render(){
        return(
            <View style={styles.myCardScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='My Card'
                    rightIconName='iconBell'
                />
                <View style={styles.myCardContainerStyle}>
                    <UserShortDetailCard
                        showQr={false}
                    />
                    <View style={styles.myCardSectionStyle}>
                        <View style={styles.frontCardContainerStyle}>
                            <Text style={styles.myCardTitleTextStyle}>MTI MY CARD</Text>
                            <View style={styles.myCardDetailTextContainerStyle}>
                                <Text style={styles.userNameTextStyle}>ชรินทร์ทิพย์ บำรุงศักดิ์</Text>
                                <Text style={styles.cardIdTextStyle}>รหัส 454435788665444368</Text>
                            </View>
                        </View>
                        <View style={styles.checkBoxContainerStyle}>
                            <Text style={styles.checkTitleTextStyle}>ข้อมูลหลังบัตร :</Text>
                            <CheckBoxes
                                checkBoxTitleText='QR Code'
                                checked={true}
                                checkedColor='#0194d2'
                                uncheckedColor='rgba(145, 145, 149, 0.27)'
                                checkBoxTextStyle={styles.checkBoxTextStyle}
                                //textUnderLine={true}
                                onIconPress={()=>alert('checked')}
                                containerStyle={styles.checkBoxStyle}
                            />
                            <CheckBoxes
                                checkBoxTitleText='Barcode'
                                checked={false}
                                checkedColor='#0194d2'
                                uncheckedColor='rgba(145, 145, 149, 0.27)'
                                checkBoxTextStyle={styles.checkBoxTextStyle}
                                //textUnderLine={true}
                                onIconPress={()=>alert('checked')}
                                containerStyle={styles.checkBoxStyle}
                            />
                        </View>
                        <View style={styles.backCardContainerStyle}>
                            <Image
                                source={require('../source/images/myCardQrImg.png')}
                                resizeMode='contain'
                                style={styles.qrImageStyle}
                            />
                            <Text style={styles.myCardTitleTextStyle}>MTI MY CARD</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles={
    myCardScreenContainerStyle:{
        flex: 1,
    },
    myCardContainerStyle:{
        flex: 1,
    },
    myCardSectionStyle:{
        flex: 1,
        alignItems: 'center',
        paddingTop: responsiveHeight(3),
    },
    frontCardContainerStyle:{
        height: responsiveHeight(27.46),
        width: responsiveWidth(85),
        borderRadius: 20.2,
        backgroundColor: "#f6f6f6",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#dddddd",
        justifyContent: 'space-between',
    },
    qrImageStyle:{
        height: responsiveHeight(14.43),
        alignSelf: 'center',
        marginTop: responsiveHeight(3),
    },
    backCardContainerStyle:{
        height: responsiveHeight(27.46),
        width: responsiveWidth(85),
        borderRadius: 20.2,
        backgroundColor: "#f6f6f6",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#dddddd",
        justifyContent: 'space-around',
    },
    myCardTitleTextStyle:{
        fontFamily: 'DBHelvethaicaX-Med',
        letterSpacing: 0,
        textAlign: "center",
        color: "rgba(145, 145, 149, 0.27)",
        //opacity: 0.27,
        fontSize: responsiveFontSize(7.5),
    },
    myCardDetailTextContainerStyle:{
        marginLeft: responsiveWidth(7),
        marginBottom: responsiveWidth(7),
    },
    userNameTextStyle:{
        color: "#1595d3",
        fontSize: responsiveFontSize(3),
    },
    cardIdTextStyle:{
        color: "#1595d3",
        fontSize: responsiveFontSize(2.2),
    },
    checkBoxContainerStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        width: responsiveWidth(85),
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
    },
    checkTitleTextStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(2.8),
    },
    checkBoxTextStyle:{
        color: "#919195",
        letterSpacing: 0,
        fontSize: responsiveFontSize(2.2),
    },
    checkBoxStyle:{
        height: responsiveHeight(3),
    }
}
