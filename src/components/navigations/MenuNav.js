import React, { Component } from 'react';
import {Image,TouchableOpacity , Dimensions,Text,StyleSheet,AsyncStorage,} from 'react-native';
import { StackNavigator , DrawerNavigator  ,DrawerItems,NavigationActions } from 'react-navigation';
import EmployeeCreate from '../EmployeeList';
import Main_Screen from '../Main_Screen';
import ChooseLanguage from '../ChoseLanguage';
import ListFaQ from '../ListFaQ';
import ChangePassword from '../ChangePassword';
import { connect } from 'react-redux';
import EmployeeList from '../EmployeeList';
import Profile from '../Profile';
import {Icon} from 'react-native-elements';
import SideBar from '../SideBar';
import CommentList from '../comment/CommentList';
import ChildCommentList from '../comment/ChildCommentList';
const {width,height} = Dimensions.get('window');
export const HomeMenu = StackNavigator({
	Screen_Main:{
		screen: Main_Screen,
		//header:{ visible:false },
		//
		navigationOptions:({navigation})=>({
			title: (
	            <Image
	                source={require('../../images/header_icon/home_icon.png')}
	                style={{width: width*0.28, height: height/6,}}
	                resizeMode={"contain"}
            	/>
        	),
			headerRight:
			<TouchableOpacity style={styles.paddingIcons}  onPress={()=>navigation.navigate('DrawerOpen')}>
					<Icon type='material-community-icons' color='white' name='menu' size={20} />
    		</TouchableOpacity>,
			headerTitleStyle:{
				alignSelf: 'center',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
				paddingLeft: 0
			},
			headerStyle:{
				backgroundColor: '#5F84CE',
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
						<Icon type='material-community-icons' color='white' name='menu' size={20} />
	   	 		</TouchableOpacity>,
			title: (
	            <Image
	                source={require('../../images/header_icon/checklist_icon.png')}
	                style={{width: width*0.28, height: height/6,}}
	                resizeMode={"contain"}
            	/>
        	),
			headerStyle:{
				backgroundColor: '#DE584D',
			},
			headerTitleStyle:{
				alignSelf: 'center',
			},
			headerLeft:
				<TouchableOpacity style={styles.paddingIcons}  onPress={()=>{navigation.goBack()}}>
						<Icon type='entypo' color='white' name='chevron-thin-left' size={20} />
	   	 		</TouchableOpacity>,
		}),	
	},
	Screen_EmployAdd:{
		screen: EmployeeCreate,
	},
	Screen_ListFaQ:{
		screen: ListFaQ,
		navigationOptions:({navigation})=>({
			headerRight:
				<TouchableOpacity  style={styles.paddingIcons} onPress={()=>navigation.navigate('DrawerOpen')}>
						<Icon type='material-community-icons' color='white' name='menu' size={20} />
	   	 		</TouchableOpacity>,
			title: (
	            <Image
	                source={require('../../images/header_icon/faq_icon.png')}
	                style={{width: width*0.28, height: height/6,}}
	                resizeMode={"contain"}
            	/>
        	),
			headerStyle:{
				backgroundColor: '#16A086',
			},
			headerTitleStyle:{
				alignSelf: 'center',
			},
			headerLeft:
				<TouchableOpacity style={styles.paddingIcons}  onPress={()=>{navigation.goBack()}}>
						<Icon type='entypo' color='white' name='chevron-thin-left' size={20} />
	   	 		</TouchableOpacity>,
		}),	
	},
	Screen_Profile:{
		screen: Profile,
		navigationOptions:({navigation})=>({
			headerRight:
				<TouchableOpacity  style={styles.paddingIcons} onPress={()=>navigation.navigate('DrawerOpen')}>
						<Icon type='material-community-icons' color='white' name='menu' size={20} />
	   	 		</TouchableOpacity>,
			title: (
	            <Image
	                source={require('../../images/header_icon/profile_icon.png')}
	                style={{width: width*0.28, height: height/6,}}
	                resizeMode={"contain"}
            	/>
        	),
			headerStyle:{
				backgroundColor: '#DD574C',
			},
			headerTitleStyle:{
				alignSelf: 'center',
			},
			headerLeft:
				<TouchableOpacity style={styles.paddingIcons}  onPress={()=>{navigation.goBack()}}>
						<Icon type='entypo' color='white' name='chevron-thin-left' size={20} />
	   	 		</TouchableOpacity>,
		}),	
	},
	Screen_ChangePass:{
		screen: ChangePassword,
		navigationOptions:({navigation})=>({
			headerRight:
				<TouchableOpacity  style={styles.paddingIcons} onPress={()=>navigation.navigate('DrawerOpen')}>
						<Icon type='material-community-icons' color='white' name='menu' size={20} />
	   	 		</TouchableOpacity>,
			title: (
	            <Image
	                source={require('../../images/header_icon/forgot_password.png')}
	                style={{width: width*0.28, height: height/6,}}
	                resizeMode={"contain"}
            	/>
        	),
			headerStyle:{
				backgroundColor: '#5F84CE',
			},
			headerTitleStyle:{
				alignSelf: 'center',
			},
			headerLeft:
				<TouchableOpacity style={styles.paddingIcons}  onPress={()=>{navigation.goBack()}}>
						<Icon type='entypo' color='white'  name='chevron-thin-left' size={20} />
	   	 		</TouchableOpacity>,
		}),	
	},
	Screen_ChoseLanguage:{
		screen: ChooseLanguage,
		navigationOptions:({navigation})=>({
			headerRight:
				<TouchableOpacity  style={styles.paddingIcons} onPress={()=>navigation.navigate('DrawerOpen')}>
						<Icon type='material-community-icons' color='white' name='menu' size={20} />
	   	 		</TouchableOpacity>,
			title: (
	            <Image
	                source={require('../../images/header_icon/language_icon2.png')}
	                style={{width: width*0.28, height: height/6,}}
	                resizeMode={"contain"}
            	/>
        	),
			headerStyle:{
				backgroundColor: '#0457C9',
			},
			headerTitleStyle:{
				alignSelf: 'center',
			},
			headerLeft:
				<TouchableOpacity style={styles.paddingIcons}  onPress={()=>{navigation.navigate('Screen_Main')}}>
						<Icon type='entypo' color='white' name='chevron-thin-left' size={20} />
	   	 		</TouchableOpacity>,
		}),	
	},
	Screen_CommentList:{
		screen: CommentList,
		navigationOptions:({navigation})=>({
			headerRight:
				<TouchableOpacity  style={styles.paddingIcons} onPress={()=>navigation.navigate('DrawerOpen')}>
						<Icon type='material-community-icons' color='white' name='menu' size={20} />
	   	 		</TouchableOpacity>,
			title: (
	            <Text style={{color: 'white'}}>
	              	Comment
	            </Text>
        	),
			headerStyle:{
				backgroundColor: '#0457C9',
			},
			headerTitleStyle:{
				alignSelf: 'center',
			},
			headerLeft:
				<TouchableOpacity style={styles.paddingIcons}  onPress={()=>{navigation.goBack()}}>
						<Icon type='entypo' color='white' name='chevron-thin-left' size={20} />
	   	 		</TouchableOpacity>,
		}),	
	},
	Screen_ChildCommentList:{
		screen: ChildCommentList,
		navigationOptions:({navigation})=>({
			headerRight:
				<TouchableOpacity  style={styles.paddingIcons} onPress={()=>navigation.navigate('DrawerOpen')}>
						<Icon type='material-community-icons' color='white' name='menu' size={20} />
	   	 		</TouchableOpacity>,
			title: (
	            <Text style={{color: 'white'}}>
	              	Comment
	            </Text>
        	),
			headerStyle:{
				backgroundColor: '#0457C9',
			},
			headerTitleStyle:{
				alignSelf: 'center',
			},
			headerLeft:
				<TouchableOpacity style={styles.paddingIcons}  onPress={()=>{navigation.goBack()}}>
						<Icon type='entypo' color='white' name='chevron-thin-left' size={20} />
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