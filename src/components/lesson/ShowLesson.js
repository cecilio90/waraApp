import React from 'react';
import { 
    View, 
    Text, 
    ImageBackground, 
    Dimensions, 
    Image,
    TouchableOpacity 
} from 'react-native';

import ModalCoach from './ModalCoach';

const { width, height } = Dimensions.get('window');

export default class ShowLesson extends React.Component{

    state = {
        visible: false
    }

    toggleModal = () => {
        this.setState({visible: !this.state.visible });
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Clase',
        headerStyle: {
            height: 50,
            backgroundColor: '#f14e3b'
        },
        headerTitleStyle: { 
            color: '#fff',
            textAlign:'center',
            marginRight: 10,
            flex:1 
        },
        headerTintColor: '#fff'
    });

    render(){
        const { navigation } = this.props;
        const itemName = navigation.getParam('itemName', 'NO-NAME');
        const itemHour = navigation.getParam('itemHour', 'NO-HOUR');
        const itemImage = navigation.getParam('itemImage', 'NO-IMAGE');
        const itemDescription = navigation.getParam('itemDescription', 'NO-DESCRIPTION');
        const coachName = navigation.getParam('coachName', 'NO-COACH-NAME');
        const itemCoachDescription = navigation.getParam('coachDescription', 'NO-COACH-NAME');
        return(
            <View style={styles.container}>
                <ImageBackground style={styles.image} source={require('../../assets/imgs/home.png')}>
                    <View style={styles.headerInformation}>
                        <TouchableOpacity onPress={() => this.toggleModal()} style={styles.imgCoach}>
                            <Image style={{width: 70, height: 70, borderRadius: 50}} source={{uri: itemImage}}/>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={{color: 'white'}}>{coachName}</Text>
                        </TouchableOpacity>
                        <ModalCoach
                            coach={coachName}
                            coachDescription={itemCoachDescription} 
                            visible={this.state.visible}
                            hideModal={() => this.toggleModal()}
                        />
                        <View style={styles.infoLesson}>
                            <Text style={{color: 'white', fontSize:20}}>{itemName}</Text>
                            <Text style={{color: 'white', fontSize:14}}>Jueves / Julio 28</Text>
                            <Text style={{color: 'white', fontSize:20}}>{itemHour}</Text>
                        </View>
                    </View>
                    <View style={styles.bodyInformation}>
                        <Text style={{color: 'white', fontSize: 16}}>Descripción</Text>
                        <Text style={{color: 'white', fontSize: 16, marginTop: 10}}>{itemDescription}</Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1
    },
    image: {
		width: width,
		height: height
    },
    headerInformation:{
        height: 100,
        width: width,
        flexDirection: 'row'
    },
    imgCoach: {
        width: 100,
        height: 100,
        backgroundColor: '#636363',
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoLesson: {
        width: width,
        height: 100,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'space-around',
        paddingLeft: 10,
    },
    bodyInformation: {
        height: height,
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 10 
    }
}