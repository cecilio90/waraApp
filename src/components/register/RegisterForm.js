import React from 'react';
import { View, Dimensions, Image, Alert, AsyncStorage, TouchableOpacity, Text } from 'react-native';
import { Input, Button, Spinner } from '../commons';
import { withNavigation } from 'react-navigation';

const { width } = Dimensions.get('window');

class RegisterForm extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			dni:'',
			name: '',
			phone: '',
			email: '',
			
			loading: false,
			charging: false
	    }
	}

	_register(){
		this.setState({loading: true});

        fetch('http://iqserviciosinmobiliarios.com.mx/api/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dni: this.state.dni,
                name: this.state.name,
                email: this.state.email,
				phone: this.state.phone,
				user_app: true
            }),
        }).then(response => response.json())
		.then(data => {
			this.setState({loading: false});
			if (data.status == 'success') {
				Alert.alert(
					'Registro exitoso',
					'¡Felicidades! ya haces parte de WaraWorkout. Tu cuenta pronto será activada.',
					[
						{ text: 'Ok', onPress: () => this.props.navigation.navigate('Login') }
					]
				)
			}else if(data.dni || data.name || data.phone || data.email) {
				Alert.alert(
					'¡Ups!',
					this._getErrors(data),
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

	_getErrors(errors){
		if(errors.dni){
			return errors.dni.toString();
		} else if(errors.phone) {
			return errors.phone.toString();
		} else if(errors.name) {
			return errors.name.toString();
		} else {
			return errors.email.toString();
		}
	}

	render() {
		if (this.state.charging) {
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
						value={this.state.dni}
						onChangeText={ dni => this.setState({dni}) }
						placeholder={'DNI'}
						returnKeyType={'next'}
						onSubmitEditing={()=>this.nameInput.focus()}
					/>
		
					<Input 
						value={this.state.name}
						onChangeText={ name => this.setState({name}) }
						placeholder={'Nombre Completo'}
						returnKeyType={'next'}
						refe={(input)=> this.nameInput=input}
						onSubmitEditing={()=>this.phoneInput.focus()}
					/>

					<Input 
						value={this.state.phone}
						onChangeText={ phone => this.setState({phone}) }
						placeholder={'Teléfono'}
						returnKeyType={'next'}
						refe={(input)=> this.phoneInput=input}
						onSubmitEditing={()=>this.passwordInput.focus()}
					/>

					<Input 
						value={this.state.email}
						onChangeText={ email => this.setState({email}) }
						placeholder={'Correo'}
						returnKeyType={'go'}
						refe={(input)=> this.passwordInput=input}
						onSubmitEditing={()=>this.passwordInput.focus()}
					/>
		

					<View style={ styles.buttonContent }>
						<Button
							whenPress= {() => this._register() }
							myStyles={styles.login}
						>
							Registrarse
						</Button>
					</View>

					<View style={{alignSelf:'center', marginTop:30}}>
						<TouchableOpacity
							onPress={()=>{
								this.props.navigation.navigate('Login',{
									splash: false
								})
							}}
						>
							<Text style={{color: 'rgba(241,78,59,0.7)'}}>¿Ya tienes una cuenta? Inicia sesión</Text>
						</TouchableOpacity>
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

export default withNavigation(RegisterForm);