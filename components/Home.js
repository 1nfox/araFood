import React from 'react'
import style from '../styles/Style'
import { View, TextInput, Image, Button, Keyboard } from 'react-native'
import { StackNavigator } from 'react-navigation'



export default class Home extends React.Component {

  static navigationOptions = {
    title: 'Recherche une ville',
    tabBarIcon: () => {
      return <Image source={require('./icons/home.png')} style={{ width: 20, height: 20 }} />
    }
  }

  constructor (props) {
    super(props)

  }


  render () {
    return (
      <View style={ style.container }>
        <TextInput 
          underlineColorAndroid='transparent'
          style={ style.input }
          value=""
        />
        <Button color={ style.color } onPress={() => this.submit()} title="Rechercher" />
      </View>
    )
  }

}
