import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import signInUser from '../actions'

import { View, Text, StatusBar, StyleSheet, AsyncStorage } from 'react-native'
import { TabNavigator } from 'react-navigation'

import Profile from './Profile'
import EventsListStackNavigator from '../components/Events-list-stack-navigator'
import Login from './Login'

import style from '../styles/Style'

const Tabs = TabNavigator({
  EventsList: { screen: EventsListStackNavigator },
  Profile: { screen: Profile },

}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    indicatorStyle: {
      height: 2,
      backgroundColor: '#FFFFFF'
    },
    style: {
      backgroundColor: "#c0392b",
      borderTopWidth: 1,
      borderColor: "#3f101c"
    }
  },
})

class App extends Component {

  componentDidMount() {
      AsyncStorage.getItem('login')
        .then((value) => {
            const login = value.split('/')
            const email = login[0]
            const password = login[1]
            console.log('******')
            console.log(this.props)
            this.props.onSignInUser(email, password)
        })

  }

  render() {
    const {user} = this.props
      return (
          user.user ?  <Tabs /> :  <Login />
      );
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignInUser: (email, password) => dispatch(signInUser(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps )(App)