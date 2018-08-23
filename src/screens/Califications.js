import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { createStackNavigator, SafeAreaView } from 'react-navigation';
import ListLessons from '../components/califications/ListLessons';
import ListCoach from '../components/califications/ListCoach';
import ShowCoach from '../components/califications/ShowCoach';

if (Platform.OS === 'android') {
    SafeAreaView.setStatusBarHeight(0);
}

export default class Lessons extends Component{

    render(){
        return(
            <View style={styles.container}>
                <LessonStackNavigator />
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },
}

const LessonStackNavigator = new createStackNavigator({
    ListLessons: { 
        screen: ListLessons,
        navigationOptions: {
            header: null
        }
    },
    ListCoach: {
        screen: ListCoach,
    },
    ShowCoach: {
        screen: ShowCoach,
    }
},
{
    initialRouteName: 'ListLessons',
});