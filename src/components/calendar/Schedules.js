import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import LessonItem from './LessonItem';
import { withNavigation } from 'react-navigation';

const { width } = Dimensions.get('window');

class Schedules extends React.Component{

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.barDay}>
                    <Text style={{ color: 'white' }}>Jueves / Julio 28</Text>
                </View>
                <LessonItem />
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        paddingTop: 2
    },
    barDay:{
        height: 25,
        width: width,
        backgroundColor: '#7a7a7a',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

export default withNavigation(Schedules);