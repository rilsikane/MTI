import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity,Alert} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {MainSubmitButton} from './../components/MainSubmitButton';
import {LifeStyleBox} from './../components/LifeStyleBox';
import { observer, inject } from 'mobx-react';
import {postBasic,authen,get,post,put} from '../api'
import app from '../stores/app'
import store from 'react-native-simple-store';
import Spinner from 'react-native-loading-spinner-overlay';

@inject('registerStore')
@observer
export default class LifeStyleScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            lifeStyleImage1:[
                {
                    uri: require('./../source/icons/iconBeauty.png'),
                    title: 'Beauty',
                    isSelected: false,
                },
                {
                    uri: require('./../source/icons/iconDining.png'),
                    title: 'Dining',
                    isSelected: false,
                },
                {
                    uri: require('./../source/icons/iconTravel.png'),
                    title: 'Travel',
                    isSelected: false,
                }
            ],
            lifeStyleImage1Selected:[
                {
                    uri: require('./../source/icons/iconBeautySelected.png'),
                    title: 'Beauty',
                    isSelected: true,
                },
                {
                    uri: require('./../source/icons/iconDiningSelected.png'),
                    title: 'Dining',
                    isSelected: true,
                },
                {
                    uri: require('./../source/icons/iconTravelSelected.png'),
                    title: 'Travel',
                    isSelected: true,
                }
            ],
            lifeStyleImage2:[
                {
                    uri: require('./../source/icons/iconHealthy.png'),
                    title: 'Healthy',
                    isSelected: false,
                },
                {
                    uri: require('./../source/icons/iconAuto.png'),
                    title: 'Auto',
                    isSelected: false,
                },
                {
                    uri: require('./../source/icons/iconShopping.png'),
                    title: 'Shopping',
                    isSelected: false,
                }
            ],
            lifeStyleImage2Selected:[
                {
                    uri: require('./../source/icons/iconHealthySelected.png'),
                    title: 'Healthy',
                    isSelected: true,
                },
                {
                    uri: require('./../source/icons/iconAutoSelected.png'),
                    title: 'Auto',
                    isSelected: true,
                },
                {
                    uri: require('./../source/icons/iconShoppingSelected.png'),
                    title: 'Shopping',
                    isSelected: true,
                }
            ],
            filterLifeStyleImage1: [],
            filterLifeStyleImage2: [],
            lifestyle:[],
            isLoading:false
        }
        this.onSubmitOtpButtonPress = this.onSubmitOtpButtonPress.bind(this);
        this.app = app;
        this.gotoWelcome = this.gotoWelcome.bind(this);
    }

    componentDidMount(){
        this.setState({
            filterLifeStyleImage1: this.state.lifeStyleImage1,
            filterLifeStyleImage2: this.state.lifeStyleImage2
        })
    }

    async onSubmitOtpButtonPress(){
            if(this.state.lifestyle && this.state.lifestyle.length>0){
                this.app.isLoading = true
                let param = this.props.registerStore.register;
                console.log(this.state.lifestyle);
                //let response = await postBasic("member",param);
                await this.login();
            }else{
                Alert.alert(
                    'เกิดข้อผิดพลาด',
                    'กรุณาเลือกอย่างน้อย 1 รายการ',
                    [
                    {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    ]
                )
            }
    }
    async login(){
        this.app.isLoading = true
        let param = {};
        param.username = this.props.registerStore.register.username;
        param.password = this.props.registerStore.register.password;
        let response = await authen(param);
        this.app.isLoading = false;
        //if(response.first_logon=='N'){
            let token = response.token;
            store.save("token",token);
            if(token){
                this.app.isLoading = true;
                let lifeParam = {};
                lifeParam.lifestyle = this.state.lifestyle;
                let lifeResponse = await put("me/lifestyle",lifeParam);
                    if(lifeResponse){
                        let response1 = await get("me",{});
                        if(response1){
                            let response2 = await put("me/profile",response1);
                            if(response2){
                                await store.save("user",response1);
                                this.app.isLoading = false;
                                this.gotoWelcome();
                            }else{
                                this.app.isLoading = false;
                            }
                        }else{
                            this.app.isLoading = false;
                        }
                    }

            }else{
                this.app.isLoading = false
            }
        //}
    }
    gotoWelcome(){
        // this.props.navigator.resetTo({
        // 	screen: 'mti.WelcomeScreen', // unique ID registered with Navigation.registerScreen
        // 	title: undefined, // navigation bar title of the pushed screen (optional)
        // 	titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
        // 	passProps: {}, // Object that will be passed as props to the pushed screen (optional)
        // 	animated: true, // does the push have transition animation or does it happen immediately (optional)
        // 	backButtonTitle: undefined, // override the back button title (optional)
        // 	backButtonHidden: false, // hide the back button altogether (optional)
        // });
        this.app.login();
    }

    onLifeStylePress(index,list,title,isSelected){
        if(list=='1'){
            if(!isSelected){
                const lifeStyleImage1 = [...this.state.filterLifeStyleImage1]
                const lifeStyleImage1Selected = [...this.state.lifeStyleImage1Selected]
                
                lifeStyleImage1[index] = {...lifeStyleImage1Selected[index]}
        
                this.setState({
                    filterLifeStyleImage1: lifeStyleImage1,
                    lifestyle:[...this.state.lifestyle,title]
                })
            }else{
                this._onCloseButtonPress(index,list,title);
            }   
        }else{
            if(!isSelected){
                const lifeStyleImage2 = [...this.state.filterLifeStyleImage2]
                const lifeStyleImage2Selected = [...this.state.lifeStyleImage2Selected]
                
                lifeStyleImage2[index] = {...lifeStyleImage2Selected[index]}
        
                this.setState({
                    filterLifeStyleImage2: lifeStyleImage2,
                    lifestyle:[...this.state.lifestyle,title]
                })
            }else{
                this._onCloseButtonPress(index,list,title);
            }
        }
      
    }

    _onCloseButtonPress(index,list,title){
        if(list=='1'){
            const lifeStyleImage1 = [...this.state.filterLifeStyleImage1]
            const tempLifeStyleImage1 = [...this.state.lifeStyleImage1]
            
            lifeStyleImage1[index] = {...tempLifeStyleImage1[index]}
            this.setState({
                filterLifeStyleImage1: lifeStyleImage1,
                lifestyle:[...this.state.lifestyle.filter((item=>item!=title))]
            })
        }else{
            const lifeStyleImage2 = [...this.state.filterLifeStyleImage2]
            const tempLifeStyleImage2 = [...this.state.lifeStyleImage2]
            
            lifeStyleImage2[index] = {...tempLifeStyleImage2[index]}
            
            this.setState({
                filterLifeStyleImage2: lifeStyleImage2,
                lifestyle:[...this.state.lifestyle.filter((item=>item!=title))]
            })
        }
      
    }

    renderLifeStyleBoxList1(){
        const lifeStyleImage = [...this.state.filterLifeStyleImage1]

        return lifeStyleImage.map((lifeStyleImage,i)=>
            <LifeStyleBox
                key={i}
                imageUri={lifeStyleImage.uri}
                boxTitle={lifeStyleImage.title}
                isSelected={lifeStyleImage.isSelected}
                onPress={()=>this.onLifeStylePress(i,'1',lifeStyleImage.title,lifeStyleImage.isSelected)}
                onCloseButtonPress={()=>this._onCloseButtonPress(i,'1',lifeStyleImage.title)}
            />
        )
    }

    renderLifeStyleBoxList2(){
        const lifeStyleImage = [...this.state.filterLifeStyleImage2]

        return lifeStyleImage.map((lifeStyleImage,i)=>
            <LifeStyleBox
                key={i}
                imageUri={lifeStyleImage.uri}
                boxTitle={lifeStyleImage.title}
                isSelected={lifeStyleImage.isSelected}
                onPress={()=>this.onLifeStylePress(i,'2',lifeStyleImage.title,lifeStyleImage.isSelected)}
                onCloseButtonPress={()=>this._onCloseButtonPress(i,'2',lifeStyleImage.title)}
            />
        )
    }

    render(){
        return(
            <View style={styles.lifestyleContainerStyle}>
                <View style={styles.lifestyleDirectionContainerStyle}>
                    <Text  style={styles.lifestyleTitleTextStyle}>{`กรุณาเลือกไลฟ์ไตล์ที่ตรงกับคุณ(เลือกได้มากกว่า1 ข้อ)`}</Text>
                </View>
                <View style={styles.lifestyleBoxContainerStyle}>
                    <View style={styles.lifestyleBoxList1ContainerStyle}>
                        {this.renderLifeStyleBoxList1()}
                    </View>
                    <View style={styles.lifestyleBoxList2ContainerStyle}>
                        {this.renderLifeStyleBoxList2()}
                    </View>
                    <View style={styles.submitButtonContainerStyle}>
                        <MainSubmitButton
                            buttonTitleText='ตกลง'
                            onPress={this.onSubmitOtpButtonPress}
                        />
                    </View>
                </View>
                {this.app.isLoading && <Spinner visible={this.app.isLoading}  textStyle={{color: '#FFF'}} />}
            </View>
        )
    }
}

const secondFlex = 0.3,thirdFlex = 0.6

const styles={
    lifestyleContainerStyle:{
        flex: 1,
        paddingTop:20,
    },
    lifestyleDirectionContainerStyle:{
        marginLeft: responsiveWidth(6),
        marginRight: responsiveWidth(6),
        marginTop: responsiveHeight(2),
        alignItems: 'center',
    },
    lifestyleTitleTextStyle:{
        textAlign: 'center',
        color: '#1595d3',
        fontSize: responsiveFontSize(3),
        marginBottom: responsiveHeight(1),

    },
    lifestyleBoxContainerStyle:{
        flex: 1,
        paddingLeft: responsiveWidth(5),
        paddingRight: responsiveWidth(5),
        marginTop: responsiveHeight(2),
    },
    lifestyleBoxList1ContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: responsiveHeight(2),

    },
    lifestyleBoxList2ContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputContainerStyle:{
        borderBottomColor: '#C4C4C4',
    },
    submitButtonContainerStyle:{
        flex: 1,
        marginTop: responsiveHeight(3),
        // justifyContent: 'center',
    },

}
