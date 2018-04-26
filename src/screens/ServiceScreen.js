import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from '../components/Headers';

export default class ServiceScreen extends Component{

    constructor(props){
        super(props)
        this.gotoService = this.gotoService.bind(this);
        this.onServicePress = this.onServicePress.bind(this);
    }

    renderServiceList(){
        let serviceList = [
            {
                iconUri: require('../source/icons/iconPhone01.png'),
                title: 'Call Center 1484'
            },
            {
                iconUri: require('../source/icons/iconSearchHospital01.png'),
                title: 'ค้นหาโรงพยาบาลเครือข่าย MTI'
            },
            {
                iconUri: require('../source/icons/iconWork01.png'),
                title: 'ค้นหาศูนย์และอู่รับงานบริษัท'
            },
            {
                iconUri: require('../source/icons/iconQuestion01.png'),
                title: 'คำถามที่พบบ่อย'
            }
        ]

        return serviceList.map((data,i)=>
            <View key={i}>
                <TouchableOpacity onPress={()=>this.onServicePress(i)} style={styles.serviceSectionStyle}>
                    <Image
                        source={data.iconUri}
                        resizeMode='contain'
                        style={styles.serviceIconStyle}
                    />
                    <Text style={styles.serviceTitleTextStyle}>{data.title}</Text>
                </TouchableOpacity>
                {i!=3&&
                <Image
                    source={require('../source/images/dotSectionHorizontal.png')}
                    resizeMode='contain'
                    style={styles.dotSectionImageStyle}
                />}
            </View>
        )
    }

    onServicePress(index){
        if(index==0){

        }else if(index==1){
            this.gotoService('mti.ServiceSearchHospitalScreen');
        }else if(index==2){
            this.gotoService('mti.ServiceSearchCorpCenterScreen');
        }else{
            this.gotoService('mti.QAndAScreen');
        }
    }

    gotoService(link){
        this.props.navigator.push({
            screen: link, // unique ID registered with Navigation.registerScreen
            passProps:{},
            title: undefined, // navigation bar title of the pushed screen (optional)
            titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
            animated: false, // does the push have transition animation or does it happen immediately (optional)
            backButtonTitle: undefined, // override the back button title (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
        })
    }

    render(){
        return(
            <View style={styles.serviceScreenContainerStyle}>
                <Headers
                    leftIconName='menu'
                    headerTitleText='บริการ'
                    rightIconName='iconBell'
                />
                <View style={styles.serviceContainerStyle}>
                    <View style={styles.topBannerImageContainerStyle}>
                        <Image
                            source={require('../source/images/serviceBannerImg01.png')}
                            style={styles.topBannerImageContainerStyle}
                        />
                    </View>
                    <View style={styles.serviceListContainerStyle}>
                        {this.renderServiceList()}
                    </View>
                    <View style={styles.topBannerImageContainerStyle}>
                        <Image
                            source={require('../source/images/serviceBannerImg02.png')}
                            style={styles.topBannerImageContainerStyle}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles={
    serviceScreenContainerStyle:{
        flex: 1,
    },
    serviceContainerStyle:{
        flex: 1,
    },
    topBannerImageContainerStyle:{
        height: responsiveHeight(18.30),
        width: responsiveWidth(100),
    },
    serviceListContainerStyle:{
        flex: 1,
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
        justifyContent: 'center',
    },
    serviceSectionStyle:{
        flexDirection: 'row',
    },
    serviceIconStyle:{
        height: responsiveHeight(4.92),
        opacity: 0.7,
        flex: 0.2,
    },
    serviceTitleTextStyle:{
        fontFamily: "DBHelvethaicaX-Med",
        fontSize: responsiveFontSize(2.8),
        letterSpacing: 0,
        color: "#1595d3",
        flex: 0.8,
        textAlignVertical: 'center',
    },
    dotSectionImageStyle:{
        width: '100%',
        opacity: 0.3,
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(3),
    },
}