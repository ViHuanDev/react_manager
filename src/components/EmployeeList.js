import React, {Component} from 'react';
import {View, Text,AsyncStorage,ListView,FlatList,Modal,Image,TextInput,
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
			mang: [],isLoading: true,ress: demo,_lang:lang,_langid: '',_search: '',
		};
	}
	componentWillMount(){
		// console.log(width+"'"+height);
		// console.log(this.state.ress);
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
				// console.log(responseJson.length);
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
							animationType="fade"
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
						<View style={styles._headList}>
							<View style={{height: height/15,flex: 0.9}}>
								<TextInput
									underlineColorAndroid={'transparent'}
							        style={{borderColor: 'gray', borderWidth: 1,flex: 1,backgroundColor: 'white',color: 'black'}}
							        onChangeText={(text) => this.setState({_search: text})}
							        placeholder="Search"
							        placeholderTextColor="gray"
							        value={this.state._search} />
							</View>
							<View style={{flex: 0.1}}>
								<Icon type='evilicon' color='#808080' name="search" size={height/20}/>
							</View>
						</View>
						<View style={styles.contentCheckList}>
								<FlatList
							 		data={this.state.mang}
							  		keyExtractor={item => item.id}
							  		renderItem={({item})=>
							  		<TouchableOpacity style={{borderBottomWidth: 1,borderColor: 'gray'}} onPress={()=>{this.props.navigation.navigate('Screen_ActionsCheckList',{id: item.id,name_list: item.name,name_org: item.organization.name,status: item.status})}}>
										<View style={styles.contentList}>
											<View style={styles.contentLeft}>
												<View style={styles.iconLeft}>
													{item.status=="close"?<Icon type='evilicon' color='#808080' name="exclamation" size={height/20} />:item.status=="on progress"?<Icon type='material-community' color='#5DFF5D' name="timelapse" size={height/20} />:
													item.status=="pending"?<Icon type='evilicon' color='#f0c54c' name="clock" size={height/20} />:item.status=="approval"?<Icon type='evilicon' color='#36c6d3' name="check" size={height/20} />:
													item.status=="refuse"?<Icon type='evilicon' color='red' name="close-o" size={height/20} />:<Icon type='evilicon' color='red' name="close-o" size={height/20} />}
													<Text style={{fontSize: 11}}>
													  {item.status}
													</Text>
												</View>
											</View>
											<View style={styles.contentRight}>
													<View style={styles.item}>
														<Text style={[styles.center,{textAlign: 'left',fontWeight: 'bold',fontSize: 16,color: 'black'}]}>
															 {item.name}
														</Text>
														<Text style={{fontSize: 13}} >
														  	{this.state._langid?this.state._lang.vi.org:this.state._lang.en.org} {item.organization.name}
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
		flex: 4/10,
		flexDirection: 'row',
		// borderBottomWidth: 0,
		// backgroundColor: '#'
	},
	contentCheckList:{
		flex: 0.9,
		flexDirection: 'row',
	},
	contentLeft:{
		flex:2/10,
		flexDirection: 'column',
		height: ((height*2)/25*(demo)),
		backgroundColor: 'white'
	},
	contentRight:{
		flex: 8/10,
		height: ((height*2)/25*(demo)),
		flexDirection: 'row', 
		backgroundColor: 'white',
		// justifyContent: 'flex-start', 
	},
	item:{
		flex: 1,
		// alignSelf: 'center',  
		justifyContent: 'center',
		alignItems: 'flex-start', 
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
	_headList:{
		height: height/15,
		width: width,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row', 
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
