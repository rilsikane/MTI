import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity,FlatList} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PopupDialog,{ SlideAnimation }  from 'react-native-popup-dialog';

class ImageListPopup extends Component{

    constructor(props){
        super(props)

    }

    renderImageList(){
        return(
            <FlatList
                data={this.props.data}
                contentContainerStyle={{alignItems: 'center',}}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
            />
        )
    }

    _renderItem=({item})=>(
        <Image
            source={item.uri}
            style={styles.imageListStyle}
            borderRadius={3}
        />
    )

    _keyExtractor=(item,index)=> index.toString()


    render(){
        return(
            <PopupDialog
                width={responsiveWidth(90)}
                height={responsiveHeight(70)}
                dialogStyle={styles.popupContainerStyle}
                containerStyle={styles.popupLayoutContainerStyle}
                dialogAnimation={slideAnimation}
                show={this.props.show}
                onDismissed={this.props.onDismissed}
            >
            <View style={styles.popupSectionStyle}>
                <TouchableOpacity onPress={this.props.onClose}>
                    <Image
                        source={require('./../source/icons/btnClose01.png')}
                        style={styles.btnCloseImageStyle}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                <View style={styles.popupSectionStyle}>
                    <Text style={styles.popupTitleTextStyle}>{this.props.title}</Text>
                    {this.renderImageList()}
                </View>
            </View>
            </PopupDialog>
        )
    }
}

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
})

const styles={
    popupContainerStyle:{
        borderRadius: 3,
        padding: responsiveWidth(4),

    },
    popupSectionStyle:{
        flex: 1,
    },
    popupLayoutContainerStyle:{
        justifyContent: 'flex-start',
        paddingTop: responsiveHeight(10),
        zIndex: 100,
        //backgroundColor:"#fff"
    },
    btnCloseImageStyle:{
        height: responsiveHeight(2.81),
        alignSelf: 'flex-end',
        opacity: 0.3,
    },
    popupTitleTextStyle:{
        fontSize: responsiveFontSize(3),
        letterSpacing: 0,
        color: "#1595d3",
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(1),
    },
    imageListStyle:{
        width: responsiveWidth(80),
        height: responsiveHeight(20),
        marginBottom: responsiveHeight(2)
    }
}

export {ImageListPopup}