import React, { Component } from 'react';
import { Picker, Text,TouchableOpacity,Image,AsyncStorage,Dimensions } from 'react-native';
import { connect } from 'react-redux';
// import { employeeUpdate } from '../actions';
// import EmployeeCreate from './EmployeeCreate';
import { Card, CardSection, Input, Button } from './common';
import {lang} from './languages/languages';
import {Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  View
} from 'react-native';
const {height,width} = Dimensions.get('screen');
class SideBar extends Component {
  constructor(props) {
  super(props);
  this.state = {
    _lang: lang,lang_load: false,
  };
        AsyncStorage.getItem('@locale:key').then((item)=>{
    this.setState({
      lang_load: item=='vi'?true:false,
    });
  });
}
_onPressLogout(){
    AsyncStorage.getAllKeys((err, keys) => { 
          AsyncStorage.multiRemove(keys).then((value)=>{
             console.log("ok remoe");
          });
          Actions.auth();
    }); 
};
// componentDidMount() { Actions.menu({key: 'menu', ref: this.refs.navigation}); }
render() {
    return (
      <View style={styles.body}>
      	<View style={styles.logo}>
            <Image 
            style={styles.img}
              source={require('../../images/logo.jpg')}
            />
        </View>
        <View style={styles.div2}>
            <View style={styles.items}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Screen_Main')}}>
                  <Text style={{fontSize: height/35,textAlign: 'center', color: 'white' }}>
                    {this.state.lang_load?this.state._lang.vi.home:this.state._lang.en.home}
                  </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.items}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Screen_EmployList')}}>
                  <Text style={{fontSize: height/35,textAlign: 'center', color: 'white' }}>
                    {this.state.lang_load?this.state._lang.vi.listchList:this.state._lang.en.listchList}
                  </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.items}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Screen_Profile')}}>
                  <Text style={{fontSize: height/35,textAlign: 'center', color: 'white' }}>
                      {this.state.lang_load?this.state._lang.vi.profile:this.state._lang.en.profile}
                  </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.items}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Screen_ChoseLanguage')}}>
                  <Text style={{fontSize: height/35,textAlign: 'center', color: 'white' }}>
                    {this.state.lang_load?this.state._lang.vi.changelanguage:this.state._lang.en.changelanguage}
                  </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.items}>
                <TouchableOpacity onPress={()=>{this._onPressLogout()}} >
                  <Text style={{fontSize: height/35,textAlign: 'center', color: 'white' }}>
                      {this.state.lang_load?this.state._lang.vi.signout:this.state._lang.en.signout}
                  </Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch', 
  },
  logo:{
    flex: 0.3,
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center', 
    borderBottomWidth: 2,
    borderColor: '#ffffff'
  },
  div1:{
        flex: 1,
        backgroundColor: '#3342b5',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch', 
  },
  div2:{
        flex: 0.7,
        backgroundColor: '#009F75',
  },
  div3:{
        flex: 1,
        backgroundColor: 'cyan',
  },
  div4:{
        flex: 1,
        backgroundColor: 'red',
  },
  f_column:{
    flex: 1,
  },
  img:{
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  items:{
    flex: 0.2,
    justifyContent: 'center',
    borderRightWidth: 2,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#ffffff'
  },
  items1:{
    flex: 1,
    justifyContent: 'center',
    borderRightWidth: 2,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#ffffff' 
  },
});
export default connect()(SideBar);