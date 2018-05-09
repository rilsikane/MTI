import React,{Component} from 'react';
import {Text,View,Image} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import QRCode from 'react-native-qrcode';
import store from 'react-native-simple-store';
import {Headers} from './../components/Headers';
import TimerMixin from 'react-timer-mixin';

export default class PrivilegeQrCodeScreen extends Component{

    constructor(props){
        super(props)
        this.state={groups:[],timeCount:""}
    }
    async componentDidMount(){
        let group = await store.get("privilegeGroup");
        if(group){
            this.setState({groups:group});
        }
        let endtime = new Date();
        endtime.setTime(endtime.getTime() + (15 * 60 * 1000));
        this.timer = TimerMixin.setInterval( async () => {
            await this.getTimeRemaining(endtime);
          }, 10);
    }
    getIcon(){
        if(this.state.groups.length >0 && this.props.data.group_id){
            let group =  this.state.groups.filter(gp=>gp.id==this.props.data.group_id)
            return group && group.length>0 ? {uri:group[0].icon_url}:null;
        }else{
            return null;
        }
    }
    getTitleText(){
        if(this.state.groups.length >0 && this.props.data.group_id){
            let group =  this.state.groups.filter(gp=>gp.id==this.props.data.group_id)
            return group && group.length>0 ? group[0].name:null;
        }else{
            return null;
        }
    }
    getTimeRemaining(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        if(t >0){
            this.setState({timeCount:`${minutes<10 ? '0'+minutes:minutes} : ${seconds<10 ? '0'+seconds:seconds}`})
        }else{
            this.setState({timeCount:`00:00`});
            TimerMixin.clearInterval(this.timer);
            this.props.navigator.dismissAllModals({
                animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
            })
        }    
    }
    componentWillUnmount(){
      TimerMixin.clearInterval(this.timer);
    }

    render(){
        return(
            <View style={styles.privilegeQrCodeSreenContainerStyle}>
                <Headers
                    leftIconName='cancel'
                    headerTitleText='QR Code สำหรับใช้สิทธิ์'
                    cancel={()=>
                        this.props.navigator.dismissAllModals({
                            animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                        })
                    }
                />
                <View style={styles.privilegeQrCodeContainerStyle}>
                    <View style={styles.privilegeLogoContainerStyle}>
                        <Image
                            source={{uri:this.props.data.partner_picture}}
                            resizeMode='contain'
                            style={styles.privilegeLogoStyle}
                        />
                    </View>
                    <View style={styles.lifeStyleContainerStyle}>
                        <Image
                            source={this.getIcon()}
                            style={styles.lifeStyleIconStyle}
                        />
                        <Text style={styles.lifeStyleTextStyle}>{this.getTitleText()}</Text>
                    </View>
                    <Text style={styles.privilegeTitleTextStyle}>{this.props.data.name}</Text>
                    <Text style={styles.privilegeDetailTextStyle}>คุณสามารถรับสิทธิโดยการแสดง QRcode ได้ที่จุดชำระเงิน{'\n'} หรือบันทึก QR Code. เพื่อใช้สิทธิพิเศษนี้ภายหลัง</Text>
                    <Text style={styles.timerTextStyle}>{this.state.timeCount}</Text>
                </View>
                <View style={styles.qrCodeContainerStyle}>
                    <Text style={styles.qrRefCodeTextStyle}>Reference Code : {this.props.redeem.redeem_code}</Text>
                    <View style={styles.qrCodeImageContainerStyle}>
                        {/* <Image
                            source={require('../source/images/myCardQrImg.png')}
                            resizeMode='contain'
                            style={styles.qrCodeImageStyle}
                        /> */}
                        <QRCode
                            value={this.props.redeem.redeem_code||'tmp9999'}
                            size={responsiveHeight(29.66)}
                            bgColor='#000'
                            fgColor='#FFF'
                        />
                    </View>
                    <Text style={styles.qrCodeExpTextStyle}>สิทธิพิเศษนี้มีระยะเวลาในการใช้งาน 15 นาที</Text>
                </View>
            </View>
        )
    }
}

const styles={
    privilegeQrCodeSreenContainerStyle:{
        flex: 1,
        backgroundColor: '#FFF',
    },
    privilegeQrCodeContainerStyle:{
        height: responsiveHeight(41),
    },
    privilegeLogoContainerStyle:{
        height: responsiveHeight(6.33),
        marginTop: responsiveHeight(3.5),
        marginBottom: responsiveHeight(3.5),
    },
    privilegeLogoStyle:{
        flex: 1,
        alignSelf: 'center',
        width:responsiveHeight(10),
        height:responsiveHeight(10)
    },
    lifeStyleContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lifeStyleIconStyle:{
        height: responsiveHeight(2.81),
        width: responsiveHeight(3),
    },
    lifeStyleTextStyle:{
        letterSpacing: 0,
        color: "rgba(85, 86, 90, 0.6)",
        fontSize: responsiveFontSize(2.15),
        marginLeft: responsiveWidth(1.5),
    },
    privilegeTitleTextStyle:{
        letterSpacing: 0,
        textAlign: "center",
        color: "#1595d3",
        fontSize: responsiveFontSize(2.5),
        marginTop: responsiveHeight(2.4),
        marginBottom: responsiveHeight(2.4),
    },
    privilegeDetailTextStyle:{
        letterSpacing: 0,
        textAlign: "center",
        color: "#919195",
        fontSize: responsiveFontSize(1.9),
        marginLeft: responsiveWidth(11),
        marginRight: responsiveWidth(11),
    },
    timerTextStyle:{
        letterSpacing: 0,
        textAlign: "center",
        color: "rgb(253, 98, 98)",
        fontSize: responsiveFontSize(5),
        marginLeft: responsiveWidth(11),
        marginRight: responsiveWidth(11),
        marginTop: 20,
    },
    qrCodeContainerStyle:{
        flex: 1,
        backgroundColor: '#f6f6f6',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    qrRefCodeTextStyle:{
        textAlign: 'center',
        color: "#1595d3",
        letterSpacing: 0,
        fontSize: responsiveFontSize(2.2),
        marginTop: responsiveHeight(2.5),
    },
    qrCodeImageContainerStyle:{
        height: responsiveHeight(29.66),
        alignItems: 'center',
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(1),
    },
    qrCodeImageStyle:{
       flex: 1,
       alignSelf: 'center',
    },
    qrCodeExpTextStyle:{
        letterSpacing: 0,
        color: 'rgb(253, 98, 98)',
        fontSize: responsiveFontSize(2.2),
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 3,
        backgroundColor: "#e6e6e6",
        width: responsiveWidth(70),
        marginTop: responsiveHeight(1),
    }
}