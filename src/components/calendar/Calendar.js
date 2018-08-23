import React from 'react';
import { View } from 'react-native';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';

export default class Calendar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let datesWhitelist = [{
            start: moment(),
            end: moment().add(14, 'days')  // total 4 days enabled
        }];
        return(
            <View>
                <CalendarStrip
                    calendarAnimation={{type: 'sequence', duration: 30}}
                    daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
                    style={{height: 100, paddingTop: 20, paddingBottom: 10}}
                    calendarHeaderStyle={{color: '#000'}}
                    calendarColor={'#FFF'}
                    dateNumberStyle={{color: '#000'}}
                    dateNameStyle={{color: '#000'}}
                    highlightDateNumberStyle={{color: '#f14e3b'}}
                    highlightDateNameStyle={{color: '#f14e3b'}}
                    disabledDateNameStyle={{color: 'grey'}}
                    disabledDateNumberStyle={{color: 'grey'}}
                    datesWhitelist={datesWhitelist}
                    iconContainer={{flex: 0.1}}
                    onDateSelected={this.props.onDateSelected}
                />
            </View>
        );
    }
} 