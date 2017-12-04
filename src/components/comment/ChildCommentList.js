import React, { Component } from 'react';
import {
  StyleSheet,Dimensions,ScrollView,Image,FlatList,
  View,Text,TouchableOpacity,TextInput,Modal
} from 'react-native';
import {URL_HOME,normalize} from '../../config';
import HTML from 'react-native-render-html';
import { Icon } from 'react-native-elements';
const {height,width} = Dimensions.get('screen');
class ChildCommentList extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	_arr_state: this.props.navigation.state.params.arr_child,id_ckl: this.props.navigation.state.params.id_arr,
	  	_id_ckl: this.props.navigation.state.params.ckl_id,_id_answer: this.props.navigation.state.params.id_aw,
	  	_isLoading: false,_id_del_childComment:[],_temp_id_comment:[],_isComment:'',_temp_comment:'',_stateEditComment:false,
	  	_stateComment:false,
	  };
	}
_renderEditCommit(el){
	console.log(el);
	if(!this.state._temp_id_comment.includes(el.id)){
		return(
			<HTML containerStyle={{paddingLeft: 10}} html={el.content} />
		);
	}else{
		return(
			<HTML containerStyle={{paddingLeft: 10}} html={this.state._temp_comment} />
		);
	}
};
_renderNewChildComment(){

};
_onChildCommentChange(text){
	this.setState({
		_isComment: text,
	});
};
render() {
    return (
     	<View style={styles._row}>
     		<Modal 
				animationType="slide"
				transparent={false}
				visible={this.state._isLoading}
				onRequestClose={() => {alert("Modal has been closed.")}} >
					<View style={styles._img}>
						<Image
							style={{justifyContent: 'center', alignItems: 'center',height: height/10,width: height/10}}
							source={require('../../../images/loading_green.gif')}
					/>
				</View>
			</Modal>
			<Modal
			animationType="slide"	
			transparent={true}
			visible={this.state._stateEditComment}
			onRequestClose={()=>{this.setState({_stateEditComment: !this.state._stateEditComment});}} >
				<View style={[styles._editRow,styles._center]}>
					<View style={styles._editTextComment}>
						<View style={[styles._editHead,styles._center]}>
							<Text style={styles.font_size}>
							  	Sửa bình luận
							</Text>
						</View>
						<View style={styles._editContent}>
							<TextInput
								style={{flex: 1}}
								multiline = {true}
								underlineColorAndroid={'transparent'}
								editable = {true}
								numberOfLines={4}
						        onChangeText={(text) => this.setState({_temp_comment: text})}
						        value={this.state._temp_comment}/>
						</View>
						<View style={styles._editFooter}>
							<TouchableOpacity onPress={()=>{this.setState({_stateEditComment: !this.state._stateEditComment,_temp_comment: this.state._cancel_comment})}} >
								<Text style={[styles.font_size,[styles._buttonComment,{textAlign: 'center'}]]}>
								  	Hủy
								</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>{this._saveEditComment()}}>
								<Text style={[styles.font_size,[styles._buttonComment,{textAlign: 'center'}]]}>
									Lưu			  
								</Text>				
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
     		<View style={styles._sDataChildComment} >
	     		<ScrollView style={styles._sScrollView}>
					<FlatList
						keyExtractor={item=>item.id}
						data={this.state._arr_state}
						renderItem={({item})=>
			     		<View style={[styles._sChildComment,styles._center,{display: this.state._id_del_childComment.includes(item.id)?'none':'flex'}]}>
							<View style={styles._sChildIconUser}>
								<Icon type='font-awesome' color='#F6F7F9' name='user-circle' size={((width-(width/10))/9)} />
			     			</View>
			     			<View style={styles._sContentChildUser}>
								<View style={styles._sNameUser}>
									<Text style={[styles.font_size,{fontWeight: 'bold',textAlign: 'left'  }]} >
								  		{item.user.fullname} 
									</Text>
								</View>
								<View style={styles._sCommentUser}>
									{this._renderEditCommit(item)}
								</View>
								<View style={styles._sChildActionsUser}>
									<TouchableOpacity onPress={()=>{this.setState({_cancel_comment:item.content,_temp_comment: this.state._temp_id_comment.includes(item.id)?this.state._temp_comment:item.content,_temp_id_comment: [item.id],_stateEditComment: !this.state._stateEditComment});}}>
										<Text style={[styles._buttonComment,styles.font_size,{textAlign: 'center'}]}>
										  	Sửa
										</Text>
									</TouchableOpacity>
									<TouchableOpacity>
										<Text style={[styles._buttonComment,styles.font_size,{textAlign: 'center'}]}>
										  	Xóa
										</Text>
									</TouchableOpacity>
			     				</View>
			     			</View>
			     		</View>
			     	}/>
			     	{this.state._stateComment?this._renderNewChildComment():'<View></View>'}
		     	</ScrollView>
		    </View>
     		<View style={styles._sAddCommentChild}>
     			<View style={[styles._minputText]}>
					<TextInput
						style={{flex: 1,borderWidth: 0.3}}
						multiline = {true}
						underlineColorAndroid={'transparent'}
						editable = {true}
						onChangeText={(text) => this.setState({_isComment: text})}
				     	value={this.state._isComment}/>
				</View>
				<View style={[styles._mClickComment,styles._center]}>
					<TouchableOpacity onPress={()=>{this.setState({_isComment:''})}} >
						<Text style={[styles._buttonComment,{textAlign: 'center'}]}>
						  	Cancel
						</Text>
					</TouchableOpacity>
						<Text style={[styles._buttonComment,{textAlign: 'center'}]}>
						  	Send
						</Text>
				</View>
     		</View>
     	</View>
    );
  }
}
const styles = StyleSheet.create({
	_center:{
		justifyContent: 'center',
		alignItems: 'center',  
	},
	font_size:{
		fontSize: normalize,
	},
	_row:{
		flex: 1,
		flexDirection: 'column', 
	},
	_editRow:{
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.3)',
		borderRadius: 5,
	},
	_editTextComment:{
		height: (height/8)*2,
		backgroundColor: 'white',
		width: width-20,
		borderRadius: 5,
	},
	_editHead:{
		flex: 0.2,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	_editContent:{
		flex: 0.5,
		borderTopWidth: 0.3,
		borderBottomWidth: 0.3,
	},
	_editFooter:{
		flex: 0.2,
		borderRadius: 10,
		justifyContent: 'flex-end',
		alignItems: 'center',  
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		flexDirection: 'row',
		paddingRight: 2,
	},
	_sComment:{
		height: height/10,
	},
	_sUser:{
		flex: 1,
		flexDirection: 'row', 
	},
	_sContentUser:{
		flex: 0.8,
		flexDirection: 'column' 
	},
	_sChildComment:{
		flex: 0.75,
		height: height/10,
		width: width,
		flexDirection: 'row',
		backgroundColor: 'white',
		marginBottom: 2,
	},
	_sIconUser:{
		flex: 0.2,
		backgroundColor: 'lightblue',
	},
	_sChildIconUser:{
		flex: 0.2,
	},
	_sContentChildUser:{
		flex: 0.8,
	},
	_sChildActionsUser:{
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	_sDataChildComment:{
		flex: 0.85,
	},
	_sScrollView:{
		height: height,
	},
	_sAddCommentChild:{
		flex: 0.15,
		marginBottom: 2,
		backgroundColor: 'white',
	},
	_minputText:{
		flex: 0.6,
	},
	_mClickComment:{
		flex: 0.4,
		flexDirection: 'row', 
	},
	_img:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',  
	},
	_buttonComment:{
		padding: 2,
		marginLeft: 3,
		borderWidth: 0.3,
		width: width/5,
		borderRadius: 5,	
	},
});


export default ChildCommentList;