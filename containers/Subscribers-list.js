import React from 'react'
import { View, Text, TextInput, Button, StatusBar, StyleSheet, Image, ActivityIndicator, FlatList } from 'react-native'

import { connect } from 'react-redux';
import { getSubscribers } from '../actions/firebase_event_handler';

import style from '../styles/Style'
import SubscribersItem from '../components/Subscribers-item'


class SubscribersList extends React.Component {

  static navigationOptions = {
    title: 'Evénements à venir',
    tabBarIcon: () => {
      return <Image source={require('../components/icons/home.png')} style={{ width: 20, height: 20 }} />
    }
  }

  /*componentWillMount () {
    this.props.onGetSubscribers();
  }*/
  watchSubscriberAdded(dispatch) {
      //dispatch({ type: EVENT_REQUEST_START });
      firebase.database().ref('/events').on('child_added', (snap) => {
          let newEvent = snap.val()
          const newEventKey = snap.key
          firebase.database().ref('/events/'+snap.key).on('child_added', data => {
              if(data.key ==='subscribers') {
                      newEvent = {...newEvent, subscribers: data.val(), id: newEventKey}
                      dispatch({ type: EVENT_ADDED, payload: newEvent });
              }
          })
      })
      //dispatch({ type: EVENT_REQUEST_END })
  }

  watchSubscriberRemoved(dispatch) {
      dispatch({ type: EVENT_REQUEST_START });
      firebase.database().ref('/events').on('child_removed', (snap) => {
          dispatch({ type: EVENT_REMOVED, payload: snap.key });
      })
  }

  render () {
    let subscribersList = this.props.subscribers;

    if(this.props.loading){
      return <View style={{ flex: 1 }}><ActivityIndicator color={style.color} size="large" style={{ flex: 1 }}/></View>
    } else {
      return (
        <FlatList
            data={subscribersList}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => (
              <SubscribersItem
                subscriber={item}
              />
            )}
        />
      )
    }
  }

}

const mapStateToProps = (state) => {
    return {
        subscribers: state.events.current_event.subscribers,
        loading: state.events.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    //watchSubscriberAdded(dispatch)
    //watchSubscriberRemoved(dispatch)
    return {
        onGetSubscribers: () => dispatch(getSubscribers()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SubscribersList);