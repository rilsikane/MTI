import React,{Component} from 'react';
import {Text,View,FlatList} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Spinner from 'react-native-loading-spinner-overlay';

import {Headers} from '../components/Headers';
import {MainSearchBox} from '../components/MainSearchBox';
import {DashboardActivityCard} from '../components/DashboardActivityCard';

export default class ActivityListScreen extends Component{

    constructor(props){
        super(props)
        this.state={
            searchValue: '',
            isLoading: false,
        }
    }

    _onSearchIconPress(){

    }

    renderActivityList(){  
        return(
            <FlatList
                data={[{},{},{}]}
                renderItem={this.renderActivityCard}
                keyExtractor={(item,index)=>index.toString()}
                contentContainerStyle={styles.activityContainerStyle}
            />
        )
    }

    renderActivityCard=({item,index})=>(
        <DashboardActivityCard 
            bannerUri={require('../source/images/activityImg05.png')}
            iconText={'15'}
            iconTitleText={'มกราคม'}
            activityTitleText='Chef for a Day'
            activityDetailText='Cupcake Workshops & Master classes'
            style={[styles.activityCardStyle,index==0&&styles.firstItemStyle]}
            onPress={()=>this.onActivityCardPress(item)}
        />
    )

    onActivityCardPress(item){
        
    }

    render(){
        return(
            <View style={styles.activityListScreenContainerStyle}>
                <Headers
                    leftIconName='cancel'
                    headerTitleText='ค้นหากิจกรรม'
                    rightIconName='iconBell'
                    cancel={()=>this.props.navigator.pop()}
                    withSearch
                />
                <MainSearchBox
                    value={this.state.searchValue}
                    onChangeText={(searchValue)=>this.setState({searchValue})}
                    onSearchIconPress={this._onSearchIconPress}
                    placeholder='ค้นหากิจกรรมคุณต้องการ'
                    noneMap
                />
                <View style={styles.activityListContainerStyle}>
                    {this.renderActivityList()}
                </View>
                {this.state.isLoading && <Spinner visible={this.state.isLoading}  textStyle={{color: '#FFF'}} />}
            </View>
        )
    }
}

const styles={
    activityListScreenContainerStyle:{
        flex: 1,
    },
    activityListContainerStyle:{
        flex: 1,
    },
    activityCardStyle:{
        width: responsiveWidth(90),
        marginBottom: responsiveHeight(1),
    },
    firstItemStyle:{
        marginTop: responsiveHeight(5)
    },
    activityContainerStyle:{
        alignItems: 'center',
    },

}