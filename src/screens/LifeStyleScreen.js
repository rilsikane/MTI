import React,{Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity,Alert} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';
import {MainSubmitButton} from './../components/MainSubmitButton';
import {LifeStyleBox} from './../components/LifeStyleBox';
import { observer, inject } from 'mobx-react';
import {postBasic,authen,get,post,put,getBasic} from '../api'
import app from '../stores/app'
import store from 'react-native-simple-store';
import Spinner from 'react-native-loading-spinner-overlay';

@inject('registerStore')
@observer
export default class LifeStyleScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            lifeStyleImage1:[],
            lifeStyleImage1Selected:[],
            lifeStyleImage2:[],
            lifeStyleImage2Selected:[],
            lifeStyleImage3:[],
            lifeStyleImage3Selected:[],
            filterLifeStyleImage1: [],
            filterLifeStyleImage2: [],
            filterLifeStyleImage3: [],
            lifestyle:[],
            isLoading:true
        } 
        this.onSubmitOtpButtonPress = this.onSubmitOtpButtonPress.bind(this);
        this.app = app;
        this.gotoWelcome = this.gotoWelcome.bind(this);
    }

    async componentDidMount(){
        this.app.isLoading = true;
        let param = {};
        param.username = this.props.registerStore.register.username;
        param.password = this.props.registerStore.register.password;
        let authenResponse = await authen(param);
        if(authenResponse){
            let token = authenResponse.token;
            if(token){
                store.save("token",token);
                let response = await getBasic("privilege/groups",{});
                let list = response.data;
                let list1=[],list2=[],list3=[];
                for(let i=0;i<list.length;i++){
                    list[i].isSelected = false;
                    if(i<3){
                        list1.push(list[i]);
                    }else if(i<6){
                        list2.push(list[i]);
                    }else if(i<9){
                        list3.push(list[i]);
                    }
                }
                this.app.isLoading = false;
                this.setState({lifeStyleImage1:list1,lifeStyleImage1Selected:list1});
                this.setState({lifeStyleImage2:list2,lifeStyleImage2Selected:list2});
                this.setState({lifeStyleImage3:list3,lifeStyleImage3Selected:list3,isLoading:false});
                this.setState({
                    filterLifeStyleImage1: this.state.lifeStyleImage1,
                    filterLifeStyleImage2: this.state.lifeStyleImage2,
                    filterLifeStyleImage3: this.state.lifeStyleImage3
                })
            }else{
                this.app.isLoading = false;
            }
        }else{
            this.app.isLoading = false;
        }
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
                    ' ',
                    'กรุณาเลือกอย่างน้อย 1 รายการ',
                    [
                    {text: 'OK', onPress: () => console.log('OK Pressed!')},
                    ]
                )
            }
    }
    async login(){
        // this.app.isLoading = true
        // let param = {};
        // param.username = this.props.registerStore.register.username;
        // param.password = this.props.registerStore.register.password;
        // let response = await authen(param);
        // this.app.isLoading = false;
        //if(response.first_logon=='N'){
            // let token = response.token;
            // store.save("token",token);
            // if(token){
                this.app.isLoading = true;
                let lifeParam = {};
                lifeParam.lifestyle = this.state.lifestyle;
                let lifeResponse = await put("me/lifestyle",lifeParam);
                    if(lifeResponse){
                        let response1 = await get("me",{});
                        if(response1){
                            let response2 = await put("me/profile",response1);
                            if(response2){
                                response1.username = this.props.registerStore.register.username;
                                response1.password = this.props.registerStore.register.password;
                                await store.save("user",response1);
                                this.app.isLoading = false;
                                this.props.registerStore.register={};
                                this.gotoWelcome();
                            }else{
                                this.app.isLoading = false;
                            }
                        }else{
                            this.app.isLoading = false;
                        }
                    }

            // }else{
            //     this.app.isLoading = false
            // }
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
        setTimeout(()=>{
            this.app.login();
        },500)
       
    }

    onLifeStylePress(index,list,title,isSelected){
        if(list=='1'){
            if(!isSelected){
                const lifeStyleImage1 = [...this.state.filterLifeStyleImage1]
                
                lifeStyleImage1[index].isSelected=true;
        
                this.setState({
                    filterLifeStyleImage1: lifeStyleImage1,
                    lifestyle:[...this.state.lifestyle,title]
                })
            }else{
                this._onCloseButtonPress(index,list,title);
            }   
        }else if(list=='2'){
            if(!isSelected){
                const lifeStyleImage2 = [...this.state.filterLifeStyleImage2]
                lifeStyleImage2[index].isSelected=true;
                
        
                this.setState({
                    filterLifeStyleImage2: lifeStyleImage2,
                    lifestyle:[...this.state.lifestyle,title]
                })
            }else{
                this._onCloseButtonPress(index,list,title);
            }
        }else{
            if(!isSelected){
                const lifeStyleImage3 = [...this.state.filterLifeStyleImage3]
                lifeStyleImage3[index].isSelected=true;
        
                this.setState({
                    filterLifeStyleImage3: lifeStyleImage3,
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
            
            lifeStyleImage1[index].isSelected=false;
            this.setState({
                filterLifeStyleImage1: lifeStyleImage1,
                lifestyle:[...this.state.lifestyle.filter((item=>item!=title))]
            })
        }else if(list=='2'){
            const lifeStyleImage2 = [...this.state.filterLifeStyleImage2]
            
            lifeStyleImage2[index].isSelected = false;
            
            this.setState({
                filterLifeStyleImage2: lifeStyleImage2,
                lifestyle:[...this.state.lifestyle.filter((item=>item!=title))]
            })
        }else{
            const lifeStyleImage3 = [...this.state.filterLifeStyleImage3]
            
            lifeStyleImage3[index].isSelected=false;
            
            this.setState({
                filterLifeStyleImage3: lifeStyleImage3,
                lifestyle:[...this.state.lifestyle.filter((item=>item!=title))]
            })
        }
      
    }

    renderLifeStyleBoxList1(){
        const lifeStyleImage = [...this.state.filterLifeStyleImage1]

        return lifeStyleImage.map((lifeStyleImage,i)=>
            <LifeStyleBox
                key={i}
                imageUri={lifeStyleImage.icon_url!="" ? {uri:lifeStyleImage.icon_url}:null}
                boxTitle={lifeStyleImage.name}
                isSelected={lifeStyleImage.isSelected}
                onPress={()=>this.onLifeStylePress(i,'1',lifeStyleImage.id,lifeStyleImage.isSelected)}
                onCloseButtonPress={()=>this._onCloseButtonPress(i,'1',lifeStyleImage.id)}
            />
        )
    }

    renderLifeStyleBoxList2(){
        const lifeStyleImage = [...this.state.filterLifeStyleImage2]

        return lifeStyleImage.map((lifeStyleImage,i)=>
            <LifeStyleBox
                key={i}
                imageUri={lifeStyleImage.icon_url!="" ? {uri:lifeStyleImage.icon_url}:null}
                boxTitle={lifeStyleImage.name}
                isSelected={lifeStyleImage.isSelected}
                onPress={()=>this.onLifeStylePress(i,'2',lifeStyleImage.id,lifeStyleImage.isSelected)}
                onCloseButtonPress={()=>this._onCloseButtonPress(i,'2',lifeStyleImage.id)}
            />
        )
    }
    renderLifeStyleBoxList3(){
        const lifeStyleImage = [...this.state.filterLifeStyleImage3]

        return lifeStyleImage.map((lifeStyleImage,i)=>
            <LifeStyleBox
                key={i}
                imageUri={lifeStyleImage.icon_url!="" ? {uri:lifeStyleImage.icon_url}:null}
                boxTitle={lifeStyleImage.name}
                isSelected={lifeStyleImage.isSelected}
                onPress={()=>this.onLifeStylePress(i,'3',lifeStyleImage.id,lifeStyleImage.isSelected)}
                onCloseButtonPress={()=>this._onCloseButtonPress(i,'3',lifeStyleImage.id)}
            />
        )
    }

    render(){
        return(
            <View style={styles.lifestyleContainerStyle}>
                <View style={styles.lifestyleDirectionContainerStyle}>
                    <Text  style={styles.lifestyleTitleTextStyle}>{`กรุณาเลือกไลฟ์สไตล์ที่ตรงกับคุณ${'\n'}(เลือกได้มากกว่า 1 ข้อ)`}</Text>
                </View>
                <View style={styles.lifestyleBoxContainerStyle}>
                    <View style={styles.lifestyleBoxList1ContainerStyle}>
                        {this.renderLifeStyleBoxList1()}
                    </View>
                    <View style={styles.lifestyleBoxList2ContainerStyle}>
                        {this.renderLifeStyleBoxList2()}
                    </View>
                    <View style={[styles.lifestyleBoxList2ContainerStyle,{paddingTop:10}]}>
                        {this.renderLifeStyleBoxList3()}
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
