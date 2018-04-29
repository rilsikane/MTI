import React,{Component} from 'react';
import {Text,View,FlatList,TouchableOpacity,Image} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class ServiceListCard extends Component{

    constructor(props){
        super(props)

    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item,index}) => (
        <View style={index==0&&styles.serviceListFirstItemStyle}>
            <Text style={styles.serviceTitleTextStyle}>{item.title}</Text>
            <Text style={styles.serviceAddressTextStyle}>{item.address}</Text>
            <Text style={styles.serviceAddressTextStyle}>โทร: {item.tel}</Text>
            <View style={styles.mapIconContainerStyle}>
                <TouchableOpacity>
                    <Image
                        source={require('../source/icons/iconPhone02.png')}
                        resizeMode='contain'
                        style={styles.mapIconStyle}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.gotoMap(item.type_id)}>
                    <Image
                        source={require('../source/icons/iconMapMarker01.png')}
                        resizeMode='contain'
                        style={styles.mapIconStyle}
                    />
                </TouchableOpacity>
            </View>
            <Image
                source={require('../source/images/dotSectionHorizontal.png')}
                resizeMode='contain'
                style={styles.dotSectionImageStyle}
            />
        </View>
    );

    gotoMap(type){
        if(type==='1'){
            this.props.navigator.showModal({
                screen: 'mti.ServiceSearchHospitalScreen', // unique ID registered with Navigation.registerScreen
                title: undefined, // navigation bar title of the pushed screen (optional)
                titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                passProps: {
                    navigator:this.props.navigator,
                    data:this.props.data,
                    isMap: true,
                }, // Object that will be passed as props to the pushed screen (optional)
                animated: true, // does the push have transition animation or does it happen immediately (optional)
                backButtonTitle: undefined, // override the back button title (optional)
                backButtonHidden: false, // hide the back button altogether (optional)
                
            })
        }else if(type==='2'){
            this.props.navigator.showModal({
                screen: 'mti.ServiceSearchCorpCenterScreen', // unique ID registered with Navigation.registerScreen
                title: undefined, // navigation bar title of the pushed screen (optional)
                titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                passProps: {
                    navigator:this.props.navigator,
                    data:this.props.data,
                    isMap: true,
                }, // Object that will be passed as props to the pushed screen (optional)
                animated: true, // does the push have transition animation or does it happen immediately (optional)
                backButtonTitle: undefined, // override the back button title (optional)
                backButtonHidden: false, // hide the back button altogether (optional)
                
            })
        }else if(type==='5'){
            this.props.navigator.showModal({
                screen: 'mti.ServiceSearchBranchScreen', // unique ID registered with Navigation.registerScreen
                title: undefined, // navigation bar title of the pushed screen (optional)
                titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                passProps: {
                    navigator:this.props.navigator,
                    data:this.props.data,
                    isMap: true,
                }, // Object that will be passed as props to the pushed screen (optional)
                animated: true, // does the push have transition animation or does it happen immediately (optional)
                backButtonTitle: undefined, // override the back button title (optional)
                backButtonHidden: false, // hide the back button altogether (optional)
                
            })
        }else{

        }
    }

    render(){
        return(
            <View>
                <FlatList
                    contentContainerStyle={styles.serviceContainerStyle}
                    data={this.props.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}

const styles={
 serviceContainerStyle:{
        paddingLeft: responsiveWidth(5),
        paddingRight:responsiveWidth(5)
    },
    serviceListFirstItemStyle:{
        marginTop: responsiveHeight(3.5),
    },
    serviceTitleTextStyle:{
        fontSize: responsiveFontSize(3),
        letterSpacing: 0,
        color: "#1595d3"
    },
    serviceAddressTextStyle:{
        fontSize: responsiveFontSize(2.2),
        letterSpacing: 0,
        color: "#919195"
    },
    mapIconContainerStyle:{
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    mapIconStyle:{
        height: responsiveHeight(4.22),
        width: responsiveHeight(4.22),
        marginLeft: responsiveWidth(2.5),
    },
    dotSectionImageStyle:{
        width: '100%',
        opacity: 0.3,
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
    },
}

export {ServiceListCard}