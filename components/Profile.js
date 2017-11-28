import React from 'react'
import style from '../styles/Style'
import { View, Text, StyleSheet, ActivityIndicator, Image, Button } from 'react-native'



export default class Profil extends React.Component {

  static navigationOptions = {
    tabBarIcon: () => {
      return <Image source={require('./icons/user.png')} style={{ width: 20, height: 20 }} />
    }
  }

  render () {
    const { navigate } = this.props.navigation;
    return (
      <View style={ style.container, { padding: 50 } }>
        <Text style={ style.title }>Ara Food - Profil</Text>
        <Text>Application très en vogue pour organiser des évenements que se soit autour de la mal bouffe, 
        la bonne nouriture ou même d'autres évenement equestres. Cepdendant, il est interdit d'utiliser cette applications à des fins de prostitution gustative</Text>
      </View>
    );
  }
}


