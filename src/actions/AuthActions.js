import { Actions } from 'react-native-router-flux';
import {
	EMAIL_CHANGED, 
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER,
	NO_CONNECT,
	CHANGE_LANGUAGE,
} from './types';
import { AsyncStorage, componentWillMount } from 'react-native';
import {URL_HOME,normalize} from '../config';
export const emailChanged = (text) => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	};
};
export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	};
};
// export const language_success = (dispatch)=>{
// 	dispatch({
// 		type: CHANGE_LANGUAGE,
// 	});
// 	Actions.main();
// };
export const loginUserSuccess = (dispatch, user) => {
	dispatch ({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});
	Actions.main();
};
// AsyncStorage.getAllKeys((err, keys) => { 
// 	AsyncStorage.multiGet(keys, (err, stores) => {
// 		stores.map((result, i, store)=>{
// 			console.log(result);
// 			if(result){
// 				loginUserSuccess = (dispatch, user) => {
// 					dispatch ({
// 						type: LOGIN_USER_SUCCESS,
// 						payload: user
// 					});
// 					Actions.main();
// 				};
// 			}
// 		});
// 	}); 
// });
export const loginUser = ({email, password}) =>{
	return (dispatch) => {
		// AsyncStorage.getAllKeys((err, keys) => {
		// 	if(keys[0]!==null){
		// 		AsyncStorage.multiGet(keys, (err, stores) => {
		// 			stores.map((result, i, store)=>{
		// 				loginUserSuccess(dispatch);
		// 			});
		// 		}); 
		// 	}
		// 	else{
		// 		console.log("null keys");
		// 	}
		// });
		dispatch({type: LOGIN_USER});
		try {
			fetch(URL_HOME+"/api/users/signin",{
				"method": "POST",
				headers:{
					"Accept":"application/json",
					"Content-Type":"application/json;charset=utf-8"
				},
				body: JSON.stringify({
					"password": password,
					"email" : email
				})
			}).then(async(response)=> response.json()).then((responseJson)=>{
				console.log(responseJson);
				if(responseJson.response==="success"){
					// console.log(responseJson);
					var rJson = responseJson;
					var er = rJson.response;
					if(er!=='error'){
					// console.log(rJson.user['fullname']);
					var token_obj =  rJson.result.token;
					var lang = rJson.user.languagedefault==null?'en':rJson.user.languagedefault;
					// console.log(lang+" auth");
					// var id_user = rJson.user.id;
					console.log(token_obj);
					var key_log = [['@user_id:key',"'"+rJson.user.id+"'"],['@email:key',email],['@password:key',password],['@token:key',token_obj],['@locale:key',lang]];
					// console.log(key_log);
					AsyncStorage.multiSet(key_log);
					// var keyGet = ['@email:key','@password:key','@user_id:key'];
					// 	AsyncStorage.multiGet(keyGet).then((value)=>{
					// 		console.log(value);
					// });
						// console.log("set Ok");
					// var value_token = await AsyncStorage.setItem('@token:key',token_obj);
						// var id_user = await AsyncStorage.setItem('@id_user:key',id_user);
						// console.log("Ok await");
				 		// console.log(await AsyncStorage.getItem('@token:key'));
				// }
				loginUserSuccess(dispatch,rJson.user.fullname);
				// console.log(await AsyncStorage.get('@token:key'));
			}
			else{
				loginUserFail(dispatch,rJson.message);
				
			}
		}
		// if(responseJson._bodyInit.reponse){
		// 	console.log("adasd");
		// 	loginUserFail(dispatch,responseJson._bodyInit.message);
		// }
		// else{
		// 	console.log(responseJson);
		// 	loginUserFail(dispatch,"Bạn chưa nhập email và mật khẩu");
		// }
	}).catch((error)=>{
		// loginUserFail(dispatch);
		console.log("error");
		console.error(error);
	});
}	
catch(error){
	// noInternet(dispatch);
	console.log("no_internet");
};
};
}
const loginUserFail = (dispatch,error) =>{
	dispatch ({
		type: LOGIN_USER_FAIL,
		payload: error
	});
};
const noInternet= (dispatch) =>{
	dispatch({type: NO_CONNECT});
};
