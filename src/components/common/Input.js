import React from 'react';
import { TextInput, View, Text } from 'react-native';


const Input = ({customText,label, value, onChangeText,placeholderTextColor, placeholder, secureTextEntry,labelStyle}) => {
	const {inputStyle, labelstyle, containerStyle } = styles;
	return(
		<View style = {containerStyle}>
			{customText}
			<TextInput
				secureTextEntry = {secureTextEntry}
				placeholder = {placeholder}
				placeholderTextColor={placeholderTextColor}
				underlineColorAndroid={'transparent'}
				autoCorrect = {false}
				value = {value}
				onChangeText = {onChangeText}
				style={inputStyle}
			/>
		</View>
	);

};

const styles = {
	inputStyle: {
		color: '#000',
		paddingRight: 5,
		paddingLeft: 0,
		fontSize: 18,
		lineHeight: 23,
		flex: 2
	},
	labelstyle: {
		fontSize: 16,
		paddingLeft: 20,
		flex: 1,
	},
	containerStyle: {
		height: 40,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	}

};

export { Input };
