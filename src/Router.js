import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
// import EmployeeList from './components/EmployeeList';
import {HomeMenu} from './components/navigations/MenuNav';
import {Card, CardSection, Input, Button, Spinner} from './components/common';
import EmployeeCreate from './components/EmployeeCreate';
// import SideBar from './components/SideBar';
const RouterComponent = () => {
	return (
		<Router >
			<Scene key = "auth" >				
				<Scene sceneStyle = {{ paddingTop: 0 }} key ="login" component = {LoginForm} title = "Please Login" />
			</Scene>
			<Scene key = "main">
				<Scene  key = "employeeList" component = { HomeMenu } title = "Check Lists"/>
				<Scene key = "employeeCreate" component = { EmployeeCreate } title = "Create Employee" />
			</Scene>
		</Router>
	);
};
export default RouterComponent;