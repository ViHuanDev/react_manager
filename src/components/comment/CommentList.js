import React, { Component } from 'react';
import {URL_HOME,normalize} from '../../config';
import {
  StyleSheet,Dimensions,AsyncStorage,Text,TouchableOpacity,TextInput,ScrollView,
  View,Modal,Image,FlatList,WebView
} from 'react-native';
import { Icon } from 'react-native-elements';
import HTML from 'react-native-render-html';
const {height,width} = Dimensions.get('screen');
// const htmlContent = `<p style="margin: 0 !important">This HTML snippet is now rendered with native components !</p>`;
export default class CommentList extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	checklist_id: this.props.navigation.state.params.checklist_id,id_answer: this.props.navigation.state.params.id_answer,
	  	_isLoading: true,array_comment:[],array_child:[],_ChildComment: false,temp_com:[],_isComment:'',_stateEditComment:false,
	  	_temp_comment:'',_temp_id_comment:[],_cancel_comment:'',
	  };
	};
	componentWillMount(){
	AsyncStorage.getAllKeys((err, keys) => { 
        AsyncStorage.multiGet(keys).then((value)=>{
		console.log(this.state.checklist_id+'---'+this.state.id_answer);
		fetch(URL_HOME+'/api/comments?token='+value[3][1]+'&checklist_id='+this.state.checklist_id+'&id='+this.state.id_answer)
		.then((response) => response.json()).then((responseJson)=> {
					this.setState({
						array_comment: responseJson,
						_isLoading: false,
					});
					// console.log(responseJson);
				}) .catch((error) => { 
					console.error(error); 
				});
		});
    });
};
_onCommentChange(text){
	this.setState({
		_isComment: text,
	});
};
_onSendComment(){
	var content = this.state._isComment;
	// alert(this.state._isComment+'log');
	AsyncStorage.getAllKeys((err, keys) => { 
        AsyncStorage.multiGet(keys).then((value)=>{
			fetch(URL_HOME+'/api/comments?token='+value[3][1],{
				method: 'POST',
				headers:{
					'Accept': 'application/json',
				    'Content-Type': 'application/json',
				},
				body:JSON.stringify({
					"checklist_id": this.state.checklist_id,
				    "content": content,
				    "id": this.state.id_answer,
				})
			}).then((response)=>response.json()).then((responseJson)=>{
				console.log(responseJson);
				this.setState({
					_isComment: '',
				});
				alert("Success");
			});
    	});
	});
};
_saveComment(){
	AsyncStorage.getAllKeys((err, keys) => { 
        AsyncStorage.multiGet(keys).then((value)=>{
			fetch(URL_HOME+'/api/comments/'+this.state._temp_id_comment,{
				method: 'PUT',
				headers:{
					'Accept': 'application/json',
				    'Content-Type': 'application/json',
				},
				body:JSON.stringify({
				    "content": this.state._temp_comment,
				    "token": value[3][1],
				})
			}).then((response)=>response.json()).then((responseJson)=>{
				console.log(responseJson);
				this.setState({
					_stateEditComment: !this.state._stateEditComment,
					_temp_comment: responseJson.content,
				});
				console.log("Success");
			});
    	});
	});
}
_renderChildComment(){
	console.log(this.state.temp_com.child);
	this.setState({
		_ChildComment: !this.state._ChildComment,
	});
	// var arr = el.child;
	// var temp=[];
	// if(arr.length>0){
	// 	for(let i=0;i < arr.length;i++){
	// 		temp.push(
	// 			<View style={[styles._sChildComment,styles._center]}>
	// 				<View style={styles._sChildIconUser}>
	// 					<Icon type='font-awesome' color='#F6F7F9' name='user-circle' size={((width-(width/10))/9)} />
	// 				 			</View>
	// 				 			<View style={styles._sContentChildUser}>
	// 					<View style={[styles._sNameUser,{flex: 0.4}]}>
	// 						<Text style={[styles.font_size,{textAlign: 'left'  }]} >
	// 					  		{arr[i].updated_at}
	// 						</Text>
	// 					</View>
	// 					<View style={[styles._sCommentUser,{flex: 0.6}]}>
	// 						<Text>
	// 						  	{arr[i].content}
	// 						</Text>
	// 					</View>
	// 					<View style={styles._sChildActionsUser}>
	// 						<TouchableOpacity>
	// 							<Text style={[styles._editComment,styles.font_size]}>
	// 							  	Sửa
	// 							</Text>
	// 						</TouchableOpacity>
	// 						<TouchableOpacity>
	// 							<Text style={[styles._delComment,styles.font_size]}>
	// 							  	Xóa
	// 							</Text>
	// 						</TouchableOpacity>
	// 				 	</View>
	// 				</View>
	// 			</View>
	// 		);
	// 	}
	// }
	// return temp;
};
_rederEditCoomit(el){
	if(!this.state._temp_id_comment.includes(el.id)){
		return(
			<HTML containerStyle={{paddingLeft: 10}} html={el.content} />
		);
	}else{
		return(
			<Text style={{paddingLeft: 10}}>
			  	{this.state._temp_comment}
			</Text>
		);
	}
}
_renderComment(){
	var arr = this.state.array_comment;
	var temp = [];
	for(let i=0;i<arr.length;i++){
	    temp.push(
	    	<View key={"Comment"+arr[i].id} style={styles._mItemsComment}>
				<View style={[styles._mitemUser,{justifyContent: 'flex-start'}]}>
					<Icon type='font-awesome' color='#F6F7F9' name='user-circle' size={((width-30)/9)} />
				</View>
				<View style={styles._mitemContent}>
					<View style={styles._itemText}>
						<Text style={[styles.font_size,{fontWeight: 'bold',textAlign: 'left'  }]} >
						  	{arr[i].user.fullname} 
						</Text>
					</View>
					<View style={styles._itemText}>
						<View style={styles._mItemText}>
							<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Screen_ChildCommentList',{arr_child: arr[i].child,id_arr: arr[i].id})}}>
								{this._rederEditCoomit(arr[i])}
							</TouchableOpacity>
							<TouchableOpacity   onPress={()=>{this.props.navigation.navigate('Screen_ChildCommentList',{arr_child: arr[i].child,id_arr: arr[i].id})}}>
								<Text style={{textDecorationLine: 'underline',paddingLeft: 30 }}>
								  	{arr[i].child.length} trả lời
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles._textActions}>
						<TouchableOpacity onPress={()=>{this._showRepComment()}} >
							<Text style={[styles._repComment,styles.font_size]}>
							  	Trả lời
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles._buttonClick} onPress={()=>{this.setState({_cancel_comment:arr[i].content,_temp_comment: arr[i].content,_temp_id_comment: [arr[i].id],_stateEditComment: !this.state._stateEditComment});}} >
							<Text style={[styles._editComment,styles.font_size]}>
							  	Sửa
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles._buttonClick}>
							<Text style={[styles._delComment,styles.font_size]}>
							  	Xóa
							</Text>
						</TouchableOpacity>
					</View>
					<View style={[styles._actionRepComment,{display: 'none' }]}>
						<View style={[styles._repUser,styles._center]}>
							<Icon type='font-awesome' color='#F6F7F9' name='user-circle' size={15} />
						</View>
						<View style={styles._repTextInput}>
							<TextInput style={{borderWidth: 0.3,borderRadius: 3,fontSize: 10,height: 20,paddingTop: 2,paddingBottom: 2}}
								multiline={true}
								value={this.state._isComment}
								onChangeText={(text)=>{this._onCommentChange(text)}}
								underlineColorAndroid='transparent'/>
						</View>
						<View style={[styles._repActions,styles._center]}>
							<TouchableOpacity onPress={()=>{this._onSendComment(arr[i].id)}} style={{ paddingHorizontal: 1 }} ><Text style={{fontSize:9, color: 'black' }} >Cancel</Text></TouchableOpacity>
							<TouchableOpacity style={{ paddingHorizontal: 1 }} ><Text style={{fontSize:9, color: 'black'}} >Save</Text></TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
	    );
	}
	return temp;
};
_keyExtractor = (item, index) => item.id;
  render() {
    return (
      <View style={[styles._row]}>
      	<Modal 
			animationType="slide"
			transparent={false}
			visible={this.state._isLoading}
			onRequestClose={() => {alert("Modal has been closed.")}} >
				<View style={styles._img}>
					<Image
						style={{justifyContent: 'center', alignItems: 'center',height: height/10,width: height/10}}
						source={require('../../images/loading_green.gif')}
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
						<View style={styles._editHead}>
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
								<Text style={styles.font_size}>
								  	Hủy
								</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>{this._saveComment()}}>
								<Text style={styles.font_size}>
									Lưu			  
								</Text>				
							</TouchableOpacity>
						</View>
					</View>
				</View>
		</Modal>
		<View style={[styles._mRowComment,styles._center]}>
			<View style={styles._mbodyComment}>
				<View style={styles._mheadComment}>
					<Text style={styles._textCenter}>
					  	Comment
					</Text>
				</View>
				<View style={styles._mdataComment}>
					<ScrollView contentContainerStyle={styles._mScrolView}>
						{this._renderComment()}
					</ScrollView>
					<View style={styles._mtextComment}>
						<View style={[styles._minputText]}>
							<TextInput style={{borderWidth: 0.3,borderRadius: 3}}
								value={this.state._isComment}
								onChangeText={(text)=>this._onCommentChange(text)}
								underlineColorAndroid='transparent'/>
						</View>
						<View style={[styles._mClickComment,styles._center]}>
							<TouchableOpacity onPress={()=>{this._closeComment()}} >
								<Text style={styles._buttonComment}>
								  	Cancel
								</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>{this._onSendComment()}}>
								<Text style={styles._buttonComment}>
								  	Save
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
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
		// flexDirection: 'row',
		backgroundColor: 'white',
		borderRadius: 5,
	},
	_editRow:{
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.3)',
	},
	_editTextComment:{
		height: (height/8)*2,
		backgroundColor: 'white',
		width: width-20,
		borderRadius: 5,
	},
	_editHead:{
		flex: 0.2,
		backgroundColor: 'cyan',
	},
	_editContent:{
		flex: 0.6,
	},
	_editFooter:{
		flex: 0.2,
		backgroundColor: 'yellow',
	},
	_mRowComment:{
		width: width,
		height: height,
		backgroundColor: 'rgba(0,0,0,0.3)',
	},
	_rowChildComment:{
		flex: 1,
		padding: width/20,
		backgroundColor: 'rgba(0,0,0,0.3)',
	},
	_mbodyComment:{
		backgroundColor: 'white',
		width: width,
		height: height,
		flexDirection: 'column',
	},
	_mheadComment:{
		height: ((height)/20),
	},
	_mdataComment:{
		height: ((height)/10)*7.5,
	},
	_mScrolView:{
	},
	_img:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',  
	},
	_mItemsComment:{
		flexDirection: 'row',
		borderBottomWidth: 0.3,
		borderColor: 'gray',
		paddingTop: 2,
	},
	_mitemUser:{
		flex: 0.2,
	},
	_mitemContent:{
		flex: 0.8,
		flexDirection: 'column', 
	},
	_mItemText:{
		flexDirection: 'column', 
	},
	_textActions:{
		flexDirection: 'row', 
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingRight: 5,
	},
	_mtextComment:{
		height: ((height)/10)*1.1,
	},
	_sNameUser:{
		flex: 0.3,
	},
	_sCommentUser:{
		flex: 0.7,
	},
	_minputText:{
		flex: 1,
	},
	_mClickComment:{
		flex: 1,
		flexDirection: 'row', 
	},
	_mClickChildComment:{
		flex: 1,
		flexDirection: 'row', 
	},
	_repUser:{
		flex: 0.1,
	},
	_repTextInput:{
		flex: 0.5,
	},
	_repActions:{
		flex: 0.2,
		marginHorizontal: 2,
		flexDirection: 'row',
	},
	_actionRepComment:{
		paddingLeft: width/20,
		flexDirection: 'row',
		paddingBottom: 2,
	},
	_sComment:{
		borderBottomWidth: 0.3,
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
		width: (width-(width/10)),
		marginLeft: width/10,
		flexDirection: 'row',
		borderColor: 'gray',
		borderBottomWidth: 0.3,
	},
	_sIconUser:{
		flex: 0.2,
	},
	_sChildIconUser:{
		flex: 0.2,
	},
	_sContentChildUser:{
		flex: 0.8,
	},
	_sChildActionsUser:{
		flexDirection: 'row', 
	},
	_sDataChildComment:{
		height: (height/10)*6,
	},
	_sAddCommentChild:{
		flex: 0.1,
		marginBottom: 2,
		height: (height/10),
	},
	_buttonClick:{
		padding: 2,
		marginLeft: 3,
	}
});