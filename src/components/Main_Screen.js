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
      modalVisible: false,_lang:lang,lang_load: false,selectedIds:[],visibleModal: false,
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
      	<View style={styles.content}>
      		<View style={styles.head}>
      			 <View style={styles.logo}>
              <Image style={styles.img}
                source={require('./../../images/logo.jpg')}
              />
            </View>
      		</View>
      		<View style={[styles.itemContent,styles.center,{borderTopWidth: 1}]}>
              <TouchableOpacity style={[styles.itemClick]} onPress={()=>{this.props.navigation.navigate('Screen_ListFaQ')}} >
                  <Icon style={[styles.flex3,styles.IconFirst]} color='#DE584D'  type='materialIcons' name='library-books' size={height/20} />
                  <Text style={[{flex: 0.4},styles.textItem]} >
                      {this.state.lang_load?this.state._lang.vi.listchList:this.state._lang.en.listchList}
                  </Text>
                  <Icon style={[styles.mLeftIcon,styles.flex3,styles.IconLast]} type='font-awesome' name="chevron-right" size={height/30} />
              </TouchableOpacity>
      		</View>
      		<View style={[styles.itemContent,styles.center]}>
            <TouchableOpacity style={[styles.itemClick]} onPress={()=>{this.props.navigation.navigate('Screen_Profile')}}>
                  <Icon  style={[styles.flex3,styles.IconFirst]} color='#5F84CE'  type='font-awesome' name="user-circle-o" size={height/20} />
                  <Text style={[{flex: 0.4},styles.textItem]} >
                    {this.state.lang_load?this.state._lang.vi.profile:this.state._lang.en.profile}
                     
                  </Text>
                   <Icon  style={[styles.mLeftIcon,styles.flex3,styles.IconLast]} type='font-awesome' name="chevron-right" size={height/30} />
              </TouchableOpacity>
      		</View>
          <View style={[styles.itemContent,styles.center]}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Screen_ChoseLanguage')} style={[styles.itemClick]}>
                  <Icon style={[styles.flex3,styles.IconFirst]} color='#0457C9' type='font-awesome' name="language" size={height/20} />
                  <Text style={[{flex: 0.4},styles.textItem]} >
                      {this.state.lang_load?this.state._lang.vi.changelanguage:this.state._lang.en.changelanguage}  
                  </Text>
                  <Icon style={[styles.mLeftIcon,styles.flex3,styles.IconLast]} type='font-awesome' name="chevron-right" size={height/30} />
              </TouchableOpacity>
          </View>
          <View style={[styles.itemContent,styles.center]}>
            <TouchableOpacity onPress={()=>this.onPressLogout()} style={[styles.itemClick]}>
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
		height: height/12,
		width: width,
		// borderWidth: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderTopWidth: 0,
	},
  mLeftIcon:{
    marginLeft: 0,
  },
  img:{
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'stretch',
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
});


export default Main_Screen;