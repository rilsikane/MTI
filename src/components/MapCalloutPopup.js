import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PopupDialog,{ SlideAnimation }  from 'react-native-popup-dialog';
import Communications from 'react-native-communications';

class MapCalloutPopup extends Component{

    constructor(props){
        super(props)

    }

    
    callCenter(tel){
        Communications.phonecall(tel, true);
    }

    render(){
        return(
            <PopupDialog
                ref={(calloutDialog) => { this.calloutDialog = calloutDialog; }}
                dialogAnimation={slideAnimation}
                width={responsiveWidth(90)}
                height={responsiveHeight(30)}
                dialogStyle={styles.popupContainerStyle}
                containerStyle={styles.popupLayoutContainerStyle}
                show={this.props.show}
                overlayBackgroundColor='transparent'
            >
                <View style={styles.calloutTitleContainerStyle}>
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            source={require('../source/icons/iconLocation.png')}
                            resizeMode='contain'
                            style={styles.locationIconStyle}
                        />
                        <Text style={styles.calloutTitleText}>ค้นหาจากตำแหน่งใกล้เคียงคุณ</Text>
                    </View>
                    <TouchableOpacity onPress={this.props.onClose}>
                        <Image
                            source={require('../source/icons/btnCloseWhite.png')}
                            resizeMode='contain'
                            style={styles.closeIconStyle}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.calloutDetailContainerStyle}>
                    <View style={styles.detailTitleContainerStyle}>
                        <Text numberOfLines={2} style={styles.addressTitleTextStyle}>{this.props.data.title}</Text>
                        <Text numberOfLines={2} style={styles.addressTextStyle}>{this.props.data.address}</Text>
                    </View>
                    <Image
                        source={require('../source/images/dotSectionHorizontal.png')}
                        resizeMode='contain'
                        style={styles.dotSectionImageStyle}
                    />
                    <View style={styles.buttonGroupContainerStyle}>
                        <View style={styles.calloutButtonSectionStyle}>
                            <TouchableOpacity style={styles.calloutButtonStyle}>
                                    <Image
                                        source={require('../source/icons/iconDirection.png')}
                                        resizeMode='contain'
                                        style={styles.buttonGroupIconStyle}
                                    />
                                    <Text style={styles.directionTextStyle}>กำหนดเส้นทาง</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.calloutButtonSectionStyle,{alignItems: 'flex-end'}]}>
                            <TouchableOpacity onPress={()=>this.callCenter(this.props.data.tel)} style={[styles.calloutButtonStyle,{marginRight: responsiveWidth(2.5)}]}>
                                <Image
                                    source={require('../source/icons/iconPhone02.png')}
                                    resizeMode='contain'
                                    style={styles.buttonGroupIconStyle}
                                />
                                <Text style={styles.callnowTextStyle}>Call Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </PopupDialog>
        )
    }
}

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
})

const styles={
    popupContainerStyle:{
        borderRadius: 3,
        backgroundColor: 'rgb(253,98,98)'
    },
    popupLayoutContainerStyle:{
        zIndex: 100,
        height: responsiveHeight(30),
    },
    calloutTitleContainerStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        height: responsiveHeight(5),
    },
    locationIconStyle:{
        height: responsiveHeight(3.52),
    },
    closeIconStyle:{
        height: responsiveHeight(2.8),
        opacity: 0.8,
    },
    calloutDetailContainerStyle:{
        backgroundColor: '#FFF',
        borderRadius: 3,
        height: responsiveHeight(25),
        justifyContent: 'space-between'
    },
    detailTitleContainerStyle:{
        marginTop: responsiveWidth(2),
        marginLeft: responsiveWidth(2.5),
        marginRight: responsiveWidth(2.5),
        flex: 0.7,
        //height: responsiveHeight(10),
    },
    calloutTitleText:{
        color: '#FFF',
        fontSize: responsiveFontSize(2.2),
        letterSpacing: 0,
        textAlignVertical: 'center',
    },
    addressTitleTextStyle:{
        color: "#0194d2",
        fontSize: responsiveFontSize(3),
    },
    addressTextStyle:{
        color: "#919195",
        fontSize: responsiveFontSize(2.2),
    },
    dotSectionImageStyle:{
        width: '100%',
        opacity: 0.3,
    },
    buttonGroupContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 3,
        flex: 0.3,
        //height: responsiveHeight(6),
    },
    calloutButtonSectionStyle:{
        flex: 1,
        justifyContent: 'center',
    },
    calloutButtonStyle:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonGroupIconStyle:{
        height: responsiveHeight(3),
    },
    directionTextStyle:{
        color: "#1595d3",
        fontSize: responsiveFontSize(2.2),
    },
    callnowTextStyle:{
        color: "rgb(253,98,98)",
        fontSize: responsiveFontSize(2.2),
    }
}

export {MapCalloutPopup}