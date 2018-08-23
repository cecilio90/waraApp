import React from 'react';
import { View, Platform } from 'react-native';
import { createStackNavigator, SafeAreaView, withNavigation } from 'react-navigation';
import MainViewCalendar from '../components/calendar/MainViewCalendar';
import ShowLesson from '../components/lesson/ShowLesson';
import Home from './Home';

if (Platform.OS === 'android') {
    SafeAreaView.setStatusBarHeight(0);
}

class Lessons extends React.Component{

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
    Home: {
        screen: Home,
    },
    MainViewCalendar: { 
        screen: MainViewCalendar,
        navigationOptions: {
            header: null
        }
    },
    ShowLesson: {
        screen: ShowLesson,
    }
},
{
    initialRouteName: 'MainViewCalendar',
});

export default withNavigation(Lessons);