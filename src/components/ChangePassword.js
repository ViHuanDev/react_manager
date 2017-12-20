
import React, { Component } from 'react';
import {Icon} from 'react-native-elements';
import {URL_HOME,normalize} from '../config';
import {lang} from './languages/languages';
import {
  StyleSheet,Text,
  View,Dimensions,TextInput,TouchableOpacity,AsyncStorage,Modal,
} from 'react-native';
const {height,width} = Dimensions.get('screen');
class ChangePassword extends Component {

constructor(props) {
  super(props);
  this.state = {
  	oldPass:'',newPass:'',retypePass:'',visibleModal: false,notify:'',error:'',_lang: lang,
  	_iconsuccess: true,_iconerror: true,
  };
};
componentWillMount(){
	AsyncStorage.getAllKeys((err, keys) => { 
        AsyncStorage.multiGet(keys).then((value)=>{
        	console.log(value);
        	this.setState({
          		_langid: value[4][1]=='vi'?true:false,
          	});
        });
    });
};
onCloseModal(){
	this.setState({
		visibleModal: !this.state.visibleModal,
	});
};
_onchangeOldPass(text){
	this.setState({
		oldPass: text,
	});
};
_onchangeNewPass(text){
	this.setState({
		newPass: text,
	});
};
_onchangeRetypePass(text){
	this.setState({
		retypePass: text,
	});
};
_updatePassword(){
	AsyncStorage.getAllKeys((err, keys) => { 
		AsyncStorage.multiGet(keys).then((value)=>{
			// this.setState({
   //        		_langid: value[1][1]=='vi'?true:false,
   //        	});
			if(value){
				const token = value[3][1];
				const id =  (value[4][1]).replace(/[\\']/g,'');
				// console.log(id);
				fetch(URL_HOME+"/api/users/changepassword?token="+token,{
							"method": "POST",
							headers:{
								"Accept":"application/json",
								"Content-Type":"application/json;charset=utf-8"
							},
							body: JSON.stringify({
								"password": this.state.newPass,
								"repass": this.state.retypePass,
								"id": id,
							})
						}).then((response)=>response.json()).then((responseJson)=>{
							console.log(responseJson);
							// if((responseJson._bodyInit).replace(/[""]/g,'')=="Success"){
							// 	this.setState({
							// 		visibleModal: true,
							// 		notify: (responseJson._bodyInit).replace(/[""]/g,''),
							// 		_iconsuccess: true,_iconerror: false,
							// 	});
							// 	AsyncStorage.setItem('@password:key',this.state.newPass);
							// }
							// else{
								console.log(responseJson.error);
								// alert((JSON.parse(responseJson._bodyInit).error));
								this.setState({
									visibleModal: true,
									_iconsuccess: false,_iconerror: true,
									error: responseJson,
								});
							// }
						}).catch((error)=>{
					});
				}
		});
	});
};
_renderError(){
	return(
		<View style={styles.renderError}>
			<Text styel={styles.centerText}>
				<Text style={{color: 'red',fontSize: 15}}>
					{this.state.error.password!=null?this.state.error.password:''}
				</Text>
			</Text>
			<Text styel={styles.centerText}>
				<Text style={{color: 'red',fontSize: 15}}>
					{this.state.error.repass!=null?this.state.error.repass:''}
				</Text>
			</Text>
			<Text styel={styles.centerText}>
				<Text style={{color: 'red',fontSize: 15}}>
					{this.state.error.error!=null?this.state.error.error:''}
				</Text>
			</Text>
		</View>
	);
};
_renderSuccess(){
	return(
		<View style={styles.renderSuccess}>
			<Text style={[styles._button]} >
				<Text style={styles._color}>
			  		{this.state._langid?this.state._lang.vi.update_succ:this.state._lang.en.update_succ}
			 	</Text>
			</Text>
		</View>
	);
};
  render() {
    return (
    <View style={[styles.row]} >
    	<Modal
	          animationType="slide"
	          transparent={true}
	          visible={this.state.visibleModal}
	          onRequestClose={() => {alert("Modal has been closed.")}}
	          >
	          	<View style={styles.Modals}>
					<View style={styles.contentModal}>
				        <View style={styles.Modal}>
		        			<View style={styles.headModal}>
								<Icon  type='material-icons' style={{display: this.state._iconerror?'flex':'none'}} color='red' name='error-outline' size={width/8} />
								<Icon style={[styles.successIcon,{display: this.state._iconsuccess?'flex':'none'}]} type='simple-line-icons' color='green' name='done' size={width/10} />
		        			</View>
				         	{this.state.notify=='Success'?this._renderSuccess():this._renderError()}
				        </View>
				        <View style={styles.CloseM}>
				         		<TouchableOpacity style={styles._button}
				         		 onPress={()=>{this.state._iconerror?this.onCloseModal():this.props.navigation.goBack()}} >
									<Text style={[styles._color]} >
									  	{this.state._langid?this.state._lang.vi.close:this.state._lang.en.close}
									</Text>
								</TouchableOpacity>
				        </View>
				    </View>
				</View>
	    </Modal>
    	<View style={[styles.headChange,styles.center]} >
    		<Text style={styles.textHead} >
    			{this.state._langid?"Đổi mật khẩu":"Password reset"}
    		</Text>
    	</View>
    	<View style={styles.contentChange}>
    		<View style={styles.itemChange}>
    			<View style={styles.textChange}>
    				<Text style={styles.dataText}>
    				  	{this.state._langid?"Mật khẩu mới":"New password"} 
    				</Text>
    			</View>
    			<View 	style={styles.viewChange}>
    					<TextInput style={styles.inputChange}
    						secureTextEntry={true}
    						underlineColorAndroid='transparent'
							onChangeText={(text)=>{this._onchangeNewPass(text)}}
    						placeholder='Invite you enter the new password' />
    			</View>
    		</View>
    		<View style={styles.itemChange}>
    			<View style={styles.textChange}>
    				<Text style={styles.dataText}>
    				  	{this.state._langid?"Nhập lại mật khẩu":"Retype password"} 
    				</Text>
    			</View>
    			<View 	style={styles.viewChange}>
    					<TextInput style={styles.inputChange}
    						secureTextEntry={true}
    						underlineColorAndroid='transparent'
    						onChangeText={(text)=>{this._onchangeRetypePass(text)}}
    						placeholder='Invite you enter the retype new password' />
    			</View>
    		</View>
    		<View style={[styles.itemChange,{flexDirection: 'row'},styles.center]}>
    			<View style={styles.buttonChange}>
    					<TouchableOpacity
    						onPress={()=>{this.props.navigation.goBack()}}
    					  style={[styles._button,styles.center]} >
    						<Text style={styles._color} >
    						  	{this.state._langid?this.state._lang.vi.cancel:this.state._lang.en.cancel}
    						</Text>
    					</TouchableOpacity>
    			</View>
    			<View style={styles.buttonChange}>
    					<TouchableOpacity 
						onPress={()=>{this._updatePassword()}}
    					style={[styles._button,styles.center]} >
    						<Text style={styles._color} >
    						  	{this.state._langid?this.state._lang.vi.update:this.state._lang.en.update}
    						</Text>
    					</TouchableOpacity>
    			</View>
    		</View>
    	</View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
	row:{
		flex: 1,
		flexDirection: 'column',
		width: width,
		height: height,
		paddingHorizontal: 5,
		paddingVertical: 10,
		backgroundColor: '#4B69A6',
	},
	center:{
		justifyContent: 'center',
		alignItems: 'center',  
	},
	textHead:{
		fontSize: width/15,
		color: 'white',
		textAlign: 'center'
	},
	headChange:{
		flex: 0.1,
		marginBottom: 10,
		// backgroundColor: 'white',
		borderRadius: 5,
	},
	contentChange:{
		flex: 0.75,
		// borderWidth: 1,
		// backgroundColor: 'white',
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	dataText:{
		color: 'white',
	},
	inputChange:{
		backgroundColor: 'white',
		borderRadius: 2,
		paddingVertical: 5,
		height: height/15,
		paddingLeft: 15,
	},
	itemChange:{
		paddingVertical: 5,
		// flex: 1,
	},
	textChange:{
		paddingBottom: 5,
	},
	button:{
  	borderRadius: 5,
  	borderWidth: 1,
  	borderColor: 'white',
  	backgroundColor: 'rgba(255,255,255,0.2)',
  	padding: 10,
  	marginHorizontal: 10,
  },
  Modals:{
  	height: height,
  	width: width,
  	justifyContent: 'center',
  	alignItems: 'center',
  	backgroundColor: 'rgba(0,0,0,0.3)',
  	alignSelf: 'center', 
  },
  Modal:{
  	width: (width/10)*7.5,
  	flex: 0.7,
  	justifyContent: 'center',
  	alignItems: 'center',
 	// backgroundColor: 'blue',
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
	CloseM:{
  		flex: 0.2,
  		// backgroundColor: 'green'
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
  buttonText:{
  	fontSize: 15,
  	color: 'black',
  	borderRadius: 5,
  	borderWidth: 1,
  	borderColor: 'green',
  	backgroundColor: 'rgba(192,192,192,0.2)',
  	paddingHorizontal: 10,
  	paddingVertical: 5,
  },
  _button:{
  	borderRadius: 5,
  	// borderWidth: 1,
  	// borderColor: 'green',
  	backgroundColor: '#0457C9',
  	paddingHorizontal: 15,
  	paddingVertical: 5,
  },
	_color:{
 	color: 'white',
 	fontSize: width/25,
 },
 buttonChange:{
 	marginHorizontal: 5
 }
});


export default ChangePassword;