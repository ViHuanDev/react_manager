import React, { Component } from 'react';
import {Image,TouchableOpacity , Dimensions,Text} from 'react-native';
import { StackNavigator , DrawerNavigator  ,DrawerItems} from 'react-navigation';
import EmployeeCreate from '../EmployeeList';
import Main_Screen from '../Main_Screen';
import ListFaQ from '../ListFaQ';
import { connect } from 'react-redux';
import EmployeeList from '../EmployeeList';
// import SideBar from '../SideBar';
const {width} = Dimensions.get('window');
export const HomeMenu = StackNavigator({
	Screen_Main:{
		screen: Main_Screen,
	},
	Screen_EmployList:{
		screen: EmployeeList,
		// navigationOptions:({navigation})=>({
		// 	headerLeft:
		// 	<TouchableOpacity  onPress={()=>navigation.navigate('DrawerOpen')}>
		// 			<Text>
		// 			  	Menu
		// 			</Text>
  //   			</TouchableOpacity>,
		// }),
	},
	Screen_EmployAdd:{
		screen: EmployeeCreate,
	},
	Screen_ListFaQ:{
		screen: ListFaQ,
	}
});
// export const Side_Menu = DrawerNavigator({
// 	Sidebar_Menu:{
// 		screen: HomeMenu,
// 	}
// },{
// 	drawerWidth: (width*8)/10,
// 	drawerPosition: 'left',
// 	contentComponent: props => <SideBar {...props} />
// });
// export default connect()(Side_Menu);
export default connect()(HomeMenu);