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
	// 	componentWillMount(){
	// 	AsyncStorage.getAllKeys((err, keys) => { 
	// 		AsyncStorage.multiGet(keys, (err, stores) => {
	// 			stores.map((result, i, store)=>{
	// 				console.log(result);
	// 				if(result){
	// 					loginUserSuccess = (dispatch,result) => {
	// 						dispatch ({
	// 							type: "login_user_success",
	// 							payload: result,
	// 						});
	// 						Actions.main();
	// 					};
	// 				}
	// 			});
	// 		}); 
	// 	});
	// }
	render(){
		return (
			<Provider store = {createStore (reducers, {}, applyMiddleware(ReduxThunk))}>
			<Router />				
			</Provider>
			);
		}
	};
	export default Main;