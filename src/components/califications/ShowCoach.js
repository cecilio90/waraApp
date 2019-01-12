import React, { Component } from 'react';
import { View, ImageBackground, Dimensions, Platform, AsyncStorage } from 'react-native';
import { withNavigation, SafeAreaView } from 'react-navigation';
import HeaderCoach from './components/HeaderCoach';
import Calification from './components/Calification';
import ListComments from './components/ListComments';

if (Platform.OS === 'android') {
    SafeAreaView.setStatusBarHeight(0);
}

const { width, height } = Dimensions.get('window');

class ShowCoach extends Component{

    constructor(props){
        super(props);
        this.state = {
            score: ''
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('coachName', 'NO-NAME'),
        headerStyle: {
            height: 50,
            backgroundColor: '#f14e3b'
        },
        headerTitleStyle: { 
            color: '#fff'
        },
        headerTintColor: '#fff'
    });

    componentWillMount(){
        this._getComments();
    }

    _getComments = async () => {
        this.setState({loading: true});
        try {
            let token = await AsyncStorage.getItem('@MySuperStore:accessToken');
            fetch('http://iqserviciosinmobiliarios.com.mx/api/comments/' + this.props.navigation.getParam('coachId', 'NO-ID'), { 
                method: 'GET', 
                headers: new Headers({
                    'Authorization': 'Bearer '+ token, 
                    'Content-Type': 'application/x-www-form-urlencoded'
                }), 
            })
                .then(response => response.json())
                .then(resp => {
                    this.setState({ 
                        score: resp.score,
                    });
                })
            .catch((error) => {
                console.log(error);
            });
        } catch (error) {
            this.setState({loading: false});
            console.log(error)
        }
    }

    render(){
        const { navigation } = this.props;
        const coachId = navigation.getParam('coachId', 'NO-ID');
        const lessonName = navigation.getParam('lessonName', 'NO-ID');
        const coachImage = navigation.getParam('coachImage', 'NO-IMAGE');
        return(
            <View style={styles.container}>
                <ImageBackground style={styles.image} source={require('../../assets/imgs/home.png')}>
                    <View style={{flex:1}}>
                        <HeaderCoach score={this.state.score} lessonName={lessonName} coachImage={coachImage}/>
                        <Calification coachId={coachId} />
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },
    image: {
		width: width,
		height: height
    }
}

export default withNavigation(ShowCoach);