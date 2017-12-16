import React from 'react';
import {View} from 'react-native';

const CardSection = (props) => {
	return (
		<View style = {[styles.container, props.style]}>
		    {props.children}
		</View>
	);
};

const styles = {
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };