import React,{Component} from 'react';
import {Text,View} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import MapView,{Marker} from 'react-native-maps';

import {Headers} from './../components/Headers';
import {MainSearchBox} from '../components/MainSearchBox';
import {MapCalloutPopup} from '../components/MapCalloutPopup';

export default class PrivilegeSearchScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            showCallout: false,
            calloutData:{},
        }
      
    }

    componentDidMount(){
        console.log(this.props.data[0])
        animationTimeout = setTimeout(() => {
            this.focus();
        },1500);
    }

    focus=()=> {    
        let privilegeId = this.props.data.map(data=>data.id);
        this.mapRef.fitToSuppliedMarkers(privilegeId,true);
    }

    
    onMarkerPress(data){
        this.setState({
            calloutData: {
                title: data.name,
                address: data.branch_name,
                tel: data.branch_tel,
            },
            showCallout: true,
        })
    }

    renderMapCallout(){
        return(
            <View style={styles.calloutContainerStyle}>
                <MapCalloutPopup
                    data={this.state.calloutData}
                    userLocation={{lat:this.props.userLatitude,long:this.props.userLongitude}}
                    show={this.state.showCallout}
                    onClose={()=>this.setState({showCallout: false})}
                />
            </View>
        )
    }

    render(){
        return(
            <View style={styles.privilegeSearchScreenContainerStyle}>
                <Headers
                    leftIconName='close'
                    headerTitleText='ค้นหาสิทธิพิเศษ'
                    rightIconName='iconBell'
                />
                {/* <MainSearchBox
                    //value={}
                    //onChangeText={}
                    onPress={()=>alert('search')}
                    placeholder='ค้นหาสิทธิพิเศษที่คุณต้องการ'
                /> */}
                <View style={styles.privilegeSearchContainerStyle}>
                    <MapView
                        ref={(ref) => { this.mapRef = ref; }}
                        minZoomLevel={this.props.nearBy ? 5:5}
                        maxZoomLevel={18}
                        initialRegion={{
                            latitude: this.props.nearBy && (this.props.data && this.props.data.length>0)  ?parseFloat(this.props.data[0].branch_lat):15.870032,
                            longitude:  this.props.nearBy && (this.props.data && this.props.data.length>0)  ?parseFloat(this.props.data[0].branch_lng):100.99254100000007,
                            latitudeDelta: this.props.nearBy && (this.props.data && this.props.data.length>0)  ?parseFloat(this.props.data[0].branch_lat):15.870032,
                            longitudeDelta: this.props.nearBy && (this.props.data && this.props.data.length>0)  ?parseFloat(this.props.data[0].branch_lng):100.99254100000007,
                        }}
                        style={{flex: 1,}}
                    >
                        {this.props.nearBy && <Marker
                            identifier={'current'}
                            coordinate={{
                                latitude: parseFloat(this.props.userLatitude),
                                longitude: parseFloat(this.props.userLongitude),
                            }}
                            image={require('../source/icons/current.png')}
                            //onPress={()=>this.onMarkerPress(this.props.data)}
                        />}
                        {this.props.data.map((data)=>
                            <Marker
                                identifier={data.branch_id}
                                key={data.branch_id}
                                coordinate={{
                                    latitude: data.branch_lat?parseFloat(data.branch_lat):13.7863725,
                                    longitude: data.branch_lng?parseFloat(data.branch_lng):100.5745153
                                }}
                                image={require('../source/icons/iconMapMarker.png')}
                                onPress={()=>this.onMarkerPress(data)}
                            />
                        )}
                    </MapView>
                </View>
                {this.renderMapCallout()}
            </View>
        )
    }
}

const styles={
    privilegeSearchScreenContainerStyle:{
        flex: 1,
    },
    privilegeSearchContainerStyle:{
        flex: 1,
    },
    calloutContainerStyle:{
        height: responsiveHeight(30),
        width: responsiveWidth(90),
        position: 'absolute',
        bottom: 10,
    }
}