import React, {Component} from 'react';
import { Text, AsyncStorage,Image } from 'react-native';
import {connect} from 'react-redux';
import {Card, CardSection, Input, Button, Spinner} from './common';
import {
	emailChanged,
	passwordChanged,
	loginUser,loginUserFail,loginUserSuccess
} from '../actions';

class LoginForm extends Component{

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
		///
		componentWillMount(){
			console.log("will");
			var keyGet = ['@email:key','@password:key','@user_id:key'];
			AsyncStorage.multiGet(keyGet).then((value)=>{
				if(value){
					// console.log("wtf");
					const email =value[0][1];
					const password= value[1][1];
					// console.log(value);
					if(email!==null && password!==null){
						console.log(email+"-"+password);
						this.props.loginUser({password,email});
						// console.log("success");
						var data = JSON.stringify(value);
						// console.log(data);
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
					if(value.length > 0){
						return value;
					}
					else{
						return value;
					}
				});
				// console.log(value);
				return(
					<Card style={styles.backgroundLogin}>
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
					// }
				}
			}
const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
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
		justifyContent: 'center' 
	}
};

const mapStateToProps = ({auth}) => {
	const {email, password, error, loading } = auth;
	return { email, password, error, loading };
};
export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser,loginUserSuccess})(LoginForm);
