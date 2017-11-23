import React from 'react'
import globaleStyle from '../styles/Style'


import {  View, Text, StyleSheet, Image, Button } from 'react-native'
import { StackNavigator } from 'react-navigation'


import FadeInView from './animation/fadeInView'
import Events from './Events'
import Event from './Event'



export default class EventsRow extends React.Component{

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  static navigationOptions = {
    title: 'Recherche une ville',
  }

  viewEvent () {
    console.log(this.props)
    this.props.navigation.navigate('Event', {event: 'yolo'})
  }

  render () {
      return(
      <FadeInView delay={ this.props.index * 50}>
        <View style={[ style.flex,style.view, {backgroundColor: '#333'} ]} >
          <View style={ style.flex }>
            <Text style={{ marginLeft: 10 }}>{ this.props.event.date }</Text>        
          </View>
          <Text style={ style.temp }>
            { this.props.event.title }
          </Text>
          <View style={ style.flex }>
            <Image source={{ uri: this.props.event.imageUrl }} style={{ width: 200, height: 200 }} />
          </View>
          <Button onPress={() => this.viewEvent()} title="Voir" />
        </View>
      </FadeInView>
      )
  }


}


const style = StyleSheet.create({
  white: {
    color: '#FFF'
  },
  black: {
    color: '#000'
  },
  bold: {
    fontWeight: 'bold',
  },
  flex: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstView: {
    backgroundColor: globaleStyle.color,
  },
  view: {
    backgroundColor: globaleStyle.color,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#000',

  
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom: 30
  },

  temp: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 22,
  }
})

