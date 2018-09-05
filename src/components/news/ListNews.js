import React from 'react';
import { View, Image, Dimensions, Text, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import { Header, Spinner } from '../commons';
import { withNavigation, DrawerActions } from 'react-navigation';

const { width, height } = Dimensions.get('window');

export default class ListNews extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            news: '',
            loading: false
        }
    }

    componentWillMount(){
        this._getCurrentNews();
    }

    _getCurrentNews = async () => {
        this.setState({ loading: true });

        try {
            let token = await AsyncStorage.getItem('@MySuperStore:accessToken');
            let cred = await AsyncStorage.getItem('@MySuperStore:credentials');
            console.warn(cred)
            fetch('http://iqserviciosinmobiliarios.com.mx/api/news', { 
                method: 'GET', 
                headers: new Headers({
                    'Authorization': 'Bearer '+ token, 
                    'Content-Type': 'application/x-www-form-urlencoded'
                }), 
            })
                .then(response => response.json())
                .then(resp => {
                    this.setState({
                        news: resp.news, 
                        loading: false,
                    })
                }
            )
            .catch(err => {
                this.setState({loading: false});
                console.log(err + ' errooooooor');
            });           
        } catch (error) {
            this.setState({
                loading: false,
            })
            console.log(error)
        }
    }

    _keyExtractor = (item, index) => index.toString();

	_renderNews = ({item}) => {
		return( 
            <TouchableOpacity 
                style={styles.newsContent}
                onPress={() => this.props.navigation.navigate('ShowNew',{
                    newsImage: item.image,
                    newsTitle: item.title,
                    newsInfo: item.description
                })}
            >
                <View style={{ height: 200, width: width - 10 }}>
                    <Image 
                        style={styles.newsImage} 
                        source={{ uri: item.image }}
                        resizeMode="stretch" 
                    />
                </View>
                <Text style={styles.titleNews} >{item.title}</Text>
            </TouchableOpacity>
		);
	}

    render(){
        return(
            <View style={styles.container}>
                <Header 
                    menuPress = {() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                    icon="md-menu"
                >
                    Noticias
                </Header>
                {this.state.loading && <Spinner status={this.state.loading} />}
                <FlatList
                    data={this.state.news}
                    keyExtractor={this._keyExtractor}
                    numColumns={1}
                    style={{flexDirection: 'column'}}
                    renderItem={this._renderNews}
                >
                </FlatList>
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
        marginHorizontal: 10,
    },
    newsImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: width - 10,
        height: height,
    },
    titleNews:{
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10
    }
}