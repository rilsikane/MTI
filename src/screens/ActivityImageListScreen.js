import React,{Component} from 'react';
import {Text,View,Image,FlatList,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {Headers} from '../components/Headers';
import {ImageGalleryPage} from '../components/ImageGalleryPage';

export default class ActivityImageListScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            imageListModalVisibled: false,
            imageIndex: 0,
        }
    }

    renderImageList(){
        return(
            <FlatList
                data={imageList}
                renderItem={this._renderItem}
                style={{marginTop: responsiveHeight(2),alignSelf: 'center',}}            
                //columnWrapperStyle={{alignItems: 'center'}}
                numColumns={4}
                keyExtractor={(item,index)=>index.toString()}
            />
        )
    }

    _renderItem=({item,index})=>(
        <TouchableOpacity style={styles.imageContainerStyle} onPress={()=>this.onImagePress(index)}>
            <Image
                source={item.source}
                resizeMode='cover'
                style={styles.imageListStyle}
            />
        </TouchableOpacity>
    )

    onImagePress(index){
        this.setState({imageIndex: index})
        setTimeout(()=>{
            this.setState({imageListModalVisibled: true})
        },100)
    }

    render(){
        return(
            <View style={styles.activityImageListScreenContainerStyle}>
                <Headers
                    leftIconName='back'
                    headerTitleText='รูปภาพกิจกรรม'
                    back={()=>this.props.navigator.pop()}
                />
                <View style={styles.activityImageListContainerStyle}>
                    <View style={styles.titleContainerStyle}>
                        <Text style={styles.activityTitleTextStyle}>เนรมิตลุคสวยกับเมืองไทยประกันภัย Beauty Workshop by Shiseido</Text>            
                        <Image
                            source={require('../source/icons/iconDotSection01.png')}
                            resizeMode='contain'
                            style={styles.dotSectionImageStyle}
                        />
                        <View style={styles.totalAlbumContainerStyle}>
                            <Image
                                source={require('../source/icons/iconAlbum01.png')}
                                resizeMode='contain'
                                style={styles.albumIconStyle}
                            />
                            <Text style={styles.albumTotalTextStyle}>26 รูป</Text>
                        </View>
                    </View>
                    {this.renderImageList()}
                </View>
                <ImageGalleryPage
                    initialPage={this.state.imageIndex}
                    images={imageList}
                    visible={this.state.imageListModalVisibled}
                    onPageSelected={(index)=>this.setState({imageIndex: index})}
                    onClose={()=>this.setState({imageListModalVisibled: false})}
                />
            </View>
        )
    }
}

let imageList=[
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
    {
        source: {uri: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'}
    },
]

const styles={
    activityImageListScreenContainerStyle:{
        flex: 1,
        backgroundColor: '#FFF',
    },
    activityImageListContainerStyle:{
        flex: 1,
        margin: responsiveWidth(5),
    },
    titleContainerStyle:{
        flexDirection: 'row',
    },
    activityTitleTextStyle:{
        flex: 0.8,
        fontSize: responsiveFontSize(3),
        letterSpacing: 0,
        color: "#1595d3"
    },
    albumTotalTextStyle:{
        fontSize: responsiveFontSize(3),
        letterSpacing: 0,
        color: "#1595d3"
    },
    dotSectionImageStyle:{
        height: '100%',
        opacity: 0.5,
    },
    totalAlbumContainerStyle:{
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    albumIconStyle:{
        height: responsiveHeight(3.16),
    },
    imageContainerStyle:{
        height: responsiveWidth(20),
        width: responsiveWidth(20),
        marginBottom: responsiveHeight(0.5),
        marginLeft: responsiveWidth(1),
        marginRight: responsiveWidth(1),
    },
    imageListStyle:{
        height: responsiveWidth(20),
        width: responsiveWidth(20),
    }
}