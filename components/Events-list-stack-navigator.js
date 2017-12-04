import React from 'react'
import { View, Text, TextInput, Button, StatusBar, StyleSheet, Image, ActivityIndicator, ListView } from 'react-native'
import { StackNavigator } from 'react-navigation'

import EventsList from '../containers/Events-list'
import EventItem from './Event-item'

import style from '../styles/Style'

const navigationOptions = {
  headerStyle: style.header,
  headerTitleStyle: style.headerTitle
}

const EventListStackNavigator = StackNavigator({
                         Events: {
                           screen: EventsList,
                           navigationOptions
                         },
                         Result: {
                           screen: EventItem,
                           navigationOptions
                         },

                       })

export default EventListStackNavigator
