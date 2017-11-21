import React from 'react'
import Profil from './components/Profil'
import Home from './components/Home'

import { View, StatusBar, StyleSheet } from 'react-native'
import { TabNavigator } from 'react-navigation'

import style from './styles/Style'


const Tabs = TabNavigator({
  Home: { screen: Home },
  Profil: { screen: Profil }
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    indicatorStyle: {
      height: 2,
      backgroundColor: '#FFFFFF'
    },
    style: {
      backgroundColor: "#c0392b",
      borderTopWidth: 1,
      borderColor: "#3f101c"
    }
  },
})


import * as firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyAl88Ba1yzhJjQ9AgA-Yzlo9V58vKWVAi4",
  authDomain: "ara-food.firebaseapp.com",
  databaseURL: "https://ara-food.firebaseio.com",
  storageBucket: "gs://ara-food.appspot.com",
};

const firebaseApp = firebase.initializeApp(firebaseConfig)


export default class App extends React.Component {

  render() {
    return (
      <View style={ style.container }>
        <StatusBar hidden={false} />
        <Tabs />
      </View>
    );
  }
}


