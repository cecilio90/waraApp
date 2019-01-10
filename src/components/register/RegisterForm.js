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

	componentWillMount(){
		
	}

	_register(){
		console.log(`DNI: ${this.state.dni}`);
		console.log(`Nombre: ${this.state.name}`);
		console.log(`Teléfono: ${this.state.phone}`);
		console.log(`Correo: ${this.state.email}`);
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
						onSubmitEditing={()=>this.passwordInput.focus()}
					/>
		
					<Input 
						value={this.state.name}
						onChangeText={ name => this.setState({name}) }
						placeholder={'Nombre Completo'}
						returnKeyType={'go'}
						onSubmitEditing={()=>this.passwordInput.focus()}
					/>

					<Input 
						value={this.state.phone}
						onChangeText={ phone => this.setState({phone}) }
						placeholder={'Teléfono'}
						returnKeyType={'go'}
						onSubmitEditing={()=>this.passwordInput.focus()}
					/>

					<Input 
						value={this.state.email}
						onChangeText={ email => this.setState({email}) }
						placeholder={'Correo'}
						returnKeyType={'go'}
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
								this.props.navigation.navigate('Login ')
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