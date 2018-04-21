import React,{Component} from 'react';
import {Text,View,FlatList,Image,ScrollView,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from './../components/Headers';

export default class QAndAScreen extends Component{

    constructor(props){
        super(props)

    }

    renderQAndAList(){
        let qAndA = [
            {
                question: 'กรณีที่โทรศัพท์เคลื่อนที่ของคุณไม่สามารถใช้งานได้ตามปกติควรตรวจสอบอย่างไร ?',
                answer: 'จ่ายตามจริง ไม่เกินวันละ 1,000 บาท และสูงสุดรวมกันไม่เกิน 100,000 บาทตลอดระยะเวลาเอาประกันภัย',
                isSelected: false,
            },
            {
                question: 'การชดใช้ค่าสินไหมทดแทนสำหรับค่าเช่าที่อยู่ชั่วคราว ?',
                answer: 'จ่ายตามจริง ไม่เกินวันละ 1,000 บาท และสูงสุดรวมกันไม่เกิน 100,000 บาทตลอดระยะเวลาเอาประกันภัย',
                isSelected: true,
            },
            {
                question: 'ค่าใช้จ่ายในการดำเนินงานในส่วนนี้จะมีแนวโน้มเพิ่มขึ้นเรื่อยๆ หรือไม่และถ้าเพิ่มขึ้นจะเพิ่มขึ้นอีกกี่ไตรมาส ?',
                answer: 'จ่ายตามจริง ไม่เกินวันละ 1,000 บาท และสูงสุดรวมกันไม่เกิน 100,000 บาทตลอดระยะเวลาเอาประกันภัย',
                isSelected: false,
            },
            {
                question: 'ถ้าค่าใช้จ่ายในการดำเนินงานไม่เพิ่มแล้ว ค่าใช้จ่ายส่วนนี้จะคงอยู่เป็น fixed cost เลยหรือเปล่า หมายถึงในอนาคตจะลดลงได้ไหม ?',
                answer: 'จ่ายตามจริง ไม่เกินวันละ 1,000 บาท และสูงสุดรวมกันไม่เกิน 100,000 บาทตลอดระยะเวลาเอาประกันภัย',
                isSelected: false,
            },
            {
                question: 'ค่าใช้จ่ายส่วนนี้จะคงอยู่เป็น fixed cost เลยหรือเปล่าหมายถึงในอนาคตจะลดลงได้ไหม ?',
                answer: 'จ่ายตามจริง ไม่เกินวันละ 1,000 บาท และสูงสุดรวมกันไม่เกิน 100,000 บาทตลอดระยะเวลาเอาประกันภัย',
                isSelected: false,
            },
            {
                question: 'ค่าใช้จ่ายส่วนนี้จะคงอยู่เป็น fixed cost เลยหรือเปล่าหมายถึงในอนาคตจะลดลงได้ไหม ?',
                answer: 'จ่ายตามจริง ไม่เกินวันละ 1,000 บาท และสูงสุดรวมกันไม่เกิน 100,000 บาทตลอดระยะเวลาเอาประกันภัย',
                isSelected: false,
            },
            {
                question: 'กรณีที่โทรศัพท์เคลื่อนที่ของคุณไม่สามารถใช้งานได้ตามปกติควรตรวจสอบอย่างไร ?',
                answer: 'จ่ายตามจริง ไม่เกินวันละ 1,000 บาท และสูงสุดรวมกันไม่เกิน 100,000 บาทตลอดระยะเวลาเอาประกันภัย',
                isSelected: false,
            },
        ]

        return(
            <FlatList
                data={qAndA}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        )
    }

    _renderItem = ({item}) => (
       <TouchableOpacity>
            <View style={styles.questionContainerStyle}>
                    <Image
                        source={item.isSelected?require('../source/icons/iconQSelected.png'):require('../source/icons/iconQ.png')}
                        resizeMode='contain'
                        style={styles.questionIconStyle}
                    />
                    <Text style={[styles.questionTextStyle,item.isSelected&&{color: 'rgb(253,98,98)'}]}>{item.question}</Text>
            </View>
            {item.isSelected&&
            <View style={styles.answerContainerStyle}>
                    <Image
                        source={require('../source/icons/iconASelected.png')}
                        resizeMode='contain'
                        style={styles.answerIconStyle}
                    />
                    <Text style={styles.answerTextStyle}>{item.answer}</Text>
            </View>}
            <Image
                source={require('../source/images/dotSectionHorizontal.png')}
                resizeMode='contain'
                style={styles.dotSectionImageStyle}
            />
       </TouchableOpacity>
    );

    _keyExtractor = (item, index) => index.toString();

    render(){
        return(
            <View style={styles.qAndAScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='คำถามที่พบบ่อย'
                />
                <ScrollView style={{flex: 1,}}>
                    <View style={styles.qAndAContainerStyle}>
                        {this.renderQAndAList()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles={
    qAndAScreenContainerStyle:{
        flex: 1,
    },
    qAndAContainerStyle:{
        flex: 1,
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
        marginTop: responsiveHeight(3.5)
    },
    questionContainerStyle:{
        flexDirection: 'row',
    },
    questionIconStyle:{
        height: responsiveHeight(2.46),
        width: responsiveHeight(2.46),
        opacity: 0.5,
        marginTop: responsiveHeight(0.3),
        marginRight: responsiveWidth(2),
    },
    questionTextStyle:{
        letterSpacing: 0,
        color: "#1595d3",
        fontSize: responsiveFontSize(2.7),
        flex: 1,
    },
    answerContainerStyle:{
        flexDirection: 'row',
        marginLeft: responsiveWidth(5.3),
        marginTop: responsiveHeight(1),
    },
    answerIconStyle:{
        height: responsiveHeight(2.2),
        opacity: 0.5,
        marginTop: responsiveHeight(0.3),
    },
    answerTextStyle:{
        letterSpacing: 0,
        color: "#777777",
        fontSize: responsiveFontSize(2.2),
        flex: 1,
    },
    dotSectionImageStyle:{
        width: '100%',
        opacity: 0.3,
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
        alignSelf: 'center',
    },
}