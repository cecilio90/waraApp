import React from 'react';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

const { width } = Dimensions.get('window');

const LessonItem = ({ whenPress, name, hour, coach }) => {
    return(
        <TouchableOpacity 
            style={styles.itemContainer}
            onPress = {whenPress}
        >
            <View style={styles.hour}>
                <Text style={styles.time}>{hour}</Text>
            </View>
            <View style={styles.dataLesson}>
                <Text style={styles.nameClass}>{name}</Text>
                <Text style={styles.nameCoach}>{coach}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = {
    itemContainer: {
        height: 50,
        width: width,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    hour: {
        width: 80,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dataLesson: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'space-around',
        paddingLeft: 12
    },
    time: {
        color: 'white'
    },
    nameClass: {
        color: 'white',
        fontSize: 22,
    },
    nameCoach: {
        color: 'white',
        fontSize: 12,
    }
}

export default withNavigation(LessonItem);