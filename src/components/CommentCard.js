import React,{Component} from 'react';
import {Text,View,Image,TouchableOpacity,FlatList} from 'react-native';
import {Item,Input} from 'native-base';
import PropTypes from "prop-types";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import moment from 'moment';
import store from 'react-native-simple-store';
class CommentCard extends Component{

    constructor(props){
        super(props)
        this.state={commentTxt:'',user:{}}
        this.addComment = this.addComment.bind(this);
    }
    async componentDidMount(){
        const user = await store.get("user");
        this.setState({user:user});
    }
    renderCommentList(){
        return(
            <FlatList
                data={this.props.commentList}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
       )
    }

    _renderItem = ({item}) => (
            <View style={styles.commentListSectionStyle}>
                <View style={styles.userThumbnailContainerStyle}>
                    <Image
                        source={{uri: item.member_profile_img}}
                        style={styles.userThumbnailStyle}
                    />
                </View>
                <View style={styles.commentDetailContainerStyle}>
                    <View style={styles.commentTitleContainerStyle}>
                        <Text style={styles.userNameTextStyle}>{item.member_name}</Text>
                        <Text style={styles.commentDateTextStyle}>{moment(item.date).locale('th').format("DD MMM YYYY")}</Text>
                    </View>
                    <Text style={styles.commentDetailTextStyle}>{item.msg}</Text>
                    <Image
                        source={require('../source/images/dotSectionHorizontal.png')}
                        resizeMode='contain'
                        style={styles.commentDotSectionBottomImageStyle}
                    />
                </View>
            </View> 
    );

    _keyExtractor = (item, index) => index.toString();
    async addComment(){
        this.props.onSendMessagePress(this.state.commentTxt);
        this.setState({commentTxt:''});
    }
    render(){
        return(
            <View style={styles.commentContainerStyle}>
                <Image
                    source={require('../source/images/dotSectionHorizontal.png')}
                    resizeMode='contain'
                    style={styles.dotSectionBottomImageStyle}
                />
                <View style={styles.totalCommentContainerStyle}>
                    <Image
                        source={require('../source/icons/iconCommentSelected.png')}
                        resizeMode='contain'
                        style={styles.commentIconStyle}
                    />
                    <Text style={styles.totalCommentTextStyle}>{`ความคิดเห็น [${this.props.commentList.length}]`}</Text>
                </View>
                <View style={styles.commentListContainerStyle}>
                    {this.renderCommentList()}
                    <View style={[styles.commentListSectionStyle,styles.userInputContainerStyle]}>
                        <View style={styles.userThumbnailContainerStyle}>
                            <Image
                                source={{uri:this.state.user.profile_img}}
                                style={styles.userThumbnailStyle}
                            />
                        </View>
                        <Item style={styles.commentInputContainerStyle}>
                            <Input 
                                placeholder='ความคิดเห็นของคุณ...'
                                placeholderTextColor='rgba(145, 145, 149, 0.44)'
                                value={this.state.commentTxt}
                                onChangeText={val=>this.setState({commentTxt:val})}
                                onSubmitEditing={() => {
                                   this.addComment();
                                }}
                                returnKeyType="send"
                                onSubmitEditing={()=> {
                                    this.addComment();
                                 }}
                            />
                            <TouchableOpacity onPress={()=>
                                this.addComment()
                            }
                            >
                                <Image
                                    source={require('../source/icons/iconSendMessage.png')}
                                    resizeMode='contain'
                                    style={styles.sendMessageIconStyle}
                                />
                            </TouchableOpacity>
                        </Item>
                    </View>
                </View>
            </View>
        )
    }
}

const styles={
    commentContainerStyle:{
      
    },
    dotSectionBottomImageStyle:{
        width: '100%',
        opacity: 0.3,
        marginTop: responsiveHeight(2.5),
        marginBottom: responsiveHeight(1),
    },
    totalCommentContainerStyle:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentIconStyle:{
        height: responsiveHeight(2.81),
        width: responsiveWidth(5.15),
        marginRight: responsiveWidth(1.5),
    },
    totalCommentTextStyle:{
        letterSpacing: 0,
        color: "#1595d3",
        fontSize: responsiveFontSize(2.8)
    },
    commentListContainerStyle:{
        marginTop: responsiveHeight(1),
    },
    commentListSectionStyle:{
        flexDirection: 'row',
    },
    userThumbnailContainerStyle:{
        height: responsiveHeight(3.96),
        flex: 0.1,
    },
    userThumbnailStyle:{
        height: responsiveHeight(3.96),
        width: responsiveHeight(3.96),
        borderRadius: responsiveHeight(1.98),
        borderWidth: 1,
        borderColor: "rgba(168, 168, 170, 0.5)",
        marginTop: responsiveHeight(0.5),
    },
    commentDetailContainerStyle:{
        flex: 0.9,
    },
    commentTitleContainerStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userNameTextStyle:{
        letterSpacing: 0,
        color: "#1595d3",
        fontSize: responsiveFontSize(2.2),
    },
    commentDateTextStyle:{
        letterSpacing: 0,
        color: "rgba(145, 145, 149, 0.69)",
        fontSize: responsiveFontSize(2),
    },
    commentDetailTextStyle:{
        letterSpacing: 0,
        color: "#919195",
        fontSize: responsiveFontSize(2.15),
    },
    commentDotSectionBottomImageStyle:{
        width: '100%',
        opacity: 0.3,
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(1),
    },
    commentInputContainerStyle:{
        flex: 0.9,
        height: responsiveHeight(4.1)
    },
    sendMessageIconStyle:{
        height: responsiveHeight(2.81),
    },
    userInputContainerStyle:{
        marginTop: responsiveHeight(1),
    }
}

export {CommentCard}