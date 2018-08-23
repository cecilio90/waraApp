import React from 'react';
import { View, Text, Image } from 'react-native';
import StarRating from 'react-native-star-rating';

const HeaderCoach = ({ lessonName, score, coachImage }) => {
    return(
        <View style={styles.headerContainer}>
            <View style={styles.imageContent}>
                <Image style={styles.imageCoach} source={{ uri: coachImage }}/>
            </View>
            <View style={styles.dataCoach}>
                <Text style={styles.nameLesson}>{lessonName}</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={parseFloat(score)}
                    starSize={14}
                    fullStarColor={'yellow'}
                />
                <Text>{score}</Text>
            </View>
        </View>
    );
}

const styles = {
    headerContainer: {
        flexDirection: 'row',
        borderBottomColor: 'rgba(0,0,0,0.3)',
        borderBottomWidth: 1,
        elevation: 1,
    },
    imageContent:{
        height: 60,
        justifyContent: 'center',
        padding: 10
    },
    imageCoach: {
        height: 50,
        width: 50,
        borderRadius: 50
    },
    dataCoach: {
        justifyContent: 'space-around'
    },
    nameLesson:{
        fontSize: 17
    }
}

export default HeaderCoach;