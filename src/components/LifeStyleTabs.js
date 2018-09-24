import React,{Component} from 'react';
import {Text,View,Image,ScrollView} from 'react-native';
import PropTypes from "prop-types";
import {Tab,Tabs,TabHeading,ScrollableTab} from 'native-base';
import {responsiveHeight,responsiveWidth,responsiveFontSize} from 'react-native-responsive-dimensions';
import FastImage from 'react-native-fast-image'
class LifeStyleTabs extends Component{

    constructor(props){
        super(props)
        this.state={
            tabIndex: 0,
            previousTabIndex: 0,
        }
    }

    renderTab(){
        let tab=[
            {
                activeIcon: require('../source/icons/iconTabsActiveAll.png'),
                inActiveIcon: require('../source/icons/iconTabsInActiveAll.png'),
                title: 'All',
            },
            {
                activeIcon: require('../source/icons/iconTabsActiveHot.png'),
                inActiveIcon: require('../source/icons/iconTabsInActiveHot.png'),
                title: 'Hot',
            },
            {
                activeIcon: require('../source/icons/iconTabsActiveHealth.png'),
                inActiveIcon: require('../source/icons/iconTabsInActiveHealth.png'),
                title: 'Health and Beauty',
            },
            {
                activeIcon: require('../source/icons/iconTabsActiveEat.png'),
                inActiveIcon: require('../source/icons/iconTabsInActiveEat.png'),
                title: 'Eat and About',
            },
            {
                activeIcon: require('../source/icons/iconTabsActiveLeisure.png'),
                inActiveIcon: require('../source/icons/iconTabsInActiveLeisure.png'),
                title: 'Leisure and Travel',
            },
        ]

        // tab[this.props.tabIndex].isActive = true
        // if(this.props.tabIndex!=this.props.previousTabIndex){
        //     tab[this.props.previousTabIndex].isActive = false
        // }
        
        return this.props.data.map((tab)=>
            <Tab 
                key={tab.id} 
                heading={
                    <TabHeading 
                        style={styles.tabHeadingStyle}
                    >
                        <FastImage
                            //source={tab.isActive?tab.activeIcon:tab.inActiveIcon}
                            source={tab.icon_url ? {uri:tab.icon_url}:tab.icon}
                            resizeMode='contain'
                            //style={[styles.tabIconStyle,tab.isActive?{}:styles.inActiveIconStyle]}
                            style={[styles.tabIconStyle,]}
                        />
                        {/* <Text style={[styles.tabTitleTextStyle,tab.isActive?styles.tabTitleActiveTextStyle:{}]}>{tab.name}</Text> */}
                        <Text style={[styles.tabTitleTextStyle,]}>{tab.name}</Text>
                    </TabHeading>
                }
            >
                <ScrollView contentContainerStyle={styles.tabContentStyle}>
                    {this.props.tabChildren}
                </ScrollView>
            </Tab>
        )
    }

    render(){
        return(
            <View style={styles.tabsContainerStyle}>
                <Tabs               
                    page={this.props.page}
                    tabBarUnderlineStyle={styles.tabBarUnderlineStyle} 
                    style={[styles.tabsStyle,this.props.style]}
                    initialPage={0} 
                    onChangeTab={this.props.onChangeTab}
                    renderTabBar={()=> <ScrollableTab/>}     
                >
                    {this.renderTab()}
                </Tabs>
            </View>
        )
    }
}

const styles={
    tabsContainerStyle:{
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    tabBarUnderlineStyle:{
        backgroundColor: '#1595d3',
        height: responsiveHeight(0.26),
    },
    tabsStyle:{
        marginTop: responsiveHeight(4),
    },
    tabHeadingStyle:{
        flexDirection: 'column',
        backgroundColor: 'transparent',
    },
    tabIconStyle:{
        height: responsiveHeight(3.52),
        width: responsiveHeight(3.52),
    },
    inActiveIconStyle:{
        opacity: 0.3,
    },
    tabTitleTextStyle:{
        fontSize: responsiveFontSize(2.15),
        color: '#919195',
        letterSpacing: 0,
    },
    tabTitleActiveTextStyle:{
        color: '#1595d3',
    },
    tabContentStyle:{
        // flex: 1,
        alignItems: 'center',
        marginTop: responsiveHeight(3)
    }
}

export {LifeStyleTabs}