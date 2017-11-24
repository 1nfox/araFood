import React from 'react'

import { View, Text, StyleSheet, Image, Dimensions, FlatList } from 'react-native'
import { TabNavigator } from 'react-navigation'

import style from '../styles/Style'



var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class Events extends React.Component {

  static navigationOptions = ({ navigation }) => {

    return{
      title: `${navigation.state.params.event.event.title}`,
      tabBarIcon: () => {
        return <Image source={require('./icons/home.png')} style={{ width: 20, height: 20 }} />
      }
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      event: this.props.navigation.state.params.event.event
    }
  }


  render () {
    console.log(this.state.event)
    var suscribersCount = Object.keys(this.state.event.subscribers).length;
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'stretch',

      }}>
        <View style={{width: width, height: 300}}>
          <Image source={{ uri: this.state.event.imageUrl }} style={{ width: width, height: 300 }} />
        </View>
        <View style={{width: width, height: 'auto',backgroundColor: '#333'}}>
          <Text style={{alignSelf:'center',fontSize:20,justifyContent:'center',alignItems:'center', color: '#FFF', marginTop: 20, marginBottom: 20 }}>
            Nombre de participants: { suscribersCount }
          </Text>
        </View>
        <View style={{width: width, height: 100,backgroundColor: '#dedede'}}>
          <Text style={{ alignSelf: 'center', fontSize: 16, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            Liste des participants
          </Text>
          <FlatList
            data={this.state.event.subscribers}
            renderItem={({item}) => <Text>{item.key}</Text>}
          />
        </View>
      </View>
    )
  }
  

}