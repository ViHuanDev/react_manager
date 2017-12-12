import React, { Component } from 'react';
import { employeeUpdate } from '../actions';
import { Actions } from 'react-native-router-flux';
import {URL_HOME,normalize} from '../config';
import {
  StyleSheet,
  View,Text,Dimensions,TextInput,ScrollView,TouchableOpacity,AsyncStorage,Modal,Image
} from 'react-native';
import {Icon} from 'react-native-elements';
import {lang} from './languages/languages';
const {height,width} = Dimensions.get('screen');
const MIN_HEIGHT = 20;
const MAX_HEIGHT = 40;

class Profile extends Component { 
componentWillMount() {	

};
constructor(props) {
  super(props);
  this.state = {
  	arrayInfo: [],
  	name:'',email:'',phone:'',info:'',position:'',modalVisible:false,
  	error: [], _iconsuccess: true,_iconerror: true,loading: true,
  	lang_load: false,_lang: lang,
  };
    AsyncStorage.getItem('@locale:key').then((item)=>{
  	this.setState({
  		lang_load: item=='vi'?true:false,
  	});
  	// console.log(lang);
  });
};
onModal(){
	 this.setTimeout(function() {
            console.log('HeY!');
        }, 1000);
	};
onCloseModal(){
	this.setState({
		modalVisible: !this.state.modalVisible,
	});
};
onFullNameChange(text){
		this.setState({
			name: text,
		});
};
onEmailChange(text){
		this.setState({
			email:text,
		});
};
onPhoneChange(text){
		this.setState({
			phone:text,
		});
	// console.log(this.state.phone);
};
onInfoChange(text){
		this.setState({
			info:text,
		});
};
onPositionChange(text){
		this.setState({
			position:text,
		});
};
onPressUpdateInfo(){
	this.setState({
		loading: false,
	});
	var keyGet = ['@email:key','@password:key','@user_id:key','@token:key'];
		AsyncStorage.multiGet(keyGet).then((value)=>{
			if(value){
				const token = value[3][1];
				const id =  (value[2][1]).replace(/[\\']/g,'');
				// console.log(id);
				fetch(URL_HOME+"/api/users/"+id+"?token="+token,{
							"method": "PUT",
							headers:{
								"Accept":"application/json",
								"Content-Type":"application/json;charset=utf-8"
							},
							body: JSON.stringify({
								"fullname": this.state.name,
								"email" : this.state.email,
								"phone": this.state.phone!=null?this.state.phone.replace(/[() -]/g,''):'',
								"extendinfo":this.state.info,
								"position": this.state.position,
							})
						}).then((responseJson)=>{
							this.setState({
								loading: true,
							});
							// console.log(Object.keys(JSON.parse(responseJson._bodyInit)).length);
							// const data =  JSON.parse(responseJson._bodyInit);
							// console.log(data);
							// for(var x in data){
							// 	console.log(data[x]);
							// }
							// console.log(JSON.parse(responseJson._bodyInit).error);
							if((responseJson._bodyInit).replace(/[""]/g,'')=="Success"){
									this.setState({
										modalVisible: !this.state.modalVisible,
										error:(responseJson._bodyInit).replace(/[""]/g,''),
										_iconsuccess: true,
										_iconerror: false,
									});
							}
							else{
								this.setState({
									modalVisible: !this.state.modalVisible,
									error: (JSON.parse(responseJson._bodyInit).error),
									_iconsuccess: false,
									_iconerror: true,
								});
								console.log(Object.values(this.state.error));
							}
						}).catch((error)=>{
					});
				}
	});
};
// _eachFun(arr){
// 	var obj = Object.values(arr);
// 	for(var i = 1; i <= obj.length;i++){
// 		return (
// 			<Text>
// 			  	{obj[i]}
// 			</Text>
// 		)
// 		i++;
// 	}
// 	// obj.map((index,item)=>{
// 	// 	return (
// 	// 		<Text>
// 	// 		  	{index}
// 	// 		</Text>
// 	// 	);
// 	// });
// }
_onChnagePass(){
	Actions.changePass();
};
_renderSuccess(){
	return(
		<View style={styles.renderSuccess}>
			<Text style={styles.centerText} >
			<Text style={{color: 'green'}}>
			  	{ this.state.lang_load?this.state._lang.vi.update_succ:this.state._lang.en.update_succ }
			</Text>
			</Text>
		</View>
	);
};
_renderButtonUpdate(){
	if(this.state.loading){
		return(
			<TouchableOpacity onPress={()=>{this.onPressUpdateInfo()}} style={styles.itemUser}>
			         		<Icon name='sync' type='material-icons' />
			      			<Text>
			      			  	{ this.state.lang_load?this.state._lang.vi.update_info:this.state._lang.en.update_info }
			      			</Text>
			</TouchableOpacity>
		);
	}
	else{
		return (
				<View style={styles.itemUser}>
					<Image style={{width: width/10, height:  width/10,}}
					 	 source={require('../images/loading_green.gif')}/>
				</View>
		);
	}
};
_renderError(){
	return(
		<View style={styles.renderError}>
			<Text styel={styles.centerText}>
				{this.state.error.fullname!=null?this.state.error.fullname:''}
			</Text>
			<Text styel={styles.centerText}>
				{this.state.error.email!=null?this.state.error.email:''}
			</Text>
			<Text styel={styles.centerText}>
				{this.state.error.phone!=null?this.state.error.phone:''}
			</Text>
			<Text styel={styles.centerText}>
				{this.state.error.position!=null?this.state.error.position:''}
			</Text>
			<Text styel={styles.centerText}>
				{this.state.error.extendinfo!=null?this.state.error.extendinfo:''}
			</Text>
		</View>
	);
};
  handleContentSizeChange = ({nativeEvent}) => {
    const {height} = nativeEvent.contentSize;
    console.log(height);
    this.setState({height});
};
componentDidMount(){
		var keyGet = ['@email:key','@password:key','@user_id:key','@token:key'];
		AsyncStorage.multiGet(keyGet).then((value)=>{
			if(value){
				const token = value[3][1];
				fetch('http://96.96.10.10/api/getuser?token='+token) .then((response) => 
					response.json()) .then((responseJson) => { 
				this.setState({
					isLoading: false,
					arrayInfo: responseJson,
					name: responseJson.fullname,
					email: responseJson.email,
					phone: responseJson.phone,
					info: responseJson.extendinfo,
					position: responseJson.position,
				});
				// console.log(value);
			}) .catch((error) => { 
				console.error(error); });
		};
	});
};
  render() {
  	const {height2} = this.state;
    return (
    	<View style={styles.row}>
    	<Modal
	          animationType="slide"
	          transparent={true}
	          visible={this.state.modalVisible}
	          onRequestClose={() => {alert("Modal has been closed.")}}
	          >
		         <View style={styles.Modals}>
		        	<View style={styles.contentModal}>
				        <View style={styles.Modal}>
		        			<View style={styles.headModal}>
								<Icon  type='material-icons' style={{display: this.state._iconerror?'flex':'none'}} color='red' name='error-outline' size={width/8} />
								<Icon style={[styles.successIcon,{display: this.state._iconsuccess?'flex':'none'}]} type='simple-line-icons' color='green' name='done' size={width/10} />
		        			</View>
				         	{this.state.error=='Success'?this._renderSuccess():this._renderError()}
				        </View>
				        <View style={styles.CloseM}>
				         		<TouchableOpacity style={styles.button} onPress={()=>{this.onCloseModal()}} >
									<Text style={styles.buttonText} >
									  	{ this.state.lang_load?this.state._lang.vi.close:this.state._lang.en.close }
									</Text>
								</TouchableOpacity>
				        </View>
				    </View>
		         </View>	
        </Modal>
	      
	      <View style={styles.contentUser}>
	      		<View style={styles.itemUser}>
	      			<View style={[styles.titleContent,{backgroundColor: '#007aff'}]}>
	      				<Icon name='user' color='white' type='font-awesome'  size={height/30} />
	      				<Text style={styles.textCenter}>
	      				  	{ this.state.lang_load?this.state._lang.vi.name:this.state._lang.en.name }
	      				</Text>
	      			</View>
	      			<View style={styles.dataContent}>
		      			<TextInput style={[styles.input,{height: Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, height))} ]}
	         				 multiline
	          				onContentSizeChange={this.handleContentSizeChange}
	          				onChangeText={(text)=>this.onFullNameChange(text)}
	          				value={this.state.name}
	         			/>
	         		</View>
	      		</View>
	      		<View style={styles.itemUser}>
	      			<View style={[styles.titleContent,{backgroundColor: 'rgb(241, 67, 54)'}]}>
	      				<Icon name='email' color='white' type='zocial'  size={height/30} />
	      				<Text style={styles.textCenter}>
	      				  	{ this.state.lang_load?this.state._lang.vi.email:this.state._lang.en.email }
	      				</Text>
	      			</View>
	      			<View style={styles.dataContent}>
		      			<TextInput style={[styles.input,{height: Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, height))} ]}
	         				 multiline
	         				 onChangeText={(text)=>this.onEmailChange(text)}
	         				 value={this.state.email}
	          				onContentSizeChange={this.handleContentSizeChange}
	         			/>
	         		</View>
	      		</View>
	      		<View style={styles.itemUser}>
	      			<View style={[styles.titleContent,{backgroundColor: '#95d231'}]}>
	      				<Icon name='phone' color='white' type='simple-line-icons'  size={height/30} />
	      				<Text style={styles.textCenter}>
	      				  	{ this.state.lang_load?this.state._lang.vi.phone:this.state._lang.en.phone }
	      				</Text>
	      			</View>
	      			<View style={styles.dataContent}>
		      			<TextInput style={[ styles.input,{height: Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, height))} ]}
	         				 multiline
	         				 onChangeText={(text)=>this.onPhoneChange(text)}
	         				 value={this.state.phone}
	          				onContentSizeChange={this.handleContentSizeChange}
	         			/>
	         		</View>
	      		</View>
	      		<View style={styles.itemUser}>
	      			<View style={[styles.titleContent,{backgroundColor: '#4e69a2'}]}>
	      				<Icon name='assignment-ind' color='white' type='materialIcons'  size={height/30} />
	      				<Text style={styles.textCenter}>
	      				  	{ this.state.lang_load?this.state._lang.vi.position:this.state._lang.en.position }
	      				</Text>
	      			</View>
	      			<View style={styles.dataContent}>
		      			<TextInput style={[styles.input,{height: Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, height))} ]}
	         				 multiline
	         				 onChangeText={(text)=>this.onPositionChange(text)}
	         				 value={this.state.position}
	          				onContentSizeChange={this.handleContentSizeChange}
	         			/>
	         		</View>
	      		</View>
	      		<View style={[styles.itemUser,{flex: 0.4}]}>
	      			<View style={[styles.titleContent,{backgroundColor: '#ffc300'}]}>
	      				<Icon name='info' color='white' type='simple-line-icons'  size={height/30} />
	      				<Text style={styles.textCenter}>
	      				  	{ this.state.lang_load?this.state._lang.vi.info:this.state._lang.en.info }
	      				</Text>
	      			</View>
	      			<View style={styles.dataContent}>
		      			<TextInput style={[ styles.input,{height: Math.max(80, Math.min(MAX_HEIGHT+60, height))} ]}
	         				 multiline
	         				 onChangeText={(text)=>this.onInfoChange(text)}
	         				 value={this.state.info}
	          				onContentSizeChange={this.handleContentSizeChange}
	         			/>
	         		</View>
	      		</View>
	      		{this._renderButtonUpdate()}
	      		<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Screen_ChangePass')}} style={styles.itemUser}>
			         		<Icon name='security' color='#007aff' type='material-icons' />
			      			<Text>
			      			  	{ this.state.lang_load?this.state._lang.vi.change_password:this.state._lang.en.change_password }
			      			</Text>
			</TouchableOpacity>
	      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	row:{
		padding: height/60,
		flex:1, 
		backgroundColor: 'rgb(232,232,232)'
		// backgroundColor: 'white'
	},
	centerText:{
		textAlign: 'center',
	},
	faceUser:{
		marginBottom: height/60,
		flex: 0.12,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
	},
	contentUser:{
		flex: 0.93,
		flexDirection: 'column', 
	},
	itemUser:{
		flex: 0.15,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',  
		flexDirection: 'row', 
		marginBottom: height/60,
		paddingVertical: height/60,
		paddingHorizontal: height/60,
	},
	titleContent:{
		paddingVertical: 1,
		flex: 0.25,
		flexDirection: 'column',
		backgroundColor: '#007aff',
		borderRadius: 5,
		// borderWidth: 1
	},
	textCenter:{
		textAlign: 'center',
		color: 'black',
		fontSize: height/60,
	},
	dataContent:{
		flex: 0.75,
		// borderBottomWidth: 1,
	},
	input: {
    // textAlignVertical: "top",
    textAlign: 'center', 
    height: MIN_HEIGHT,
    paddingVertical: height/60,
    // backgroundColor: 'white',
    // borderColor: "rgb(232,232,232)",
  },
  Modals:{
  	height: height,
  	width: width,
  	justifyContent: 'center',
  	alignItems: 'center',
  	backgroundColor: 'rgba(0,0,0,0.3)',
  	alignSelf: 'center', 
  },
  contentModal:{
  	height: (height/5)*2,
  	width: (width/10)*8,
  	backgroundColor: 'white',
  	borderRadius: 10,
  	justifyContent: 'center',
  	alignItems: 'center',
  	flexDirection: 'column',
  	padding:10,
  },
  Modal:{
  	width: (width/10)*7.5,
  	flex: 0.7,
  	justifyContent: 'center',
  	alignItems: 'center',
 	// backgroundColor: 'blue',
  },
  CloseM:{
  	flex: 0.2,
  	// backgroundColor: 'green'
  },
  headModal:{
	flex: 0.2,
	width: (width/10)*7.5,
	justifyContent: 'center',
  	alignItems: 'center',
  },
  renderSuccess:{
  	flex: 0.6,
  	width: (width/10)*7.5,
  	justifyContent: 'center',
  	alignItems: 'center',
  },
  renderError:{
  	flex: 0.8,
  	width: (width/10)*7.5,
  	justifyContent: 'center',
  	alignItems: 'center',
  },
  successIcon:{
	width: width/8.5,
	borderWidth: 3,
	borderRadius: 50,
	borderColor: 'green'
  },
  button:{
  	borderRadius: 5,
  	borderWidth: 1,
  	borderColor: 'green',
  	backgroundColor: 'rgba(192,192,192,0.2)',
  	padding: height/60,
  },
  buttonText:{
  	fontSize: height/40,
  	color: 'black',
  },
});
export default Profile;