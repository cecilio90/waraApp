import React from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import {Header} from './index';

export default class Menu extends React.Component{

    _getCurrentScreen(){
        if (this.props.activeItemKey == 'Lessons') {
            this.props.navigation.navigate('Lessons');
            this.props.navigation.closeDrawer();
        }else{
            this.props.navigation.navigate('Lessons');
        }
    }

    _logout = async () => {
		try {
            await AsyncStorage.removeItem('@MySuperStore:accessToken');
            this.props.navigation.navigate('Login');
		} catch (error) {
			console.log(error);
		}
	}

    render(){
        return(
            <View style={{flex:1}}>
                <Header 
                    whenPress = {() => this.props.navigation.closeDrawer()}
                >
                    Menú
                </Header>
                <View style={styles.contentMenu}>
                    <TouchableOpacity style={styles.btnMenu} onPress={() => this._getCurrentScreen() }>
                        <Text style={styles.opcMenu}>Clases</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnMenu} onPress={() => this.props.navigation.navigate('Califications')}>
                        <Text style={styles.opcMenu}>Calificaciones</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnMenu} onPress={() => this._logout()}>
                        <Text style={styles.opcMenu}>Salir</Text>
                    </TouchableOpacity>
                </View>
            </View>            
        );
    }
}

const styles = {
    btnMenu:{
        backgroundColor: 'transparent',
        height: 40,
        paddingVertical: 10,
        width: 200
    },
    opcMenu:{
        color: '#000',
        fontSize: 17,
        fontWeight: 'bold'
    },
    contentMenu: {
        flex:1, 
        alignItems:'center'
    }
}
