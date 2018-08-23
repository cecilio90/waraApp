import React from 'react';
import { View, FlatList, Text, AsyncStorage } from 'react-native';

export default class ListComments extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            dataComments: '',
            loading: false
        };
    }

    componentWillMount(){
        this._getComments();
    }

    _getComments = async () => {
        this.setState({loading: true});
        try {
            let token = await AsyncStorage.getItem('@MySuperStore:accessToken');
            fetch('http://iqserviciosinmobiliarios.com.mx/api/comments/' + this.props.entrenadorId, { 
                method: 'GET', 
                headers: new Headers({
                    'Authorization': 'Bearer '+ token, 
                    'Content-Type': 'application/x-www-form-urlencoded'
                }), 
            })
                .then(response => response.json())
                .then(resp => {
                    this.setState({ 
                        dataComments: resp.comments,
                        loading: false
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

    _keyExtractor = (item, index) => index.toString();

	_renderComments = ({item}) => {
		return( 
            <View style={styles.commentContent}>
                <View style={styles.comment}>
                    <Text style={styles.infoText}>{item.comment}</Text>
                </View>
                <View style={styles.infoContent}>
                    <Text style={styles.infoText}>{item.name}</Text>
                </View>
            </View>
		);
	}

    render(){
        return(
            <View style={styles.containerComments}>
                <FlatList
                    data={this.state.dataComments}
                    keyExtractor={this._keyExtractor}
                    numColumns={1}
                    style={{flexDirection: 'column'}}
                    renderItem={this._renderComments}
                >
                </FlatList>
            </View>
        );
    }
}

const styles = {
    containerComments: {
        flex: 2,
        paddingHorizontal: 15,
    },
    commentContent: {
        height: 'auto',
        borderRadius: 5,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'space-between',
        padding: 5,
        alignSelf: 'flex-start',
        marginBottom: 10
    },
    infoContent: {
        alignSelf: 'flex-end',
        marginTop: 4
    },
    infoText: {
        color: '#fff'
    }
}