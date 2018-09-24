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
            gallery:[]
        }
    }
    componentDidMount(){
        let gallery = this.props.detail.gallery.map(gal => 
            {
                return {url:gal}
            });
        this.setState({gallery:gallery});
    }

    renderImageList(){
        if(this.state.gallery){
       
        return(
            <FlatList
                data={this.state.gallery}
                renderItem={this._renderItem}
                style={{marginTop: responsiveHeight(2),alignSelf: 'center',}}            
                //columnWrapperStyle={{alignItems: 'center'}}
                numColumns={4}
                keyExtractor={(item,index)=>index.toString()}
            />
        )
        }else{
            return null;
        }
    }

    _renderItem=({item,index})=>(
        <TouchableOpacity style={styles.imageContainerStyle} onPress={()=>this.onImagePress(index)}>
            <Image
                source={{uri: item.url}}
                resizeMode='cover'
                style={styles.imageListStyle}
            />
        </TouchableOpacity>
    )

    onImagePress(index){
        this.setState({imageIndex: index})
        setTimeout(()=>{
            this.setState({imageListModalVisibled: true})
        },50)
    }

    onImageChange(index){
        this.setState({imageIndex: index})
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
                        <Text style={styles.activityTitleTextStyle}>{this.props.detail.title}</Text>            
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
                            <Text style={styles.albumTotalTextStyle}>{this.props.detail.gallery.length} รูป</Text>
                        </View>
                    </View>
                    {this.renderImageList()}
                </View>
                <ImageGalleryPage
                    index={this.state.imageIndex}
                    onChange={(index)=>this.onImageChange(index)}
                    data={this.state.gallery}
                    title={this.props.detail.title}
                    visible={this.state.imageListModalVisibled}
                    onClose={()=>this.setState({imageListModalVisibled: false})}
                   
                />
            </View>
        )
    }
}

let imageList=[
    {url: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'},
    {url: 'http://www.acnews.net/admin/img_large/1249024.jpg'},
    {url: 'http://www.insure3plus.com/Img/ProductImg/11032015_135536_Muangthaiinsurance-2Plus-X8.png'},
    {url: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'},
    {url: 'http://www.insure3plus.com/Img/ProductImg/11032015_135536_Muangthaiinsurance-2Plus-X8.png'},
    {url: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'},
    {url: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'},
    {url: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'},
    {url: 'http://www.acnews.net/admin/img_large/1249024.jpg'},
    {url: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'},
    {url: 'http://www.insure3plus.com/Img/ProductImg/11032015_135536_Muangthaiinsurance-2Plus-X8.png'},
    {url: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'},
    {url: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'},
    {url: 'http://www.acnews.net/admin/img_large/1249024.jpg'},
    {url: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'},
    {url: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'},
    {url: 'http://www.acnews.net/admin/img_large/1249024.jpg'},
    {url: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'},
    {url: 'http://www.insure3plus.com/Img/ProductImg/11032015_135536_Muangthaiinsurance-2Plus-X8.png'},
    {url: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'},
    {url: 'http://www.acnews.net/admin/img_large/1249024.jpg'},
    {url: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'},
    {url: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'},
    {url: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'},
    {url: 'http://www.acnews.net/admin/img_large/1249024.jpg'},
    {url: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'},
    {url: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'},
    {url: 'http://woaiyn.com/wp-content/uploads/2017/10/news_2769.jpg'},
    {url: 'http://www.insure3plus.com/Img/ProductImg/11032015_135536_Muangthaiinsurance-2Plus-X8.png'},
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