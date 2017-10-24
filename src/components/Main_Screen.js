import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  View,Text,Dimensions,Image,TouchableOpacity,AsyncStorage,Modal
} from 'react-native';
import { Icon } from 'react-native-elements';
const {height,width} = Dimensions.get('screen');
class Main_Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  onButtonPressProfile(){
    Actions.profile();
  };
  onPressLogout(){
      AsyncStorage.getAllKeys((err, keys) => { 
          // AsyncStorage.multiGet(keys, (err, stores) => {
          //     console.log(keys);
          // }); 
          AsyncStorage.multiRemove(keys).then((value)=>{
             console.log("ok remoe");
          });
          Actions.auth();
    }); 
};
_onChangeLanguage(){

};
  render() {
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
              <TouchableOpacity style={[styles.itemClick]} onPress={()=>{this.props.navigation.navigate('Screen_EmployList')}} >
                  <Icon style={[styles.flex3,styles.IconFirst]}  type='materialIcons' name='library-books' size={20} />
                  <Text style={[styles.flex3,styles.textItem]} >
                      List CheckList
                  </Text>
                  <Icon style={[styles.mLeftIcon,styles.flex3,styles.IconLast]} type='font-awesome' name="chevron-right" size={20} />
              </TouchableOpacity>
      		</View>
      		<View style={[styles.itemContent,styles.center]}>
            <TouchableOpacity style={[styles.itemClick]} onPress={()=>{this.props.navigation.navigate('Screen_Profile')}}>
                  <Icon  style={[styles.flex3,styles.IconFirst]} type='font-awesome' name="user-circle-o" size={20} />
                  <Text style={[styles.flex3,styles.textItem]} >
                      Profile
                  </Text>
                   <Icon  style={[styles.mLeftIcon,styles.flex3,styles.IconLast]} type='font-awesome' name="chevron-right" size={20} />
              </TouchableOpacity>
      		</View>
          <View style={[styles.itemContent,styles.center]}>
            <TouchableOpacity onPress={()=>this.onPressLogout()} style={[styles.itemClick]}>
                  <Icon style={[styles.flex3,styles.IconFirst]}  type='material-icons' name="power-settings-new" size={20} />
                  <Text style={[styles.flex3,styles.textItem]} >
                      Sign Out
                  </Text>
                  <Icon style={[styles.mLeftIcon,styles.flex3,styles.IconLast]} type='font-awesome' name="chevron-right" size={20} />
              </TouchableOpacity>
          </View>
          <View style={[styles.itemContent,styles.center]}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Screen_ChoseLanguage')} style={[styles.itemClick]}>
                  <Icon style={[styles.flex3,styles.IconFirst]}  type='material-icons' name="power-settings-new" size={20} />
                  <Text style={[styles.flex3,styles.textItem]} >
                      Change Language
                  </Text>
                  <Icon style={[styles.mLeftIcon,styles.flex3,styles.IconLast]} type='font-awesome' name="chevron-right" size={20} />
              </TouchableOpacity>
          </View>
      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	row:{
		flex:1,
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
		flex: 1,
		flexDirection: 'column', 
	},
	itemContent:{
		height: height/12,
		width: width,
		borderWidth: 1,
    flexDirection: 'row',
    // borderBottomWidth: 0,
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
    // alignSelf: 'center',
    // flex: 0.3,
    // justifyContent: 'center',
    textAlign: 'center',
    // alignItems: 'center', 
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