import React,{Component} from 'react';
import {Text,View,ImageBackground,TouchableOpacity,Image} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class PassCodePress extends Component{

    constructor(props){
        super(props)
        this.state={
            passCode: [],
            orgSymbol: ['○','○','○','○'],
            msgError:""
        }
        this.onResetButtonPress = this.onResetButtonPress.bind(this);
        this.onDelNumber = this.onDelNumber.bind(this);
    }

    renderSymbol(){
        return this.state.orgSymbol.map((data,i)=>
            <View style={styles.symbolSectionStyle} key={i}>
                <Text style={styles.symbolTextStyle}>{data}</Text>
            </View>
        )
    }

    renderNumberButton(start){
        let obj = start==0?[0]:[]
        if(start!=0){
            for(let number=start;number<start+3;number++){
                obj.push(number)
            }
        }
       

        return obj.map((data,i)=>
            <TouchableOpacity onPress={()=>this.onNumberPress(data)} key={i} style={styles.buttonContainerStyle}>
                <Text style={styles.numberStyle}>{data}</Text>
            </TouchableOpacity>
        )
    }

    onNumberPress(number){
       
        this.state.passCode.length<4&&this.state.passCode.push(number)
        // if(this.state.passCode.length<4){
        //     this.setState({passCode:[...this.state.passCode,number]});
        // }
        console.log(this.state.passCode.length);
        let orgSymbol = [...this.state.orgSymbol]
        if(this.state.passCode.length>0&&this.state.passCode.length<=4){
            orgSymbol.fill('●',0,this.state.passCode.length)
            this.setState({orgSymbol})
            if(this.state.passCode.length==4){
                if(!this.props.passCode){
                    
                    this.props.next(this.state.passCode);
                    this.onResetButtonPress();
                }else{
                    if(this.props.passCode.toString()==this.state.passCode.toString()){
                        this.props.next(this.state.passCode);
                    }else{
                        this.onResetButtonPress();
                        this.setState({msgError:"Pincode ไม่ถูก"})
                    }
                }
            }
        }
    }

    onResetButtonPress(){
        let tmpSymbol = [...this.state.orgSymbol]
        tmpSymbol.fill('○',0)
        this.setState({
            orgSymbol:tmpSymbol,
            passCode: [],
        })
    }
    onDelNumber(){
        let tmp = [...this.state.passCode];
        let tmpSymbol = [...this.state.orgSymbol]
        tmp.splice(-1,1)
        tmpSymbol.fill('○',0)
        tmpSymbol.fill('●',0,tmp.length);
        this.setState({passCode:tmp,orgSymbol:tmpSymbol});
    }

    render(){
        return(
            <View style={styles.passCodeScreenContainerStyle}>
                <ImageBackground
                    source={require('../source/images/passcodeBackgroundImg01.png')}
                    resizeMode='stretch'
                    style={styles.passCodeScreenContainerStyle}
                >
                   
                    <Text style={styles.titleTextStyle}>{this.props.title}</Text>
                    <Text style={{color:"red",fontSize:responsiveFontSize(3),textAlign:"center"}}>{this.state.msgError}</Text>
                    <View style={styles.symbolContainerStyle}>
                        {this.renderSymbol()}
                    </View>
                    <View style={styles.numberContainerStyle}>
                        {this.renderNumberButton(1)}
                    </View>
                    <View style={styles.numberContainerStyle}>
                        {this.renderNumberButton(4)}
                    </View>
                    <View style={styles.numberContainerStyle}>
                        {this.renderNumberButton(7)}
                    </View>
                    <View style={styles.numberContainerStyle}>
                        {this.props.isTouch &&<TouchableOpacity  onPress={()=>this.onResetButtonPress()}>
                            <Text style={styles.resetTextStyle}>ล้าง</Text>
                        </TouchableOpacity>}
                        {this.props.isNext &&<TouchableOpacity  onPress={()=>this.props.cancel()}>
                            <Text style={styles.resetTextStyle}>{this.props.cancelText}</Text>
                        </TouchableOpacity>}
                        {this.renderNumberButton(0)}
                        {(this.props.isTouch && this.props.canTouch) ? 
                        <TouchableOpacity>
                            <Image
                                source={require('../source/icons/iconTouchID01.png')}
                                resizeMode='contain'
                                style={styles.touchImageStyle}
                            />
                        </TouchableOpacity>:!this.props.isNext && <View style={styles.touchImageStyle}></View>}
                        {this.props.isNext &&
                         
                        <TouchableOpacity  onPress={()=>this.onDelNumber()}>
                            <Text style={styles.resetTextStyle}>ลบ</Text>
                        </TouchableOpacity>
                    }
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles={
    passCodeScreenContainerStyle:{
        flex: 1,
    },
    titleTextStyle:{
        color: '#FFF',
        fontSize: responsiveFontSize(3),
        textAlign: 'center',
        marginTop: responsiveHeight(20),
    },
    symbolContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
    },
    symbolSectionStyle:{
        margin: responsiveWidth(1.5),
    },
    symbolTextStyle:{
        color: '#FFF',
        fontWeight: '500'
    },
    numberContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonContainerStyle:{
        width: responsiveWidth(20),
        height: responsiveWidth(20),
        borderRadius: responsiveWidth(10),
        borderWidth: 1,
        borderColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        margin: responsiveWidth(3),
    },
    numberStyle:{
        color: '#FFF',
        fontSize: responsiveFontSize(3),
        fontWeight: '400'
    },
    resetTextStyle:{
        color: '#FFF',
        width: responsiveWidth(20),
        height: responsiveWidth(20),
        margin: responsiveWidth(3),
        fontSize: responsiveFontSize(3),
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingTop: responsiveHeight(3),
    },
    touchImageStyle:{
        height: responsiveWidth(20),
        width: responsiveWidth(20),
        margin: responsiveWidth(3),
        
    }
}