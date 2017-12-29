import React, {Component} from 'react';
import { Text, AsyncStorage,Image ,Dimensions,View} from 'react-native';
import {connect} from 'react-redux';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient'
import {Card, CardSection, Input, Button, Spinner} from './common';
import {
	emailChanged,
	passwordChanged,
	loginUser,loginUserFail,loginUserSuccess
} from '../actions';
const mapStateToProps = ({auth}) => {
	const {email, password, error, loading } = auth;
	return { email, password, error, loading };
};
const presetColors = {
  instagram: [
    'rgb(106, 57, 171)',
    'rgb(151, 52, 160)',
    'rgb(197, 57, 92)',
    'rgb(231, 166, 73)',
    'rgb(181, 70, 92)'
  ],
  firefox: [
    'rgb(236, 190, 55)',
    'rgb(215, 110, 51)',
    'rgb(181, 63, 49)',
    'rgb(192, 71, 45)',
  ],
  sunrise: [
    'rgb(92, 160, 186)',
    'rgb(106, 166, 186)',
    'rgb(142, 191, 186)',
    'rgb(172, 211, 186)',
    'rgb(239, 235, 186)',
    'rgb(212, 222, 206)',
    'rgb(187, 216, 200)',
    'rgb(152, 197, 190)',
    'rgb(100, 173, 186)',
  ]
};
const presetColors2 = {
  instagram: [
    'rgb(106, 57, 171)',
    'rgb(151, 52, 160)',
    'rgb(197, 57, 92)',
    'rgb(231, 166, 73)',
    'rgb(181, 70, 92)'
  ],
  firefox: [
    'rgb(236, 190, 55)',
    'rgb(215, 110, 51)',
    'rgb(181, 63, 49)',
    'rgb(192, 71, 45)',
  ],
  sunrise: [
    'rgb(92, 160, 186)',
    'rgb(106, 166, 186)',
    'rgb(142, 191, 186)',
    'rgb(172, 211, 186)',
    'rgb(239, 235, 186)',
    'rgb(212, 222, 206)',
    'rgb(187, 216, 200)',
    'rgb(152, 197, 190)',
    'rgb(100, 173, 186)',
  ]
};
const {height,width} = Dimensions.get('screen');
class LoginForm extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	loadingLogin: true,loading:true,error: this.props.error,
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
			<Button style={{width: width/3,backgroundColor: '#4285F4'}} textStyle={{color: 'white'}}	onPress = {this.onButtonPress.bind(this)}> 
				Login 
			</Button>
			);
		}
		componentWillMount(){
			// console.log(this.props.error+"login form");
			// if(this.state.error){
			// 	this.setState({
			// 		loadingLogin: false,
			// 	});
			// }
			// this.mapStateToProps();
			console.log("will login");
			var keyGet = ['@email:key','@password:key','@user_id:key'];
			AsyncStorage.multiGet(keyGet).then((value)=>{
				// console.log(value);
				if(value){
					// console.log(value);
					const email =value[0][1];
					const password= value[1][1];
					if(email!=null && password!=null){
						this.setState({
							loading: false,
						});
						console.log(email+"-"+password+" login");
						this.props.loginUser({password,email});
						// this.setState({
						// 	loadingLogin: false,
						// });
						setTimeout(()=>{
							this.setState({
								loadingLogin: false})
							}, 3000);
						}
					if(value[0][1]==null && value[1][1]==null){
						this.setState({
							loadingLogin: false,
						});
						console.log('F'+'Login');
					}
					if(this.props.error){
						this.setState({
							loadingLogin: false,
						});
						console.log('error'+'Login');
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
					<LinearGradient start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} style={[styles.linearGradient]} colors={presetColors2.sunrise}>
						<AnimatedLinearGradient customColors={presetColors.firefox} speed={2000}/>
						<View style={[styles.backgroundLogin]}>
									<View style={{width: width, height: height, justifyContent: 'center',alignItems: 'center',display: this.state.loadingLogin?'flex':'none'}}>
										<Image
										  style={{width: 50,height: 50}}
										  source={require('../images/loading_apple.gif')}
										/>
									</View>
									<CardSection style={[styles.backgroundLogin]} >
										<View style={[{width: width,padding: 5,flex: 0.4},styles._center]}>
											<Image
											  style={{width: height/4,height: height/4}}
											  source={require('../../images/logo.png')}/>
										</View>
										<View style={{width:width,flex: 0.6}} >
											<CardSection style={{backgroundColor: 'rgba(255,255,255,0.4)',borderRadius: 50,marginHorizontal: 5, marginVertical: 5}} >
													<Input 
													customText={
														<Icon type='material-community' style={{paddingLeft: 10 ,paddingRight: width/20}} color='white' name="email-outline" size={height/20}/>
													}
													placeholderTextColor="white"
													keyboardType={'email-address'}
													placeholder = "Email"
													onChangeText={this.onEmailChange.bind(this)}
													value = {this.props.email}
													/>
											</CardSection>
											<CardSection style={{backgroundColor: 'rgba(255,255,255,0.4)',borderRadius: 50,marginHorizontal: 5, marginVertical: 5}} >
													<Input
													customText={
														<Icon type='material-community' style={{paddingLeft: 10 ,paddingRight: width/20}} color='white' name="lock-outline" size={height/20}/>
													}
													secureTextEntry={true}
													placeholderTextColor="white"
													placeholder = "Password"
													onChangeText={this.onPasswordChange.bind(this)}
													value = {this.props.password}
													/>
											</CardSection>
											<Text style={styles.errorTextStyle}>
													{this.props.error}
											</Text>
											<CardSection style={styles._center} >
												{this.renderButton()}
											</CardSection>
										</View>
									</CardSection>
						</View>
					</LinearGradient>
					);
				}
			}
const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red',
	},
	_center:{
		justifyContent: 'center',
		alignItems: 'center', 
	},
	loaddingAsync: {
		flex:1,
		backgroundColor: 'lightblue',
	},
	backgroundLogin:{
		flex:1,
		flexDirection: 'column',
	},
	bg_images:{
		flex: 1,
		alignSelf:  'stretch',
		width: null,
		justifyContent: 'center' ,
	},
	linearGradient: {
	    flex: 1,
  },
};
export default connect(mapStateToProps, {emailChanged,loginUserFail, passwordChanged, loginUser,loginUserSuccess})(LoginForm);
