import React, { Component } from 'react';
import {View,Text,FlatList,AsyncStorage,Dimensions,
	StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
// import CheckBox from 'react-native-checkbox';
import { Icon } from 'react-native-elements';
import { CheckBox } from 'react-native-elements';
import PopoverTooltip from 'react-native-popover-tooltip';
class ListFaQ extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id_faq: this.props.navigation.state.params.id,
			array_faq: [], page:0,isLoadding: true,count:0,checkItem: true, color:'blue',
			selectedIds:[],
		};
	};
	clickCheck(id){
	// console.log();
	// if(this.state.checkItem==true){
	// 	this.setState({
	// 		checkItem: false
	// 	});
	// 	console.log(this.state.checkItem+"false");
	// }
	// else{
	// 	this.setState({
	// 		checkItem: true
	// 	});
	// 	console.log(this.state.checkItem+"true");
	// }
	let temp = this.state.selectedIds;
	if(temp.includes(id)){
		temp.splice(temp.indexOf(id),1); //remove=1 with indexOf, add=0
	}
	else{
		temp.push(id); //add id for array
	}
	this.setState({
		selectedIds: temp,
	});
}
fetchdata = ()=>{
	this.setState({
		page: this.state.page+1
	});
	var keyGet = ['@email:key','@password:key','@user_id:key','@token:key'];
	AsyncStorage.multiGet(keyGet).then((value)=>{
		if(value){
			const token = value[3][1];
			console.log(this.state.id_faq);
			fetch('http://96.96.10.10/api/checklists/extend/getfaq/'+this.state.id_faq+'?page='+this.state.page+'&token='+token)
			.then((response)=>response.json()).then((responseJson) => {
				console.log(responseJson);
				this.setState({
					isLoading: false,
					array_faq: this.state.array_faq.concat(responseJson.data),
					count: 0-20,
				});
				// console.log(this.state.array_faq);
			}) .catch((error) => { 
				console.error(error); });
		};
	});
}
componentDidMount(){
	console.log(this.state.id_faq);
	this.fetchdata();
};
_keyExtractor = (item, index) => index;
render() {
	return (
		<View style={styles.row}>
			<View style={styles.titleHead}>
				<Text>
					Check list {this.props.navigation.state.params.name_org}
				</Text>
		</View>
		<View style={styles.content}>
			<FlatList
				onEndReachedThreshold={0.2}
				onEndReached={()=>{  	this.fetchdata(); }}
				data={this.state.array_faq}
				keyExtractor={item => item.id}
				renderItem= { ({item})=>
		<View style={styles.itemRow} >
			<View style={styles.rowCheck}>
				<CheckBox
					isChecked={true}
					checked={this.state.selectedIds.includes(item.id)?true:false}
					checkedColor='blue'
					uncheckedColor='black'
					onPress={()=>this.clickCheck(item.id)}
					style={styles.checkbox} />
			</View>
		<View style={styles.rowContent}>
			<View style={styles.contentItem}>
				<TouchableOpacity>
					<Text style={{color: 'black',}}> {item.content} </Text>
		</TouchableOpacity>
		</View>
		<View style={styles.functionItems}>
			<View style={styles.functionItem}>
				<Icon style={[styles.iconFunc,styles.center]} iconColor='red' type='font-awesome' name='comment-o' size={20} />
				<Text style={[styles.paddingL,styles.textFunc]}>
				  	Comment
				</Text>
			</View>
			<PopoverTooltip
					ref='tooltip2'
					setBelow={false}
					componentWrapperStyle={{flex: 0.3}}
					tooltipContainerStyle={{flexDirection: 'row'}}
					buttonComponent={
						<View style={styles.contentTooltip}>
							<Icon style={[styles.iconFunc,styles.center]} type='zocial' name='statusnet' size={20} />
							<Text style={[styles.paddingL,styles.textFunc]}>
								Action
							</Text>
							<View style={styles.arrowLeft}>
								<Icon type='font-awesome' name="chevron-right" size={20} />
							</View>
						</View>
					}
					items={[
						{
							label: 'Action Id '+item.id,
							onPress: () => {alert(item.id)}
						},
						{
							label: 'Item 2',
							onPress: () => {}
						},
						{
							label: 'Item 3',
							onPress: () => {}
						}
						,
						{
							label: 'Item 4',
							onPress: () => {}
						}
						,
						{
							label: 'Item 5',
							onPress: () => {}
						}
						]}
						animationType='timing'
						timingConfig={{duration: 0}}
				/>
				<View style={styles.functionItem}>
							<Icon style={[styles.iconFunc,styles.center]} iconColor='red'  type='material-icons' name='view-module' size={20} />
							<Text style={[styles.paddingL,styles.textFunc]}>
								See More
							</Text>
				</View>
				</View>
			</View>
		</View>
				} />
	</View>
</View>
				);
}

}
const {height,width} = Dimensions.get('screen');
const styles= StyleSheet.create({
	center:{
		// justifyContent: 'center',
		// alignSelf: 'center',
		alignItems: 'center',   
	},
	row:{
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'white',
	},
	itemRow:{
		height: height/7,
		marginTop: (height/7)/10,
		marginLeft: (height/7)/10,
		flex:1,
		flexDirection: 'row', 
		// borderWidth: 1,
		backgroundColor: 'rgba(240,248,255,0.8)'
	},
	titleHead:{
		flex:0.1,
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
	},
	content:{
		flex:0.9,
		flexDirection: 'column',
		paddingRight: 5, 
	},
	checkbox:{
		paddingLeft: (width/20)
		// backgroundColor: 'red', 
        // borderWidth: 1,
        // height: (height/6)/5,
        // width: width/16,
    },
    rowCheck:{
    	flex: 1,
    	justifyContent: 'center',
    	alignItems:  'center', 
    },
    rowContent:{
    	flex: 9.3,
    	flexDirection: 'column' 
    },
    contentItem:{
    	flex:0.7,
    },
    functionItems:{
    	flex:0.3,
    	flexDirection: 'row',
    	justifyContent: 'center',
    	alignItems: 'center'  
    },
    functionItem:{
    	// borderWidth: 1,
    	flexDirection: 'row', 
    	justifyContent: 'center', 
    	alignItems: 'center', 
    	flex: 0.3,
    },
    contentTooltip:{
    	// borderWidth: 1,
    	flexDirection: 'row', 
    	justifyContent: 'center', 
    	alignItems: 'center', 
    },
    paddingL:{
    	// paddingLeft: 10 
    },
    textFunc:{
    	flex:2,
    	alignItems: 'flex-start',
    	// borderWidth: 1 
    },
    iconFunc:{
    	flex:1,
    	// borderWidth: 1,
    },
});
export default ListFaQ;
