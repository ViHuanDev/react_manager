import React, { Component } from 'react';
import {
  StyleSheet,Dimensions,ScrollView,Image,FlatList,
  View,Text,TouchableOpacity,TextInput,Modal,AsyncStorage
} from 'react-native';
import {URL_HOME,normalize} from '../../config';
import HTML from 'react-native-render-html';
import {lang} from '../languages/languages';
import { Icon } from 'react-native-elements';
const {height,width} = Dimensions.get('screen');
class ChildCommentList extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	_arr_state: this.props.navigation.state.params.arr_child,id_ckl_parent: this.props.navigation.state.params.id_arr,
	  	_id_ckl: this.props.navigation.state.params.ckl_id,_id_answer: this.props.navigation.state.params.id_aw,
	  	_isLoading: false,_id_del_childComment:[],_temp_id_comment:[],_isComment:'',_temp_comment:'',_stateEditComment:false,
	  	_stateComment:false,_temp_new_comment:[],_isComment:'',_lang: lang,_heigth: height,
	  };
	}
componentWillMount() {
		console.log(this.state._heigth);
};
_renderEditCommit(el){
	// console.log(el);
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
_onClickDelComment(id){
	console.log(id+"asdasd");
	AsyncStorage.getAllKeys((err, keys) => { 
        AsyncStorage.multiGet(keys).then((value)=>{
			fetch(URL_HOME+'/api/comments/'+id+"?token="+value[3][1],{
				method: 'DELETE',
				headers:{
					'Accept': 'application/json',
				    'Content-Type': 'application/json',
				},
				body:JSON.stringify({
				})
			}).then((response)=>response.json()).then((responseJson)=>{
				console.log(responseJson);
				var temp=this.state._id_del_childComment;
				temp.push(id);
				this.setState({
						_id_del_childComment: temp,
				});
				// console.log(responseJson.id==id?'1':'2');
				if(responseJson.id==id){
					this.setState({
						_id_del_childComment: temp,
					});
				}
			});
    	});
	});
}
_saveEditComment(){
	// console.log(this.state._heigth);
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
};
_saveComment(){
	// console.log(this.state._isComment);
	AsyncStorage.getAllKeys((err, keys) => { 
        AsyncStorage.multiGet(keys).then((value)=>{
			fetch(URL_HOME+'/api/comments?token='+value[3][1],{
				method: 'POST',
				headers:{
					'Accept': 'application/json',
				    'Content-Type': 'application/json',
				},
				body:JSON.stringify({
					"checklist_id": this.state._id_ckl,
					"id": this.state._id_answer,
				    "content": this.state._isComment,
				    "parent_id": this.state.id_ckl_parent, 
				})
			}).then((response)=>response.json()).then((responseJson)=>{
				// console.log(this.state._id_ckl+"-"+this.state.id_answer+"-"+this.state._isComment+"-"+this.state.id_ckl_parent);
				// console.log(responseJson);
				var temp = this.state._temp_new_comment;
				temp.push(responseJson);
				this.setState({
					_stateComment: true,
					_isComment: '',
					_temp_new_comment: temp,
				});
				// this._renderNewComment(responseJson);
				// this.setState({
				// 	_stateComment: !this.state._stateComment,
				// });
				// console.log("Success");
			});
    	});
	});
};
_renderNewChildComment(arr){
	var temp=[];
	if(arr.length>0){
		for(let i=0;i<arr.length;i++){
			temp.push(
			<View key={i+"ChildComment"+arr[i].id} style={[styles._sChildComment,styles._center,{display: this.state._id_del_childComment.includes(arr[i].id)?'none':'flex'}]}>
					<View  style={styles._sChildIconUser}>
						<Icon type='font-awesome' color='#F6F7F9' name='user-circle' size={((width-(width/10))/9)} />
					</View>
					<View style={styles._sContentChildUser}>
						<View style={styles._sNameUser}>
							<Text style={[{fontWeight: 'bold',textAlign: 'left'  },styles.font_size]} >
						  		{arr[i].user.fullname} 
							</Text>
						</View>
						<View style={styles._sCommentUser}>
							{this._renderEditCommit(arr[i])}
						</View>
						<View style={styles._sChildActionsUser}>
							<TouchableOpacity onPress={()=>{this.setState({_cancel_comment:arr[i].content,_temp_comment: !this.state._temp_id_comment.includes(arr[i].id)?this.state._temp_comment:arr[i].content,_temp_id_comment: [arr[i].id],_stateEditComment: !this.state._stateEditComment});}}>
								<Text style={[styles.font_size,{textAlign: 'center',paddingHorizontal: 5}]}>
								  	Sửa
								</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>{this._onClickDelComment(arr[i].id)}} >
								<Text style={[styles.font_size,{textAlign: 'center',paddingHorizontal: 5}]}>
								  	Xóa
								</Text>
							</TouchableOpacity>
						</View>
					</View>
			</View>
			);
		}
	}else{
		return(<View></View>);
	}
	return temp;
};
_renderChildComment(){
	var temp = [];
	var item = this.state._arr_state;
	for(let i=0;i<item.length;i++){
		temp.push( 
					<View key={"childComment"+item[i].id} style={[styles._sChildComment,styles._center,{display: this.state._id_del_childComment.includes(item[i].id)?'none':'flex'}]}>
							<View style={styles._sChildIconUser}>
								<Icon type='font-awesome' color='#F6F7F9' name='user-circle' size={((width-(width/10))/9)} />
			     			</View>
			     			<View style={styles._sContentChildUser}>
								<View style={styles._sNameUser}>
									<Text style={[styles.font_size,{fontWeight: 'bold',textAlign: 'left', color:'black' }]} >
								  		{item[i].user.fullname} 
									</Text>
								</View>
								<View style={styles._sCommentUser}>
									<TouchableOpacity onPress={()=>{this.setState({_cancel_comment:item[i].content,_temp_comment: this.state._temp_id_comment.includes(item[i].id)?this.state._temp_comment:item[i].content,_temp_id_comment: [item[i].id],_stateEditComment: !this.state._stateEditComment});}} >
										{this._renderEditCommit(item[i])}
									</TouchableOpacity>
								</View>
								<View style={styles._sChildActionsUser}>
									<TouchableOpacity onPress={()=>{this.setState({_cancel_comment:item[i].content,_temp_comment: this.state._temp_id_comment.includes(item[i].id)?this.state._temp_comment:item[i].content,_temp_id_comment: [item[i].id],_stateEditComment: !this.state._stateEditComment});}}>
										<Text style={[styles.font_size,{textAlign: 'center',paddingHorizontal: 5}]}>
										  	{this.state._langid?this.state._lang.vi.edit:this.state._lang.en.edit}
										</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={()=>{this._onClickDelComment(item[i].id)}}>
										<Text style={[styles.font_size,{textAlign: 'center',paddingHorizontal: 5}]}>
										  	{this.state._langid?this.state._lang.vi.del:this.state._lang.en.del}
										</Text>
									</TouchableOpacity>
			     				</View>
			     			</View>
					</View>
		);
	}
	return temp;
};
_onChildCommentChange(text){
	console.log(this.state._heigth);
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
							  	{this.state._langid?"Sửa ý kiến":"Edit comment"}
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
								  	{this.state._langid?this.state._lang.vi.cancel:this.state._lang.en.cancel}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>{this._saveEditComment()}}>
								<Text style={[styles.font_size,[styles._buttonComment,{textAlign: 'center'}]]}>
									{this.state._langid?this.state._lang.vi.save:this.state._lang.en.save}			  
								</Text>				
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
     		<View style={styles._sDataChildComment} >
	     		<ScrollView style={styles._sScrollView}>
					{this._renderChildComment()}
			     	{this._renderNewChildComment(this.state._temp_new_comment)}
		     	</ScrollView>
		    </View>
     		<View style={styles._sAddCommentChild}>
     			<View style={[styles._mClickComment,styles._center]}>
					<TouchableOpacity  onPress={()=>{this._saveComment()}}>
						<Icon type='ionicon' color='gray' name='md-camera' size={width/15} />
					</TouchableOpacity>
				</View>
     			<View style={[styles._minputText]}>
					<TextInput
						style={{flex: 1,borderWidth: 0.3,borderRadius: 5}}
						multiline = {true}
						underlineColorAndroid={'transparent'}
						editable = {true}
						onChangeText={(text) => this.setState({_isComment: text})}
				     	value={this.state._isComment}/>
				</View>
				<View style={[styles._mClickComment,styles._center]}>
					{/*<TouchableOpacity onPress={()=>{this.setState({_isComment:''})}} >
											<Text style={[styles._buttonComment,{textAlign: 'center'}]}>
											  	{this.state._langid?this.state._lang.vi.cancel:this.state._lang.en.cancel}
											</Text>
										</TouchableOpacity>*/}
					<TouchableOpacity  onPress={()=>{this._saveComment()}}>
						{/*<Text style={[styles._buttonComment,{textAlign: 'center'}]}>
												  	{this.state._langid?this.state._lang.vi.send:this.state._lang.en.send}
												</Text>*/}
						<Icon type='ionicon' color='#5F84CE' name='ios-send' size={width/15}/>
					</TouchableOpacity>
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
		// flex: 2/10,
		// height: height/20,
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
		flex: 9/10,
	},
	_sScrollView:{
		flex: 9/10,
	},
	_sAddCommentChild:{
		width: width,
		height: height/18,
		paddingBottom: 2,
		backgroundColor: 'white',
		flexDirection: 'row', 
	},
	_minputText:{
		flex: 0.78,
	},
	_mClickComment:{
		flex: 0.11,
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