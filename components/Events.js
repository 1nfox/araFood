import React from 'react'
import { View, Text, TextInput, Button, StatusBar, StyleSheet, Image, ActivityIndicator, ListView } from 'react-native'
import { StackNavigator } from 'react-navigation'


import style from '../styles/Style'
import EventsRow from './EventsRow'
import Event from './Event'


import * as firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyAl88Ba1yzhJjQ9AgA-Yzlo9V58vKWVAi4",
  authDomain: "ara-food.firebaseapp.com",
  databaseURL: "https://ara-food.firebaseio.com",
  storageBucket: "gs://ara-food.appspot.com",
};



class Events extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  static navigationOptions = {
    title: 'Evénements à venir',
    tabBarIcon: () => {
      return <Image source={require('./icons/home.png')} style={{ width: 20, height: 20 }} />
    }
  }


  componentWillMount () {
    const ref = firebase.database().ref('events')
    ref.on('value', snapshot => {
      this.setState({
        eventsList: snapshot.val(),
        loading: false
      })
    })
  }

  submit () {
    Keyboard.dismiss(),
    this.props.navigation.navigate('Result', {city: this.state.city})
  }

  render () {
    if(this.state.loading){
      return <View style={{ flex: 1 }}><ActivityIndicator color={style.color} size="large" style={{ flex: 1 }}/></View>
    } else {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      return (
        <ListView 
          dataSource={ds.cloneWithRows(this.state.eventsList) } 
          renderRow={(row, j, k) => <EventsRow navigation={this.props.navigation} event={row} index={k}/> }
        />
      )
    }
  }

}

const navigationOptions = {
  headerStyle: style.header,
  headerTitleStyle: style.headerTitle
}

export default StackNavigator({
  Events: {
    screen: Events,
    navigationOptions
  },
  Result: {
    screen: Event,
    navigationOptions
  },

});