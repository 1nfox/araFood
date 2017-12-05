import React from 'react'
import { View, Text, TextInput, Button, StatusBar, StyleSheet, Image, ActivityIndicator, FlatList } from 'react-native'
import moment from 'moment'

import { connect } from 'react-redux';
import { getEvents, watchEventAdded } from '../actions/firebase_event_handler';

import style from '../styles/Style'
import EventsListItem from '../components/Events-list-item'
import EventItem from '../components/Event-item'


class EventsList extends React.Component {

  static navigationOptions = {
    title: 'Evénements à venir',
    tabBarIcon: () => {
      return <Image source={require('../components/icons/home.png')} style={{ width: 20, height: 20 }} />
    }
  }

  componentWillMount () {
    this.props.onGetEvent();
  }

  render () {
    let eventsList = this.props.events;
    const today = moment()
    if(eventsList !== null && eventsList !== undefined) {
        eventsList = eventsList.filter((e) => {
                return moment(e.date).isAfter(today)
              }).sort( (a, b) =>  moment(a.date) - moment(b.date))
    }

    if(this.props.loading){
      return <View style={{ flex: 1 }}><ActivityIndicator color={style.color} size="large" style={{ flex: 1 }}/></View>
    } else {
      return (
        <FlatList
            data={eventsList}
            renderItem={({ item }) => (
              <EventsListItem
                navigation={this.props.navigation}
                event={item}
                keyExtractor={item => item.key}
              />
            )}
        />
      )
    }
  }

}

const mapStateToProps = (state) => {
    return {
        events: state.events.events,
        loading: state.events.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    //watchEventAdded(dispatch)
    return {
        onGetEvent: () => dispatch(getEvents()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);