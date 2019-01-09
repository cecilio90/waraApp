import React from 'react';
import { View, Dimensions, ImageBackground, Text, FlatList, AsyncStorage } from 'react-native';
import { Header, Spinner } from '../commons';
import Calendar from './Calendar';
import moment from 'moment';
import { withNavigation, DrawerActions } from 'react-navigation';
import LessonItem from './LessonItem';

moment.updateLocale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Ene._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
});

const { width, height } = Dimensions.get('window');

class MainViewCalendar extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            status:false,
            schedules: '',
            loading: false,
            dia: '',
            month: ''
        }
    }

    toggleStatus(){
        this.setState({
            status:!this.state.status
        });
        this._getToken;
    }

    componentWillMount(){
        this._getCurrentSchedule();
    }

    _getCurrentSchedule = async () => {
        this.setState({
            loading: true,
            dia: moment().format("dddd"),
            month: moment().format("MMMM D")
        });

        try {
            let token = await AsyncStorage.getItem('@MySuperStore:accessToken');
            fetch('http://iqserviciosinmobiliarios.com.mx/api/schedules', { 
                method: 'GET', 
                headers: new Headers({
                    'Authorization': 'Bearer '+ token, 
                    'Content-Type': 'application/x-www-form-urlencoded'
                }), 
            })
                .then(response => response.json())
                .then(resp => {
                    this.setState({
                        schedules: resp, 
                        loading: false,
                    })
                }
            )
            .catch(err => {
                this.setState({loading: false});
                console.log(err);
            });           
        } catch (error) {
            this.setState({
                loading: false,
            })
            console.log(error)
        }
    }

    _getSchedule = async (date) =>{
        const day = moment(date).format("dd");
        this.setState({
            loading: true,
            dia: moment(date).format("dddd"),
            month: moment(date).format("MMMM D"),
            status: false
        });
        try {
            let token = await AsyncStorage.getItem('@MySuperStore:accessToken');
            fetch('http://iqserviciosinmobiliarios.com.mx/api/schedules', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    day: day,
                }),
            }).then((response) => response.json())
                .then((resp) => {
                    this.setState({
                        schedules: resp,
                        loading: false,                    
                    })
                })
            .catch((error) => {
                this.setState({loading: false});
                console.warn(error);
            });
        } catch (error) {
            console.log(error)
        }
    }

    _keyExtractor = (item, index) => index.toString();

	_renderSchedule = ({item}) => {
		return( 
            <LessonItem 
                whenPress = {() => this.props.navigation.navigate('ShowLesson',{
                    itemName: item.name,
                    coachName: item.coach_name,
                    itemHour: moment(item.start_date, moment.HTML5_FMT.TIME_SECONDS).format("h:mm A"),
                    itemImage: item.image,
                    itemDescription: item.description,
                    coachDescription: item.coach_description,
                }) }
                name = {item.name}
                hour = {moment(item.start_date, moment.HTML5_FMT.TIME_SECONDS).format("h:mm A")}
                coach = {item.coach_name}
            />
		);
	}

    render(){
        return(
            <View style={styles.container}>
                <Header 
                    menuPress = {() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                    calendarPress = { () => this.toggleStatus() }
                    icon="md-menu"
                    iconCalendar="md-calendar"
                >
                    Clases
                </Header>
                <ImageBackground style={styles.image} source={require('../../assets/imgs/home.png')}>
                    { this.state.status && 
                        <Calendar
                            onDateSelected = {(date) => this._getSchedule(date)}
                        />
                    }
                    {this.state.loading && <Spinner status={this.state.loading} />}
                    <View style={styles.containerLesson}>
                        <View style={styles.barDay}>
                            <Text style={{ color: 'white' }}>{this.state.dia} / {this.state.month}</Text>
                        </View>
                        <FlatList
                            data={this.state.schedules}
                            keyExtractor={this._keyExtractor}
                            numColumns={1}
                            style={{flexDirection: 'column'}}
                            renderItem={this._renderSchedule}
                        >
                        </FlatList>
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
    },
    containerLesson: {
        flex: 1,
        paddingTop: 2
    },
    barDay:{
        height: 25,
        width: width,
        backgroundColor: '#7a7a7a',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

export default withNavigation(MainViewCalendar);