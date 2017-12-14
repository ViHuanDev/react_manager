import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  View,Text,Dimensions,Image,TouchableOpacity,AsyncStorage,Modal,Platform
} from 'react-native';
// import {ResponsiveStyleSheet} from 'react-native-responsive-ui';
// import {responsive} from 'react-native-responsive-ui';
import { Icon } from 'react-native-elements';
import {lang} from './languages/languages';
const {height,width} = Dimensions.get('screen');
const  _langAsyn =   AsyncStorage.getItem('@locale:key');
console.log(Platform.OS);
class Main_Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,_lang:lang,lang_load: false,selectedIds:[],visibleModal: false,_mReport: false
    };
      AsyncStorage.getItem('@locale:key').then((item)=>{
        console.log(item);
      this.setState({
      lang_load: item=='vi'?true:false,
    });
  });
  };
componentWillMount() {
  // console.log(this.state._lang.length);
  // console.log(_key);
 // this.state.test.map((item)=>{
 //      console.log(item);
 //  });
  // var keyGet = ['@email:key','@password:key','@user_id:key','@token:key','@locale:key'];
  //   AsyncStorage.multiGet(keyGet).then((value)=>{
  //     // console.log(value[4][1]);
  //     if(value[4][1]!=null){
  //       this.setState({
  //         selectedIds: [value[4][1]],
  //         lang_load: value[4][1]=='vi'?true:false,
  //       });     
  //     }
  //   });
};
  onButtonPressProfile(){
    Actions.profile();
  };
onPressLogout(){
    AsyncStorage.getAllKeys((err, keys) => { 
          AsyncStorage.multiRemove(keys).then((value)=>{
             console.log("ok remoe");
          });
          Actions.auth();
    }); 
};
_onChangeLanguage(){

};
  render(){
    return (
      <View style={styles.row}>
        <Modal 
          animationType="slide"
          transparent={true}
          visible={this.state._mReport}
          onRequestClose={() => {this.setState({_mReport: false})}} >
            <View style={[styles.center,{flex: 1,padding: 20, backgroundColor: 'rgba(0,0,0,0.4)',flexDirection: 'column'}]}>
              <View style={[styles.center,{flex: 9/10,width: width-40,backgroundColor: 'white',borderTopLeftRadius: 10,borderTopRightRadius: 10}]} >
                <View style={styles._mContentReport}>
                  <View style={styles._mItemsReport}>
                    <View style={[styles._mItemReport,styles.center,{borderRightWidth: 0.3}]}>
                      <Text>
                        {this.state.lang_load?this.state._lang.vi.status:this.state._lang.en.status}
                      </Text>
                    </View>
                    <View style={[styles._mItemReport,styles.center]}>
                      <Text>
                        {this.state.lang_load?this.state._lang.vi.amount:this.state._lang.en.amount}
                      </Text>
                    </View>
                  </View>
                  <View style={styles._mItemsReport}>
                    <View style={styles._mItemReport}></View>
                    <View style={styles._mItemReport}></View>
                  </View>
                  <View style={styles._mItemsReport}>
                    <View style={styles._mItemReport}></View>
                    <View style={styles._mItemReport}></View>
                  </View>
                  <View style={styles._mItemsReport}>
                    <View style={styles._mItemReport}></View>
                    <View style={styles._mItemReport}></View>
                  </View>
                  <View style={styles._mItemsReport}>
                    <View style={styles._mItemReport}></View>
                    <View style={styles._mItemReport}></View>
                  </View>
                  <View style={styles._mItemsReport}>
                    <View style={styles._mItemReport}></View>
                    <View style={styles._mItemReport}></View>
                  </View>
                </View>
              </View>
              <View style={[styles.center,{flex: 1/10,width: width-40,backgroundColor: 'white',borderBottomLeftRadius: 10,borderBottomRightRadius: 10}]}>
                <TouchableOpacity onPress={()=>{this.setState({_mReport: false})}} >
                  <Text>
                      {this.state.lang_load?this.state._lang.vi.close:this.state._lang.en.close}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
      	<View style={styles.content}>
      		<View style={styles.head}>
      			 <View style={styles.logo}>
              <Image style={styles.img}
                source={require('./../../images/Logo_hse.png')}
              />
            </View>
      		</View>
      		<View style={[styles.itemContent,styles.center,{borderTopWidth: 0.4}]}>
              <TouchableOpacity style={[styles.itemClick,styles.center]} onPress={()=>{this.props.navigation.navigate('Screen_EmployList')}} >
                  <Icon style={[styles.flex3,styles.IconFirst]} color='#DE584D'  type='materialIcons' name='library-books' size={height/20} />
                  <Text style={[{flex: 0.4},styles.textItem]} >
                      {this.state.lang_load?this.state._lang.vi.audit:this.state._lang.en.audit}
                  </Text>
                  <Icon style={[styles.mLeftIcon,styles.flex3,styles.IconLast]} type='font-awesome' name="chevron-right" size={height/30} />
              </TouchableOpacity>
      		</View>
      		<View style={[styles.itemContent,styles.center]}>
            <TouchableOpacity style={[styles.itemClick,styles.center]} onPress={()=>this.props.navigation.navigate('Screen_Profile')} >
                  <Icon  style={[styles.flex3,styles.IconFirst]} color='#5F84CE'  type='font-awesome' name="user-circle-o" size={height/20} />
                  <Text style={[{flex: 0.4},styles.textItem]} >
                    {this.state.lang_load?this.state._lang.vi.profile:this.state._lang.en.profile}
                  </Text>
                   <Icon  style={[styles.mLeftIcon,styles.flex3,styles.IconLast]} type='font-awesome' name="chevron-right" size={height/30} />
              </TouchableOpacity>
      		</View>
          <View style={[styles.itemContent,styles.center]}>
            <TouchableOpacity onPress={()=>{this.setState({_mReport: true})}}  style={[styles.itemClick,styles.center]}>
                  <Icon style={[styles.flex3,styles.IconFirst]} color='#48cfad' type='font-awesome' name="line-chart" size={height/20} />
                  <Text style={[{flex: 0.4},styles.textItem]} >
                      {this.state.lang_load?this.state._lang.vi.report:this.state._lang.en.report}  
                  </Text>
                  <Icon style={[styles.mLeftIcon,styles.flex3,styles.IconLast]} type='font-awesome' name="chevron-right" size={height/30} />
              </TouchableOpacity>
          </View>
          <View style={[styles.itemContent,styles.center]}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Screen_ChoseLanguage')} style={[styles.itemClick,styles.center]}>
                  <Icon style={[styles.flex3,styles.IconFirst]} color='#0457C9' type='font-awesome' name="language" size={height/20} />
                  <Text style={[{flex: 0.4},styles.textItem]} >
                      {this.state.lang_load?this.state._lang.vi.changelanguage:this.state._lang.en.changelanguage}  
                  </Text>
                  <Icon style={[styles.mLeftIcon,styles.flex3,styles.IconLast]} type='font-awesome' name="chevron-right" size={height/30} />
              </TouchableOpacity>
          </View>
          <View style={[styles.itemContent,styles.center,{marginBottom: 10}]}>
            <TouchableOpacity onPress={()=>this.onPressLogout()} style={[styles.itemClick,styles.center]}>
                  <Icon style={[styles.flex3,styles.IconFirst]}  type='material-icons' name="power-settings-new" size={height/20} />
                  <Text style={[{flex: 0.4},styles.textItem]} >
                      {this.state.lang_load?this.state._lang.vi.signout:this.state._lang.en.signout}
                  </Text>
                  <Icon style={[styles.mLeftIcon,styles.flex3,styles.IconLast]} type='font-awesome' name="chevron-right" size={height/30} />
              </TouchableOpacity>
          </View>
      	</View>
      </View>
    );
  }
  get style(){

  }
}

const styles = StyleSheet.create({
	row:{
		flex: 1,
		backgroundColor: 'white',
    // borderWidth: 1,
    // borderColor: 'red'
	},
  center:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex3:{
      flex: 0.3,
  },
	head:{
		height: (height*(2/12)),
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',  
	},
	content:{
		flex: 0.9,
		flexDirection: 'column', 
	},
	itemContent:{
		flex: 0.2,
		width: width,
		// borderWidth: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.4,
    borderTopWidth: 0,
	},
  mLeftIcon:{
    marginLeft: 0,
  },
  img:{
    flex: 1,
    width: width/4,
    height: width/4,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 5,
  },
  arrowLeft:{
    justifyContent: 'center',
    alignItems: 'center', 
  },
  logo:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center', 
    borderBottomWidth: 0,
    borderColor: '#ffffff'
  },
  itemClick:{
    flexDirection: 'row'
  },
  textItem:{
    textAlign: 'center',
    alignSelf: 'center', 
    // borderWidth: 1,
  },
  IconFirst:{
    alignItems: 'flex-end',  
  },
  IconLast:{
    alignItems: 'flex-end',  
  },
  _mContentReport:{
    flex: 1,
    // backgroundColor: 'cyan',
  },
  _mItemsReport:{
    flex: 0.2,
    flexDirection: 'row',
    width: width-40,
  },
  _mItemReport:{
    flex: 1,
    // borderWidth: 1,
    borderBottomWidth: 0.3,
  }
});


export default Main_Screen;