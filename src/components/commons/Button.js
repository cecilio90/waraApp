import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ myStyles, children, whenPress }) => {
	return (
		<TouchableOpacity 
			style={[styles.buttonContainer, myStyles]}
			onPress={whenPress}
		>
			<Text style={styles.textButton}>
				{children}
			</Text>
		</TouchableOpacity>
	);
}

const styles = {
	buttonContainer: {
		borderRadius:15,
	    flex: 1,
	    paddingVertical: 10,
	},
	textButton: {
		alignSelf: 'center',
		color: '#fffffd'
	}
}

export { Button };