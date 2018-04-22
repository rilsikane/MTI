import React,{Component} from 'react';
import {Text,View,FlatList,Image,ScrollView} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';

export default class UsageHistoryScreen extends Component{

    constructor(props){
        super(props)

    }

    renderUsageHistoryList(){
        let history = [
            {
                thumbUri: require('../source/images/historyLifeStyleThumbnail.png'),
                lifeStyleIconUri: require('../source/icons/iconHealthy.png'),
                lifeStyleTitle: 'Lifestyle',
                usingDate: 'ใช้สิทธวันที่ 31 ธันวาคม 2560',
                description: 'ส่วนลด 20% เมื่อซื้อชุดของขวัญ Estee Lauder Set Makeup',
            },
            {
                thumbUri: require('../source/images/historyLifeStyleThumbnail.png'),
                lifeStyleIconUri: require('../source/icons/iconHealthy.png'),
                lifeStyleTitle: 'Lifestyle',
                usingDate: 'ใช้สิทธวันที่ 31 ธันวาคม 2560',
                description: 'ส่วนลด 20% เมื่อซื้อชุดของขวัญ Estee Lauder Set Makeup',
            },
            {
                thumbUri: require('../source/images/historyLifeStyleThumbnail.png'),
                lifeStyleIconUri: require('../source/icons/iconHealthy.png'),
                lifeStyleTitle: 'Lifestyle',
                usingDate: 'ใช้สิทธวันที่ 31 ธันวาคม 2560',
                description: 'ส่วนลด 20% เมื่อซื้อชุดของขวัญ Estee Lauder Set Makeup',
            },
            {
                thumbUri: require('../source/images/historyLifeStyleThumbnail.png'),
                lifeStyleIconUri: require('../source/icons/iconHealthy.png'),
                lifeStyleTitle: 'Lifestyle',
                usingDate: 'ใช้สิทธวันที่ 31 ธันวาคม 2560',
                description: 'ส่วนลด 20% เมื่อซื้อชุดของขวัญ Estee Lauder Set Makeup',
            },
            {
                thumbUri: require('../source/images/historyLifeStyleThumbnail.png'),
                lifeStyleIconUri: require('../source/icons/iconHealthy.png'),
                lifeStyleTitle: 'Lifestyle',
                usingDate: 'ใช้สิทธวันที่ 31 ธันวาคม 2560',
                description: 'ส่วนลด 20% เมื่อซื้อชุดของขวัญ Estee Lauder Set Makeup',
            },
            {
                thumbUri: require('../source/images/historyLifeStyleThumbnail.png'),
                lifeStyleIconUri: require('../source/icons/iconHealthy.png'),
                lifeStyleTitle: 'Lifestyle',
                usingDate: 'ใช้สิทธวันที่ 31 ธันวาคม 2560',
                description: 'ส่วนลด 20% เมื่อซื้อชุดของขวัญ Estee Lauder Set Makeup',
            },
        ]

        return(
            <FlatList
                data={history}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
            />
        )
    }

    _renderItem = ({item}) => (
        <View>
            <View style={styles.historyListContainerStyle}>
                <View style={styles.thumbnailContainerStyle}>
                    <Image
                        source={item.thumbUri}
                        resizeMode='contain'
                        style={styles.thumbnailStyle}
                    />
                </View>
                <View style={styles.historyDetailContainerStyle}>
                    <View style={styles.historyTitleContainerStyle}>
                        <View style={styles.lifeStyleIconContainerStyle}>
                            <Image
                                source={item.lifeStyleIconUri}
                                resizeMode='contain'
                                style={styles.lifeStyleIconStyle}
                            />
                            <Text style={styles.lifeStyleTitleTextStyle}>{item.lifeStyleTitle}</Text>
                        </View>
                        <Text style={styles.usingDateTextStyle}>{item.usingDate}</Text>
                    </View>
                    <Text style={styles.historyDescriptionTextStyle}>{item.description}</Text>
                </View>
            </View>
            <Image
                source={require('../source/images/dotSectionHorizontal.png')}
                resizeMode='contain'
                style={styles.dotSectionImageStyle}
            />
        </View>
    );

    _keyExtractor = (item, index) => index.toString();

    render(){
        return(
            <View style={styles.usageHistoryScreenContainerStyle}>
                <Headers
                    leftIconName='menu'
                    headerTitleText='ประวัติการใช้งาน'
                    rightIconName='iconBell'
                />
                <ScrollView style={{flex: 1,}}>
                    <View style={styles.usageHistoryContainerStyle}>
                        {this.renderUsageHistoryList()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles={
    usageHistoryScreenContainerStyle:{
        flex: 1,
    },
    usageHistoryContainerStyle:{
        flex: 1,
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
        marginTop: responsiveHeight(3.5),
    },
    historyListContainerStyle:{
        flexDirection: 'row',
    },
    thumbnailContainerStyle:{
        height: responsiveHeight(9.15),
        width: responsiveHeight(9.15),
        alignItems: 'center',
        marginRight: responsiveWidth(4),
    },
    thumbnailStyle:{
        flex: 1,
    },
    historyDetailContainerStyle:{
        flex: 1,
    },
    historyTitleContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    lifeStyleIconContainerStyle:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    lifeStyleIconStyle:{
        height: responsiveHeight(2.11),
        width: responsiveHeight(2.11),
    },
    lifeStyleTitleTextStyle:{
        marginLeft: responsiveWidth(1.5),
        letterSpacing: 0,
        color: "rgba(85, 86, 90, 0.6)",
        fontSize: responsiveFontSize(2.15),
    },
    usingDateTextStyle:{
        letterSpacing: 0,
        textAlign: "right",
        color: 'rgb(253,98,98)'
    },
    historyDescriptionTextStyle:{
        letterSpacing: -0.15,
        color: "#1595d3",
        fontSize: responsiveFontSize(2.2),
        flex: 1,
    },
    dotSectionImageStyle:{
        width: '100%',
        opacity: 0.3,
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
        alignSelf: 'center',
    },
}