import React from 'react'

import { AppRegistry, View, Text, TextInput, StyleSheet, Image, Dimensions, ListView, ScrollView, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import { TabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

import { connect } from 'react-redux';
import { subscribe, unsubscribe, updateComment } from '../actions/firebase_event_handler';

import Collapsible from 'react-native-collapsible';

import style from '../styles/eventItemStyle.js'
import SubscribersList from '../containers/Subscribers-list'


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
            loading: true,
            collapsed: true,
            comment: ''
        }
    }

    onSubscribe(userId, eventId, comment) {
        this.props.subscribe(userId, eventId, comment)
    }

    onUnsubscribe(userId, eventId) {
        this.props.unsubscribe(userId, eventId)
    }

    onUpdateComment(userId, eventId, comment) {
        this.props.updateComment(userId, eventId, comment)
    }

    _toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    }

    componentWillMount () {
        const sub = this.props.event.subscribers.find( sub => sub.id == this.props.user.id)
        if (sub) {
            this.setState({comment: sub.comment})
        }
    }

    render () {

        let event = this.props.event
        let user = this.props.user
        let subscribersCount = event.subscribers.length
        let width = Dimensions.get('window').width; //full width
        let height = Dimensions.get('window').height; //full height
        let isSubscriber = event.subscribers.findIndex( sub => sub.id == user.id)
        let isSub = false
        let subComponent

        if(isSubscriber < 0) {
            subComponent = (
                <View style={{width: width, height: 'auto',backgroundColor: '#333', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                    <TextInput
                      style={{ width: 200, textAlign: 'center', padding: 5, color: '#FFFFFF' }}
                      onChangeText={(text) => this.setState({comment: text})}
                      placeholder={"Commentaire"}
                      placeholderTextColor="#FFF"
                    />
                    <TouchableHighlight onPress={() => {this.onSubscribe(user.id, event.id, this.state.comment)}} style={{ height: 'auto', padding: 10, marginTop: 2, marginLeft: 60}}>
                        <View>
                            <Icon
                              name='plus'
                              type='simple-line-icon'
                              color='#c0392b'
                            />
                        </View>
                    </TouchableHighlight>
                </View>
            )
        }else {
            isSub = true
            subComponent = (
                <View style={{width: width, height: 'auto',backgroundColor: '#333', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ecf0f1' }}>
                    <TouchableHighlight onPress={() => {this.onUpdateComment(user.id, event.id, this.state.comment)}} style={{ height: 'auto', padding: 10 }}>
                        <View>
                            <Icon
                              name='mode-edit'
                              color='#c0392b'
                            />
                        </View>
                    </TouchableHighlight>
                    <TextInput
                      style={{ width: 200, textAlign: 'center', padding: 5, color: '#333' }}
                      onChangeText={(text) => this.setState({comment: text})}
                      placeholder={"Commentaire"}
                      placeholderTextColor="#FFF"
                      value={this.state.comment}
                    />
                    <TouchableHighlight onPress={() => {this.onUnsubscribe(user.id, event.id)}} style={{ height: 'auto', padding: 10, backgroundColor: '#ecf0f1'}}>
                        <View>
                            <Icon
                              name='close'
                              type='simple-line-icon'
                              color='#c0392b'
                            />
                        </View>
                    </TouchableHighlight>
                </View>
            )
        }

        return (
            <ScrollView style={ style.container_event }>
                <View style={{width: width, height: 'auto'}} >
                    <Image source={{ uri: event.imageUrl }} style={{ width: width, height: 300 }} />
                    <Text style={ style.date }>
                        {event.date.split(" ")[0].trim()}
                    </Text>
                    <Text style={ style.hour }>
                        {event.date.split(" ")[1].trim()}
                    </Text>
                </View>
                <TouchableHighlight onPress={() => this._toggleExpanded()}>
                    <View style={{width: width, height: 'auto',backgroundColor: '#333', flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Text style={{padding: 10, color: '#FFF'}}>
                            Participants: { subscribersCount }
                        </Text>
                        <Icon
                            name='person-add'
                            color='#c0392b'
                        />
                    </View>
                </TouchableHighlight>
                <Collapsible collapsed={this.state.collapsed} align="bottom">
                    {subComponent}
                </Collapsible>
                <View style={{width: width, height: 'auto',backgroundColor: '#333', flex: 1, flexDirection: 'row'}}>
                    <Text style={{ height: 'auto', alignSelf:'center',fontSize:16,justifyContent:'center',alignItems:'center', color: '#FFF', marginTop: 10, marginBottom: 10, marginLeft: 20, padding: 10 }}>
                      {event.description}
                    </Text>
                </View>
                  <View style={{width: width, height: 'auto',backgroundColor: '#dedede'}} usersList={ this.state.usersList }>
                    <SubscribersList />
                  </View>
            </ScrollView>
        )
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        event: state.events.current_event
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubscribe: (userId, eventId, comment) => {dispatch(subscribe(userId,eventId, comment))},
        onUnsubscribe: (userId, eventId) => {dispatch(unsubscribe(userId,eventId))},
        onUpdateComment: (userId, eventId, comment) => {dispatch(updateComment(userId,eventId, comment))},
    };
};

export default connect(mapStateToProps, {
    subscribe, unsubscribe, updateComment
})(EventItem);


AppRegistry.registerComponent('EventItem', () => EventItem);
