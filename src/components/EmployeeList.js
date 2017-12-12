import React, {Component} from 'react';
import {View, Text,AsyncStorage,ListView,FlatList,Modal,Image,
	StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import {lang} from './languages/languages';
import {URL_HOME,normalize} from '../config';
// import Icon from 'react-native-vector-icons';
// import IconOc from 'react-native-vector-icons/Octicons';
const {height,width} = Dimensions.get('screen');
let res = (height - width);
const demo = res>0?1:1.5;
class EmployeeList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mang: [],isLoading: true,ress: demo,_lang:lang,_langid: '',
		};
	}
	componentWillMount(){
		console.log(width+"'"+height);
		console.log(this.state.ress);
		var keyGet = ['@email:key','@password:key','@user_id:key','@token:key',''];
		AsyncStorage.getAllKeys((err, keys) => { 
		AsyncStorage.multiGet(keys).then((value)=>{
			if(value){
				// console.log(value);
				this.setState({_langid: value[1][1]=='vi'?true:false,});
				// console.log(value);
				const token = value[3][1];
				fetch(URL_HOME+'/api/checklists?token='+token).then((response) => 
				response.json()) .then((responseJson) => { 
				this.setState({
					isLoading: false,
					mang: responseJson,
				});

				// console.log(this.state.mang);
				}).catch((error) => { 
				console.error(error); });
			};
		});
	});
};
		render(){
			return(
				<View style={styles.row}>
						<Modal 
							animationType="slide"
							transparent={false}
							visible={this.state.isLoading}
							onRequestClose={() => {alert("Modal has been closed.")}} >
								<View style={styles._img}>
									<Image
										style={{justifyContent: 'center', alignItems: 'center',height: height/10,width: height/10}}
										source={require('../images/loading_green.gif')}
									/>
								</View>
						</Modal>
						<View style={styles.headList}>
							<Text>
							  	{this.state._langid?this.state._lang.vi.manage:this.state._lang.en.manage} Check List
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
													<Icon type='octicon' color='#16A086' name="checklist" size={height/20} />
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
const styles = StyleSheet.create({
	row:{
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'rgba(192,192,192,0.1)'
	},
	_img:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',  
	},
	contentList:{
		marginTop: 5,
		height: (height*2)/10*(demo),
		flexDirection: 'row',
		borderWidth: 1,
		// borderBottomWidth: 0,
		// backgroundColor: '#'
	},
	contentLeft:{
		flex:1,
		flexDirection: 'column',
		height: ((height*2)/30*(demo)),
		backgroundColor: 'white'
	},
	contentRight:{
		flex:6,
		height: ((height*2)/30*(demo)),
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
