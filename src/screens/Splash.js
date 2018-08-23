import React from 'react';
import { View, Text, ImageBackground, Dimensions, StatusBar, Image } from 'react-native';

const { width, height } = Dimensions.get('window');
StatusBar.setHidden(true);

const Splash = () => {
	return(
		<View style={styles.container}>
			<ImageBackground style={styles.image} source={require('../assets/imgs/splash.png')}>
				<View style={styles.containerLogo}>
					<Image style={styles.logo} source={ require('../assets/imgs/logo.png') } />
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = {
	container: {
    	flex: 1,
    	backgroundColor: '#fff',
	},
	containerLogo: {
		flex: 1,
		alignItems: 'center',
    	justifyContent: 'center',
	},
	logo: {
		height: 100,
		width: 100,
	},
	image: {
		width: width,
		height: height
	}
}

export default Splash;