import React from 'react'

import { View, Text, StyleSheet, Image, Dimensions, ListView, ScrollView } from 'react-native'
import { TabNavigator } from 'react-navigation'

import style from '../styles/Style'
import Subscribers from './Subscribers'



export default class EventItem extends React.Component {

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
      event: this.props.navigation.state.params.event.event,
      loading: true,
    } 
  }

  

  render () {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    var subscribersCount = Object.keys(this.state.event.subscribers).length;
    var width = Dimensions.get('window').width; //full width
    var height = Dimensions.get('window').height; //full height
    return (
        <ScrollView>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignSelf: 'stretch' }}>

            <View style={{width: width, height: 300}} >
              <Image source={{ uri: this.state.event.imageUrl }} style={{ width: width, height: 300 }} />
            </View>

            <View style={{width: width, height: 'auto',backgroundColor: '#333'}}>
              <Text style={{alignSelf:'center',fontSize:18,justifyContent:'center',alignItems:'center', color: '#FFF', marginTop: 10, marginBottom: 10 }}>
                Nombre de participants: { subscribersCount }
              </Text>
            </View>

            <View style={{width: width, height: 'auto',backgroundColor: '#dedede'}} usersList={ this.state.usersList }>
              <ListView 
                dataSource={ds.cloneWithRows(this.state.event.subscribers) } 
                renderRow={(row, j, k) => <Subscribers subscriberList={row} index={k}/> }
              />
            </View>

          </View>
        </ScrollView>
    )
  }
}