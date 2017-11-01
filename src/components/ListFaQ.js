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
			// id_faq: this.props.navigation.state.params.id,
			array_faq: [], page:0,isLoadding: true,count:0,checkItem: true, color:'blue',
			selectedIds:[],
		};
	};
// _keyExtractor = (item, index) => index;
render() {
	return (
			<View style={styles.row}>
				<View style={styles._header}>
					<Text style={styles._textHead}>
						Checklist company
					</Text>
				</View>
				<View style={styles._content}>
					<View style={styles._itemsContent}>
						<View style={styles._dataContent}>
							<View style={[styles._itemCheck,styles._itemData,styles._center]}>
								<CheckBox
									isChecked={true}
									checkedColor='blue'
									uncheckedColor='black'
									style={styles._checkbox} />
							</View>
							<View style={styles._textData}>
								<Text style={styles._text}>
								  	Noi dung o day
								</Text>
							</View>
						</View>
						<View style={styles._actionsContent}>
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
									<Text style={styles._text}>
									  	Answer
									</Text>
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
					<View style={styles._itemsContent}>
						<View style={styles._dataContent}>
							<View style={[styles._itemCheck,styles._itemData,styles._center]}>
								<CheckBox
									isChecked={true}
									checkedColor='blue'
									uncheckedColor='black'
									style={styles._checkbox} />
							</View>
							<View style={styles._textData}>
								<Text style={styles._text}>
								  	Noi dung o day
								</Text>
							</View>
						</View>
						<View style={styles._actionsContent}>
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
									<Text style={styles._text}>
									  	Answer
									</Text>
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
	_header:{
		flex: 0.1,
		backgroundColor: 'white',
		marginBottom: 5,
	},
	_content:{
		flex: 0.9,
		flexDirection: 'column', 
	},
	_itemsContent:{
		height: height/6,
		borderRadius: 5,
		marginBottom: 5,
		backgroundColor: 'white',
	},
	_actionsContent:{
		flex: 0.4,
		flexDirection: 'row', 
	},
	_dataContent:{
		flex: 0.6,
		flexDirection: 'row',
		borderBottomWidth: 1,
	},
	_itemCheck:{
		flex: 0.1,
	},
	_textData:{
		flex: 0.9,
		borderLeftWidth: 1,
	},
	_checkbox:{
		paddingLeft: (width/20),
	},
	_itemAction:{
		flex: 0.3,
	}
});
export default ListFaQ;
