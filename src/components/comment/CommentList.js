import React, { Component } from 'react';
import {URL_HOME,normalize} from '../../config';
import ImagePicker from 'react-native-image-picker';
import {
  StyleSheet,Dimensions,AsyncStorage,Text,TouchableOpacity,TextInput,ScrollView,
  View,Modal,Image,FlatList,WebView,ListView,Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
import {lang} from '../languages/languages';
import HTML from 'react-native-render-html';
import { Keyboard } from 'react-native';
var options = {
  title: 'Select Image',
};
const {height,width} = Dimensions.get('screen');
// const htmlContent = `<p style="margin: 0 !important">This HTML snippet is now rendered with native components !</p>`;
export default class CommentList extends Component {
	constructor(props) {
	  super(props);
	  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  this.state = {
	  	_status: this.props.navigation.state.params._status=="on progress"?true:this.props.navigation.state.params._status=="approval"?true:false,dataSource: ds,checklist_id: this.props.navigation.state.params.checklist_id,id_answer: this.props.navigation.state.params.id_answer,
	  	_isLoading: true,array_comment:[],array_child:[],_ChildComment: false,temp_com:[],_isComment:'',_stateEditComment:false,
	  	_temp_comment:'',_temp_id_comment:[],_cancel_comment:'',_temp_id_del_comment:[],_isEditComment:'',_stateComment: false,
	  	_temp_new_comment:[],_id_user:'',_langid:'',_lang:lang,_page: 1,_imageCamera: false,_isImage:[],_thisSource:'',
	  	last_page:'',_keyImage: 1,_index_comment: '',_refreshing: false,_extraComment: [],
	  };
	};
	componentWillMount(){
		// console.log();
		AsyncStorage.getAllKeys((err, keys) => { 
       	 AsyncStorage.multiGet(keys).then((value)=>{
        	console.log(value);
        	this.setState({
          		_langid: value[4][1]=='vi'?true:false,
          	});
		// console.log(this.state.checklist_id+'---'+this.state.id_answer);
		fetch(URL_HOME+'/api/comments?page='+this.state._page+'&token='+value[3][1]+'&checklist_id='+this.state.checklist_id+'&id='+this.state.id_answer,{
			"method": "GET",
		})
		.then((response) => response.json()).then((responseJson)=> {
				console.log(responseJson);
					// if(responseJson.error){
						
					// }else{
						// console.log(responseJson);
						this.setState({
							array_comment: responseJson.data,
							dataSource: this.state.dataSource.cloneWithRows(responseJson.data),
							_isLoading: false,
							_id_user: value[0][1],
							last_page: responseJson.last_page,
						});
					// }
					// var item = responseJson.data[4];
					// console.log(responseJson.data.indexOf(item));
				}) .catch((error) => { 
					console.error(error); 
				});
		});
    });
};
_onEditCommentChange(text){
	var index = this.state._index_comment;
	index.content = text;
	this.setState({
		_index_comment: index,
	});
};
_opendImage(){
AsyncStorage.getAllKeys((err, keys) => { 
	AsyncStorage.multiGet(keys).then((value)=>{
	ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
    else {
        // console.log(response.fileName);
        let source = {uri: response.uri};
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        // this.setState({
        //  avatarSource : source
        // });
       				console.log(response.type);
		        	const data = new FormData();
					// data.append('name', 'testName'); // you can append anyone.
					data.append('checklist_id',this.state.checklist_id);
					data.append('id',this.state.id_answer);
					data.append('image', {
					  uri: response.uri,
					  type: response.type, // or photo.type
					  name: response.fileName,
					  // content: 'image',
					});
					data.append('content','<p></p>');
					this.setState({
						_thisSource: response.uri,
						_isImage: data,
						_imageCamera: true,
					});
					// console.log(data);
					// console.log(data);
					// fetch(URL_HOME+'/api/comments?token='+value[3][1], {
					//  	method: 'POST',
					// 	headers: {
					//       'Accept': 'application/json',
					//       'Content-Type': 'multipart/form-data',
					//     },
					//  	body: data
					// }).then(res => {
					//   console.log(res);
					// });
			}
	 	});
 	});
});	

};
_onClickDelComment(el){
	console.log(el);
	AsyncStorage.getAllKeys((err, keys) => { 
 	 AsyncStorage.multiGet(keys).then((value)=>{
		// console.log(this.state.checklist_id+'---'+this.state.id_answer);
		fetch(URL_HOME+'/api/comments/multidelete',{
			method: 'POST',
				headers:{
					'Accept': 'application/json',
				    'Content-Type': 'application/json',
				},
				body:JSON.stringify({
				    "token": value[3][1],
				    "id": el.id,
				})
		})
		.then((response) => response.json()).then((responseJson)=> {
				// console.log(this.state._temp_id_del_comment);
				// var temp=this.state._temp_id_del_comment;
				var arr = this.state.array_comment;
				// temp.push(el.id);
				// console.log(responseJson.toString()=="true"?'1':'2');
				// if(responseJson.toString()=="true"){
				arr.splice(arr.indexOf(el),1);
					this.setState({
						// _temp_id_del_comment: temp,
						array_comment: arr,
					});
				// }
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
_onSendEditComment(){
	var content = this.state._isEditComment;
	var index = this.state.array_comment.findIndex((obj)=>obj.id==this.state._index_comment);
	console.log(index);
	// alert(this.state._isComment+'log');
	AsyncStorage.getAllKeys((err, keys) => { 
        AsyncStorage.multiGet(keys).then((value)=>{
        	// if(content!=''){
				// fetch(URL_HOME+'/api/comments?token='+value[3][1],{
				// 	method: 'POST',
				// 	headers:{
				// 		'Accept': 'application/json',
				// 	    'Content-Type': 'application/json',
				// 	},
				// 	body:JSON.stringify({
				// 		"checklist_id": this.state.checklist_id,
				// 	    "content": content,
				// 	    "id": this.state.id_answer,
				// 	})
				// }).then((response)=>response.json()).then((responseJson)=>{
				// 	console.log(responseJson);
				// 	this.setState({
				// 		_isEditComment: '',
				// 	});
				// 	alert("Success");
				// });
			// }else{
			// }
    	});
	});
};
_DelItemImage(){
	this.setState({
		_thisSource: '',
		_imageCamera: false,
	});
};
_renderImageSelect(){
	var temp = [];
	console.log(this.state._thisSource);
	if(this.state._thisSource!=''){
		temp.push(
			<Image key={"ImageProps"+Number(this.state._keyImage)+1} style={{width: 50,height: 50,margin: 2,alignItems: 'flex-end'}} source={{uri: this.state._thisSource}}>
				<Icon onPress={()=>{this._DelItemImage()}} type='evilicon' name='close-o' color="white" size={15} />
			</Image>
		);
	}else{
		temp.push(<View key={"ImageProps"} ></View>);
	}
	return temp;
}
_saveEditComment(){
	// var index = this.state.array_comment.findIndex((obj)=>obj.id==this.state._index_comment);
	// arr[index].content="thay doi tai vi tri";
	// var temp = arr[index];
	// arr[index] = temp;
	// this.setState({
	// 	array_comment: arr,
	// });
	console.log(this.state._index_comment.id);
	AsyncStorage.getAllKeys((err, keys) => { 
        AsyncStorage.multiGet(keys).then((value)=>{
			fetch(URL_HOME+'/api/comments/'+this.state._index_comment.id,{
				method: 'PUT',
				headers:{
					'Accept': 'application/json',
				    'Content-Type': 'application/json',
				},
				body:JSON.stringify({
				    "content": this.state._index_comment.content,
				    "token": value[3][1],
				    _refreshing: true,
				})
			}).then((response)=>response.json()).then((responseJson)=>{
				let arr = this.state.array_comment;
				this.setState({
					array_comment: [],
				});
				let index = arr.indexOf(this.state._index_comment);
				arr[index].content = responseJson.content;
				var temp = arr[index];
				arr.splice(index,1);
				arr.splice(index,0,temp);
				// console.log(arr[index]);
				this.setState({
					array_comment: arr,
					_extraComment: arr,
					_stateEditComment: !this.state._stateEditComment,
				});
			});
    	});
	});
}
_closeComment(){
	this.setState({
		_isComment: '',
	});
	console.log(this.state.dataSource._dataBlob.s1.length);
};
_saveComment(){
	// console.log(this.state._isComment);
		AsyncStorage.getAllKeys((err, keys) => { 
	        AsyncStorage.multiGet(keys).then((value)=>{
	        	if(this.state._isComment!=''){
					fetch(URL_HOME+'/api/comments?token='+value[3][1],{
						method: 'POST',
						headers:{
							'Accept': 'application/json',
						    'Content-Type': 'application/json',
						},
						body:JSON.stringify({
							"checklist_id": this.state.checklist_id,
							"id": this.state.id_answer,
						    "content": this.state._isComment,
						})
					}).then((response)=>response.json()).then((responseJson)=>{
						// console.log(responseJson);
						var temp = this.state.array_comment.concat(responseJson);
						Keyboard.dismiss();
						this.setState({
							_stateComment: true,
							_isComment: '',
							array_comment: temp,
						});
					});
				}
				else{
					fetch(URL_HOME+'/api/comments?token='+value[3][1], {
					 	method: 'POST',
						headers: {
					      'Accept': 'application/json',
					      'Content-Type': 'multipart/form-data',
					    },
					 	body: this.state._isImage,
					}).then((res)=>res.json()).then((response)=>{
						console.log(response);
						var temp = this.state.array_comment.concat(response);
					  	this.setState({
							_thisSource: '',
							_imageCamera: false,
							array_comment: temp,
						});
					});
				}
	    	});
		});
};

// _renderChildComment(){
// 	console.log(this.state.temp_com.child);
// 	this.setState({
// 		_ChildComment: !this.state._ChildComment,
// 	});
// };
_rederEditCoomit(el){
	if(!this.state._temp_id_comment.includes(el.id)){
		return(
			<HTML containerStyle={{paddingLeft: 10}} imagesMaxWidth={50}  html={el.content} />
		);
	}else{
		return(
			  	<HTML containerStyle={{paddingLeft: 10}}  imagesMaxWidth={50} html={this.state._temp_comment} />
		);
	}
};
// _renderItemComment(arr){
	
// };
_onRerfreshController(){
	// this.setState({
	// 	_refreshing: !this.state._refreshing,
	// });
	// if(this.state._refreshing){
	// 	AsyncStorage.getAllKeys((err, keys) => { 
 //       	 AsyncStorage.multiGet(keys).then((value)=>{
	// 	fetch(URL_HOME+'/api/comments?page='+this.state._page+'&token='+value[3][1]+'&checklist_id='+this.state.checklist_id+'&id='+this.state.id_answer,{
	// 		"method": "GET",
	// 	})
	// 	.then((response) => response.json()).then((responseJson)=> {
	// 					this.setState({
	// 						array_comment: responseJson.data,
	// 						_refreshing: !this.state._refreshing,
	// 					});
	// 			}) .catch((error) => { 
	// 				console.error(error); 
	// 			});
	// 		});
 //    	});
	// }
}
_renderFlatList=({item})=>{
return(
	<View style={[styles._mItemsComment]}>
					<View style={[styles._mitemUser,{justifyContent: 'flex-start'}]}>
						<Icon type='font-awesome' color='#F6F7F9' name='user-circle' size={((width-30)/9)} />
					</View>
					<View style={styles._mitemContent}>
						<View style={styles._itemText}>
							<Text style={[styles.font_size,{fontWeight: 'bold',textAlign: 'left'  }]} >
							  	{item.user.fullname} 
							</Text>
						</View>
						<View style={styles._itemText}>
							<View style={styles._mItemText}>
								<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Screen_ChildCommentList',{arr_child: item.child,id_arr: item.id})}}>
									{this._rederEditCoomit(item)}
								</TouchableOpacity>
								<TouchableOpacity   onPress={()=>{this.props.navigation.navigate('Screen_ChildCommentList',{arr_child: item.child,id_arr: item.id,ckl_id: this.state.checklist_id,id_aw: this.state.id_answer})}}>
									<Text style={{textDecorationLine: 'underline',paddingLeft: 30 }}>
									  	{item.child.length} trả lời
									</Text>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles._textActions}>
							{/*<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Screen_ChildCommentList',{arr_child: arr[i].child,id_arr: arr[i].id,ckl_id: this.state.checklist_id,id_aw: this.state.id_answer})}} >
															<Text style={[styles._repComment,styles.font_size]}>
															  	{this.state._langid?this.state._lang.vi.replly:this.state._lang.en.replly}
															</Text>
														</TouchableOpacity>*/}
							<TouchableOpacity style={[styles._buttonClick,{display: this.state._id_user.replace(/'/g,'')==item.user.id?'flex':'none'}]} onPress={()=>{this.setState({_index_comment: item,_cancel_comment:item.content,_stateEditComment: !this.state._stateEditComment});}} >
								<Text style={[styles._editComment,styles.font_size]}>
								  	{this.state._langid?this.state._lang.vi.edit:this.state._lang.en.edit}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles._buttonClick,{display: this.state._id_user.replace(/'/g,'')==item.user.id?'flex':'none'}]} onPress={()=>{this._onClickDelComment(item)}} >
								<Text style={[styles._delComment,styles.font_size]}>
								  	{this.state._langid?this.state._lang.vi.del:this.state._lang.en.del}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
);
}
_renderComment(){
		var arr= this.state.array_comment;
		// console.log(arr);
		console.log(this.state._id_user.replace(/'/g,''));
		var temp = [];
		for(let i=0;i<arr.length;i++){
			var user_action = this.state._id_user.replace(/'/g,'')==arr[i].user.id?'flex':'none';
		    temp.push(
		    	<View key={"CommentComment1"+i} style={[styles._mItemsComment,{display: this.state._temp_id_del_comment.includes(arr[i].id)?'none':'flex'}]}>
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
								<TouchableOpacity   onPress={()=>{this.props.navigation.navigate('Screen_ChildCommentList',{arr_child: arr[i].child,id_arr: arr[i].id,ckl_id: this.state.checklist_id,id_aw: this.state.id_answer})}}>
									<Text style={{textDecorationLine: 'underline',paddingLeft: 30 }}>
									  	{arr[i].child.length} trả lời
									</Text>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles._textActions}>
							{/*<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Screen_ChildCommentList',{arr_child: arr[i].child,id_arr: arr[i].id,ckl_id: this.state.checklist_id,id_aw: this.state.id_answer})}} >
															<Text style={[styles._repComment,styles.font_size]}>
															  	{this.state._langid?this.state._lang.vi.replly:this.state._lang.en.replly}
															</Text>
														</TouchableOpacity>*/}
							<TouchableOpacity style={[styles._buttonClick,{display: user_action}]} onPress={()=>{this.setState({_cancel_comment:arr[i].content,_temp_comment: this.state._temp_id_comment.includes(arr[i].id)?this.state._temp_comment:arr[i].content,_temp_id_comment: [arr[i].id],_stateEditComment: !this.state._stateEditComment});}} >
								<Text style={[styles._editComment,styles.font_size]}>
								  	{this.state._langid?this.state._lang.vi.edit:this.state._lang.en.edit}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles._buttonClick,{display: user_action}]} onPress={()=>{this._onClickDelComment(arr[i])}} >
								<Text style={[styles._delComment,styles.font_size]}>
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
_onEndReached(){
	// console.log(this.state._page+1+'----'+this.state.last_page);
	if(this.state._page<=this.state.last_page){
		AsyncStorage.getAllKeys((err, keys) => { 
	        AsyncStorage.multiGet(keys).then((value)=>{
	        // console.log(value[3][1]);
			fetch(URL_HOME+'/api/comments?page='+(Number(this.state._page)+1)+'&token='+value[3][1]+'&checklist_id='+this.state.checklist_id+'&id='+this.state.id_answer)
			.then((response) => response.json()).then((responseJson)=> {
				console.log(responseJson.data);
				if(responseJson.data.length > 0){
					var arr =  this.state.array_comment.concat(responseJson.data);
						this.setState({
							array_comment: arr,
							_page: this.state._page+1,
						});
					}else{
						// Alert.alert(
						//   'Alert Title',
						//   'My Alert Msg',
						//   [
						//     {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
						//     {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
						//     {text: 'OK', onPress: () => console.log('OK Pressed')},
						//   ],
						//   { cancelable: false }
						// )
						console.log("end");
					}
				}) .catch((error) => { 
					console.error(error); 
				});
			});
	    });
	}
};
_renderNull(){
	return(
		<Text></Text>
	);
}
_convertText(text){
	if(text){
	var temp = '';
	temp = text.replace(/(&nbsp;)/g," ");
	temp = temp.replace(/(<p>)/g,"");
	temp = temp.replace(/(<\/p>)/g,"");
	return temp;
	}
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
						<View style={[styles._editHead,styles._center]}>
							<Text style={styles.font_size}>
							  	{this.state._langid?"Sửa ý kiến":"Edit Comment"}
							</Text>
						</View>
						<View style={styles._editContent}>
							<TextInput
								style={{flex: 1}}
								multiline = {true}
								returnKeyType="done"
								underlineColorAndroid={'transparent'}
								editable = {true}
								numberOfLines={4}
						        onChangeText={(text)=>{this._onEditCommentChange(text)}}
						        value={this._convertText(this.state._index_comment.content)}/>
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
		<View style={[styles._mRowComment,styles._center]}>
				<View style={styles._mbodyComment}>
				{/*<View style={[styles._mheadComment,styles._center]}>
									<Text style={[styles._textCenter,{fontSize: 18}]}>
									  	{this.state._langid?this.state._lang.vi.comment:this.state._lang.en.comment}
									</Text>
								</View>*/}
				<View style={styles._mdataComment}>
					<ScrollView  contentContainerStyle={styles._mScrolView}>
						<FlatList
							data={this.state.array_comment}
							extraData={this.state.array_comment}
							keyExtractor={(item)=>item.id}
							onEndReachedThreshold={-1}
							onEndReached={this._onEndReached()}
							refreshing={this.state._refreshing}
					        onRefresh={this._onRerfreshController()}
							renderItem={this._renderFlatList}
						/>
					</ScrollView>
					<View style={[styles._mtextComment]}>
						<View style={[styles._mClickComment,styles._center]}>
							<TouchableOpacity style={{flex: 1,paddingVertical: 5}} onPress={()=>{this._opendImage()}}>
								<Icon type='ionicon' color='gray' name='md-camera' size={width/15} />
							</TouchableOpacity>
						</View>
						<View style={[styles._minputText]}>
							<TextInput style={{backgroundColor: 'white',borderRadius: 10}}
								value={this.state._isComment}
								onChangeText={(text)=>this._onCommentChange(text)}
								placeholder={this.state._langid?"Nội dung":"Comment"}
								underlineColorAndroid='transparent'/>
						</View>
						<View style={[styles._mClickComment,styles._center]}>
							{/*<TouchableOpacity onPress={()=>{this._closeComment()}} >
															<Text style={[styles._buttonComment,{textAlign: 'center'}]}>
															  	{this.state._langid?this.state._lang.vi.cancel:this.state._lang.en.cancel}
															</Text>
														</TouchableOpacity>*/}
							<TouchableOpacity style={{flex: 1,paddingVertical: 5}} onPress={()=>{this._saveComment()}}>
								{/*<Text style={[styles._buttonComment,{textAlign: 'center'}]}>
																  	{this.state._langid?this.state._lang.vi.send:this.state._lang.en.send}
																</Text>*/}
								<Icon type='ionicon' color='#5F84CE' name='ios-send' size={width/15} />
							</TouchableOpacity>
						</View>
					</View>
					<View style={{display: this.state._imageCamera?'flex':'none' }}>
							{this.state._imageCamera?this._renderImageSelect():this._renderImageSelect()}	
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
	_mRowComment:{
		width: width,
		flex: 1,
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
		flex: 0.1,
		flexDirection: 'column',
	},
	_mheadComment:{
		// height: ((height)/20),
		flex: 1/10,
	},
	_mdataComment:{
		// height: ((height)/10)*7.5,
		flex: 9/10,
	},
	_mScrolView:{
		// height: height,
	},
	_img:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',  
	},
	_mItemsComment:{
		flexDirection: 'row',
		borderBottomWidth: 0.4,
		borderColor: 'gray',
		paddingVertical: 2,
		marginBottom: 2,
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
		height: ((height)/15),
		flexDirection: 'row',
		backgroundColor: '#E9EBEE',
		padding: 2,
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
	},
	_buttonComment:{
		padding: 2,
		marginLeft: 3,
		borderWidth: 0.3,
		width: width/5,
		borderRadius: 5,	
	},
	_minputText:{
		flex: 0.78,
	},
	_mClickComment:{
		flex: 0.11,
	},
});