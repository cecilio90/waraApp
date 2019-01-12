import React from 'react';
import { ScrollView, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import LoginForm from '../components/login/LoginForm';
import Splash from '../screens/Splash';

export default class Login extends React.Component{
	state = {
		ready: false,
	}
	
	componentDidMount () {
		if(this.props.navigation.getParam('splash') === false) {
			this.setState({ ready: true })
		} else {
			setTimeout(() => {
				 this.setState({ ready: true })
			}, 2000)
		}
	}

	render() {	
		if (this.state.ready === false) {
		 	return(
		 		<Splash />
		 	);
		}	
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
					<LoginForm />
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