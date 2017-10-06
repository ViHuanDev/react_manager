import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
// import EmployeeList from './components/EmployeeList';
import {Side_Menu} from './components/navigations/MenuNav';
import {Card, CardSection, Input, Button, Spinner} from './components/common';
import EmployeeCreate from './components/EmployeeCreate';
import SideBar from './components/SideBar';
const RouterComponent = () => {
	return (
		<Router >
			<Scene key = "auth" >				
				<Scene sceneStyle = {{ paddingTop: 0 }} key ="login" component = {LoginForm} title = "Please Login" />
			</Scene>
			<Scene key = "main">
				<Scene 
				onRight = {() => Actions.employeeCreate()}
				rightTitle = "Add"
				key = "employeeList" component = { Side_Menu } title = "Employees"
				onLeft ={()=> SideBar }  leftTitle="Menu"
				/>
				<Scene key = "employeeCreate" component = { EmployeeCreate } title = "Create Employee" />
			</Scene>
		</Router>
	);
};
export default RouterComponent;