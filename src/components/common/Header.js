/**
 * PA HSSE React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


// Create a component

const Header = (props) => {

	return (
		<View style={styles.container}>
		<Text style = {styles.headerStyle} > {props.headerText}</Text>
		</View>
		);

};

const styles = {
	
	container: {  
		backgroundColor: '#F8F8F8',
	    justifyContent: 'center',
	    alignItems: 'center',
	    height: 60,
	    paddingTop: 15,
	    shadowColor: '#000',
	    shadowOffset: { width: 0, height: 2 },
	    shadowOpacity: 0.2,
	    elevation: 2,
	    position: 'relative'
	},
	
	headerStyle: {
	    fontSize: 20
  },
};

// Registrer component

export { Header };
