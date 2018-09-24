import React,{Component} from 'react';
import {Text,View,Image,ImageBackground,Platform,TouchableOpacity,StatusBar,TouchableWithoutFeedback} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { ifIphoneX,isIphoneX } from 'react-native-iphone-x-helper'
import app from '../stores/app';
class WelcomeScreen extends Component{

    constructor(props){
        super(props)
        this.gotoLogin = this.gotoLogin.bind(this);
        this.app = app;
    }
    gotoLogin(){
        this.props.navigator.push({
            screen: 'mti.LifeStyleScreen', // unique ID registered with Navigation.registerScreen
			title: undefined, // navigation bar title of the pushed screen (optional)
			titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
			passProps: {}, // Object that will be passed as props to the pushed screen (optional)
			animated: true, // does the push have transition animation or does it happen immediately (optional)
			backButtonTitle: undefined, // override the back button title (optional)
			backButtonHidden: false, // hide the back button altogether (optional)
        })
    }

    render(){
        return(
            <TouchableWithoutFeedback style={styles.welcomeScreenContainerStyle} onPress={this.gotoLogin}>
                <View style={styles.welcomeScreenContainerStyle}>
                    <StatusBar/>
                    {isIphoneX() && <View style={{height:40}}>
                            <ImageBackground
                                source={require('./../source/images/bgGradient.png')}
                                style={styles.welcomeContentBackgroundImageStyle}
                                resizeMode='stretch'
                            />
                    </View>}
                    <View>
                        <ImageBackground
                            source={require('./../source/images/banner.jpg')}
                            resizeMode='stretch'
                            style={styles.bannerImageStyle}
                        >
                            <TouchableOpacity onPress={this.gotoLogin}>
                                <Image
                                source={require('./../source/icons/btnCloseWhite.png')}
                                style={styles.closeButtonImageStyle}
                                resizeMode='contain'
                                />
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    <View style={styles.welcomeDetailContainerStyle}>
                        {/* <ImageBackground
                            source={require('./../source/images/bgGradient.png')}
                            resizeMode='stretch'
                            style={styles.welcomeContentBackgroundImageStyle}
                        > */}
                            <View style={styles.bannerBottomLineStyle}/>
                            <View style={styles.logoContainerStyle}>
                                <Image
                                    source={require('./../source/images/welcome_06.png')}
                                    style={styles.logoImageStyle}
                                    resizeMode='contain'
                                />
                            </View>
                            <View style={styles.welcomeTextContainerStyle}>
                                <Text style={styles.welcomeTitleTextStyle}>ยินดีต้อนรับเข้าสู่ เมืองไทย เฟรนด์ส คลับ</Text>
                                <View>
                                    {/* <Image
                                        source={require('./../source/icons/quote1.png')}
                                        style={styles.quoteImageStyle}
                                        resizeMode='contain'
                                    /> */}
                                </View>
                                <View>
                                    <Text style={styles.welcomeDetailTextStyle}>“ Your Friend Forever{'\n'}เพื่อน... ที่พร้อมดูแลกันตลอดไป ”</Text>
                                </View>
                                <View>
                                    {/* <Image
                                        source={require('./../source/icons/quote2.png')}
                                        style={styles.quoteImageStyle}
                                        resizeMode='contain'
                                    /> */}
                                </View>
                            </View>
                        {/* </ImageBackground> */}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const textColor = '#9acfe7'
const marginTop = Platform.OS==='ios'? 25:30
const styles={
    welcomeScreenContainerStyle:{
        flex: 1,
        //backgroundColor: 'red'
    },
    bannerImageStyle:{
        ...ifIphoneX({
            height: responsiveHeight(47)
        }, {
            height: responsiveHeight(55.52)
        })

    },
    closeButtonImageStyle:{
        height: responsiveHeight(2.81),
        alignSelf: 'flex-end',
        marginTop: marginTop,
        marginRight: 10,
    },
    welcomeDetailContainerStyle:{
        flex: 1,
        backgroundColor: '#FFF',
    },
    bannerBottomLineStyle:{
        height: responsiveHeight(0.35),
        backgroundColor: '#000',
        opacity: 0.2,
    },
    logoContainerStyle:{
        alignItems: 'center',
        marginTop: '5%'
    },
    logoImageStyle:{
        height: responsiveHeight(11.88),
    },
    welcomeContentBackgroundImageStyle:{
        flex: 1,
    },
    welcomeTextContainerStyle:{
        alignItems: 'center',

    },
    welcomeTitleTextStyle:{
        color: "#1494d2",
        fontSize: responsiveFontSize(3),
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),

    },
    quoteImageStyle:{
        height: responsiveHeight(2)
    },
    welcomeDetailTextStyle:{
        color: '#0194d2',
        fontSize: responsiveFontSize(3.5),
        textAlign: 'center',
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(1),
        letterSpacing: 0,
        lineHeight: responsiveHeight(7),
    }
}

export default WelcomeScreen