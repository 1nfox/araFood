import React from 'react'

import { AppRegistry, View, Text, StyleSheet, Image, Dimensions, ListView, ScrollView, TouchableHighlight } from 'react-native'
import { TabNavigator } from 'react-navigation'

import { connect } from 'react-redux';
import { subscribe, unsubscribe } from '../actions/firebase_event_handler';


import style from '../styles/Style'
import styles from '../styles/loginStyle.js'
import SubscribersList from '../containers/Subscribers-list'



class EventItem extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return{
      title: `${navigation.state.params.event.event.title}`,
      tabBarIcon: () => {
        return <Image source={require('./icons/home.png')} style={{ width: 20, height: 20 }} />
      }
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      loading: true
    } 
  }

  onSubscribe(userId, eventId, comment) {
    this.props.subscribe(userId, eventId, comment)
  }

  onUnsubscribe(userId, eventId) {
    this.props.unsubscribe(userId, eventId)
  }

  render () {

    let event = this.props.event;
    let user = this.props.user;
    let subscribersCount = event.subscribers.length;
    let width = Dimensions.get('window').width; //full width
    let height = Dimensions.get('window').height; //full height
    let isSubscriber = event.subscribers.findIndex( sub => sub.id == user.id)
    let isSub = false
    let subComponent

    if(isSubscriber < 0) {
        subComponent = (<TouchableHighlight onPress={() => {this.onSubscribe(user.id, event.id, '')}} style={{ height: 'auto', padding: 10, marginTop: 2, marginLeft: 60}}>
                <Text>
                    Sub
                </Text>
        </TouchableHighlight>)
    }else {
        isSub = true
        subComponent = (<TouchableHighlight onPress={() => {this.onUnsubscribe(user.id, event.id)}} style={{ height: 'auto', padding: 10, marginTop: 2, marginLeft: 60}}>
                            <Text>
                                UnSub
                            </Text>
        </TouchableHighlight>)
    }


    return (
      <ScrollView>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignSelf: 'stretch' }}>
            
            <View style={{width: width, height: 300}} >
                <Image source={{ uri: event.imageUrl }} style={{ width: width, height: 300 }} />
                <Text style={{ position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: 'auto', padding: 10, fontSize:16, color: '#FFF', marginTop: 10, marginLeft: 10 }}>
                  {event.date.split(" ")[0].trim()}
                </Text>
                <Text style={{ position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.6)', height: 'auto', padding: 10, fontSize:16, marginTop: 10, right: 10, color: '#D92719' }}>
                  {event.date.split(" ")[1].trim()}
                </Text>
              </View>

              <View style={{width: width, height: 'auto',backgroundColor: '#333', flex: 1, flexDirection: 'row'}}>
                <Text style={{ height: 'auto', alignSelf:'center',fontSize:16,justifyContent:'center',alignItems:'center', color: '#FFF', marginTop: 10, marginBottom: 10, marginLeft: 60 }}>
                  Participants: { subscribersCount }
                </Text>
               {subComponent}
              </View>
            
              <View style={{width: width, height: 'auto',backgroundColor: '#333', flex: 1, flexDirection: 'row'}}>
                <Text style={{ height: 'auto', alignSelf:'center',fontSize:16,justifyContent:'center',alignItems:'center', color: '#FFF', marginTop: 10, marginBottom: 10, marginLeft: 20, padding: 10 }}>
                  {event.description}
                </Text>
              </View>

              

              <View style={{width: width, height: 'auto',backgroundColor: '#dedede'}} usersList={ this.state.usersList }>
                <SubscribersList />
              </View>

        </View>
      </ScrollView>
    )
  }
}


const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        event: state.events.current_event
    }
};

export default connect(mapStateToProps, {
  subscribe, unsubscribe
})(EventItem);


AppRegistry.registerComponent('EventItem', () => EventItem);
