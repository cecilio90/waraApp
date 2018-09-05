import React from 'react';
import { View, Dimensions, Image, Text, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class ShowNew extends React.Component{

    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            height: 50,
            backgroundColor: '#f14e3b'
        },
        headerTintColor: '#fff'
    });

    render(){
        const { navigation } = this.props;
        const newsTitle = navigation.getParam('newsTitle', 'NO-TITLE');
        const newsImage = navigation.getParam('newsImage', 'NO-ID');
        const newsInfo = navigation.getParam('newsInfo', 'NO-IMAGE');
        return(
            <View style={styles.container} >
                <View style={styles.newsContent}>
                    <Text style={styles.titleNews} >{newsTitle}</Text>
                    <ScrollView style={styles.scrollNews} >
                        <View style={{ height: 200, width: width - 10 }}>
                            <Image 
                                style={styles.newsImage} 
                                source={{uri: newsImage}}
                                resizeMode="stretch" 
                            />
                        </View>
                        <View style={styles.contentInfo} >
                            <Text style={styles.info}>
                                {newsInfo}
                            </Text>
                        </View>
                    </ScrollView>
                    </View>
            </View>
        );
    }
}

const styles= {
    container:{
        flex: 1,
    },
    newsContent:{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 10,
        flex: 1
    },
    newsImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: width - 10,
        height: height,
    },
    titleNews:{
        fontWeight: 'bold',
        fontSize: 25,
        marginVertical: 10,
        textAlign: 'center'
    },
    scrollNews: {
        flex: 1,
        width: width,
        paddingHorizontal: 10
    },
    contentInfo: {
        marginRight: 8,
        marginVertical: 10,
        paddingVertical: 5
    },
    info: {
        fontSize: 17,
        lineHeight: 20,
        textAlign: 'justify'
    }
}