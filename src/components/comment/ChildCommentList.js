import React, { Component } from 'react';
import {
  StyleSheet,Dimensions,ScrollView,Image,FlatList,
  View,Text,TouchableOpacity,TextInput,Modal
} from 'react-native';
import HTML from 'react-native-render-html';
import { Icon } from 'react-native-elements';
const {height,width} = Dimensions.get('screen');
class ChildCommentList extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	_arr_state: this.props.navigation.state.params.arr_child,id_ckl: this.props.navigation.state.params.id_arr,
	  	_isLoading: false,
	  };
	}
	componentWillMount(){
		// console.log(this.state._arr_state);
	};
  render() {
    return (
     	<View style={styles._row}>
     		<Modal 
				animationType="slide"
				transparent={false}
				visible={this.state._isLoading}
				onRequestClose={() => {alert("Modal has been closed.")}} >
					<View style={styles._img}>
						<Image
							style={{justifyContent: 'center', alignItems: 'center',height: height/10,width: height/10}}
							source={require('../../../images/loading_green.gif')}
					/>
				</View>
			</Modal>
     		<View style={styles._sDataChildComment} >
	     		<ScrollView style={styles._sScrollView}>
					<FlatList
						keyExtractor={item=>item.id}
						data={this.state._arr_state}
						renderItem={({item})=>
			     		<View style={[styles._sChildComment,styles._center]}>
							<View style={styles._sChildIconUser}>
								<Icon type='font-awesome' color='#F6F7F9' name='user-circle' size={((width-(width/10))/9)} />
			     			</View>
			     			<View style={styles._sContentChildUser}>
								<View style={styles._sNameUser}>
									<Text style={[styles.font_size,{fontWeight: 'bold',textAlign: 'left'  }]} >
								  		{item.user.fullname} 
									</Text>
								</View>
								<View style={styles._sCommentUser}>
									<HTML containerStyle={{paddingLeft: 10}} html={item.content} />
								</View>
								<View style={styles._sChildActionsUser}>
									<TouchableOpacity>
										<Text style={[styles._editComment,styles.font_size]}>
										  	Sửa
										</Text>
									</TouchableOpacity>
									<TouchableOpacity>
										<Text style={[styles._delComment,styles.font_size]}>
										  	Xóa
										</Text>
									</TouchableOpacity>
			     				</View>
			     			</View>
			     		</View>
			     	}/>
		     	</ScrollView>
		    </View>
     		<View style={styles._sAddCommentChild}>
     			<View style={[styles._minputText]}>
					<TextInput style={{borderWidth: 0.3,borderRadius: 3,flex: 1}}
							multiline={true}>
					</TextInput>
				</View>
				<View style={[styles._mClickComment,styles._center]}>
					<TouchableOpacity onPress={()=>{this._closeComment()}} >
						<Text style={styles._buttonComment}>
						  	Cancel
						</Text>
					</TouchableOpacity>
						<Text style={styles._buttonComment}>
						  	Send
						</Text>
				</View>
     		</View>
     	</View>
    );
  }
}
const styles = StyleSheet.create({
	_center:{
		justifyContent: 'center',
		alignItems: 'center',  
	},
	_row:{
		flex: 1,
		flexDirection: 'column', 
	},
	_sComment:{
		height: height/10,
	},
	_sUser:{
		flex: 1,
		flexDirection: 'row', 
	},
	_sContentUser:{
		flex: 0.8,
		flexDirection: 'column' 
	},
	_sChildComment:{
		flex: 0.75,
		height: height/10,
		width: width,
		flexDirection: 'row',
		backgroundColor: 'white',
		marginBottom: 2,
	},
	_sIconUser:{
		flex: 0.2,
		backgroundColor: 'lightblue',
	},
	_sChildIconUser:{
		flex: 0.2,
	},
	_sContentChildUser:{
		flex: 0.8,
	},
	_sChildActionsUser:{
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	_sDataChildComment:{
		flex: 0.85,
	},
	_sScrollView:{
		height: height,
	},
	_sAddCommentChild:{
		flex: 0.15,
		marginBottom: 2,
		backgroundColor: 'white',
	},
	_minputText:{
		flex: 0.6,
	},
	_mClickComment:{
		flex: 0.4,
		flexDirection: 'row', 
	},
	_img:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',  
	},
});


export default ChildCommentList;