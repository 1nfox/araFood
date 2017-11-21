import React from 'react'
import style from '../styles/Style'
import { View, Text, StyleSheet, ActivityIndicator, Image, Button } from 'react-native'
import { StackNavigator } from 'react-navigation'



export default class Profil extends React.Component {

  static navigationOptions = {
    tabBarIcon: () => {
      return <Image source={require('./icons/user.png')} style={{ width: 20, height: 20 }} />
    }
  }

  search() {
    this.props.navigation.navigate('Search')
  }

  render () {
    return (
      <View style={ style.container }>
        <Text style={style.title}>Application météo</Text>
        <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In incidunt blanditiis officia modi ipsa, beatae fuga. Eum maxime quas totam obcaecati facilis ea rem et error esse labore. Magni, accusantium.</Text>
        <Button color={ style.color } onPress={() => this.search()} title="Rechercher un évenement" />
      </View>
    );
  }
}
