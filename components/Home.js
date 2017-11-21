import React from 'react'
import style from '../styles/Style'
import { View, Text, TextInput, Image, Button, Keyboard } from 'react-native'
import { StackNavigator } from 'react-navigation'



class Home extends React.Component {

  static navigationOptions = {
    title: 'Recherche une ville',
    tabBarIcon: () => {
      return <Image source={require('./icons/home.png')} style={{ width: 20, height: 20 }} />
    }
  }


  render () {
    const { navigate } = this.props.navigation;
    return (
      <View style={ style.container }>
        <Text>Salut cest cool</Text>
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

