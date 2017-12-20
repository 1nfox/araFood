import React from 'react'

import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Dimensions, Linking, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import { TabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

import style from '../styles/subscriberItemStyle'
import * as firebase from 'firebase'

import Collapsible from 'react-native-collapsible';

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
            loading: true,
            collapsed: true,
            comment: 'No comment',
            subscriberInfos: {username: '',
                            avatar: ''}
        }
    }

    componentDidMount () {
        const ref = firebase.database().ref('/users/' + this.props.subscriber.id)
        ref.once('value', snapshot => {
            this.setState({
                subscriberInfos: snapshot.val(),
                loading: false
            })
        })
        if (this.props.subscriber.comment != '') {
            this.setState({
                comment : this.props.subscriber.comment
            })
        }
    }

    mailToSub (mail) {
        Linking.openURL( 'mailto:'+mail);
    }
    phoneToSub (phone) {
        Linking.openURL( 'tel:'+phone);
    }
    smsToSub (phone) {
          Linking.openURL( 'sms:'+phone);
    }

    _toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    }

    render () {
        var width = Dimensions.get('window').width; //full width
        var height = Dimensions.get('window').height; //full height
        if(this.state.loading){
            return <View style={{ flex: 1 }}><ActivityIndicator color={style.color} size="large" style={{ flex: 1 }}/></View>
        } else {
            if (this.state.subscriberInfos !== undefined) {
                return (
                    <KeyboardAvoidingView behavior="padding" style={style.container_sub}>
                        <TouchableHighlight onPress={() => this._toggleExpanded()}>
                            <View style={style.container_row}>
                                <Image source={{ uri: this.state.subscriberInfos.avatar }} style={style.logo_sub} />
                                <View style={{ width: width, paddingTop: 2}}>
                                    <Text style={style.title_sub}>{ this.state.subscriberInfos.username }</Text>
                                    <Text style={style.comment_sub}>{ this.state.comment }</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <Collapsible collapsed={this.state.collapsed} align="bottom">
                            <View style={style.container_collapsible}>
                                <TouchableHighlight onPress={() => this.mailToSub(this.state.subscriberInfos.email)}>
                                    <View>
                                        <Icon
                                          name='mail'
                                          color='#c0392b'
                                        />
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={() => this.phoneToSub(this.state.subscriberInfos.phone)}>
                                    <View>
                                        <Icon
                                          name='phone-in-talk'
                                          color='#c0392b'
                                        />
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={() => this.smsToSub(this.state.subscriberInfos.phone)}>
                                    <View>
                                        <Icon
                                          name='sms'
                                          color='#c0392b'
                                        />
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </Collapsible>
                    </KeyboardAvoidingView>
                )
            }else {
                return (
                    <View><Text>Oops</Text></View>
                )
            }
        }
  }


}