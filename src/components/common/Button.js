import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
const Button = ({onPress, children,style,textStyle}) => {
	const {buttonStyle, textstyle} = styles;
	return (
		<TouchableOpacity onPress = {onPress} style = {[style,buttonStyle]}> 
			<Text style = {[textstyle,textStyle]}>
				{children}
			</Text>
		</TouchableOpacity>
	);
};
const styles = {
	textstyle: {
		alignSelf: 'center',
		color: 'black',
		fontSize: 16,
		fontWeight: '600',
		paddingTop: 10,
		paddingBottom: 10
	},
	buttonStyle: {
		alignSelf: 'stretch',
		borderRadius: 5,
		marginLeft: 5,
		marginRight: 5
	}
};

export { Button };