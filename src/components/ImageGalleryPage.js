import React,{Component} from 'react';
import {Text,View,Modal,Image,TouchableOpacity,Dimensions} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ImageViewer from 'react-native-image-zoom-viewer';
import Carousel from 'react-native-looped-carousel';

class ImageGalleryPage extends Component{

    constructor(props){
        super(props)
    }

    renderImageList(){
        return(
            <ImageViewer 
                imageUrls={this.props.data}        
                style={{flex:1}}
                //show={true}
                backgroundColor='#000'
                index={this.props.index}
                onSwipeDown={this.props.onClose}
                renderIndicator={()=>null}
                onChange={this.props.onChange}
            />
        )
    }
   

    render(){
        return(
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.visible}
                onRequestClose={()=>{}}
            >
                <View style={styles.modalTitleContainerStyle}>
                    <TouchableOpacity onPress={this.props.onClose}>
                        <Image
                            source={require('../source/icons/btnCloseWhite.png')}
                            resizeMode='contain'
                            style={styles.closeIconImageStyle}
                        />
                    </TouchableOpacity>
                    <Text style={styles.imageNumberTextStyle}>{this.props.index+1}/{this.props.data.length}</Text>
                </View>
                <View style={styles.imageLsitContainerStyle}>
                    {this.renderImageList()}
                </View>
                <View style={styles.imageDescContainerStyle}>
                    <Text style={styles.imageDescTextStyle}>ภาพจากกิจกรรม : {this.props.title}</Text>
                </View>
            </Modal>
        )
    }
}

const styles={
    imageGalleryPageContainerStyle:{
        flex: 1,
    },
    modalTitleContainerStyle:{
        flexDirection: 'row',
        backgroundColor: '#000',
        flex: 0.1,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingLeft: responsiveWidth(5),
        paddingRight: responsiveWidth(5),
    },
    imageNumberTextStyle:{
        color: '#FFF',
        fontSize: responsiveFontSize(3),
    },
    closeIconImageStyle:{
        height: responsiveHeight(2.46),
        opacity: 0.7,
    },
    imageLsitContainerStyle:{
        flex: 0.8, 
        backgroundColor: '#000',
    },
    imageDescContainerStyle:{
        flex: 0.1,
        backgroundColor: '#000',
    },
    imageDescTextStyle:{
        fontSize: responsiveFontSize(2.15),
        letterSpacing: 0,
        color: "#FFF",
        flex: 1,
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
    }

}

export {ImageGalleryPage}