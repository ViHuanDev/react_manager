import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
// import EmployeeList from './components/EmployeeList';
import {HomeMenu} from './components/navigations/MenuNav';
import {Side_Menu} from './components/navigations/MenuNav';
import {Sidebar_Menu} from './components/navigations/MenuNav';
import {Card, CardSection, Input, Button, Spinner} from './components/common';
import EmployeeCreate from './components/EmployeeCreate';
import ChangePassword from './components/ChangePassword';
import Profile from './components/Profile';
// import HomeMenu from './components/SideBar';
// import {SideBar} from './components/SideBar';
import Stack from './Stack/Stack';
const RouterComponent = () => {
	return (
		<Router >
			<Scene key = "auth" >				
				<Scene sceneStyle = {{ paddingTop: 0 }} key ="login" component = {LoginForm} title = "Please Login" />
			</Scene>
			<Scene key = "main"  hideNavBar >
				<Scene 
					 onLeft={()=>{Actions.menu()}} leftTitle='Menu'
				 	 key = "employeeList" component = { Side_Menu } title = "HomePage"/>
				<Scene key = "employeeCreate" component = { EmployeeCreate } title = "Create Employee" />
				<Scene key = "menu" component = { Side_Menu } />
				<Scene key = "profile" component = { Profile } title="Profile" />
				<Scene key = "changePass" component = { ChangePassword } title="Change Password" />
			</Scene>
		</Router>
	);
};
export default RouterComponent;