import React,{Component} from 'react';
import {Text,View,Modal,Image,TouchableOpacity,Dimensions} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Gallery from 'react-native-image-gallery';

class ImageGalleryPage extends Component{

    constructor(props){
        super(props)
        this.state={
            pageIndex: 1,
        }
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
                    <Text style={styles.imageNumberTextStyle}>{this.props.initialPage+1}/{this.props.images.length}</Text>
                </View>
                <Gallery
                    style={styles.galleryContainerStyle}
                    images={this.props.images}
                    pageMargin={responsiveWidth(5)}
                    scrollViewStyle={styles.scrollViewStyle}
                    initialPage={this.props.initialPage}
                    onPageSelected={this.props.onPageSelected}
                    flatListProps={{initialNumToRender: this.props.initialPage}}
                />
                <View style={styles.imageDescContainerStyle}>
                    <Text style={styles.imageDescTextStyle}>ภาพจากกิจกรรม : เนรมิตลุคสวยกับเมืองไทยประกันภัย Beauty Workshop by Shiseido</Text>
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
    galleryContainerStyle:{
        flex: 0.8, 
        backgroundColor: 'black',
    },
    scrollViewStyle:{
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
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