import React, { Component } from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import MainViewCalendar from '../components/calendar/MainViewCalendar';
import ShowLesson from '../components/lesson/ShowLesson';
import ListLessons from '../components/califications/ListLessons';
import ListCoach from '../components/califications/ListCoach';
import ShowCoach from '../components/califications/ShowCoach';
import Menu from '../components/commons/Menu';

const LessonStackNavigator = new createStackNavigator({
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

LessonStackNavigator.navigationOptions = ({ navigation }) => {
    let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }

  return {
    drawerLockMode,
  };
};

const CalificationStackNavigator = new createStackNavigator({
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

CalificationStackNavigator.navigationOptions = ({ navigation }) => {
    let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }

  return {
    drawerLockMode,
  };
};

export default AppDrawerNavigator = new createDrawerNavigator({
    Lessons: { 
        screen: LessonStackNavigator
    },
    Califications: {
        screen: CalificationStackNavigator
    }  
},
{
    contentComponent:(props) => (
        <Menu {...props}/>
    ),
})