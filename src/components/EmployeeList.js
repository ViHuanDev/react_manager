import React, {Component} from 'react';
import {View, Text,AsyncStorage,ListView,FlatList,
	StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import CheckBox from 'react-native-checkbox';
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
				// console.log(this.state.mang);
			}) .catch((error) => { 
				console.error(error); });
		};
	});
};
		render(){
			return(
				<View style={styles.row}>
						<View>
							<Text>
							  	Danh sách check list
							</Text>
						</View>
						<FlatList
					  data={this.state.mang}
					  keyExtractor={item => item.id}
					  renderItem={({item})=>
					  		<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Screen_ListFaQ',{id: item.id,name_org: item.organization.name})}}>
					  		<Text>
							  	Code CheckList : {item.id}
							</Text>
								<View style={styles.contentList}>
									<View style={styles.contentLeft}>
											<View style={styles.item}>
												<Text style={styles.center}>
												  	Name User :
												</Text>
											</View>
											<View style={styles.item}>
												<Text style={styles.center}>
												  	Name Company :
												</Text>
											</View>
											<View style={styles.item}>
												<Text style={styles.center}>
												  	Code Company :
												</Text>
											</View>
									</View>
									<View style={styles.contentRight}>
									<View style={styles.item}>
												<Text style={styles.center}>
												  	{item.name}
												</Text>
											</View>
											<View style={styles.item}>
											<Text style={styles.center}>
												{item.organization.name}
											</Text>													
											</View>
											<View style={styles.item}>
											<Text style={styles.center}>
												{item.organization.organization_code}
												</Text>
											</View>
									</View>
								</View>
						</TouchableOpacity>
					}/>
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
		// backgroundColor: 'cyan'
	},
	contentList:{
		marginTop: 5,
		height: (height*1.5)/10,
		flexDirection: 'row',
		borderWidth: 1,
		// borderBottomWidth: 0,
		// backgroundColor: '#'
	},
	contentLeft:{
		flex:1,
		flexDirection: 'column',
		height: (height*1.5)/10.2,
		backgroundColor: 'white'
	},
	contentRight:{
		flex:1,
		height: (height*1.5)/10.2,
		flexDirection: 'column', 
		// backgroundColor: 'lightblue'
	},
	item:{
		flex:1,
		// alignSelf: 'center',  
		justifyContent: 'center',
		alignItems: 'center', 
		// borderBottomWidth: 1,
		// borderRightWidth: 1,
	},
	center:{
	}
});
export default EmployeeList;
