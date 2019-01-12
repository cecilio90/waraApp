import React from 'react';
import { ScrollView, KeyboardAvoidingView, AsyncStorage, Text } from 'react-native';
import RegisterForm from '../components/register/RegisterForm';
import Splash from '../screens/Splash';

export default class Login extends React.Component{

	render() {	
		
		return(
			<KeyboardAvoidingView 
				style={styles.container} 
				behavior="padding" 
				enabled
			>
				<ScrollView 
					style={styles.scroll}
					contentContainerStyle={{flexGrow: 1 , justifyContent : 'center'}}
				>
					<RegisterForm />
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}

const styles = {
	container:{
		flexGrow: 1, 
		backgroundColor: '#fff',
	},
	scroll: {
		flex: 1,
	}
}