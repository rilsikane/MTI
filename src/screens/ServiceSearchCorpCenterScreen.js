import React,{Component} from 'react';
import {Text,View,ScrollView,FlatList,Image,TouchableOpacity,Alert} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import MapView,{Marker} from 'react-native-maps';
import Spinner from 'react-native-loading-spinner-overlay';

import {Headers} from './../components/Headers';
import {MainSearchBox} from '../components/MainSearchBox';
import {ServiceListCard} from '../components/ServiceListCard';

import {getBasic} from '../api'

export default class ServiceSearchCorpCenterScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            serviceList:[],
            orgServiceList:[],
            userLatitude: '',
            userLongitude: '',
            isLoading: false,
            searchValue: '',
        }
        this._onSearchIconPress = this._onSearchIconPress.bind(this);
        this.onNearByPress = this.onNearByPress.bind(this);
    }

    async componentDidMount(){
        if(!this.props.isMap){
            this.setState({isLoading: true});
            let serviceList = await getBasic('services?filter_type_id=2&page=1&pagesize=400',{});
            if(serviceList){
                this.setState({
                    serviceList:serviceList.data,
                    orgServiceList:serviceList.data,
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
                            serviceList: this.state.orgServiceList,
                        })}},
                        ]
                    )
                },
                {maximumAge:60000, timeout:20000, enableHighAccuracy:true },
              );
        }else{
            animationTimeout = setTimeout(() => {
                this.focus();
            },1500);
        }
    }

    focus=()=> {    
        let corpId = this.props.data.map(data=>data.id);
        this.mapRef.fitToSuppliedMarkers(corpId,true);
    }

    renderContent(){
        if(this.props.isMap){
            return(
                <MapView
                    ref={(ref) => { this.mapRef = ref; }}
                    minZoomLevel={this.props.nearBy ? 13:5}
                    maxZoomLevel={18}
                    initialRegion={{
                        latitude: this.props.nearBy && this.props.data ?this.props.data[0].latitude:15.870032,
                        longitude:  this.props.nearBy && this.props.data ?this.props.data[0].longtitude:100.99254100000007,
                        latitudeDelta: this.props.nearBy && this.props.data ?this.props.data[0].latitude:15.870032,
                        longitudeDelta: this.props.nearBy && this.props.data ?this.props.data[0].longtitude:100.99254100000007,
                    }}
                    style={{flex: 1,}}
                >
                    {this.props.data.map((data)=>
                        <Marker
                            identifier={data.id}
                            key={data.id}
                            coordinate={{
                                latitude: data.latitude?parseFloat(data.latitude):13.7864983,
                                longitude: data.longtitude?parseFloat(data.longtitude):100.57462710000004
                            }}
                            title={data.title}
                            description={data.address}
                            image={require('../source/icons/iconMapMarker.png')}
                        />
                    )}
                </MapView>
            )
        }else{
            return(
                <ServiceListCard
                    data={this.state.serviceList}
                    navigator={this.props.navigator}
                />
            )
        }
    }

    async _onSearchIconPress(){
        this.setState({isLoading:true});
        if(!this.props.isMap){
            let search = await getBasic(`services?filter_type_id=2&search=${this.state.searchValue}&page=1&pagesize=400`,{});
            if(search.data.length>0){
                this.setState({
                    serviceList: search.data,
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
                        serviceList: this.state.orgServiceList,
                    })}},
                    ]
                )
            }
        }else{
     
        }

    }

    async onNearByPress(){
        this.setState({isLoading:true});
        let nearBy = await getBasic(`services?nearby=y&lat=${this.state.userLatitude}&lng=${this.state.userLongitude}&filter_type_id=2&page=1&pagesize=10`,{});
        if(!this.props.isMap){
            this.setState({isLoading:false});
            setTimeout(()=>{
                this.props.navigator.showModal({
                    screen: 'mti.ServiceSearchCorpCenterScreen', // unique ID registered with Navigation.registerScreen
                    title: undefined, // navigation bar title of the pushed screen (optional)
                    titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
                    passProps: {
                        navigator:this.props.navigator,
                        data: nearBy.data,
                        isMap: true,
                        nearBy:true,
                        userLatitude:this.state.userLatitude,
                        userLongitude:this.state.userLongitude
                    }, // Object that will be passed as props to the pushed screen (optional)
                    animated: true, // does the push have transition animation or does it happen immediately (optional)
                    backButtonTitle: undefined, // override the back button title (optional)
                    backButtonHidden: false, // hide the back button altogether (optional)
                })
            },100)
           
           
        }else{
            this.setState({
                serviceList: nearBy.data,
                isLoading:false
            });
        }
    }

    render(){
        return(
            <View style={styles.serviceSearchCorpCenterScreenContainerStyle}>
                <Headers
                    leftIconName={this.props.isMap?'close':'cancel'}
                    cancelTxt={'กลับ'}
                    cancel={()=>this.props.navigator.pop()}
                    headerTitleText='ค้นหาศูนย์และอู่รับงานบริษัท'
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
                        placeholder='ค้นหาศูนย์และอู่ในพื้นที่ที่คุณต้องการ'
                    />
                }
                <View style={styles.serviceSearchCorpCenterContainerStyle}>
                    {this.renderContent()}
                </View>
                {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
            </View>
        )
    }
}

const styles={
    serviceSearchCorpCenterScreenContainerStyle:{
        flex: 1,
    },
    serviceSearchCorpCenterContainerStyle:{
        flex: 1,
  
    },
}