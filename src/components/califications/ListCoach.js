import React, { Component } from 'react';
import { View, ImageBackground, Dimensions, Image, Text, FlatList, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import ListItem from './components/ListItem';
import { FontAwesome } from '@expo/vector-icons';
import { Spinner } from '../commons/';

const { width, height } = Dimensions.get('window');

class ListCoach extends Component{
    
    constructor(props) {
        super(props)
        this.state = {
            params: props.navigation.state.params,
            coaches: '',
            loading: false
        }
    }

    componentDidMount(){
        this._getCoaches();
    }

    _getCoaches = async () => {
        this.setState({loading: true});
        try {
            let token = await AsyncStorage.getItem('@MySuperStore:accessToken');
            fetch('http://iqserviciosinmobiliarios.com.mx/api/lessons/' + this.state.params.lessonId, { 
                method: 'GET', 
                headers: new Headers({
                    'Authorization': 'Bearer '+ token, 
                    'Content-Type': 'application/x-www-form-urlencoded'
                }), 
            })
                .then(response => response.json())
                .then(resp => {
                    this.setState({ coaches: resp.data, loading: false })
                })
            .catch((error) => {
                console.log(error);
            });
        } catch (error) {
            this.setState({loading: false});
            console.log(error)
        }
    }
    
    static navigationOptions = ({ navigation }) => ({
        title: 'Entrenadores',
        headerStyle: {
            height: 50,
            backgroundColor: '#f14e3b'
        },
        headerTitleStyle: { 
            color: '#fff',
            textAlign: 'center',
            flex: 1
        },
        headerTintColor: '#fff'
    });

    _keyExtractor = (item, index) => index.toString();

	_renderCoaches = ({item}) => {
		return( 
			<ListItem whenPress={ () => {this.props.navigation.navigate('ShowCoach', { 
                coachId: item.id,
                coachName: item.name,
                coachImage: item.image,
                lessonName: item.lessonName
            })}}>
                <View style={styles.imgContainer}>
                    <Image style={styles.imageCoach} source={{ uri: item.image }}/>
                </View>
                <View style={styles.coachContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <FontAwesome style={styles.arrow} name="angle-right" size={20} color="#000"/>            
                </View>
            </ListItem>
		);
	}

    render(){
        return(
            <View style={styles.container}>
            {this.state.loading && <Spinner status={this.state.loading} />}
                <ImageBackground style={styles.image} source={require('../../assets/imgs/home.png')}>
                    <FlatList
                        data={this.state.coaches}
                        keyExtractor={this._keyExtractor}
                        numColumns={1}
                        style={{flexDirection: 'column'}}
                        renderItem={this._renderCoaches}
                    >
                    </FlatList>
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
    },
    imgContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageCoach: {
        height: 50,
        width: 50,
        borderRadius: 50
    },
    coachContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    name:{
        fontSize: 20
    },
    arrow:{
        position: 'absolute',
        right: 8
    }
}

export default withNavigation(ListCoach);