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
    // borderBottomWidth: 1,
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };