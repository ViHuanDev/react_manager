import React, { Component } from 'react';
import {View,Text,FlatList,AsyncStorage,Dimensions,Modal,Image,Picker,TextInput,TouchableHighlight,
	StyleSheet,ScrollView,Alert,TouchableOpacity} from 'react-native';
// import CheckBox from 'react-native-checkbox';
import { Icon } from 'react-native-elements';
import { CheckBox } from 'react-native-elements';
import Pie from 'react-native-pie';
import PopoverTooltip from 'react-native-popover-tooltip';
import {lang} from './languages/languages';
import {URL_HOME,normalize} from '../config';
import HTML from 'react-native-render-html';
const MIN_HEIGHT = 20;
const MAX_HEIGHT = 40;
class ListFaQ extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: this.props.navigation.state.params.status,id_faq: this.props.navigation.state.params.id,name_list: this.props.navigation.state.params.name_list,isLoading:true,
			array_faq: [], page:0,isLoadding: true,count:0,checkItem: true, color:'blue',data_pie:[0],_this_code: '',
			selectedIds:[],array_status: [],_modal: false,_idClick:'',array_id:[],array_local:[],_mReport:false,
			comment:'',_langid:'',_lang: lang,array_comment:[],_showCmt:true,_mChildComment: false,array_refer_dq:[],
			_idComment:[],_idChildComment:[],_statusFAQ:'',array_report:[],mRefer:false,array_refer:[],_this_status:'',
		};
	};
// _keyExtractor = (item, index) => index;
componentWillMount() {
	// console.log(normalize+'font-size');
	//checklists/id_check?token
	AsyncStorage.getAllKeys((err, keys) => { 
        AsyncStorage.multiGet(keys).then((value)=>{
          	console.log(value);
          	this.setState({
          		_langid: value[4][1]=='vi'?true:false,
          	});
        	fetch(URL_HOME+'/api/checklists/'+this.state.id_faq+'?token='+value[3][1]).then((response) => 
				response.json()) .then((responseJson) => {
					// console.log(responseJson.data);
					this.setState({
						array_faq: responseJson.data,
						_statusFAQ: responseJson.status,
					});
					// console.log(this.state.array_faq);
				}) .catch((error) => { 
					console.error(error); 
			});
			fetch(URL_HOME+'/api/chkitemstatus?token='+value[3][1]).then((response) => 
				response.json()).then((responseJson)=>{ 
					console.log(responseJson+"status");
					var value = responseJson;
					// console.log(responseJson);
					var temp = [];
					for(var i=0;i<value.length;i++){
						temp.push(value[i].id+'-'+value[i].code);
					}
					console.log(temp);
					this.setState({
						array_status: responseJson,
						array_local_status: temp,
						isLoading: false,
						});
					// console.log(this.state.array_status);
			}) .catch((error) => { 
					console.error(error); 
			});  
			// fetch(URL_HOME+'/api/checklists/statistic?data='+this.state.id_faq+'&token='+value[3][1]).then((response) => 
			// 	response.json()).then((responseJson)=>{ 
			// 		console.log(responseJson.totalchk+"statistic");
			// 		var temp = [];
			// 		for(let i=0;i<responseJson.sttchk.length;i++){
			// 			let result = (responseJson.sttchk[i].total/responseJson.totalchk)*100;
			// 			temp.push(result);
			// 		}
			// 		console.log(temp);
			// 		this.setState({
			// 			array_report: responseJson,
			// 			data_pie: temp,
			// 			isLoading: false,
			// 			});
			// 		// console.log(this.state.array_status);
			// }) .catch((error) => { 
			// 		console.error(error); 
			// });
		});
    }); 
};
_onCommentChange(text){
		this.setState({
			comment: text,
		});
};
_showRepComment(){
	this.setState({
		_showCmt: !this.state._showCmt,
	});
};
_showChildComment(el){
	console.log(this.state._idChildComment+'id===='+el);
	this.setState({
		_mChildComment: !this.state._mChildComment,
		_idChildComment: el,
	});
};
_onEditComment(id,val){
	console.log('aaa');
	console.log(id+'----'+val);
}
_renderChildComment(){
	var arr = this.state.array_comment;
	// console.log(this.state._idChildComment+"asdad");
	// console.log(arr);
	var temp = [];
	temp.push(
		<View key={'childcontent'+123} style={[styles._mChildComment,{display: 'flex'}]}>
			<View style={styles._mChildUser}>
				<Icon type='font-awesome' color='#F6F7F9' name='user-circle' size={20} />
			</View>
			<View style={styles._mChildContent}>
					<Text>
					  	{arr[0].content}
					</Text>
					<View style={styles._mChildActions}>
						<TouchableOpacity style={styles._button} >
							<Text style={[styles._editChildComment,styles.font_size,styles._color]}>
							  	{this.state._langid?this.state._lang.vi.edit:this.state._lang.en.edit}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles._button} >
							<Text style={[styles._delChildComment,styles.font_size,styles._color]}>
							  	{this.state._langid?this.state._lang.vi.del:this.state._lang.en.del}
							</Text>
						</TouchableOpacity>
					</View>
			</View>
		</View>
	);
	return temp;
}
_funRefer(arr,parent){
	var out = [];
		for(var i in arr) {
			if(arr[i].parent_id == parent) {
				var children = this._funRefer(arr, arr[i].id);
				if(children.length) {
					arr[i].children = children;
				}
				out.push(arr[i]);
			}
		}
	return out;
};
_renderRefer(id){	
	// console.log(this.state.array_id);
	AsyncStorage.getAllKeys((err, keys) => { 
        AsyncStorage.multiGet(keys).then((value)=>{
        	fetch(URL_HOME+'/api/checklistitems/'+id+'?token='+value[3][1]).then((response) => 
				response.json()) .then((responseJson) => {
					// this.setState({
					// 	array_refer: responseJson.documentitem,
					// });
					// console.log(this.state.array_faq);
					var x=[];
					for(let i=0;i<responseJson.documentitem.length;i++){
						x[i]=responseJson.documentitem[i];
						x[i].data=this._funRefer(responseJson.documentitem[i].data,responseJson.documentitem[i].parent_id);
					}
					// console.log(x);
					this._renderItemRefer(x,responseJson.documentitem);
					this.setState({
						mRefer: true,
					});
					// x chinh laf datas su dung de quy de in ra checklist.
				}) .catch((error) => { 
					console.error(error); 
			});
		});
    }); 
};
_funItemrefer(arr){
	// console.log(arr.length);
	var temp = [];
	if(arr.length>0){
		for(let i=0;i<arr.length;i++){
		temp.push(
			<View style={{flexDirection: 'column'}} key={"content"+i} >
				<View style={{flexDirection: 'row',paddingLeft: 10}} >
					<Icon style={[styles._center,{flex: 0.1}]} type="material-community" name="circle-outline" size={10} />
					<Text style={{flex: 0.9}}>{arr[i].index} {arr[i].docitemheader}</Text>
				</View>
				<View style={{paddingLeft: 20}}>
					{arr[i].content!=""?<HTML html={arr[i].content}/>:<Text></Text>}
				</View>
			</View>
		);
		if(arr[i].children){
			temp.push(
					<View style={{paddingLeft: 30}} key={"keychild"+i}>
						{this._funItemrefer(arr[i].children)}
					</View>
				);
			}
		}
	}
	return temp;
}
_renderItemRefer(item_refer,refer){
	// console.log(item_refer);
	// console.log(refer);
	var temp =[];
	var x=[];
	for(let i=0;i<refer.length;i++){
		if(refer.length>0){
			temp.push(
				<View style={{flexDirection: 'row' }} key={"viewrefer"+refer[i].id}>
					<Icon style={[styles._center,{flex: 0.1}]} type="material-community" name="circle" size={10} />
					<Text style={{flex: 0.9}}>
					  	 {refer[i].index} {refer[i].document.name}
					</Text>
				</View>
			);
			var x =this._funItemrefer(item_refer[i].data);
			temp.push(
				<View key={"keydataX"+i} style={{paddingLeft: 10}}>
					{x}
				</View>
			);
		}
	}
	// this._renderReferView(temp);
	console.log(temp);
	this.setState({
		_viewRefer: temp,
	});
	// console.log(temp);
}
_renderReferView(arr){
	console.log(arr);
	return arr;
}
_renderNull(){
	return(
		<Text></Text>
	);
};
_renderReport(){
	// console.log(this.state.array_report.sttchk?this.state.array_report.sttchk.length:"null");
	if(this.state.array_report.sttchk){
		var arr = this.state.array_report.sttchk;
		var temp = [];
		for(let i=0;i<arr.length;i++){
			var color_t = arr[i].name=='Satisfactory'?'#4F81F0':arr[i].name=="Phù hợp"?'#4F81F0':arr[i].name=='Not witness'?'#f05a63':arr[i].name=="Không kiểm chứng"?"#f05a63":arr[i].name=="Finding"?"#F0C751":arr[i].name=="Lỗi"?"#F0C751":arr[i].name=="Ý kiến"?"#67CCF2":arr[i].name=="Comment"?"#67CCF2":"#ECEEEF";
			console.log(arr[i]);
			var color_true = i%2==0?"#ECEEEF":"white";
			temp.push(
				<View key={"report"+i} style={[styles._itemsDataReport,{backgroundColor: color_t}]}>
					<View style={[styles._itemReport,styles._center]}>
						<Text style={styles._textCenter} >
						  {arr[i].name}
						</Text>
					</View>
					<View style={[styles._itemReport,styles._center]}>
						<Text style={styles._textCenter} >
						  {arr[i].total}
						</Text>
					</View>
					<View style={[styles._itemReport,styles._center]}>
						<Text style={styles._textCenter} >
						 {arr[i].total}/{this.state.array_report.totalchk}
						</Text>
					</View>
				</View>
			);
		}
		return temp;	
	}
};
_onPressAction(el){
	// console.log(el.status.code);
	var temp = el.id+'-'+el.status.code;
	this.setState({
		_modal: true,
		_idClick: el.id,
		_this_status: temp,
	});
	// console.log(this.state.array_local);
}
_closeStatus(){
	var id = this.state._idClick;
	var count_status = ['Đ','S','NW','L','F','C','Y','N\A','N\\A'];
	let temp = this.state.array_local.length>0?this.state.array_local:this.state.array_id;
	for(let m=0;m<=count_status.length;m++){
			if(temp.includes(id+'-'+count_status[m])){
				temp.splice(temp.indexOf(id+'-'+count_status[m]),1);
			}
	}
	temp.push(this.state._this_status);
	this.setState({
		_modal: !this.state._modal,
		array_id: temp,
		array_local: temp,
	});
	console.log(this.state._this_status);
	console.log(temp);
}
_renderStatus(id){
	var arr = this.state.array_status;
	// console.log(arr[0].code);
	if(this.state.array_local.length>0){
	if(arr.length>0){
		for(let i=0;i<=arr.length;i++){
			if(this.state.array_local.includes(id+'-'+arr[i].code)){
			if(arr[i].code=="S"||arr[i].code=="Đ"){
					return(
						<Text style={[styles._text,styles._textCenter]}>
							{this.state._langid?this.state._lang.vi.satis:this.state._lang.en.satis}
						</Text>
					);
				}
				else if(arr[i].code=="NW"){
					return(
						<Text style={[styles._text,styles._textCenter]}>
							{this.state._langid?this.state._lang.vi.non_satis:this.state._lang.en.non_satis}
						</Text>
					);
				}
				else if(arr[i].code=="F"||arr[i].code=="L"){
					return(
						<Text style={[styles._text,styles._textCenter]}>
							{this.state._langid?this.state._lang.vi.finding:this.state._lang.en.finding}
						</Text>
					);
				}
				else if(arr[i].code=="C"||arr[i].code=="Y"){
					return(
						<Text style={[styles._text,styles._textCenter]}>
							{this.state._langid?this.state._lang.vi.comment:this.state._lang.en.comment}
						</Text>
					);
				}
				else{
					return(
						<Text style={[styles._text,styles._textCenter]}>
							{this.state._langid?this.state._lang.vi.not_appli:this.state._lang.en.not_appli}
						</Text>
					);
				}
			}
		}
	}
}
	else{
	if(arr.length>0){
		for(let i=0;i<=arr.length;i++){
			if(this.state.array_id.includes(id+'-'+arr[i].code)){
				if(arr[i].code=="S"||arr[i].code=="Đ"){
						return(
							<Text style={[styles._text,styles._textCenter]}>
								{this.state._langid?this.state._lang.vi.satis:this.state._lang.en.satis}
							</Text>
						);
					}
					else if(arr[i].code=="NW"){
						return(
							<Text style={[styles._text,styles._textCenter]}>
								{this.state._langid?this.state._lang.vi.non_satis:this.state._lang.en.non_satis}
							</Text>
						);
					}
					else if(arr[i].code=="F"||arr[i].code=="L"){
						return(
							<Text style={[styles._text,styles._textCenter]}>
								{this.state._langid?this.state._lang.vi.finding:this.state._lang.en.finding}
							</Text>
						);
					}
					else if(arr[i].code=="C"||arr[i].code=="Y"){
						return(
							<Text style={[styles._text,styles._textCenter]}>
								{this.state._langid?this.state._lang.vi.comment:this.state._lang.en.comment}
							</Text>
						);
					}
					else{
						return(
							<Text style={[styles._text,styles._textCenter]}>
								{this.state._langid?this.state._lang.vi.not_appli:this.state._lang.en.not_appli}
							</Text>
						);
					}
				}
			}	
		}
	}
}
_renderIconStatus(id){
	var arr = this.state.array_status;
	if(this.state.array_local.length>0){
		if(arr.length>0){
			for(let i=0;i<=arr.length;i++){
					if(this.state.array_local.includes(id+'-'+arr[i].code)){
					if(arr[i].code=="S"||arr[i].code=="Đ"){
							return(
								<Icon type='font-awesome' color='#4F81F0'  name='gear' size={height/30} />
							);
					}
					else if(arr[i].code=="NW"){
							return(
								<Icon type='font-awesome' color='#f05a63' name='gear' size={height/30} />
							);
					}
					else if(arr[i].code=="F"||arr[i].code=="L"){
							return(
								<Icon type='font-awesome' color='#F0C751' name='gear' size={height/30} />
							);
					}
					else if(arr[i].code=="C"||arr[i].code=="Y"){
							return(
								<Icon type='font-awesome' color='#67CCF2' name='gear' size={height/30} />
							);
					}
					else if(i==9||i==10){
							return(
								<Icon type='font-awesome' color='#D67A63' name='gear' size={height/30} />
							);
					}
					else{
							return(
								<Icon type='font-awesome' color='black' name='gear' size={height/30} />
							);
					}
			}
		}
	}
}
	else{
		if(arr.length>0){
			for(let i=0;i<=arr.length;i++){
				if(this.state.array_id.includes(id+'-'+arr[i].code)){
						if(arr[i].code=="S" || arr[i].code=="Đ"){
								return(
									<Icon type='font-awesome' color='#4F81F0'  name='gear' size={height/30} />
								);
							}
							else if(arr[i].code=="NW"){
								return(
									<Icon type='font-awesome' color='#f05a63' name='gear' size={height/30} />
								);
							}
							else if(arr[i].code=="F"||arr[i].code=="L"){
								return(
									<Icon type='font-awesome' color='#F0C751' name='gear' size={height/30} />
								);
							}
							else if(arr[i].code=="C"||arr[i].code=="Y"){
								return(
									<Icon type='font-awesome' color='#67CCF2' name='gear' size={height/30} />
								);
							}
							// else if(i==9||i==10){
							// 	return(
							// 		<Icon type='font-awesome' color='#D67A63' name='gear' size={height/30} />
							// 	);
							// }
							else{
								return(
									<Icon type='font-awesome' color='black' name='gear' size={height/30} />
								);
							}
						}
				}
			}
		}
};
_thisSelectSatus(el){
	console.log(el);
	var ar= el.split('-');
	var id = this.state._idClick;
	var count_status = ['Đ','S','NW','L','F','C','Y','N\A','N\\A'];
	let temp = this.state.array_local.length>0?this.state.array_local:this.state.array_id;
	this.setState({
		_this_code: el,
	});
	console.log(temp+' trc khi xu ly');
	console.log(count_status);
	// if(count_status.length>0){
		for(let m=0;m<=count_status.length;m++){
			if(temp.includes(id+'-'+count_status[m])){
				if(count_status[m]==ar[1]){
				}
				else{
					temp.splice(temp.indexOf(id+'-'+count_status[m]),1);
				}
			}
		}
		for(let i2=0;i2< temp.length;i2++){
			for(let j=i2+1; j<temp.length+1;j++){
				if(temp[i2]==temp[j]){
					temp.splice(j);
				}
			}
		}
	// }
	temp.push(el);
	console.log(temp+' sau khi xu ly');
	this.setState({
		array_local: temp,
	});
	// console.log(this.state.array_local);
}
_sendComment(checklist_id){
	//id la trang thai status
	var code = (this.state._this_code).split('-')[1];
	var temp = '';
	console.log(this.state.array_local_status);	
	var content = this.state.comment;
	// AsyncStorage.getAllKeys((err, keys) => { 
 //          AsyncStorage.multiGet(keys).then((value)=>{
 //          	fetch(URL_HOME+'/api/checklist_checklistitems/'+checklist_id+'?token='+value[3][1], {
	// 			  method: 'PUT',
	// 			  headers: {
	// 			    'Accept': 'application/json',
	// 			    'Content-Type': 'application/json',
	// 			  },
	// 			  body: JSON.stringify({
	// 			    "checklist_id": this.state.id_faq,
	// 			    "comment": content,
	// 			    "id": temp[0],
	// 			  })
	// 			}).then((responseJson)=>{
	// 				console.log(responseJson);
	// 				if(responseJson.status==200){
	// 					this.setState({
	// 						_modal: false,
	// 						comment: '',
	// 					});
	// 				}
	// 			});
 //          });
 //    });
};
_thisCheckbox(el){
	//fix loi check 2 state if else with array_local and array_id...
	var id = this.state._idClick;
	// var temp= Number(el)%2==0?Number(el)-1:Number(el)+1;
		// if(this.state.array_local.length > 0){
			if(this.state.array_local.includes(id+'-'+el)|| this.state.array_id.includes(id+'-'+el)){
				return true;
			}
			// else if(this.state.array_local.includes(id+'-'+'NW')){
			// 	return true;
			// }
			// else if(this.state.array_local.includes(id+'-'+'F')){
			// 	return true;
			// }
			// else if(this.state.array_local.includes(id+'-'+'C')){
			// 	return true;
			// }
			// else if(this.state.array_local.includes(id+'-'+'NA')){
			// 	return true;
			// }
			// else if(this.state.array_id.includes(id+'-'+'Đ')){
			// 	return true;
			// }
			// else if(this.state.array_id.includes(id+'-'+'NW')){
			// 	return true;
			// }
			// else if(this.state.array_id.includes(id+'-'+'L')){
			// 	return true;
			// }
			// else if(this.state.array_id.includes(id+'-'+'Y')){
			// 	return true;
			// }
			// else if(this.state.array_id.includes(id+'-'+'NA')){
			// 	return true;
			// }
			else{
				return false;
			}
		// }
		// else{
		// 	if(this.state.array_id.includes(id+'-'+'Đ')){
		// 		return true;
		// 	}
		// 	else if(this.state.array_id.includes(id+'-'+'NW')){
		// 		return true;
		// 	}
		// 	else if(this.state.array_id.includes(id+'-'+'L')){
		// 		return true;
		// 	}
		// 	else if(this.state.array_id.includes(id+'-'+'Y')){
		// 		return true;
		// 	}
		// 	else if(this.state.array_id.includes(id+'-'+'NA')){
		// 		return true;
		// 	}
		// 	else{
		// 		return false;
		// 	}
		// }
}
_eachColor(el){
	// console.log(el);
		if(el=="S" || el=="Đ"){
			return '#4c7ff0';
		}
		else if(el=="NW"){
			return '#f05a63';
		}
		else if(el=="F" || el=="L"){
			return '#f0c54c';
		}
		else if(el=="C" || el=="Y"){
			return '#d26d54';
		}
		else{
			return 'black';
		}
};
_renderViewModalComment(){
	var id = this.state._idClick;
	var arr = ['Đ','S','NW','L','F','C','Y','N\A','N\\A'];
	let view =[];
	var state = this.state.array_local.length>0?this.state.array_local:this.state.array_id;
	for(let i=0;i<=arr.length;i++){
		if(state.includes(id+'-'+arr[i])){
		// var index = state.indexOf(id+'-'+arr[i])
			if(arr[i]=="C" || arr[i]=="Y" || arr[i]=="L" || arr[i]=="F"){
				view.push(
						<View style={{flex: 0.3}} key={"inputComment"+i}>
								<View style={styles._mComment}>
									<Text style={styles._colorText}>
									  	{this.state._langid?this.state._lang.vi.comment:this.state._lang.en.comment} :
									</Text>
									<TextInput style={[styles.input,{height: Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, height))} ]}
						      		 				multiline
													underlineColorAndroid='white'
								      				onContentSizeChange={this.handleContentSizeChange}
								      				onChangeText={(text)=>this._onCommentChange(text)}
								      				value={this.state.comment}
						      				/>
								</View>
								<View style={[styles._mfootAction,styles._center]}>
									<View>
										<TouchableOpacity style={styles._button} onPress={()=>{this._closeStatus()}}>
											<Text style={styles._color} >
											  	{this.state._langid?this.state._lang.vi.cancel:this.state._lang.en.cancel}
											</Text>
										</TouchableOpacity>
									</View>
									<View>
										<TouchableOpacity style={styles._button} onPress={()=>this._sendComment(this.state._idClick)}>
											<Text style={styles._color} >
											  	{this.state._langid?this.state._lang.vi.save:this.state._lang.en.save}
											</Text>
										</TouchableOpacity>
									</View>
								</View>
						</View>
						);
			}
			else{
				view.push(
						<View style={{flex:0.3}} key={"inputComment"+i}>
								<View style={[styles._mfootAction,styles._center,{flex: 0.3}]}>
									<View>
										<TouchableOpacity style={styles._button} onPress={()=>{this._closeStatus()}}>
											<Text style={styles._color} >
											  	{this.state._langid?this.state._lang.vi.cancel:this.state._lang.en.cancel}
											</Text>
										</TouchableOpacity>
									</View>
									<View>
										<TouchableOpacity style={styles._button} onPress={()=>this._sendComment(this.state._idClick)}>
											<Text style={styles._color} >
											  	{this.state._langid?this.state._lang.vi.save:this.state._lang.en.save}
											</Text>
										</TouchableOpacity>
									</View>
								</View>
						</View>
						);
			}
		}
	}
	return view;
};
_rennderViewComment(item){
	temp=[];
	if(this.state.status=="on progress" || this.state.status=="approval"){
		temp.push(<View key={"viewComment"+item} style={[styles._itemAction,styles._center]}>
					<View style={styles._iconAction}>
						<Icon type='evilicon' color='#4C88FF' name='comment' size={height/30} />
					</View>
					<View style={styles._textAction}>
						<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Screen_CommentList',{checklist_id: this.state.id_faq,id_answer: item,_status: this.state._statusFAQ})}}>
							<Text style={styles._text}>
							  	{this.state._langid?this.state._lang.vi.comment:this.state._lang.en.comment}
							</Text>
						</TouchableOpacity>
					</View>
				</View>);
	}else{
		temp.push(<View key={"viewComment"+item} style={[styles._itemAction,styles._center]}>
					<View style={styles._iconAction}>
						<Icon type='evilicon' color='#4C88FF' name='comment' size={height/30} />
					</View>
					<View style={styles._textAction}>
						<TouchableOpacity onPress={()=>{this._viewAlert()}}>
							<Text style={styles._text}>
							  	{this.state._langid?this.state._lang.vi.comment:this.state._lang.en.comment}
							</Text>
						</TouchableOpacity>
					</View>
				</View>);
	}
	return temp;
}
_viewRenderStatus(item){
	var temp=[];
	if(this.state.status=="on progress" || this.state.status=="approval" || this.state.status=="corrective"){
		temp.push(<TouchableOpacity key={"action:key"+item.id} onPress={()=>this._onPressAction(item)} >
			{this._renderStatus(item.id)}
		</TouchableOpacity>);
	}else{
		temp.push(<TouchableOpacity key={"action:key"+item.id} onPress={()=>{this._viewAlert()}} >
			{this._renderStatus(item.id)}
		</TouchableOpacity>);
	}
	return temp;
};
_viewAlert(){
	// 	Alert.alert(
	//   	'Thông Báo',
	//   [
	//     {text: 'Trạng thái checklist không hợp lệ', onPress: () => {cancelable: false}},
	//   ],
	//   { cancelable: false }
	// )
	Alert.alert(
  'Thông báo',
  'Trạng thái checklist không hợp lệ',
  [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ],
  { cancelable: false }
)
}
_eachStatus(){
	let arr = this.state.array_status;
	let view = [];
	if(arr.length > 0){
		for(let i=0;i<arr.length;i++){
			let item = arr[i];
			view.push(
				<View key={"mActions"+item.id} style={styles._mMainAction}>
					<View style={[styles._mCheckbox,styles._center]}>
						<CheckBox
							center
							iconType='foundation'
							checkedIcon='record'
							uncheckedIcon='record'
							isChecked={this._thisCheckbox(item.code)}
							checked={this._thisCheckbox(item.code)}
							checkedColor={this._eachColor(item.code)}
							onPress={()=>this._thisSelectSatus(this.state._idClick+'-'+item.code)}
							uncheckedColor='white'
							style={[styles._checkbox]}  />
					</View>
					<View style={[styles._mtextAction,styles._center]}>
						<TouchableOpacity onPress={()=>this._thisSelectSatus(this.state._idClick+'-'+item.code)}  >
							<Text style={[styles._mText,styles._center,styles._colorText,{color: arr[i].code=="S"||arr[i].code=="Đ"?'#4c7ff0':arr[i].code=="NW"?'#f05a63':arr[i].code=="F"||arr[i].code=="L"?'#F0C751':arr[i].code=="Y"||arr[i].code=="C"?'#67CCF2':'black'}]}>
							  	{item.name}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			);
		}
	}
	else{
		// alert('No Data!');
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
			<View style={[styles._datasContent,{backgroundColor: '#5F84CE',paddingVertical: 10}]} key={"namegroup"+item.group.id}>
				<View style={[styles._center,{flexDirection: 'row'}]}>
					{/*<Text style={{width: width/4}}>
										  	{this.state._langid?this.state._lang.vi.group:this.state._lang.en.group} :
										</Text>*/}
					<Text style={{fontWeight: 'bold',fontSize: 16,color: 'black'}}>
					  	{item.group.name}
					</Text>
				</View>
			</View>
		);
			for(let a=0;a<arr[i].data.length;a++){
				// console.log(arr[i].data[a].name);
				let item = arr[i].data[a];
				view.push(
					<View style={[styles._datasContent,{paddingHorizontal: 5}]} key={"nameCheck"+item.id}>
						<View style={{flexDirection: 'row' }}>
							{/*<Text style={{width: width/4,textAlign: 'auto' }}>
														  {this.state._langid?this.state._lang.vi.answer:this.state._lang.en.answer} :
														</Text>*/}
							<Text style={{fontSize: 14 ,color: 'black',textDecorationLine: 'underline',textDecorationStyle: "solid",}} >
					  			{item.name}
							</Text>
						</View>
					</View>
				);
					for(let b=0;b<arr[i].data[a].checklist_item.length;b++){
						// console.log(arr[i].data[a].checklist_item[b].id);
							let item = arr[i].data[a].checklist_item[b];
							let temp = [];
							// console.log(item);
							this.state.array_id.push(item.pivot.chkitems_id+'-'+'S');
							for(let i2=0;i2<= this.state.array_id.length-1;i2++){
								for(let j=i2+1; j <this.state.array_id.length;j++){
									if(this.state.array_id[i2]==this.state.array_id[j]){
										this.state.array_id.splice(j);
									}
								}
							}
							// console.log(this.state.array_id);
							view.push(
							<View style={[styles._datasContent]} key={"checklist"+item.id}>
								<View style={[styles._dataContent,{paddingHorizontal: 10}]}>
							  		<HTML	html={arr[i].data[a].checklist_item[b].content} />
								</View>
								<View style={[styles._actionsContent,{borderBottomWidth: 0.3,borderColor: 'gray'}]}>
										{this._rennderViewComment(item.id)}
										<View style={[styles._itemAction,styles._center]}>
											<View style={styles._iconAction}>
												{this._renderIconStatus(item.id)}
											</View>
											<View style={styles._textAction}>
												{this._viewRenderStatus(item)}
											</View>											
										</View>
										<View style={[styles._itemAction,styles._center]}>
											<View style={styles._iconAction}>
												<TouchableOpacity onPress={()=>{this._renderRefer(item.id)}} >
													<Icon type='ionicon' name='ios-help-circle-outline' size={height/30} />
												</TouchableOpacity>
											</View>
											<View style={styles._textAction}>
												<TouchableOpacity onPress={()=>{this._renderRefer(item.id)}} >
													<Text style={styles._text}>
										  				{this.state._langid?this.state._lang.vi.refer:this.state._lang.en.refer}
													</Text>
												</TouchableOpacity>
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
_renderViewActions(){
	var _status = this.state.status;
	var temp=[];
	if(_status=="close"){
		temp.push(
			<View key={"keyStatus"} style={[styles._mFootReport,styles._center]}>
			</View>
		);
	}
	else if(_status=="corrective"){
		temp.push(
			<View key={"keyStatus"} style={[styles._mFootReport,styles._center]}>
				<TouchableOpacity style={styles._button} onPress={()=>{this._renderButtonClick("close")}}>
			  		<Text style={{color: "white"}} >
			  	  		{this.state._langid?this.state._lang.vi.close:this.state._lang.en.close} {"checklist"}
			  		</Text>
				</TouchableOpacity>
			</View>
		);
	}
	else if(_status=="on progress"){
		temp.push(
			<View key={"keyStatus"} style={[styles._mFootReport,styles._center]}>
				<TouchableOpacity style={styles._button} onPress={()=>{this._renderButtonClick("close")}}>
			  		<Text style={{color: "white"}} >
			  	  		{this.state._langid?this.state._lang.vi.close:this.state._lang.en.close} {"checklist"}
			  		</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles._button} onPress={()=>{this._renderButtonClick("corrective")}}>
			  		<Text style={{color: "white"}} >
			  	  		{this.state._langid?this.state._lang.vi.corrective:this.state._lang.en.corrective} {"checklist"}
			  		</Text>
				</TouchableOpacity>
			</View>
		);
	}
	return temp;
};
_renderButtonClick(val){
	AsyncStorage.getAllKeys((err, keys) => { 
        AsyncStorage.multiGet(keys).then((value)=>{
        	if(val=="corrective"){
		        fetch(URL_HOME+'/api/checklists/changestatus/'+this.state.id_faq+'?token='+value[3][1],{
		        	"method": "POST",
		        	headers:{
						"Accept":"application/json",
						"Content-Type":"application/json;charset=utf-8"
					},
					body: JSON.stringify({
						"data": "corrective",
					})
		        }).then((response) => 
						response.json()) .then((responseJson) => {
							console.log(responseJson);
							this.setState({
								status: responseJson.status,
							});
							console.log(this.state.status);
						}) .catch((error) => { 
							console.error(error);
				});
			}
			else if(val=="close"){
				fetch(URL_HOME+'/api/checklists/changestatus/'+this.state.id_faq+'?token='+value[3][1],{
		        	"method": "POST",
		        	headers:{
						"Accept":"application/json",
						"Content-Type":"application/json;charset=utf-8"
					},
					body: JSON.stringify({
						"data": "close",
					})
		        }).then((response) => 
						response.json()) .then((responseJson) => {
							console.log(responseJson);
							this.setState({
								status: responseJson.status,
							});
							console.log(this.state.status);
						}) .catch((error) => { 
							console.error(error);
				});
			}
	    });
    });
};
render() {
	return (
			<View style={[styles.row]}>
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
				<Modal
					animationType="fade"
					transparent={false}
					visible={this.state.mRefer}
					onRequestClose={() => {this.setState({mRefer: false})}} >
						<View style={styles.row}>
							<View style={styles._mBodyRefer}>
								<View style={[styles._mHeadRefer,styles._center]}>
									<Text style={{fontWeight: 'bold',fontSize: 24,color: 'black'}}>
									  	{this.state._langid?this.state._lang.vi.refer:this.state._lang.en.refer}
									</Text>
								</View>
								<View style={styles._mContentRefer}>
									<ScrollView>
										{this.state.mRefer?(this.state._viewRefer):this._renderNull()}
									</ScrollView>
								</View>
								<View style={[styles._mFootRefer,styles._center]}>
									<TouchableOpacity style={styles._button} onPress={()=>{this.setState({mRefer: false})}} >
										<Text style={[styles._textCenter,styles._color]}>
										  	{this.state._langid?this.state._lang.vi.close:this.state._lang.en.close}
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
				</Modal>
				<Modal 
					animationType="fade"
					transparent={true}
					visible={this.state._mReport}
					onRequestClose={() =>{this.setState({_mReport: !this.state._mReport})}} >
						<View style={[styles._rowReport]}>
							<View style={[styles._mContentReport,styles._center]}>
								<View style={styles._mBodyReport}>
									<View style={[styles._mHeadReport,styles._center]}>
										<View style={[styles._center,{flex: 0.9}]} >
											<Text style={[styles._textCenter,{fontWeight: '900',fontSize: 18}]} >
											  	{this.state._langid?this.state._lang.vi.statistic:this.state._lang.en.statistic}
											</Text>
										</View>
										<View style={{flex: 0.1, alignItems: 'flex-end'}} >
											<TouchableOpacity onPress={()=>{this.setState({_mReport: !this.state._mReport})}} >
												<Icon style={{justifyContent: 'flex-end'}}  type='evilicon' name='close-o' color="black" size={30} />
											</TouchableOpacity>
										</View>
									</View>
									<View style={styles._mDataReport}>
										<View style={[styles._itemsDataReport,{backgroundColor: '#ECEEEF'}]}>
											<View style={[styles._itemReport,styles._center]}>
												<Text style={[styles._textCenter,{fontWeight: 'bold'}]}>
												  	{this.state._langid?this.state._lang.vi.status:this.state._lang.en.status}
												</Text>
											</View>
											<View style={[styles._itemReport,styles._center]}>
												<Text style={[styles._textCenter,{fontWeight: 'bold'}]}>
												  	{this.state._langid?this.state._lang.vi.numberOfQ:this.state._lang.en.numberOfQ}
												</Text>
											</View>
											<View style={[styles._itemReport,styles._center]}>
												<Text style={[styles._textCenter,{fontWeight: 'bold'}]}>
												  	{this.state._langid?this.state._lang.vi.point:this.state._lang.en.point}
												</Text>
											</View>
										</View>
										<View style={styles._itemsDataReport}>
											<View style={[styles._itemReport,styles._center]}>
												<Text style={[styles._textCenter]} >
												 	{this.state._langid?this.state._lang.vi.total:this.state._lang.en.total}
												</Text>
											</View>
											<View style={[styles._itemReport,styles._center]}>
												<Text style={styles._textCenter} >
												  {this.state.array_report.totalchk}
												</Text>
											</View>
											<View style={[styles._itemReport,styles._center]}>
												<Text style={styles._textCenter} >
												  {this.state.array_report.totalchk}
												</Text>
											</View>
										</View>
										{this._renderReport()}
									</View>
								</View>
								<View style={[styles._bodyCharts,styles._center]}>
									{/*<View style={styles._viewStatus} >
																				<View style={{flex: 0.2,borderWidth: 1,flexDirection: 'row'}}>
																					<View style={{flex: 0.5}}>
																					</View>
																					<View style={{flex: 0.5}}>
																						<Text>
																						  name
																						</Text>
																					</View>
																				</View>
																				<View style={{flex: 0.2,borderWidth: 1,flexDirection: 'row'}}>
																					<View style={{flex: 0.5}}>
																					</View>
																					<View style={{flex: 0.5}}>
																						<Text>
																						  name
																						</Text>
																					</View>
																				</View>
																				<View style={{flex: 0.2,borderWidth: 1,flexDirection: 'row'}}>
																					<View style={{flex: 0.5}}>
																					</View>
																					<View style={{flex: 0.5}}>
																						<Text>
																						  name
																						</Text>
																					</View>
																				</View>
																				<View style={{flex: 0.2,borderWidth: 1,flexDirection: 'row'}}>
																					<View style={{flex: 0.5}}>
																					</View>
																					<View style={{flex: 0.5}}>
																						<Text>
																						  name
																						</Text>
																					</View>
																				</View>
																				<View style={{flex: 0.2,borderWidth: 1,flexDirection: 'row'}}>
																					<View style={{flex: 0.5}}>
																					</View>
																					<View style={{flex: 0.5}}>
																						<Text>
																						  name
																						</Text>
																					</View>
																				</View>
																		</View>*/}
									<View style={[styles._viewChartStatus,styles._center]} >
										<Pie
									        radius={90}
									        series={this.state.data_pie}
									        colors={['#4F81F0', '#f05a63', '#F0C751','#67CCF2','#d7d4f0']} />
									</View>
								</View>
								{this.state.status!=''?this._renderViewActions():this._renderViewActions()}
							</View>
						</View>
				</Modal>
				<Modal 
					animationType="fade"
					transparent={true}
					visible={this.state._modal}
					onRequestClose={()=>{this.setState({_modal: false})}} >
						<View style={[styles._actionRow,styles._center]}>
							<View style={styles._mcontentAction}>
								<View style={styles._mheadAction}>
									<Text style={[styles._colorText,{fontSize: height/40,}]} >
									  	{this.state._langid?this.state._lang.vi.action:this.state._lang.en.action}
									</Text>
								</View>
								<View style={styles._mdataAction}>
									{this._eachStatus()}
								</View>
								{this._renderViewModalComment()}
							</View>
						</View>
				</Modal>
				<View style={styles._header}>
					{/*<View style={[styles._textHeader,styles._center]}>
											<Text style={[styles._textHead]}>
												{this.state.name_list}
											</Text>
										</View>*/}
					<View style={[styles._startFaQ,styles._center]}>
						<TouchableOpacity onPress={()=>{this.setState({_mReport: !this.state._mReport})}} style={[styles._flex_FaQ,styles._center]}>
							<Icon type="font-awesome" style={{marginHorizontal: 2}} name="line-chart" color="white" size={height/25} />
							<Text style={{color:"white", fontSize: width/20,}} >
								{this.state._langid?this.state._lang.vi.statistic:this.state._lang.en.statistic}
							</Text>
						</TouchableOpacity>
					</View>
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
	_textCenter:{
		textAlign: 'center',
		alignSelf: 'center',  
	},
	font_size:{
		fontSize: normalize,
	},
	row:{
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'white',
	},
	_mRowComment:{
		width: width,
		height: height,
		padding: 10,
		backgroundColor: 'rgba(0,0,0,0.3)',
	},
	_mbodyComment:{
		backgroundColor: 'white',
		width: width-30,
		height: height-15,
		paddingHorizontal: 5,
		paddingTop: 5,
		flexDirection: 'column',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5, 
	},
	_mheadComment:{
		height: ((height-15)/10),
	},
	_mdataComment:{
		height: ((height-15)/10)*8,
	},
	_mScrolView:{
		height: ((height-15)/10)*8,
	},
	_mItemsComment:{
		flexDirection: 'row',
		borderBottomWidth: 0.3,
	},
	_mitemUser:{
		flex: 0.2,
	},
	_mitemContent:{
		flex: 0.8,
		flexDirection: 'column', 
	},
	_textActions:{
		flexDirection: 'row', 
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingRight: 5,
	},
	_mtextComment:{
		height: ((height-10)/10)*1.5,
	},
	_minputText:{
		flex: 1,
	},
	_mClickComment:{
		flex: 1,
		flexDirection: 'row', 
	},
	_actionRow:{
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.3)',
		width: width,
	},
	_mcontentAction:{
		height: (height/4)*2,
		backgroundColor: '#E8E9EC',
		width: width-20,
		paddingVertical: 0,
		flexDirection: 'column', 
	},
	_actionRepComment:{
		paddingLeft: width/20,
		flexDirection: 'row',
		paddingBottom: 2,
	},
	_itemText:{
		flexDirection: 'column', 
	},
	_mChildComment:{
		flexDirection: 'row', 
	},
	_mChildActions:{
		flexDirection: 'row', 
	},
	_mChildContent:{
		flexDirection: 'column',
	},
	_repUser:{
		flex: 0.1,
	},
	_repTextInput:{
		flex: 0.5,
	},
	_repActions:{
		flex: 0.2,
		marginHorizontal: 2,
		flexDirection: 'row',
	},
	_mheadAction:{
		flex: 0.1,
		marginHorizontal: 5,
		marginVertical: 5,
		justifyContent: 'flex-end',
		alignItems: 'center', 
	},
	_mdataAction:{
		flex: 0.55,
		marginHorizontal: 5,
		marginVertical: 5,
		// backgroundColor: 'white',
	},
	_mComment:{
		flex: 0.2,
		backgroundColor: '#E8E9EC',
		flexDirection:  'column',
		marginVertical: 5,
		marginHorizontal: 5,
	},
	_mfootAction:{
		flex: 0.1,
		marginHorizontal: 5,
		// marginVertical: 10,
		marginBottom: 5,
		// backgroundColor: 'white',
		flexDirection: 'row',
		// borderWidth: 0.4,
	},
	_mMainAction:{
		flex: 1,
		flexDirection: 'row',
		borderBottomWidth: 0.5,
		borderColor: 'black',
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
	input: {
    // textAlignVertical: "top",
    textAlign: 'left',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#DDDFE2',
    paddingVertical: height/60,
    backgroundColor: 'white',
    // borderColor: "rgb(232,232,232)",
  	},
  	_colorText:{
		fontSize: height/50,
		color: 'black',
  	},
	_header:{
		flex: 0.1,
		backgroundColor: 'white',
		flexDirection: 'column', 
	},
	_textHeader:{
		flex: 1,
	},
	_startFaQ:{
		flex: 1,
		flexDirection: 'row',  
	},
	_flex_FaQ:{
		// width: width/2,
		paddingVertical: 5,
		paddingHorizontal: 10,
		flexDirection: 'row',
		backgroundColor: 'rgba(4,87,201,0.9)'
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
		// paddingHorizontal: 5,
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
	},
	_buttonClick:{
		flex: 0.3,
		borderWidth: 0.5,
		paddingHorizontal: 4,
		//ngang
		paddingVertical: 1,
		//doc
		borderRadius: 5,
		borderColor: '#4267B2',
	},
	_rowReport:{
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.3)',
		padding: 10,
	},
	_mHeadReport:{
		flex: 0.1,
		width: width-20,
		flexDirection: 'row', 
	},
	_mContentReport:{
		flex: 1,
		backgroundColor: 'white',
	},
	_mBodyReport:{
		flex: 0.5,
	},
	_mFootReport:{
		flex: 0.1,
		flexDirection: 'row',
		width: width-20,
	},
	_mDataReport:{
		flex: 1,
		width: width-20,
		flexDirection: 'column',
	},
	_bodyCharts:{
		flex: 0.3,
		flexDirection: 'column', 
	},
	_viewStatus:{
		flex: 0.15,
		flexDirection: 'row',
		borderWidth: 1,
	},
	_viewChartStatus:{
		flex: 0.9,
	},
	_itemsDataReport:{
		flex: 1,
		borderBottomWidth: 1,
		borderColor: '#ECEEEF',
		flexDirection: 'row', 
	},
	_itemReport:{
		flex: 3,
	},
	_mBodyRefer:{
		flex: 1,
		margin: 10,
	},
	_mContentRefer:{
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		flex: 0.9,
		backgroundColor: 'white',
		// borderBottomWidth: 0.5,
	},
	_mHeadRefer:{
		flex:0.05,
		width: width-20,
		backgroundColor: 'white',
		// borderBottomWidth: 0.5,
	},
	_mFootRefer:{
		flex: 0.05,
		width: width-20,
		backgroundColor: 'white',
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		// borderTopWidth: 1,
	},
	_button:{
  		borderRadius: 5,
  		// borderWidth: 1,
  		// borderColor: 'green',
  		backgroundColor: '#0457C9',
  		// padding: 5,
  		paddingHorizontal: 10,
  		paddingVertical: 2,
  		marginHorizontal: 5,
  	},
 	_color:{
 	color: 'white',
 	fontSize: height/45,
 	}
});
export default ListFaQ;
