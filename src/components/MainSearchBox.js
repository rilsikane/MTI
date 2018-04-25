import React,{Component} from 'react';
import {Text,View,TextInput,Image,TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class MainSearchBox extends Component{

    constructor(props){
        super(props)

    }

    render(){
        return(
            <View style={styles.searchBoxContainerStyle}>
                <View style={styles.textInputContainerStyle}>
                    <TextInput
                        value={this.props.value}
                        onChangeText={this.props.onChangeText}
                        placeholder={this.props.placeholder}
                        underlineColorAndroid='transparent'
                        style={styles.searchInputStyle}
                    />
                    <Image
                        source={require('../source/icons/iconSearch.png')}
                        resizeMode='contain'
                        style={styles.searchIconStyle}
                    />
                </View>
                <TouchableOpacity onPress={this.props.onPress} style={styles.searchButtonContainerStyle}>
                    <Image
                        source={require('../source/icons/iconLocation.png')}
                        resizeMode='contain'
                        style={styles.locationIconStyle}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles={
    searchBoxContainerStyle:{
        height: responsiveHeight(7.1),
        width: responsiveWidth(90),
        flexDirection: 'row',
        alignSelf: 'center',
        position: 'absolute',
        marginTop: responsiveHeight(10),
        borderRadius: 4,
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
          width: 1.5,
          height: 2.6
        },
        shadowRadius: 10,
        shadowOpacity: 1,
        elevation: 3,
        zIndex:9999
    },
    textInputContainerStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        flex: 0.87,
        paddingLeft: responsiveWidth(3),
        paddingRight: responsiveWidth(3),
    },
    searchInputStyle:{
        flex: 1,
        fontSize: responsiveFontSize(2.2),
        color: '#919195',
        backgroundColor: '#FFF',
        letterSpacing: 0,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
   
    },
    searchIconStyle:{
        height: responsiveHeight(3.52),
        opacity: 0.6,
    },
    searchButtonContainerStyle:{
        flex: 0.13,
        backgroundColor: '#fd6262',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationIconStyle:{
        height: responsiveHeight(3.52),
    }
}

export {MainSearchBox}