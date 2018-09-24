import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity,Linking} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { ifIphoneX,isIphoneX } from 'react-native-iphone-x-helper'
import {Headers} from '../components/Headers';
export default class SelectHospitalScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            isLoading:false
        }
    }

    renderServiceList(){
        let serviceList = [
            {
                iconUri: require('../source/icons/Icon_hospital2.png'),
                title: 'โรงพยายบาลเครือข่ายประกันสุขภาพ'
            },
            {
                iconUri: require('../source/icons/Icon_hospital1.png'),
                title: 'โรงพยาบาลเครือข่ายประกันอุบัติเหตุ'
            }
        ]

        return serviceList.map((data,i)=>
            <View style={{width:responsiveWidth(90)}} key={i}>
                <TouchableOpacity onPress={()=>this.onServicePress(i,data.title)} style={styles.serviceSectionStyle}>
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
    onServicePress(index,title){
        let filter_type_id = 1;
        if(index==1){
            filter_type_id = 4;
        }
        this.props.navigator.push({
            screen: 'mti.ServiceSearchHospitalScreen', // unique ID registered with Navigation.registerScreen
            passProps:{isMap:false,filter_type_id:filter_type_id,title:title},
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
                leftIconName={'cancel'}
                headerTitleText='บริการ'
                cancelTxt={'กลับ'}
                cancel={()=>this.props.navigator.pop()}
            />
            <View style={styles.serviceContainerStyle}>
                <TouchableOpacity style={styles.topBannerImageContainerStyle}>
                    <Image
                        source={require('../source/images/Banner_hospital.jpg')}
                        style={styles.topBannerImageContainerStyle}
                    />
                </TouchableOpacity>
                <View style={styles.serviceListContainerStyle}>
                    {this.renderServiceList()}
                </View>
                
            </View>
            {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
        </View>
        )
    }
}

const styles={
    serviceScreenContainerStyle:{
        flex: 1,
        backgroundColor:"#fff"
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
        justifyContent: 'flex-start',
        marginTop: responsiveHeight(2),
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
         
        fontSize: responsiveFontSize(2.8),
        letterSpacing: 0,
        color: "#1595d3",
        flex: 0.8,
        textAlignVertical: 'center',
    },
    dotSectionImageStyle:{
        width: '100%',
        opacity: 0.3,
        marginTop: responsiveHeight(2.5),
        marginBottom: responsiveHeight(2.5),
    },
    popupContainerStyle:{
        borderRadius: 3,
        padding: responsiveWidth(4),

    },
    popupLayoutContainerStyle:{
        justifyContent: 'flex-start',
        paddingTop: responsiveHeight(10)
    },
    btnCloseImageStyle:{
        height: responsiveHeight(2.81),
        alignSelf: 'flex-end'
    },
    popupTitleTextStyle:{
        fontSize: responsiveFontSize(3),
        color: '#1595d3',
        textAlign: 'center',
        marginTop: responsiveHeight(2.5),
        marginBottom: responsiveHeight(2),

    },
    popupDetailTextStyle:{
        fontSize: responsiveFontSize(2.2),
        color: '#919195',
        textAlign: 'center',
        marginLeft: responsiveWidth(8),
        marginRight: responsiveWidth(8),
    },
    popupRefTextStyle:{
        fontSize: responsiveFontSize(2.6),
        color: '#1595d3',
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    submitButtonContainerStyle:{
        marginLeft: responsiveWidth(2),
        marginRight: responsiveWidth(2),
        justifyContent: 'center',
        marginTop: responsiveHeight(2),

    },
    inputContainerStyle:{
        borderBottomColor: '#C4C4C4',
        height: responsiveHeight(8),
    },
}