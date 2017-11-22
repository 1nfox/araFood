import React from 'react'

import { View, Text, StatusBar, StyleSheet, Image, ActivityIndicator, ListView } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'

import style from '../styles/Style'
import EventsRow from './EventsRow'

import * as firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyAl88Ba1yzhJjQ9AgA-Yzlo9V58vKWVAi4",
  authDomain: "ara-food.firebaseapp.com",
  databaseURL: "https://ara-food.firebaseio.com",
  storageBucket: "gs://ara-food.appspot.com",
};

export default class Events extends React.Component {


  constructor (props) {
    super(props)
    this.state = {
      loading: true
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


  render() {
    if(this.state.loading){
      return <ActivityIndicator color={style.color} size="large" style={{ flex: 1 }}/>
    } else {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      return (
        <ListView 
          dataSource={ds.cloneWithRows(this.state.eventsList) } 
          renderRow={(row, j, k) => <EventsRow event={row} index={parseInt(k, 10)}/>}
        />
      )
    }
  }

}


/*
const events = Object.keys(this.state.eventsList).map((key, i) => {
  console.log(key)
  return (
    <View key={key}>
      <Text>
        { this.state.eventsList[key].title }
      </Text>
      <Image source={{ uri: this.state.eventsList[key].imageUrl }} style={{ width: 200, height: 200 }} />
    </View>
  )
})
return (
  <View>
  { events }
  </View>
);
*/