import React from 'react'
import { connect } from 'react-redux';
import { setCurrentEvent } from '../actions/firebase_event_handler';

import {  View, Text, StyleSheet, Image, Button, TouchableHighlight  } from 'react-native'
import { StackNavigator } from 'react-navigation'

import FadeInView from './animation/fadeInView'
import EventsList from '../containers/Events-list'
import EventItem from './Event-item'

import style from '../styles/eventsListItemStyle'

class EventListItem extends React.Component{

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  static navigationOptions = {
    title: 'Evenement',
  }

  viewEvent (eventInfos) {
    this.props.onSetCurrentEvent(eventInfos.event.id)
    this.props.navigation.navigate('Result', {event: eventInfos})
  }

  render () {
      return(
      <FadeInView delay={ this.props.index * 50}>
        <TouchableHighlight onPress={() => this.viewEvent(this.props)}> 
          <View style={[ style.flex,style.view, {backgroundColor: '#333'} ]} >
            <View style={ style.flex }>
              <Text style={ style.date }>{ this.props.event.date }</Text>
            </View>
            <Text style={ style.temp }>
              { this.props.event.title }
            </Text>
            <View style={ style.flex }>
              <Image source={{ uri: this.props.event.imageUrl }} style={ style.img } />
            </View>
          </View>
          </TouchableHighlight>
        </FadeInView>
      )
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
        onSetCurrentEvent: (id) => {dispatch(setCurrentEvent(id))},
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(EventListItem);
