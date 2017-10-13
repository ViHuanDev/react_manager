import React, {Component} from 'react';
import {View, Text,AsyncStorage,ListView,FlatList,
	StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
// import Icon from 'react-native-vector-icons';
// import IconOc from 'react-native-vector-icons/Octicons';
class EmployeeList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mang: [],isLoading: true,
		};
	}
	componentDidMount(){
		var keyGet = ['@email:key','@password:key','@user_id:key','@token:key'];
		AsyncStorage.multiGet(keyGet).then((value)=>{
			if(value){
				const token = value[3][1];
				fetch('http://96.96.10.10/api/checklists?token='+token) .then((response) => 
					response.json()) .then((responseJson) => { 
				this.setState({
					isLoading: false,
					mang: responseJson,
				});
				console.log(this.state.mang);
			}) .catch((error) => { 
				console.error(error); });
		};
	});
};
		render(){
			return(
				<View style={styles.row}>
						<View style={styles.headList}>
							<Text>
							  	Manage Check List
							</Text>
						</View>
						<View style={styles.contentList}>
								<FlatList
							 		 data={this.state.mang}
							  		keyExtractor={item => item.id}
							  		renderItem={({item})=>
							  			<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Screen_ListFaQ',{id: item.id,name_org: item.organization.name})}}>
										<View style={styles.contentList}>
											<View style={styles.contentLeft}>
												<View style={styles.iconLeft}>
													<Icon type='octicon' name="checklist" size={30} />
												</View>
											</View>
											<View style={styles.contentRight}>
													<View style={styles.item}>
														<Text style={styles.center}>
														  	Check list {item.organization.name}
														</Text>
														<Text style={styles.center}>
															 {item.name}
														</Text>													
													</View>
													<View style={styles.arrowLeft}>
														<Icon type='font-awesome' name="chevron-right" size={20} />
													</View>
											</View>
										</View>
								</TouchableOpacity>
							}/>
						</View>
				</View>

				// <Text>
				//   	Hello
				// </Text>
				);
			}
		}
const {height,width} = Dimensions.get('screen');
const styles = StyleSheet.create({
	row:{
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'rgba(192,192,192,0.1)'
	},
	contentList:{
		marginTop: 5,
		height: (height*2)/10,
		flexDirection: 'row',
		borderWidth: 1,
		// borderBottomWidth: 0,
		// backgroundColor: '#'
	},
	contentLeft:{
		flex:1,
		flexDirection: 'column',
		height: (height*2)/30,
		backgroundColor: 'white'
	},
	contentRight:{
		flex:6,
		height: (height*2)/30,
		flexDirection: 'row', 
		backgroundColor: 'white',
		borderBottomWidth: 1,
	},
	item:{
		flex: 0.9,
		// alignSelf: 'center',  
		justifyContent: 'center',
		alignItems: 'center', 
		// borderBottomWidth: 1,
		// borderRightWidth: 1,
	},
	arrowLeft:{
		flex: 0.1,
		justifyContent: 'center',
		alignItems: 'center', 
	},
	center:{
	},
	headList:{
		flex: 0.1,
		justifyContent: 'center',
		alignItems: 'center' 
	},
	contentList:{
		flex: 0.9,
		flexDirection: 'row' 
	},
	iconLeft:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'green',
	}
});
export default EmployeeList;
