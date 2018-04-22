import React,{Component} from 'react';
import {Text,View,ScrollView,Image,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {UserShortDetailCard} from './../components/UserShortDetailCard';
import {InsuranceShortDetailCard} from '../components/InsuranceShortDetailCard';
import store from 'react-native-simple-store';
import moment from 'moment';
import localization from 'moment/locale/th'
import {get} from '../api';
import Spinner from 'react-native-loading-spinner-overlay';

export default class UserInsuranceListScreen extends Component{

    constructor(props){
        super(props)
        this.state = {policys:[],isLoading:true};
        this.showDetail = this.showDetail.bind(this);

    }
    async componentDidMount(){
        this.setState({isLoading:true});
        let response = await get("me/policy",{});
        if(response){
            this.setState({isLoading:false,policys:response});
        }else{
            this.setState({isLoading:false})
        }
    }
   calculateInsuranceDuring(effectiveDt,expDate){
        let date1 = moment(effectiveDt, 'YYYYMMDD').toDate();
        let date2 = moment(expDate, 'YYYYMMDD').toDate();
        return this.calcDate(date1,date2);
    }
    calcDate(date1,date2) {
        var diff = Math.floor(date2.getTime() - date1.getTime());
        var day = 1000 * 60 * 60 * 24;
        
        var days = Math.floor(diff/day);
        days += 1;
        var months = Math.floor(days/31);
        var years = Math.floor(months/12);
    
        var message = "";
        if(years>0 || months ==11){
            message = years||1 + " ปี";
        }else if(months>0){
            message = months + " เดือน";
        }else if(days>0){
            message = days + " วัน";
        }

        return message
    }
    numberWithCommas(x){
        return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    calculateExpire(expiry_Date){
        var diff = Math.floor(moment(expiry_Date, 'YYYYMMDD').toDate().getTime() - new Date().getTime());
        return diff<0;
    }
    renderInsuranceShortDetailCard(){

        return this.state.policys.map((item,i)=>
            {
            let data = item.Policy_Header[0];    
            return (<InsuranceShortDetailCard
                    key={i}
                    index={++i}
                    FLAG={data.FLAG}
                    Policy_NO={data.Policy_NO}
                    insuranceTitleText={data.Product_Name}
                    insuranceShortDetailText={data.FLAG=='N' ?'ต้องการข้อมูลเพิ่มเติมกรุณาติดต่อเจ้าหน้าที่โทร 1484':' - '}
                    insuanceBudget={data.Sum_insured}
                    insurancePremium={`${data.Total_Premium}`}
                    insuranceDuring={this.calculateInsuranceDuring(data.Effective_Date,data.Expiry_Date)}
                    onSeeInsuranceDetailButtonPress={()=>this.showDetail(item)}
                    style={styles.insuranceCardContainerStyle}
                    expire={this.calculateExpire(data.Expiry_Date)}
                />)
            }
        )
    }
   showDetail(data){
       this.props.navigator.showModal({
        screen: 'mti.InsuranceDetailScreen', // unique ID registered with Navigation.registerScreen
        title: 'Modal', // title of the screen as appears in the nav bar (optional)
        passProps: {data:data,navigator:this.props.navigator}, // simple serializable object that will pass as props to the modal (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
        animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
      });
   }

    render(){
        return(
            <View style={styles.userInsuranceListScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='รายละเอียดกรมธรรม์'
                />
                <ScrollView style={{flex: 1,}}>
                    <UserShortDetailCard navigator={this.props.navigator}
                        showQr={true} isPolicy={true}
                    />
                    <View style={styles.userInsuranceListContainerStyle}>
                        <View style={styles.insuranceTitleContainerStyle}>
                            <Image
                                source={require('../source/icons/iconInsuranceBlue.png')}
                                resizeMode='contain'
                                style={styles.insuranceTitleIconStyle}
                            />
                            <Text style={styles.insuranceTitleTextStyle}>กรมธรรม์ของคุณ</Text>
                        </View>
                        {this.state.policys && this.state.policys.length >0  && this.renderInsuranceShortDetailCard()}
                    </View>
                    <Image
                        source={require('../source/images/promotionImg.png')}
                        resizeMode='stretch'
                        style={styles.advertiseImageStyle}
                    />
                    <View style={styles.extraPrivilegeContainerStyle}>
                        <TouchableOpacity>
                            <Image
                                source={require('../source/images/extraPrivilegeImg.png')}
                                resizeMode='stretch'
                                style={styles.extraPrivilegeImageStyle}
                                borderRadius={2}
                            />
                        </TouchableOpacity>
                    </View>
                    {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
                </ScrollView>
                
            </View>
        )
    }
}

const styles={
    userInsuranceListScreenContainerStyle:{
        flex: 1,
    },
    userInsuranceListContainerStyle:{
        flex: 1,
    },
    insuranceTitleContainerStyle:{
        flexDirection: 'row',
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
        marginLeft: responsiveWidth(5),
    },
    insuranceTitleIconStyle:{
        height: responsiveHeight(3.25),
        width: responsiveWidth(4.53),

    },
    insuranceTitleTextStyle:{
        color: '#1595d3',
        fontSize: responsiveFontSize(2.5),
        marginLeft: responsiveWidth(1.5),
        
    },
    insuranceCardContainerStyle:{
        marginBottom: responsiveHeight(3.5),
        paddingLeft: responsiveWidth(5),
        paddingRight: responsiveWidth(5),
        paddingTop:5
    },
    advertiseImageStyle:{
        height: responsiveHeight(18.30),
        width: '100%',
    },
    extraPrivilegeContainerStyle:{
        alignItems: 'center',
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(3),
    },
    extraPrivilegeImageStyle:{
        height: responsiveHeight(12.67),
        width: responsiveWidth(90),
    },
    
}
