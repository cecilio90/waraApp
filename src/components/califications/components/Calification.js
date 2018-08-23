import React from 'react';
import { View, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import StarRating from 'react-native-star-rating';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation, StackActions, NavigationActions } from 'react-navigation';

class Calification extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            starCount: 3,
            comment: '',
            currentPosition: 0,
            disabled: true,
        };
    }
    
    onStarRatingPress(rating) {
        // console.warn(rating);
        this.setState({
            starCount: rating
        });
    }

    _inputComment(comment){
        this.setState({comment});

        if (this.state.comment.length >= 2) {
            this.setState({disabled: false});            
        }
    }

    _sendCalification= async () => {
        try {
            let token = await AsyncStorage.getItem('@MySuperStore:accessToken');
            fetch('http://iqserviciosinmobiliarios.com.mx/api/califications', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment: this.state.comment,
                    calification: this.state.starCount,
                    coachId: this.props.coachId,
                    token: token
                }),
            }).then((response) => response.json())
                .then(resp => {
                    console.log(resp);
                    if (resp.status == 'success') {
                        this.textInput.clear()
                        Alert.alert(
                            '¡Muchas gracias!',
                            'Su calificación ha sido enviado con éxito',
                            [
                                {text: 'Ok', onPress: () => this.props.navigation.navigate('Lessons') },
                            ],
                            { cancelable: false }
                        )
                    }
                })
            .catch((error) => {
                console.warn(error);
            });
        } catch (error) {
            // this.setState({loading: false});
            console.log(error)
        }
    }

    render(){
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'ListLessons' })],
        });
        return(
            <View style={styles.containerCalification}>
                <View style={styles.contentComment}>
                    <TextInput 
                        ref={input => { this.textInput = input }}
                        value={this.state.comment}
                        onChangeText={ comment => this.setState({comment}) }
                        placeholder={'Escribe tu comentario'}
                        placeholderTextColor='white'
                        onChangeText={ comment => this._inputComment(comment) }
                        style={styles.inputComment}
                    />
                    <TouchableOpacity 
                        style={styles.buttonSend}
                        onPress={()=> this._sendCalification() }
                        disabled={this.state.disabled}
                    >
                        <Ionicons style={styles.send} name="md-paper-plane" size={25} color="#fff"/> 
                    </TouchableOpacity>
                </View>
                <View style={styles.startsRating}>
                    <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={this.state.starCount}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                    starSize={25}
                    fullStarColor={'yellow'}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    containerCalification: {
        flex: 1,
    },
    startsRating:{
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomColor: 'rgba(0,0,0,0.3)',
        borderBottomWidth: 1,
        elevation: 1,
        backgroundColor: 'rgba(255,255,255,0.7)'
    },
    contentComment: {
        flexDirection: 'row',
        padding: 8
    },
    inputComment:{
        flex: 1,
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 5,
        paddingLeft: 5,
        color: 'white'
    },
    buttonSend:{
        width: 40,
        backgroundColor: '#f14e3b',
        borderRadius: 5,
        marginLeft: 3,
        justifyContent: 'center'
    },
    send:{
        alignSelf: 'center',
    }
}

export default withNavigation(Calification);