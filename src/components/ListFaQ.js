import React, { Component } from 'react';
import {View,Text,FlatList,AsyncStorage,Dimensions,Modal,Image,Picker,
	StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
// import CheckBox from 'react-native-checkbox';
import { Icon } from 'react-native-elements';
import { CheckBox } from 'react-native-elements';
import PopoverTooltip from 'react-native-popover-tooltip';
class ListFaQ extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id_faq: this.props.navigation.state.params.id,isLoading:true,
			array_faq: [], page:0,isLoadding: true,count:0,checkItem: true, color:'blue',
			selectedIds:[],language:'java',array_status: [],
		};
	};
// _keyExtractor = (item, index) => index;
componentWillMount() {
	//checklists/id_check?token
	AsyncStorage.getAllKeys((err, keys) => { 
          AsyncStorage.multiGet(keys).then((value)=>{
          	console.log(this.state.id_faq+'id');
        	fetch('http://96.96.10.10/api/checklists/'+this.state.id_faq+'?token='+value[3][1]).then((response) => 
				response.json()) .then((responseJson) => { 
					this.setState({
						array_faq: responseJson.data,
					});
				}) .catch((error) => { 
					console.error(error); 
				});
			fetch('http://96.96.10.10/api/chkitemstatus?token='+value[3][1]).then((response) => 
				response.json()).then((responseJson)=>{ 
					// console.log(responseJson);
					this.setState({
						isLoading: false,
						// array_status: responseJson.data,
					});
				}) .catch((error) => { 
					console.error(error); 
				});  
          });
    }); 
};
onPressAction(el){
	console.log(el);
}
_eachItem(){
	var arr = this.state.array_faq;
	const lang = this.state.language;
	console.log(lang);
	var view = [];
	arr.map(function(item){
		view.push(
			<View style={[styles._datasContent,{marginTop: height/60}]} key={"namegroup"+item.group.id}>
				<View style={{flexDirection: 'row' }}>
					<Text style={{width: width/4}}>
					  	Group:
					</Text>
					<Text>
					  	{item.group.name+"gr"}
					</Text>
				</View>
			</View>
		);
			item.data.map(function(item){
				view.push(
					<View style={[styles._datasContent]} key={"nameCheck"+item.id}>
						<View style={{flexDirection: 'row' }}>
							<Text style={{width: width/4,textAlign: 'auto' }}>
							  Answer:
							</Text>
							<Text>
					  			{item.name}
							</Text>
						</View>
					</View>
				);
					item.checklist_item.map(function(item){
						view.push(
							<View style={[styles._datasContent]} key={"checklist"+item.id}>
								<View style={styles._dataContent}>
									<Text>
							  			{item.content}
									</Text>
								</View>
								<View style={[styles._actionsContent,{borderBottomWidth: 1}]}>
										<View style={[styles._itemAction,styles._center]}>
											<View style={styles._iconAction}>
												<Icon type='material-icons' name='do-not-disturb' size={20} />
											</View>
											<View style={styles._textAction}>
												<Text style={styles._text}>
												  	Comment
												</Text>
											</View>
										</View>
										<View style={[styles._itemAction,styles._center]}>
											<View style={styles._iconAction}>
												<Icon type='material-icons' name='do-not-disturb' size={20} />
											</View>
											<View style={styles._textAction}>
											<TouchableOpacity key={"action:key"+item.id} onPress={()=>{this.onPressAction.bind('1')}} >
												<Text style={styles._text}>
													click
												</Text>
											</TouchableOpacity>
											</View>											
										</View>
										<View style={[styles._itemAction,styles._center]}>
											<View style={styles._iconAction}>
												<Icon type='material-icons' name='do-not-disturb' size={20} />
											</View>
											<View style={styles._textAction}>
												<Text style={styles._text}>
									  				More
												</Text>
											</View>
										</View>
								</View>
							</View>
				);
				});
			});
		});
	return view;
};
// _eachItem(){
// 	var arr = this.state.array_faq;
// 	var view = [];
// return(
// 	<View>
// 		{arr.map(function(item){
// 			<View style={{backgroundColor: 'cyan'}}>
// 				<Text>
// 					{item.group.name+'gr'}
// 				</Text>
// 			</View>
// 		})}
// 	</View>
// );
// };
// _keyExtractor(){
// 	var arr = this.state.array_faq;
// 	const id =[];
// 	// console.log(arr);
// 	arr.map(function(item){
// 		item.data.map(function(data){
// 			id.push(data.id);
// 		});
// 	});
// 	return id;
// }
render() {
	return (
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
				<View style={styles._header}>
					<Text style={styles._textHead}>
						Checklist company
					</Text>
				</View>
				<View style={styles._content}>
					<ScrollView>
						<View style={styles._itemsContent}>
							{this._eachItem()}
						</View>
					</ScrollView>
				</View>
			</View>
		);
	}
}
const {height,width} = Dimensions.get('screen');
const styles= StyleSheet.create({
	_center:{
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',   
	},
	row:{
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'rgba(192,192,192,0.5)',
	},
	_img:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',  
	},
	_header:{
		flex: 0.1,
		backgroundColor: 'white',
	},
	_content:{
		flex: 0.9,
		flexDirection: 'column', 
	},
	_itemsContent:{
		padding: 2,
	},
	_datasContent:{
		backgroundColor: 'white',
		paddingHorizontal: 5,
		flexDirection: 'column',
	},
	_dataContent:{
		flex: 0.7,
	},
	_actionsContent:{
		flex: 0.3,
		padding: 2,
		flexDirection: 'row', 
	},
	_itemAction:{
		flex: 0.3,
}
});
export default ListFaQ;
