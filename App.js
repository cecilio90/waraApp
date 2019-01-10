import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Register from './src/screens/Register';

export default class App extends React.Component{
  render(){
    return(
      <AppSwitchNavigator />
    );
  }
};

const AppSwitchNavigator = new createSwitchNavigator({
  Login: Login,
  Home: Home,
  Register: Register,
  
  
}); 