import React from 'react';
import { View, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Logo = ({ children }) => {
	return(
		<View style={styles.containerLogo}>
			<Image style={styles.logo} source={ require('../../assets/imgs/logo.png') } />
			{children}
		</View>
	);
}

const styles = {
	containerLogo: {
		flex: 1,
		width: width,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	logo: {
		width: 100,
    	height: 100
	}
}

export {Logo};