import React, { Component } from 'react';
import {
  StyleSheet,Text,ScrollView,AsyncStorage,TouchableOpacity,Modal,Image,
  View,Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements';
import {lang} from './languages/languages';
import {URL_HOME,normalize} from '../config';
const {height,width} = Dimensions.get('screen');
// const prop = this.props.navigation.state.params;
class ActionsCheckList extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	id_list: this.props.navigation.state.params.id,name_list: this.props.navigation.state.params.name_list,name_org: this.props.navigation.state.params.name_org, status: this.props.navigation.state.params.status,
	  	_lang: lang,_langid: '',_isLoading: true
	  };
	}
componentWillMount() {
	// this.props.navigation.navigate('Screen_EmployList');
	AsyncStorage.getAllKeys((err, keys) => { 
        AsyncStorage.multiGet(keys).then((value)=>{
          	console.log(value[1][1]);
          	this.setState({
          		_langid: value[1][1]=='vi'?true:false,
       		});
	        fetch(URL_HOME+'/api/user/auditpermission?data='+this.state.id_list+'&token='+value[3][1]).then((response) => 
					response.json()) .then((responseJson) => {
						console.log(responseJson);
						this.setState({
							array_audit: responseJson,
							_isLoading: false,
						});
						// console.log(this.state.array_faq);
					}) .catch((error) => { 
						console.error(error); 
			});
	    });
    });
};
_clickStartChecklist(){
	var name_list= this.state.name_list;
	var id= this.state.id_list;
	var status = this.state.status;
	this.props.navigation.navigate('Screen_ListFaQ',{id: id,name_list: name_list,status: status});
};
_renderButtonClick(){
	var _status = this.state.status;
	var temp=[];
	if(_status=="on progress" || _status=="approval"){
		temp.push(
			<View key={"key1222"} style={[styles._contentFun,styles._center]}>
				<View style={[styles._clickFun,styles._center]}>
					<TouchableOpacity onPress={()=>{this._clickStartChecklist()}} style={[styles._button,styles._center,{flexDirection: 'row'}]} >
						<Icon type="material-community" name="play" color="white" size={height/30} />
						<Text style={styles._color} >
						  {this.state._langid?this.state._lang.vi.start:this.state._lang.en.start}
						</Text>
					</TouchableOpacity>
				</View>
				<View style={[styles._clickFun,styles._center]}>
					<TouchableOpacity style={[styles._button,styles._center,{flexDirection: 'row'}]} >
						<Icon type="material-community" name="close" color="white" size={height/30} />
						<Text style={styles._color} >
						  {this.state._langid?this.state._lang.vi.close:this.state._lang.en.close}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}else{
		temp.push(
		<View key={"keyAlert2208"} style={[styles._contentFun,styles._center]}>
			<View style={[styles._clickFun,styles._center]}>
				<TouchableOpacity onPress={()=>{this._clickStartChecklist()}} style={[styles._button,styles._center,{flexDirection: 'row'}]} >
					<Icon type="material-community" name="play" color="white" size={height/30} />
					<Text style={styles._color} >
					  {this.state._langid?this.state._lang.vi.start:this.state._lang.en.start}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
		);
	}
	return temp;
}
_popupStatus(){
	
};
_renderAudit(){
	if(this.state.array_audit){
		// console.log(this.state.array_audit);
		var temp=[];
		var auditLead = this.state.array_audit.userleader;
		var _auditUser = this.state.array_audit.userauditer;
		for(let i = 0;i<auditLead.length;i++){
			temp.push(
				<View style={styles._itemAudit} key={'auditLead'+i} >
					<View style={[styles._center,{justifyContent:'flex-start',flex: 0.2}]}>
					  	<Icon type="material-community" name="account-circle" color="#C5C5C5" size={height/15} />	
					</View>
					<View style={{justifyContent:'flex-start',flex: 0.4}}>
						<Text style={{fontSize: 12}}>
					  		{auditLead[i].fullname}
						</Text>
					</View>
					<View style={{flex: 0.4,justifyContent:'flex-start'}}>
						<Text style={{fontSize: 12}} >
						  	{this.state._langid?this.state._lang.vi.paLead:this.state._lang.en.paLead}
						</Text>
					</View>
				</View>
			);
		}
		for(let i = 0;i<_auditUser.length;i++){
			temp.push(
				<View style={styles._itemAudit} key={'_auditUser'+i} >
					<View style={[styles._center,{justifyContent: 'flex-start',flex: 0.2}]}>
					  		<Icon type="material-community" name="account-circle" color="#C5C5C5" size={height/15} />	
					</View>
					<View style={{justifyContent: 'flex-start',flex: 0.4}}>
						<Text style={{fontSize: 12}} >
					  		{_auditUser[i].fullname}	
						</Text>
					</View>
					<View style={{flex: 0.4,justifyContent: 'flex-start'}}>
						<Text style={{fontSize: 12}} >
						  	{this.state._langid?this.state._lang.vi.paAudit:this.state._lang.en.paAudit}
						</Text>
					</View>
				</View>
			);
		}
		return temp;
	}
};
render() {
    return (
    	<View style={[styles._row,styles._center]}>
    		<Modal 
				animationType="fade"
				transparent={false}
				visible={this.state._isLoading}
				onRequestClose={() => {alert("Modal has been closed.")}} >
					<View style={[styles._img,styles._center]}>
						<Image
							style={{justifyContent: 'center', alignItems: 'center',height: height/10,width: height/10}}
							source={require('../images/loading_green.gif')}
						/>
					</View>
			</Modal>
			<Modal 
				animationType="fade"
				transparent={false}
				visible={false}
				onRequestClose={() => {}} >
					<View style={[styles._img,styles._center]}>
						<View style={{height: (height/3),width: width-60,backgroundColor: 'cyan'}}>
							
						</View>
					</View>
			</Modal>
    		<View style={styles._body}>
    			<View style={[styles._headBody,styles._center]}>
    				<Text style={styles._textHead}>
    				  	{this.state._langid?'Thông tin Checklist':'Checklist Info'}
    				</Text>
    			</View>
				<View style={styles._contentBody}>
					<View style={[styles._infoAction,]}>
						<View style={styles._dataInfo}>
						{/*<View style={styles._headInfo}>
								<Text style={styles._textHeadInfo}>
								  	Info
								</Text>
							</View>*/}
							<View style={styles._bodyInfo}>
								<View style={styles._contentInfo}>
									<View style={styles._itemsInfo}>
										<View style={[styles._itemInfo]}>
											<Text style={styles._textTitel} >
											  	{this.state._langid?this.state._lang.vi.name.toUpperCase():this.state._lang.en.name.toUpperCase()} {'checklist'.toUpperCase()}
											</Text>
										</View>
										<View style={[styles._itemInfo]}>
											<Text style={styles._textData} >
											  	{this.state.name_list}
											</Text>
										</View>
									</View>
									<View style={styles._itemsInfo}>
										<View style={[styles._itemInfo]}>
											<Text style={styles._textTitel} >
											  	{this.state._langid?this.state._lang.vi.checked_org.toUpperCase():this.state._lang.en.checked_org.toUpperCase()}
											</Text>
										</View>
										<View style={[styles._itemInfo]}>
											<Text style={styles._textData} >
											  	{this.state.name_org}
											</Text>
										</View>
									</View>
									<View style={styles._itemsInfo}>
										<View style={[styles._itemInfo]}>
											<Text style={styles._textTitel} >
											  	{this.state._langid?this.state._lang.vi.status.toUpperCase():this.state._lang.en.status.toUpperCase()} {'checklist'.toUpperCase()}
											</Text>
										</View>
										<View style={[styles._itemInfo,{}]}>
											<Text style={[styles._textData,]} >
											  	{this.state.status}
											</Text>
										</View>
									</View>
								</View>
								<View style={styles._auditInfo}>
									<View style={[styles._center,{flex: 0.1,paddingTop: 5}]}>
										<Text style={[styles._textTitel,{}]}>
										  	ĐÁNH GIÁ VIÊN
										</Text>
									</View>
									<View style={[{flex: 0.58,}]}>
										<ScrollView>
											{this._renderAudit()}
										</ScrollView>
									</View>
								</View>
							</View>
						</View>
					</View>
					<View style={[styles._funAction,styles._center,{display: 'flex'}]}>
						<View style={styles._dataFun}>
							<View style={[styles._headFun,styles._center,{}]}>
								{/*<Icon type="material-community" name="account-settings-variant" size={height/30} color="white" />*/}
								<Text style={{fontSize: 16,color: 'black'}} >
								  	{this.state._langid?this.state._lang.vi.fun:this.state._lang.en.fun}
								</Text>
							</View>
							{this._renderButtonClick()}
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
	_img:{
		flex: 1,
	},
	_center:{
		justifyContent: 'center',
		alignItems: 'center',  
	},
	_body:{
		height: (height/6)*4,
		width: width-40,
		borderRadius: 10,
		// shadowColor: 'black',
		// shadowOffset: {
		// 	width: 20,
		// 	height: 20
		// },
		// shadowRadius: 5,
		// shadowOpacity: 1.0,
		// elevation: 5,
		// backgroundColor: 'rgba(255,255,255,0.9)'
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
		// backgroundColor: 'white',
	},
	_textHead:{
		// backgroundColor: 'cyan',
		fontSize: 16,
		fontWeight: 'bold',
		color: 'black',
	},
	_infoAction:{
		flex: 0.85,
		// padding: 10,
	},
	_funAction:{
		flex: 0.15,
		marginTop: 10,
		backgroundColor: 'white',
	},
	_dataInfo:{
		flex: 1,
		flexDirection: 'column', 
	},
	_dataFun:{
		flex: 1,
		flexDirection: 'row', 
		// borderWidth: 1,
	},
	_headFun:{
		margin: 5,
		flex: 0.3,
		flexDirection: 'row', 
	},
	_contentFun:{
		flex: 0.7,
		flexDirection: 'row', 
	},
	_clickFun:{
		flex: 0.5,
	},
	_headInfo:{
		flex: 0.1,
	},
	_bodyInfo:{
		flex: 1,
		flexDirection: 'column', 
		backgroundColor: 'white',
	},
	_contentInfo:{
		flex: 0.4,
		flexDirection: 'column',
		borderBottomWidth: 0.3,
	},
	_auditInfo:{
		flex: 0.6,
		flexDirection: 'column', 
	},
	_itemsInfo:{
		flex: 1,
		flexDirection: 'row',paddingLeft: 10,
	},
	_itemInfo:{
		flex: 0.5,
		flexDirection: 'row',
		alignItems: 'center', 
		// textAlign: 'left',
		// alignItems: 'flex-start' 
	},
	_textHeadInfo:{
		color: 'black',
		textAlign: 'left',
		fontSize: 16, 
		// fontWeight: '900',
	},
	_textTitel:{
		// textTransform: 'uppercase
		fontSize: 11,color: 'black',fontWeight: 'bold',
		textAlign: 'left',
		// alignSelf: 'flex-start',
	},
	_itemAudit:{
		// paddingVertical: 5,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		// borderWidth: 1,
	},
	_textData:{
		fontSize: 13,
		textAlign: 'left', 
	},
	_button:{
  		borderRadius: 5,
  		// borderWidth: 1,
  		// borderColor: 'green',
  		backgroundColor: '#0457C9',
  		// padding: 5,
  		paddingHorizontal: 10,
  		paddingVertical: 2,
  	},
 	_color:{
 	color: 'white',
 	fontSize: height/45,
 	}
});
export default ActionsCheckList;