import React from 'react'

import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Dimensions } from 'react-native'
import { TabNavigator } from 'react-navigation'

import style from '../styles/Style'
import * as firebase from 'firebase'

export default class Subscribers extends React.Component {

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
      loading: true
    }
  }

  componentDidMount () {
    const ref = firebase.database().ref('/users/' + this.props.subscriberList.id)
    ref.on('value', snapshot => {
      this.setState({
        subscriberInfos: snapshot.val(),
        loading: false
      })
    })
  }

  render () {
    var width = Dimensions.get('window').width; //full width
    var height = Dimensions.get('window').height; //full height
    if(this.state.loading){
      return <View style={{ flex: 1 }}><ActivityIndicator color={style.color} size="large" style={{ flex: 1 }}/></View>
    } else {
      if (this.state.subscriberInfos !== undefined) {
        return (
          <View style={{ flex: 1, flexDirection: 'row', padding: 10, borderBottomWidth: 2, borderColor: '#FFF' }}>
            <View style={{ width: width/4 }}>
              <Image source={{ uri: this.state.subscriberInfos.avatar }} style={{ width: 50, height: 50 }} />
            </View>
            <View style={{ width: width, paddingTop: 2}}>
              <Text>{ this.state.subscriberInfos.username }</Text>
              <Text>{ this.props.subscriberList.comment }</Text>
            </View>
          </View>
        )
      } else {
        return (
          <View><Text>Oops</Text></View>
        )
      }
    }

  }


}