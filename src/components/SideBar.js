import React, { Component } from 'react';
import { Picker, Text,TouchableOpacity,Image } from 'react-native';
import { connect } from 'react-redux';
// import { employeeUpdate } from '../actions';
// import EmployeeCreate from './EmployeeCreate';
import { Card, CardSection, Input, Button } from './common';
import {Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  View
} from 'react-native';
class SideBar extends Component {
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
        <View style={styles.div1}>
            <View style={styles.items}>
                <Text style={{fontSize: 20,textAlign: 'center', color: '#f2b334' }}>
                      Search
                  </Text>
            </View>
            <View style={styles.items1}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Screen_Detail')}}>
                  <Text style={{fontSize: 20,textAlign: 'center', color: '#f2b334' }}>
                      Detail
                  </Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.div2}></View>
        <View style={styles.div3}></View>
        <View style={styles.div4}></View>
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
    flex: 1,
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
        flex: 1,
        backgroundColor: 'lightblue',
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
    flex: 1,
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