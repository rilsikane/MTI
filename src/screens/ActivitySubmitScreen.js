import React,{Component} from 'react';
import {Text,View,Image} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {MainSubmitButton} from './../components/MainSubmitButton';

export default class ActivitySubmitScreen extends Component{

    constructor(props){
        super(props)

    }

    render(){
        return(
            <View style={styles.activitySubmitScreenContainerStyle}>
                <Headers
                    headerTitleText='จองสิทธิ์เข้าร่วมกิจกรรม'
                    hideRightIcon={true}
                />
                <View style={styles.activitySubmitContainerStyle}>
                    <View style={styles.logoContainerStyle}>
                        <Image
                            source={require('../source/images/mtiMainLogoImg.png')}
                            resizeMode='contain'
                            style={styles.logoImageStyle}
                        />
                    </View>
                    <Text style={styles.submitTitleTextStyle}>คุณได้จองสิทธิ์เรียบร้อยแล้ว</Text>
                    <Text style={styles.submitDescTextStyle}>คุณจะได้รับสิทธิ์ในการเข้าร่วมกิจกรรมหลังจากเจ้าหน้าที่ติดต่อกลับ{'\n'}ทางโทรศัพท์เท่านั้น</Text>
                    <MainSubmitButton
                        buttonTitleText='ตกลง'
                        onPress={()=>this.props.navigator.dismissModal()}
                        style={styles.submitButtonStyle}
                    />
                    {/* <View style={styles.promotionContainerStyle}>
                        <Image
                            source={require('../source/images/promotionImg.png')}
                            resizeMode='stretch'
                            style={styles.promotionImageStyle}
                        />
                    </View> */}
                </View>
            </View>
        )
    }
}

const styles={
    activitySubmitScreenContainerStyle:{
        flex: 1,
        backgroundColor:"#fff"
    },
    activitySubmitContainerStyle:{
        flex: 1,
    },
    logoContainerStyle:{
        height: responsiveHeight(15.75),
        alignItems: 'center',
        marginTop: responsiveHeight(5),
        marginBottom: responsiveHeight(5),
    },
    logoImageStyle:{
        flex: 1,
    },
    submitTitleTextStyle:{
        fontSize: responsiveFontSize(3.5),
        letterSpacing: -0.24,
        textAlign: "center",
        color: "#1595d3"
    },
    submitDescTextStyle:{
        fontSize: responsiveFontSize(2.2),
        letterSpacing: 0,
        textAlign: "center",
        color: "#919195",
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(3.5),
    },
    submitButtonStyle:{
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
    },
    promotionContainerStyle:{
        height: responsiveHeight(18.30),
        width: responsiveWidth(100),
        flex: 1,
        justifyContent: 'flex-end',
    },
    promotionImageStyle:{
        height: responsiveHeight(18.30),
        width: responsiveWidth(100),
    }
}