import { 
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER,
	NO_CONNECT,CHANGE_LANGUAGE,
} from '../actions/types';

const INITIAL_STATE = {
	email:'',
	email2: '',
	password: '',
	user: null,
	error: '',
	loading: false
};

export default (state = INITIAL_STATE, action) =>{
	switch (action.type) {
		// case CHANGE_LANGUAGE:
		// 	return {...state};
		case EMAIL_CHANGED:
			return { ...state, email: action.payload };
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload };
		case LOGIN_USER:
			return { ...state, loading: true, error:'' };
		case LOGIN_USER_SUCCESS:
			return { ...state, user:action.payload, error: '', loading: false, email: '', password: '' };
		case LOGIN_USER_FAIL:
			return { ...state, error: action.payload, password:'', loading: true};
		case NO_CONNECT:
			return {...state, error: 'No Connect Internet',password:'', loadding: true};
		default:
			return state;
	}
};