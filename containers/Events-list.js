import React from 'react'
import { View, Text, TextInput, Button, StatusBar, StyleSheet, Image, ActivityIndicator, ListView } from 'react-native'

import { connect } from 'react-redux';
import { getEvents } from '../actions/firebase_event_handler';

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
    const eventsList = this.props.events;
    if(this.props.loading){
      return <View style={{ flex: 1 }}><ActivityIndicator color={style.color} size="large" style={{ flex: 1 }}/></View>
    } else {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      return (
        <ListView 
          dataSource={ds.cloneWithRows(eventsList) }
          renderRow={(row, j, k) => <EventsListItem navigation={this.props.navigation} event={row} index={k}/> }
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
    return {
        onGetEvent: () => dispatch(getEvents()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);