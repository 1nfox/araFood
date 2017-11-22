import React from 'react'
import style from '../styles/Style'
import Events from './Events'
import { View, Text, TextInput, Image, Button, Keyboard } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'

class Home extends React.Component {


  constructor (props) {
    super(props)
  }


  static navigationOptions = {
    title: 'Evénements à venir',
    tabBarIcon: () => {
      return <Image source={require('./icons/home.png')} style={{ width: 20, height: 20 }} />
    }
  }


  render () {
    return (
      <View>
        <Events />
      </View>
    )
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
  }

});

