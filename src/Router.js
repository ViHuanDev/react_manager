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
			<Scene key = "auth" hideNavBar >				
				<Scene sceneStyle = {{ paddingTop: 0 }} key ="login" component = {LoginForm} title = "Please Login" />
			</Scene>
			<Scene key = "main"  hideNavBar >
				<Scene  key = "employeeList" component = { Side_Menu } title = "HomePage"/>
			</Scene>
		</Router>
	);
};
export default RouterComponent;