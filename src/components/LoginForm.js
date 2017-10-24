import React, {Component} from 'react';
import { Text, AsyncStorage,Image ,Dimensions,View} from 'react-native';
import {connect} from 'react-redux';

import {Card, CardSection, Input, Button, Spinner} from './common';
import {
	emailChanged,
	passwordChanged,
	loginUser,loginUserFail,loginUserSuccess
} from '../actions';
const {height,width} = Dimensions.get('screen');
class LoginForm extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	loadingLogin: true,loading:true,
	  };
	}
	onEmailChange(text){
		this.props.emailChanged(text);
	}
	onPasswordChange(text){
		this.props.passwordChanged(text);
	}
	onButtonPress(){
		const {email,password} = this.props;
		this.props.loginUser({ email, password});
	}
	renderButton(){
		if(this.props.loading){
			<Spinner size = "large"/>
		}
		return(
			<Button	onPress = {this.onButtonPress.bind(this)}> 
			Login 
			</Button>
			);
		}
		componentWillMount(){
			console.log("will");
			var keyGet = ['@email:key','@password:key','@user_id:key'];
			AsyncStorage.multiGet(keyGet).then((value)=>{
				// console.log(value);
				if(value){
					const email =value[0][1];
					const password= value[1][1];
					if(email!==null && password!==null){
						this.setState({
							loading: false
						});
						console.log(email+"-"+password);
						this.props.loginUser({password,email});
					}
				if(value[0][1]==null && value[1][1]==null){
						this.setState({
							loadingLogin: false
						});
						console.log('F');
					}
				}
			});
			// AsyncStorage.multiRemove(['@email:key','@password:key','@token:key','@user_id:key']).then((value)=>{
			// 		console.log("ok remoe");
			// 	});
};
			render(){
				var keyGet = ['@email:key','@password:key'];
				AsyncStorage.multiGet(keyGet).then((value)=>{
					// console.log(value[1]);
					// console.log(this.state.loadingLogin);
				});
				// console.log(value);
				return(
					<Card style={styles.backgroundLogin}>
					<View style={{width: width, height: height, backgroundColor: 'rgba(255,255,255,0.1)',
					justifyContent: 'center',alignItems: 'center',display: this.state.loadingLogin?'flex':'none'}}>
						<Image
						  style={{width: 50,height: 50}}
						  source={require('../images/loading_apple.gif')}
						/>
					</View>	
						<Image source={require('../images/bg-login.jpg')} style={styles.bg_images} >
								<CardSection style={styles.backgroundLogin} >	
									<CardSection>
											<Input 
											label = "Email"
											underlineColorAndroid='transparent'
											keyboardType={'email-address'}
											placeholder = "user@gmail.com"
											onChangeText={this.onEmailChange.bind(this)}
											value = {this.props.email}
											/>
									</CardSection>
									<CardSection>
											<Input
											secureTextEntry={true}
											underlineColorAndroid='transparent'
											label = "Password"
											placeholder = "password"
											onChangeText={this.onPasswordChange.bind(this)}
											value = {this.props.password}
											/>
									</CardSection>
									<Text style={styles.errorTextStyle}>
											{this.props.error}
									</Text>
									<CardSection>
										{this.renderButton()}
									</CardSection>
								</CardSection>
						</Image>
					</Card>
					);
				}
			}
const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red',
	},
	loaddingAsync: {
		flex:1,
		backgroundColor: 'lightblue',
	},
	backgroundLogin:{
		flex:1,
		flexDirection: 'column',
		justifyContent: 'center',
    	alignItems: 'center', 
		backgroundColor: 'rgba(255,255,255,0.1)',
	},
	bg_images:{
		flex: 1,
		alignSelf:  'stretch',
		width: null,
		justifyContent: 'center' ,
	}
};

const mapStateToProps = ({auth}) => {
	const {email, password, error, loading } = auth;
	return { email, password, error, loading };
};
export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser,loginUserSuccess})(LoginForm);
