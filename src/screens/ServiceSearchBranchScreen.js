import React,{Component} from 'react';
import {Text,View,ScrollView,FlatList,Image,TouchableOpacity,Alert} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import MapView,{Marker} from 'react-native-maps';
import Spinner from 'react-native-loading-spinner-overlay';

import {Headers} from '../components/Headers';
import {MainSearchBox} from '../components/MainSearchBox';
import {ServiceListCard} from '../components/ServiceListCard';
import {getBasic} from '../api';

export default class ServiceSearchBranchScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            branchList:[],
            orgBranchList:[],
            isLoading: false,
            searchValue: '',
        }
        this._onSearchIconPress = this._onSearchIconPress.bind(this);
    }

    async componentDidMount(){
        if(!this.props.isMap){
            this.setState({isLoading: true});
            let branchList = await getBasic('services?filter_type_id=5&page=1&pagesize=20',{});
            if(branchList){
                this.setState({
                    branchList:branchList.data,
                    orgBranchList:branchList.data,
                    isLoading: false});
            }

        }else{
            animationTimeout = setTimeout(() => {
                this.focus();
            },1000);
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
                    minZoomLevel={5}
                    maxZoomLevel={18}
                    initialRegion={{
                        latitude: 15.870032,
                        longitude: 100.99254100000007,
                        latitudeDelta: 15.870032,
                        longitudeDelta: 100.99254100000007,
                    }}
                    style={{flex: 1,}}
                >
                    {this.props.isDirect?   
                        <Marker
                            identifier={this.props.data.id}
                            coordinate={this.props.data.coordinate}
                            image={require('../source/icons/iconMapMarker.png')}
                        />:
                        this.props.data.map((data)=>
                            <Marker
                                identifier={data.id}
                                key={data.id}
                                coordinate={{
                                    latitude: 13.697567,
                                    longitude: 100.53758300000004
                                }}
                                image={require('../source/icons/iconMapMarker.png')}
                            />
                    )}
                </MapView>
            )
        }else{
            return(
                <ServiceListCard
                    data={this.state.branchList}
                    navigator={this.props.navigator}
                />
            )
        }
    }

    async _onSearchIconPress(){
        if(!this.props.isMap){
            this.setState({isLoading:true});
            let search = await getBasic(`services?filter_type_id=5&search=${this.state.searchValue}&page=1&pagesize=20`,{});
            if(search.data.length>0){
                this.setState({
                    branchList: search.data,
                    isLoading: false,
                })
            }else{
                Alert.alert(
                    'เกิดข้อผิดพลาด',
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

    render(){
        return(
            <View style={styles.serviceSearchBranchScreenContainerStyle}>
                <Headers
                    leftIconName={this.props.isMap?'close':'back'}
                    headerTitleText='ค้นหาสาขาย่อย'
                    rightIconName='iconBell'
                    withSearch
                />
                <MainSearchBox
                    value={this.state.searchValue}
                    onChangeText={(searchValue)=>this.setState({searchValue})}
                    onSearchIconPress={this._onSearchIconPress}
                    onPress={()=>alert('search')}
                    placeholder='ค้นหาสาขาย่อยในพื้นที่ที่คุณต้องการ'
                />
                <View style={styles.serviceSearchBranchContainerStyle}>
                    {this.renderContent()}
                </View>
                {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
            </View>
        )
    }
}

const styles={
    serviceSearchBranchScreenContainerStyle:{
        flex: 1,
    },
    serviceSearchBranchContainerStyle:{
        flex: 1,
    }
}