import React from 'react'

import { View, Text, StatusBar, StyleSheet, Image, ActivityIndicator, ListView } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'

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


class Home extends React.Component {


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

  

  render() {
    /*for(var key in this.state.eventsList){
      console.log(key)
    }*/
    if(this.state.loading){
      return <View><ActivityIndicator color={style.color} size="large" style={{ flex: 1 }}/></View>
    } else {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      return (
        <ListView 
          dataSource={ds.cloneWithRows(this.state.eventsList) } 
          renderRow={(row, j, k) => <EventsRow event={row} key={ j } index={parseInt(k, 10)}/>}
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
  Home: {
    screen: Home,
    navigationOptions
  },
  Result: {
    screen: Event,
    navigationOptions
  },
  
  
});