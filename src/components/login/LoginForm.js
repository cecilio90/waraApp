import React from 'react';
import { View, Dimensions, Image, Alert, AsyncStorage } from 'react-native';
import { Input, Button, Spinner } from '../commons';
import { withNavigation } from 'react-navigation';

const { width } = Dimensions.get('window');

class LoginForm extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			email: '',
			password: '',
			loading: false,
			charging: false
	    }
	}

	componentWillMount(){
		this._getToken();
	}

	_storeToken = async (value) => {
		try {
			await AsyncStorage.setItem('@MySuperStore:accessToken', value);
		} catch (error) {
			console.log(error);
		}
	}

	_storeCredentials = async (correo, pass) => {
		try {
			await AsyncStorage.multiSet([
				['correo',correo],
				['pass',pass]
			],
			credentials);
		} catch (error) {
			console.log(error);
		}
	}

	_getToken = async () => {
		try {
			await AsyncStorage.getItem('@MySuperStore:accessToken')
					.then(dataAccess => {
						console.log(dataAccess)
						if (dataAccess != null) {
							AsyncStorage.getItem('@MySuperStore:credentials')
								.then(cred => {
									this.setState({
										email: JSON.parse(cred).correo,
										password: JSON.parse(cred).pass,
										charging: true
									})
									this._login();

								});
						}
					});
		} catch (error) {
			console.log(error);
		}
	}

	_login(){
		this.setState({loading: true});

        fetch('http://iqserviciosinmobiliarios.com.mx/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        }).then(response => response.json())
		.then(data => {
			this.setState({loading: false});
			if (data.status == 'success') {
				this._storeToken(data.token);
				this._storeCredentials(this.state.email, this.state.password);
				this.props.navigation.navigate('Lessons');
			}else{
				Alert.alert(
					'¡Ups!',
					'Usuario inválido o bloqueado',
					[
						{text: 'Ok', onPress: () => console.log('Ok') },
					],
					{ cancelable: false }
				)
			}
		})
        .catch((error) => {
			this.setState({loading: false});
            console.log(error + 'errooooooooor');
        });
    }

	render() {
		if (this.state.charging == true) {
			return(
				<View style={styles.container}>
					{this.state.loading && <Spinner status={this.state.loading} />}
				</View>
			);
		}else{
			return(
				<View style={styles.container}>
					<Image style={styles.logo} source={ require('../../assets/imgs/logo.png') } />
					{this.state.loading && <Spinner status={this.state.loading} />}
					<Input 
						value={this.state.email}
						onChangeText={ email => this.setState({email}) }
						placeholder={'Correo'}
						returnKeyType={'next'}
						onSubmitEditing={()=>this.passwordInput.focus()}
					/>
		
					<Input 
						value={this.state.password}
						onChangeText={ password => this.setState({password}) }
						placeholder={'Contraseña'}
						returnKeyType={'go'}
						secureTextEntry={true}
						refe={(input)=> this.passwordInput=input}
						secureTextEntry={true}
					/>
		
					<View style={ styles.buttonContent }>
						<Button
							whenPress= {() => this._login() }
							myStyles={styles.login}
						>
							Iniciar Sesión
						</Button>
					</View>
				</View>
				);
		}
	}
}

const styles = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingTop: 20,
		marginBottom: 10,
		backgroundColor: '#fff'
	},
	buttonContent: {
		flexDirection: 'row',
	},
	login: {
		backgroundColor: 'rgba(241,78,59,0.7)',
		width: width,
		height: 40,
	},
	logo: {
		height: 100,
		width: 100,
		marginBottom: 40
	},
}

export default withNavigation(LoginForm);