import React, { Component } from 'react';
import {
  StyleSheet,Text,
  View,Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements';
import {URL_HOME,normalize} from '../config';
const {height,width} = Dimensions.get('screen');
class ActionsCheckList extends Component {
  render() {
    return (
    	<View style={[styles._row,styles._center]}>
    		<View style={styles._body}>
    			<View style={[styles._headBody,styles._center]}>
    				<Text style={styles._textHead}>
    				  	Actions CheckList
    				</Text>
    			</View>
				<View style={styles._contentBody}>
					<View style={[styles._infoAction,{paddingBottom: 10,}]}>
						<View style={styles._dataInfo}>
						</View>
					</View>
					<View style={[styles._funAction,{paddingTop: 10}]}>
						<View style={styles._dataFun}>
						</View>
					</View>
				</View>
				<View style={styles._footerBody}>
				</View>
    		</View>
    	</View>
    );
  }
}
const styles = StyleSheet.create({
	_row:{
		flex: 1,
		backgroundColor: '#97BBCD',
	},
	_center:{
		justifyContent: 'center',
		alignItems: 'center',  
	},
	_body:{
		height: (height/6)*4,
		width: width-40,
		borderRadius: 10,
		shadowColor: 'black',
		shadowOffset: {
			width: 20,
			height: 20
		},
		shadowRadius: 5,
		shadowOpacity: 1.0,
		elevation: 5,
	},
	_headBody:{
		flex: 0.1,
		backgroundColor: 'white',
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
	},
	_contentBody:{
		flex: 0.9,
		flexDirection: 'column',
		backgroundColor: 'white',
	},
	_textHead:{
		// backgroundColor: 'cyan',
		fontSize: 16,
		fontWeight: 'bold', 
	},
	_infoAction:{
		flex: 0.85,
		padding: 20,
	},
	_funAction:{
		flex: 0.15,
		padding: 20,
	},
	_dataInfo:{
		flex: 1,
		backgroundColor: 'yellow',
	},
	_dataFun:{
		flex: 1,
		backgroundColor: 'yellow',
	}
});
export default ActionsCheckList;