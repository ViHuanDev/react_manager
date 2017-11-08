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
			selectedIds:[],array_status: [],_modal: false,_idClick:'',array_id:[],
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
					// console.log(this.state.array_faq);
				}) .catch((error) => { 
					console.error(error); 
				});
			fetch('http://96.96.10.10/api/chkitemstatus?token='+value[3][1]).then((response) => 
				response.json()).then((responseJson)=>{ 
					// console.log(responseJson);
					this.setState({
						isLoading: false,
						array_status: responseJson,
						});
					// console.log(this.state.array_status);
				}) .catch((error) => { 
					console.error(error); 
				});  
          });
    }); 
};
_onPressAction(el){
	this.setState({
		_modal: true,
		_idClick: el,
	});
}
_thisSelectSatus(el){
	var ar= el.split('-');
	console.log(ar);
	// this.setState({
	// 	array_id: [],
	// });
	for(let i=0;i <= this.state.array_id.length-1;i++){
		for(let j=i+1; j <this.state.array_id.length;j++){
			if(this.state.array_id[i]==this.state.array_id[j]){
				console.log(this.state.array_id[j]);
				this.state.array_id.splice(j);
			}
		}
	}
	console.log(this.state.array_id);
}
_thisCheckbox(el){
	var id = this.state._idClick;
	var temp= '';
		if(this.state.array_id.includes(id+'-'+el)){
			return true;
		}
		else{
			temp = Number(el)-1;
			console.log((id+'-'+temp));
			if(this.state.array_id.includes(id+'-'+temp)){
				return true;
			}
			else{
				return false;
			}
		}
}
_eachStatus(){
	let arr = this.state.array_status;
	let view = [];
	for(let i=0;i<arr.length;i++){
		let item = arr[i];
		view.push(
			<View key={"mActions"+item.id} style={styles._mMainAction}>
				<View style={[styles._mCheckbox,styles._center]}>
					<CheckBox
						center
						isChecked={true}
						checked={this._thisCheckbox(item.id)}
						checkedColor='green'
						onPress={()=>this._thisSelectSatus(this.state._idClick+'-'+item.id)}
						uncheckedColor='black'
						style={[styles._checkbox]}  />
				</View>
				<View style={[styles._mtextAction,styles._center]}>
					<Text style={[styles._mText,styles._center]}>
					  	{item.name}
					</Text>
				</View>
			</View>
		);
	}
	return view;
}
_eachItem(){
	var arr = this.state.array_faq;
	const lang = this.state.language;
	// console.log(lang);
	var view = [];
	for(let i=0;i < arr.length;i++){
		// console.log(arr[i].group.name+'gr');
		let item = arr[i];
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
			for(let a=0;a<arr[i].data.length;a++){
				// console.log(arr[i].data[a].name);
				let item = arr[i].data[a];
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
					for(let b=0;b<arr[i].data[a].checklist_item.length;b++){
						// console.log(arr[i].data[a].checklist_item[b].id);
							let item = arr[i].data[a].checklist_item[b];
							let temp = [];
							// console.log("what for");
							this.state.array_id.push(item.pivot.chkitems_id+'-'+item.pivot.chkitemstatus);
							for(let i2=0;i2 <= this.state.array_id.length-1;i2++){
								for(let j=i2+1; j <this.state.array_id.length;j++){
									if(this.state.array_id[i2]==this.state.array_id[j]){
										this.state.array_id.splice(j);
									}
								}
							}
							view.push(
							<View style={[styles._datasContent]} key={"checklist"+item.id}>
								<View style={styles._dataContent}>
									<Text>
							  			{arr[i].data[a].checklist_item[b].content}
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
												<TouchableOpacity key={"action:key"+item.id} onPress={()=>this._onPressAction(item.id)} >
													<Text style={styles._text}>
														Actions
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
					}
			}
	}
	return view;
};
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
			<View style={[styles.row]}>
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
				<Modal 
					animationType="slide"
					transparent={true}
					visible={this.state._modal}
					onRequestClose={() => {alert("Modal has been closed.")}} >
						<View style={[styles._actionRow,styles._center]}>
							<View style={styles._mcontentAction}>
								<View style={styles._mheadAction}>
									<Text>
									  	Actions
									</Text>
								</View>
								<View style={styles._mdataAction}>
									{this._eachStatus()}
								</View>
								<View style={[styles._mfootAction,styles._center]}>
									<View>
										<TouchableOpacity>
											<Text>
											  	Cancel
											</Text>
										</TouchableOpacity>
									</View>
									<View>
										<TouchableOpacity>
											<Text>
											  	Save
											</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
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
	_actionRow:{
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.3)',
		width: width,
	},
	_mcontentAction:{
		height: (height/4)*2,
		backgroundColor: 'white',
		width: width-20,
		paddingVertical: 10,
		flexDirection: 'column', 
	},
	_mheadAction:{
		flex: 0.1,
	},
	_mdataAction:{
		flex: 0.8,
	},
	_mfootAction:{
		flex: 0.1,
		flexDirection: 'row', 
	},
	_mMainAction:{
		flex: 1,
		flexDirection: 'row',
		borderWidth: 1,
	},
	_checkbox:{
		backgroundColor: 'rgba(255,255,255,0)',
		paddingLeft: 20,
	},
	_mCheckbox:{
		flex: 0.1,
	},
	_mtextAction:{
		flex: 0.9,
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
