import React,{Component} from 'react';
import {Text,View} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import MapView,{Marker} from 'react-native-maps';

import {Headers} from './../components/Headers';
import {MainSearchBox} from '../components/MainSearchBox';

export default class ServiceSearchHospitalScreen extends Component{

    constructor(props){
        super(props)

    }

    render(){
        return(
            <View style={styles.serviceSearchHospitalScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='ค้นหาโรงพยาบาลเครือข่าย MTI'
                    rightIconName='iconBell'
                    withSearch
                    longTitle
                />
                <MainSearchBox
                    //value={}
                    //onChangeText={}
                    onPress={()=>alert('search')}
                    placeholder='ค้นหาโรงพบาบาลในพื้นที่ที่คุณต้องการ'
                />
                <View style={styles.serviceSearchHospitalContainerStyle}>
                    <MapView
                        initialRegion={{
                            latitude: 13.697567,
                            longitude: 100.53758300000004,
                            latitudeDelta: 15.870032,
                            longitudeDelta: 100.99254100000007,
                        }}
                        style={{flex: 1,}}
                    >
                        <Marker
                            coordinate={{
                                latitude: 13.697567,
                                longitude: 100.53758300000004
                            }}
                            image={require('../source/icons/iconMapMarker.png')}
                        />
                    </MapView>
                </View>
            </View>
        )
    }
}

const styles={
    serviceSearchHospitalScreenContainerStyle:{
        flex: 1,
    },
    serviceSearchHospitalContainerStyle:{
        flex: 1,
    }
}