import React, { Component } from 'react';
import { View, ImageBackground, Dimensions, FlatList, Text, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import ListItem from './components/ListItem';
import { Header, Spinner } from '../commons/';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

class ListLessons extends Component{    

    state = {
        lessons: '',
        loadin: false
    }
    
    static navigationOptions = {
        header: null,
    };

    componentWillMount(){
        this._getLessons()
    };

    _getLessons = async () => {
        this.setState({loading: true});
        try {
            let token = await AsyncStorage.getItem('@MySuperStore:accessToken');
            fetch('http://iqserviciosinmobiliarios.com.mx/api/lessons', { 
                method: 'GET', 
                headers: new Headers({
                    'Authorization': 'Bearer '+ token, 
                    'Content-Type': 'application/x-www-form-urlencoded'
                }), 
            })
                .then(response => response.json())
                .then(resp => {
                    console.log(resp)
                    this.setState({ lessons: resp, loading: false })
                })
            .catch((error) => {
                console.log(error);
            });
        } catch (error) {
            this.setState({loading: false});
            console.log(error)
        }
    }
    
    _keyExtractor = (item, index) => index.toString();

	_renderLessons = ({item}) => {
		return( 
			<ListItem whenPress={ () => {this.props.navigation.navigate('ListCoach',{lessonId: item.id} )}}>
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
                <Header 
                    menuPress = {() => this.props.navigation.openDrawer()}
                    icon="md-menu"
                >
                    Calificaciones
                </Header>
                {this.state.loading && <Spinner status={this.state.loading} />}
                <ImageBackground style={styles.image} source={require('../../assets/imgs/home.png')}>
                    <FlatList
                        data={this.state.lessons}
                        keyExtractor={this._keyExtractor}
                        numColumns={1}
                        style={{flexDirection: 'column'}}
                        renderItem={this._renderLessons}
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
    },
    containerHeader: {
		backgroundColor: '#f14e3b',
		alignItems: 'center',
		flexDirection: 'row',
		height: 50,
		padding: 7,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 1},
		shadowOpacity: 1,
		elevation: 2,
		position: 'relative',
	},
	buttonBurger: {
		width: 40,
		height: 50, 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	title: {
		flex: 2, 
		height: 50, 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	textHeader: {
		fontSize: 25,
		color: 'white',
		marginRight: 10
	}
}

export default withNavigation(ListLessons);