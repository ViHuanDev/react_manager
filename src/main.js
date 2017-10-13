import React, {Component} from 'react';
import { View,AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Provider} from 'react-redux';
// import firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
class Main extends Component {
// 		componentWillMount(){
// 			console.log("log.");
// 			var keyGet = ['@email:key','@password:key','@user_id:key'];
// 			AsyncStorage.multiGet(keyGet).then((value)=>{
// 				if(value){
// 					// console.log("wtf");
// 					const email =value[0][1];
// 					const password= value[1][1];
// 					// console.log(value);
// 					if(email!==null && password!==null){
// 						Actions.main();
// 						console.log(email+"-"+password);
// 						// this.props.loginUser({password,email});
// 						// console.log("success");
// 						var data = JSON.stringify(value);
// 						// console.log(data);
// 					}
// 				}
// 			});
// 			// AsyncStorage.multiRemove(['@email:key','@password:key','@token:key','@user_id:key']).then((value)=>{
// 			// 		console.log("ok remoe");
// 			// });
// };
	render(){
		return (
			<Provider store = {createStore (reducers, {}, applyMiddleware(ReduxThunk))}>
			<Router />				
			</Provider>
			);
		}
	};
	export default Main;