import React,{Component} from 'react';
import {Text,View,ScrollView,FlatList,Image,TouchableOpacity,Alert,PermissionsAndroid,Platform} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import MapView,{Marker} from 'react-native-maps';
import Spinner from 'react-native-loading-spinner-overlay';

import {Headers} from './../components/Headers';
import {MainSearchBox} from '../components/MainSearchBox';
import {ServiceListCard} from '../components/ServiceListCard';
import {MapCalloutPopup} from '../components/MapCalloutPopup';

import {getBasic} from '../api'
import Geolocation from 'react-native-geolocation-service';
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
            calloutData:{},
            showCallout: false,
            isLocationError:false
        }
        this._onSearchIconPress = this._onSearchIconPress.bind(this);
        this.onNearByPress = this.onNearByPress.bind(this);
    }

    async componentDidMount(){
        if(!this.props.isMap){
            
            if(Platform.OS=="android"){
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);  
                this.setState({isLocationError:!result});
            }
            
                this.setState({isLoading: true});
                let serviceList = await getBasic('services?filter_type_id=2&page=1&pagesize=400',{});
                if(serviceList){
                    this.setState({
                        serviceList:serviceList.data,
                        orgServiceList:serviceList.data,
                    });
                }
                if(!this.state.isLocationError){
                    Geolocation.getCurrentPosition(
                    (position) => {
                        this.setState({
                            userLatitude: position.coords.latitude,
                            userLongitude: position.coords.longitude,
                            isLoading: false,
                        })
                    },
                    (error) => {
                        Alert.alert(
                            ' ',
                            'คุณไม่ได้ทำการเปิด Location Service',
                            [
                            {text: 'OK', onPress: () => {this.setState({
                                isLoading: false,
                                serviceList: this.state.orgServiceList,
                            })}},
                            ]
                        )
                    }
                );
            }else{
                setTimeout(()=>{
                    Alert.alert(
                        ' ',
                        'คุณไม่ได้ทำการเปิด Location Service',
                        [
                        {text: 'OK', onPress: () => {this.setState({
                            isLoading: false,locationError:false
                        })}},
                        ]
                    )
                },200)
            }
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
                    minZoomLevel={this.props.nearBy ? 5:5}
                    maxZoomLevel={18}
                    initialRegion={{
                        latitude: this.props.nearBy && this.props.data ?parseFloat(this.props.data[0].latitude):15.870032,
                        longitude:  this.props.nearBy && this.props.data ?parseFloat(this.props.data[0].longtitude):100.99254100000007,
                        latitudeDelta: this.props.nearBy && this.props.data ?parseFloat(this.props.data[0].latitude):15.870032,
                        longitudeDelta: this.props.nearBy && this.props.data ?parseFloat(this.props.data[0].longtitude):100.99254100000007,
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
                            identifier={data.id}
                            key={data.id}
                            coordinate={{
                                latitude: data.latitude?parseFloat(data.latitude):13.7863725,
                                longitude: data.longtitude?parseFloat(data.longtitude):100.5745153
                            }}
                            image={require('../source/icons/iconMapMarker.png')}
                            onPress={()=>this.onMarkerPress(data)}
                        />
                    )}
                </MapView>
            )
        }else{
            return !this.state.isLoading ?(
                <ServiceListCard
                    data={this.state.serviceList}
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
                    ' ',
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
        await Geolocation.getCurrentPosition(
            (position) => {
            this.setState({
                userLatitude: position.coords.latitude,
                userLongitude: position.coords.longitude,
            })
            },
            (error) => {
                Alert.alert(
                    ' ',
                    'คุณไม่ได้ทำการเปิด Location Service',
                    [
                    {text: 'OK', onPress: () => {this.setState({
                        isLoading: false,
                        serviceList: this.state.orgServiceList,
                    })}},
                    ]
                )
            },
        );
        if(this.state.userLatitude!=''&&this.state.userLongitude!=''){
            this.setState({isLoading:true});
            //console.log(this.state.userLatitude,this.state.userLongitude)
            let nearBy = await getBasic(`services?nearby=y&lat=${this.state.userLatitude}&lng=${this.state.userLongitude}&filter_type_id=2&page=1&pagesize=10`,{});
            //let nearBy = await getBasic(`services?nearby=y&lat=13.7863725&lng=100.5745153&filter_type_id=2&page=1&pagesize=10`,{});
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
                            userLatitude: this.state.userLatitude,
                            userLongitude: this.state.userLongitude,
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
        }else{
            this.setState({isLoading:false});
            setTimeout(()=>{
                Alert.alert(
                    ' ',
                    'คุณไม่ได้ทำการเปิด Location Service',
                    [
                    {text: 'OK', onPress: () => {this.setState({
                        isLoading: false,locationError:false
                    })}},
                    ]
                )
            },200)
        }
    }

    renderMapCallout(){
        return(
            <View style={styles.calloutContainerStyle}>
                <MapCalloutPopup
                    data={this.state.calloutData}
                    userLocation={{lat:this.state.userLatitude,long:this.state.userLongitude}}
                    show={this.state.showCallout}
                    onClose={()=>this.setState({showCallout: false})}
                />
            </View>
        )
    }

    render(){
        return(
            <View style={styles.serviceSearchCorpCenterScreenContainerStyle}>
                <Headers
                    leftIconName={this.props.isMap?'close':'cancel'}
                    cancelTxt={'กลับ'}
                    cancel={()=>this.props.navigator.pop()}
                    headerTitleText='ค้นหาอู่และศูนย์'
                    rightIconName='iconBell'
                    withSearch={this.props.isMap?false:true}
                    longTitle={!this.props.isMap}
                    hideRightIcon={this.props.isMap}
                />
                {!this.props.isMap?
                    <MainSearchBox
                        value={this.state.searchValue}
                        onChangeText={(searchValue)=>this.setState({searchValue})}
                        onSearchIconPress={this._onSearchIconPress}
                        onPress={this.onNearByPress}
                        placeholder='ค้นหาอู่และศูนย์ในพื้นที่ที่คุณต้องการ'
                    />:null
                }
                <View style={styles.serviceSearchCorpCenterContainerStyle}>
                    {this.renderContent()}
                </View>
                {<Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
                {this.props.isMap && (this.renderMapCallout())}
            </View>
        )
    }
}

const styles={
    serviceSearchCorpCenterScreenContainerStyle:{
        flex: 1,
        backgroundColor:"#fff"
    },
    serviceSearchCorpCenterContainerStyle:{
        flex: 1,
    },
    calloutContainerStyle:{
        height: responsiveHeight(30),
        width: responsiveWidth(90),
        position: 'absolute',
        bottom: 10,
    }

}