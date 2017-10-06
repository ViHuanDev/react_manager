import React, { Component } from 'react';
import {View,Text,FlatList,AsyncStorage,Dimensions,
	StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
// import CheckBox from 'react-native-checkbox';
import { CheckBox } from 'react-native-elements';
class ListFaQ extends Component {
constructor(props) {
  super(props);
  this.state = {
  	id_faq: this.props.navigation.state.params.id,
  	array_faq: [], page:0,isLoadding: true,count:0,checkItem: true
  };
};
clickCheck(){
	// console.log(data.checked);
	if(this.state.checkItem==true){
		this.setState({
			checkItem: false
		});
		console.log(this.state.checkItem+"false");
	}
	else{
		this.setState({
			checkItem: true
		});
		console.log(this.state.checkItem+"true");
	}
}
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
										  <View>
												<CheckBox
													  left
													  title='Click Here'
													  // checkedIcon='dot-circle-o'
													  // uncheckedIcon='circle-o'
													  checked={this.state.checkItem}
													  onPress={()=>this.clickCheck}
												/>
											</View>
											<View>
												<TouchableOpacity>
										  			<Text>
										  					{item.content}
										  			</Text>
										  		</TouchableOpacity>
										  	</View>
								  </View>
							} />
					</View>
			</View>
		);
	}
fetchdata = ()=>{
	this.setState({
		page: this.state.page+1
});
var keyGet = ['@email:key','@password:key','@user_id:key','@token:key'];
		AsyncStorage.multiGet(keyGet).then((value)=>{
			if(value){
				const token = value[3][1];
				console.log(this.state.page);
				fetch('http://96.96.10.10/api/checklists/extend/getfaq/'+this.state.id_faq+'?page='+this.state.page+'&token='+token)
				.then((response)=>response.json()).then((responseJson) => {
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
		this.fetchdata();
};
}

const {height,width} = Dimensions.get('screen');
const styles= StyleSheet.create({
	row:{
		flex: 1,
		flexDirection: 'column',
	},
	itemRow:{
		height: height/6,
		marginTop: (height/7)/10,
		marginLeft: (height/7)/10,
	},
	titleHead:{
		flex:0.1,
		// height: 30,
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
	},
	content:{
		flex:0.9,
		flexDirection: 'column' 
	},
	checkbox:{
        borderRadius: 10,
        borderWidth: 2,
	}
});
export default ListFaQ;
