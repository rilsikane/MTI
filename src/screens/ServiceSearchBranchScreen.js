import React,{Component} from 'react';
import {Text,View,ScrollView,FlatList,Image,TouchableOpacity,Alert} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import MapView,{Marker} from 'react-native-maps';
import Spinner from 'react-native-loading-spinner-overlay';

import {Headers} from '../components/Headers';
import {MainSearchBox} from '../components/MainSearchBox';
import {ServiceListCard} from '../components/ServiceListCard';
import {MapCalloutPopup} from '../components/MapCalloutPopup';
import {getBasic} from '../api';

export default class ServiceSearchBranchScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            branchList:[],
            orgBranchList:[],
            userLatitude: '',
            userLongitude: '',
            isLoading: false,
            searchValue: '',
            calloutData:{},
            showCallout: false,
        }
        this._onSearchIconPress = this._onSearchIconPress.bind(this);
        this.onNearByPress = this.onNearByPress.bind(this);
    }

    async componentDidMount(){
        if(!this.props.isMap){
            this.setState({isLoading: true});
            let branchList = await getBasic('services?filter_type_id=5&page=1&pagesize=400',{});
            if(branchList){
                this.setState({
                    branchList:branchList.data,
                    orgBranchList:branchList.data,
                });
            }
            navigator.geolocation.getCurrentPosition(
                (position) => {
                  this.setState({
                    userLatitude: position.coords.latitude,
                    userLongitude: position.coords.longitude,
                    isLoading: false,
                  })
                },
                (error) => {
                    Alert.alert(
                        'แจ้งเตือน',
                        error.message,
                        [
                        {text: 'OK', onPress: () => {this.setState({
                            isLoading: false,
                            branchList: this.state.orgServiceList,
                        })}},
                        ]
                    )
                },
                {enableHighAccuracy: true,timeout: 20000,maxAge: 0,istanceFilter: 1 },
            );
        }else{
            //console.log(this.props.data)
            animationTimeout = setTimeout(() => {
                this.focus();
            },1500);
        }
    }

    focus=()=> {    
        let branchId = [];
        if(this.props.isDirect){
            branchId.push(this.props.data.id);
        }else{
            branchId = this.props.data.map(data=>data.id);
        }
        this.mapRef.fitToSuppliedMarkers(branchId,true);
    }

    renderContent(){
        if(this.props.isMap){
            return(
                <MapView
                    ref={(ref) => { this.mapRef = ref; }}
                    minZoomLevel={this.props.nearBy ? 5:5}
                    maxZoomLevel={18}
                    initialRegion={{
                        latitude: this.props.nearBy && (this.props.data && this.props.data.length>0)  ?parseFloat(this.props.data[0].latitude):15.870032,
                        longitude:  this.props.nearBy && (this.props.data && this.props.data.length>0)  ?parseFloat(this.props.data[0].longtitude):100.99254100000007,
                        latitudeDelta: this.props.nearBy && (this.props.data && this.props.data.length>0)  ?parseFloat(this.props.data[0].latitude):15.870032,
                        longitudeDelta: this.props.nearBy && (this.props.data && this.props.data.length>0)  ?parseFloat(this.props.data[0].longtitude):100.99254100000007,
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
                    {this.props.isDirect&&   
                        <Marker
                            identifier={this.props.data.id}
                            coordinate={this.props.data.coordinate}
                            image={require('../source/icons/iconMapMarker.png')}
                            onPress={()=>this.onMarkerPress(this.props.data)}
                        />
                    }
                    {!this.props.isDirect&& 
                        this.props.data.map((data)=>
                            <Marker
                                identifier={data.id}
                                key={data.id}
                                coordinate={{
                                    latitude: data.latitude?parseFloat(data.latitude):13.7863725,
                                    longitude: data.longtitude?parseFloat(data.longtitude):100.5745153
                                }}
                                image={require('../source/icons/iconMapMarker.png')}
                                onPress={()=>this.onMarkerPress(data)}
                            />
                        )
                    }
                </MapView>
            )
        }else{
            return!this.state.isLoading ?(
                <ServiceListCard
                    data={this.state.branchList}
                    navigator={this.props.navigator}
                />
            ):null
        }
    }
    
    onMarkerPress(data){
        this.setState({
            showCallout: true,
            calloutData: data,
        })
    }

    renderMapCallout(){
        return(
            <View style={styles.calloutContainerStyle}>
                <MapCalloutPopup
                    data={this.state.calloutData}
                    userLocation={this.props.isDirect?this.props.userLocation:{lat:this.state.userLatitude,long:this.state.userLongitude}}
                    show={this.state.showCallout}
                    onClose={()=>this.setState({showCallout: false})}
                />
            </View>
        )
    }

    async _onSearchIconPress(){
        if(!this.props.isMap){
            this.setState({isLoading:true});
            let search = await getBasic(`services?filter_type_id=5&search=${this.state.searchValue}&page=1&pagesize=400`,{});
            if(search.data.length>0){
                this.setState({
                    branchList: search.data,
                    isLoading: false,
                })
            }else{
                Alert.alert(
                    'แจ้งเตือน',
                    'ไม่พบข้อมูลที่ค้นหา',
                    [
                    {text: 'OK', onPress: () => {this.setState({
                        isLoading: false,
                        searchValue: '',
                        branchList: this.state.orgBranchList,
                    })}},
                    ]
                )
            }
        }else{

        }

    }

    async onNearByPress(){
        this.setState({isLoading:true});
        console.log(this.state.userLatitude,this.state.userLongitude)
        let nearBy = await getBasic(`services?nearby=y&lat=${this.state.userLatitude}&lng=${this.state.userLongitude}&filter_type_id=5&page=1&pagesize=20`,{});
        //console.log(nearBy.data.length)
        if(!this.props.isMap){
            setTimeout(()=>{
                    this.props.navigator.showModal({
                        screen: 'mti.ServiceSearchBranchScreen', // unique ID registered with Navigation.registerScreen
                        title: undefined, // navigation bar title of the pushed screen (optional)
                        titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                        passProps: {
                            navigator:this.props.navigator,
                            data: nearBy.data,
                            isMap: true,
                            nearBy:true,
                            userLatitude: this.state.userLatitude,
                            userLongitude: this.state.userLongitude,
                        }, // Object that will be passed as props to the pushed screen (optional)
                        animated: true, // does the push have transition animation or does it happen immediately (optional)
                        backButtonTitle: undefined, // override the back button title (optional)
                        backButtonHidden: false, // hide the back button altogether (optional)
                    })
            },100)
            this.setState({isLoading:false});
        }else{
            this.setState({
                serviceList: nearBy.data,
                isLoading:false
            });
        }
    }

    render(){
        return(
            <View style={styles.serviceSearchBranchScreenContainerStyle}>
                <Headers
                    leftIconName={this.props.isMap?'close':'back'}
                    headerTitleText={this.props.headerTitleText?this.props.headerTitleText:'ค้นหาสาขาย่อย'}
                    rightIconName='iconBell'
                    withSearch={this.props.isMap?false:true}
                    longTitle
                />
                {!this.props.isMap&&
                    <MainSearchBox
                        value={this.state.searchValue}
                        onChangeText={(searchValue)=>this.setState({searchValue})}
                        onSearchIconPress={this._onSearchIconPress}
                        onPress={this.onNearByPress}
                        placeholder='ค้นหาสาขาย่อยในพื้นที่ที่คุณต้องการ'
                    />
                }
                <View style={styles.serviceSearchBranchContainerStyle}>
                    {this.renderContent()}
                </View>
                {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
                {this.props.isMap && (this.state.showCallout && this.renderMapCallout())}
            </View>
        )
    }
}

const styles={
    serviceSearchBranchScreenContainerStyle:{
        flex: 1,
        backgroundColor:"#fff"
    },
    serviceSearchBranchContainerStyle:{
        flex: 1,
    },
    calloutContainerStyle:{
        height: responsiveHeight(30),
        width: responsiveWidth(90),
        position: 'absolute',
        bottom: 10,
    }
}