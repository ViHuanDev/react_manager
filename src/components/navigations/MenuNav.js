import React, { Component } from 'react';
import {Image,TouchableOpacity , Dimensions,Text,StyleSheet} from 'react-native';
import { StackNavigator , DrawerNavigator ,AsyncStorage ,DrawerItems,NavigationActions } from 'react-navigation';
import EmployeeCreate from '../EmployeeList';
import Main_Screen from '../Main_Screen';
import ChoseLanguage from '../ChoseLanguage';
import ListFaQ from '../ListFaQ';
import ChangePassword from '../ChangePassword';
import { connect } from 'react-redux';
import EmployeeList from '../EmployeeList';
import Profile from '../Profile';
import {Icon} from 'react-native-elements';
import SideBar from '../SideBar';
const {width} = Dimensions.get('window');
export const HomeMenu = StackNavigator({
	Screen_Main:{
		screen: Main_Screen,
		//header:{ visible:false },
		navigationOptions:({navigation})=>({
			headerRight:
			<TouchableOpacity style={styles.paddingIcons}  onPress={()=>navigation.navigate('DrawerOpen')}>
					<Icon type='material-community-icons' name='menu' size={20} />
    		</TouchableOpacity>,
			headerTitleStyle:{
				alignSelf: 'center',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
				paddingLeft: 0
			},
			headerStyle:{

			},
			headerLeft:
				<Text></Text>,
		}),
	},
	Screen_EmployList:{
		screen: EmployeeList,
		navigationOptions:({navigation})=>({
			headerRight:
				<TouchableOpacity  style={styles.paddingIcons} onPress={()=>navigation.navigate('DrawerOpen')}>
						<Icon type='material-community-icons' name='menu' size={20} />
	   	 		</TouchableOpacity>,
			title:'CheckLists',
			headerTitleStyle:{
				alignSelf: 'center',
			},
			headerLeft:
				<TouchableOpacity style={styles.paddingIcons}  onPress={()=>{navigation.goBack()}}>
						<Icon type='entypo' name='chevron-thin-left' size={20} />
	   	 		</TouchableOpacity>,
		}),	
	},
	Screen_EmployAdd:{
		screen: EmployeeCreate,
	},
	Screen_ListFaQ:{
		screen: ListFaQ,
	},
	Screen_Profile:{
		screen: Profile,
		navigationOptions:({navigation})=>({
			headerRight:
				<TouchableOpacity  style={styles.paddingIcons} onPress={()=>navigation.navigate('DrawerOpen')}>
						<Icon type='material-community-icons' name='menu' size={20} />
	   	 		</TouchableOpacity>,
			title:'Profile',
			headerTitleStyle:{
				alignSelf: 'center',
			},
			headerLeft:
				<TouchableOpacity style={styles.paddingIcons}  onPress={()=>{navigation.goBack()}}>
						<Icon type='entypo' name='chevron-thin-left' size={20} />
	   	 		</TouchableOpacity>,
		}),	
	},
	Screen_ChangePass:{
		screen: ChangePassword,
		navigationOptions:({navigation})=>({
			headerRight:
				<TouchableOpacity  style={styles.paddingIcons} onPress={()=>navigation.navigate('DrawerOpen')}>
						<Icon type='material-community-icons' name='menu' size={20} />
	   	 		</TouchableOpacity>,
			title:'Change Password',
			headerTitleStyle:{
				alignSelf: 'center',
			},
			headerLeft:
				<TouchableOpacity style={styles.paddingIcons}  onPress={()=>{navigation.goBack()}}>
						<Icon type='entypo' name='chevron-thin-left' size={20} />
	   	 		</TouchableOpacity>,
		}),	
	},
	Screen_ChoseLanguage:{
		screen: ChoseLanguage,
		navigationOptions:({navigation})=>({
			headerRight:
				<TouchableOpacity  style={styles.paddingIcons} onPress={()=>navigation.navigate('DrawerOpen')}>
						<Icon type='material-community-icons' name='menu' size={20} />
	   	 		</TouchableOpacity>,
			title:'Chose Language',
			headerTitleStyle:{
				alignSelf: 'center',
			},
			headerLeft:
				<TouchableOpacity style={styles.paddingIcons}  onPress={()=>{navigation.navigate('Screen_Main')}}>
						<Icon type='entypo' name='chevron-thin-left' size={20} />
	   	 		</TouchableOpacity>,
		}),	
	},
});
const styles = 	StyleSheet.create({
	paddingIcons:{
		padding: 5,
	}
});
export const Side_Menu = DrawerNavigator({
	Sidebar_Menu:{
		screen: HomeMenu,
	}
},{
	drawerWidth: (width*8)/10,
	drawerPosition: 'left',
	contentComponent: props => <SideBar {...props} />,
	// initialRouteName:'',
	initialRoute :'MenuOpen',
});
export default connect()(Side_Menu);
// export default connect()(HomeMenu);