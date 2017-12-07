import React from 'react'

import { AppRegistry, View, Text, StyleSheet, Image, Dimensions, ListView, ScrollView, TouchableHighlight } from 'react-native'
import { TabNavigator } from 'react-navigation'

import { connect } from 'react-redux';
import { subscribe, unsubscribe } from '../actions/firebase_event_handler';


import style from '../styles/Style'
import styles from '../styles/loginStyle.js'
import Subscribers from './Subscribers'



class EventItem extends React.Component {

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
      comment: "Commentaire"
    } 
  }

  onSubscribe() {
    this.props.subscribe(this.props.user.id, this.props.navigation.state.params.event.event.id)
  }

  onUnsubscribe() {
    this.props.unsubscribe(this.props.user.id, this.props.navigation.state.params.event.event.id)
  }

  render () {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    var subscribersCount = 1/*Object.keys(this.state.event.subscribers).length;*/
    var width = Dimensions.get('window').width; //full width
    var height = Dimensions.get('window').height; //full height
    let subscribers = this.props.navigation.state.params.event.event.subscribers
    for (const key in subscribers){
      if(subscribers[key].id ===  this.props.user.id){
        console.log('déjà suscribe')
      }else{
        console.log('pas encore subscribe')
      }
      
    }
    console.log(this.state.event)
    return (
      <ScrollView>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignSelf: 'stretch' }}>
            
            <View style={{width: width, height: 300}} >
                <Image source={{ uri: this.state.event.imageUrl }} style={{ width: width, height: 300 }} />    
                <Text style={{ position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: 'auto', padding: 10, fontSize:16, color: '#FFF', marginTop: 10, marginLeft: 10 }}>
                  {this.state.event.date.split(" ")[0].trim()}
                </Text>
                <Text style={{ position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.6)', height: 'auto', padding: 10, fontSize:16, marginTop: 10, right: 10, color: '#D92719' }}>
                  {this.state.event.date.split(" ")[1].trim()}
                </Text>
              </View>

              <View style={{width: width, height: 'auto',backgroundColor: '#333', flex: 1, flexDirection: 'row'}}>
                <Text style={{ height: 'auto', alignSelf:'center',fontSize:16,justifyContent:'center',alignItems:'center', color: '#FFF', marginTop: 10, marginBottom: 10, marginLeft: 60 }}>
                  Participants: { subscribersCount }
                </Text>
                <TouchableHighlight onPress={() => {this.onSubscribe(this.props)}} style={{ height: 'auto', padding: 10, marginTop: 2, marginLeft: 60}}>
                  <Image source={require('./icons/subscribe.png')} style={{ width: 20, height: 20 }} />
                </TouchableHighlight>
              </View>
            
              <View style={{width: width, height: 'auto',backgroundColor: '#333', flex: 1, flexDirection: 'row'}}>
                <Text style={{ height: 'auto', alignSelf:'center',fontSize:16,justifyContent:'center',alignItems:'center', color: '#FFF', marginTop: 10, marginBottom: 10, marginLeft: 20, padding: 10 }}>
                  {this.state.event.description}
                </Text>
              </View>

              

              <View style={{width: width, height: 'auto',backgroundColor: '#dedede'}} usersList={ this.state.usersList }>
                <ListView 
                  enableEmptySections={true}
                  dataSource={ds.cloneWithRows(this.state.event.subscribers) } 
                  renderRow={(row, j, k) => <Subscribers subscriberList={row} index={k}/> }
                />
              </View>

        </View>
      </ScrollView>
    )
  }
}


const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
};

export default connect(mapStateToProps, {
  subscribe, unsubscribe
})(EventItem);


AppRegistry.registerComponent('EventItem', () => EventItem);
