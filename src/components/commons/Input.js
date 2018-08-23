import React from 'react';
import { View, TextInput } from 'react-native';

const Input = ({ 
	value, 
	onChangeText, 
	placeholder, 
	keyboardType, 
	returnKeyType, 
	onSubmitEditing, 
	refe, 
	secureTextEntry,
	multiline,
	editable,
	maxLength,
	numberOfLines, 
	myStyles
}) => {
	return(
		<View style={styles.contentInput}>
			<TextInput
				value={value} 
				onChangeText={onChangeText} 
				placeholder={placeholder}
				style={[styles.input, myStyles]}
				underlineColorAndroid='transparent'
		        placeholderTextColor='#000'
		        returnKeyType={returnKeyType}
				keyboardType={keyboardType}
				autoCorrect={false}
				secureTextEntry={secureTextEntry}
				onSubmitEditing={onSubmitEditing}
				ref={refe}
				multiline = {multiline}
				editable = {editable}
				maxLength = {maxLength}
				numberOfLines = {numberOfLines}
			/>
		</View>
	);
}

const styles = {
	contentInput: {
		flexDirection: 'row',
	},
	input: {
		flex:1,
		borderRadius:15,
	    height: 40,
	    backgroundColor: 'rgba(171,171,171,0.3)',
	    marginBottom: 10,
	    color: 'white',
		paddingHorizontal: 10,
		color: '#000'
	}
}

export {Input};