import React,{Component} from 'react';
import {Text,View,ImageBackground,TouchableOpacity,Image} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PassCodePress from '../components/PassCodePress';
import store from 'react-native-simple-store';
import app from '../stores/app';
import TouchID from 'react-native-touch-id'
import Spinner from 'react-native-loading-spinner-overlay';
import {post,authen,get} from '../api'
export default class PassCodeAuthenScreen extends Component{

    constructor(props){
        super(props)
        this.state ={user:{},isLoading:false,touchSupport:false};
        this.next = this.next.bind(this);
        this.app = app;
    }
    componentDidMount(){
       this.init();
    }
    async init(){
        let userData = await store.get("user");
        this.setState({user:userData});
        TouchID.isSupported()
        .then(biometryType => {
            this.setState({touchSupport:true})
            const optionalConfigObject = {
                title: "เช้าสู่ระบบด้วย Touch ID", // Android
                color: "#e00606", // Android,
                failbackLabel: "" // iOS (if empty, then label is hidden)
              }
            TouchID.authenticate('ใช้ Touch ID เพื่อเข้าสู่ระบบ', optionalConfigObject)
            .then(success => {
               this.next();
            })
            .catch(error => {
                // Failure code
            });
        })
        .catch(error => {
            // Failure code
            this.setState({touchSupport:false})
        });
       
    }
    async next(){
        let param = {};
        param.username = this.state.user.username;
        param.password = this.state.user.password;
        this.setState({isLoading:true});
        let response = await authen(param);
        if(response){
            // if(false){
                let token = response.token;
                store.save("token",token);
                if(token){
                    setTimeout(()=>{
                        this.app.login();
                    },500)
                    
                }else{
                     setTimeout(()=>{
                        this.setState({isLoading:false});
                    },500)
                }
        }
        
    }

    render(){
        return(
            <View style={{flex:1}}>
                <PassCodePress cancelText="ล้าง" cancel={this.props.cancel} next={this.next}
                 isTouch={true} title="ใส่รหัส Pincode" passCode={this.state.user.pinCode} canTouch={this.state.touchSupport}/>
                  <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />
            </View>
        )
    }
}

const styles={
   
}