import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { signInUser } from '../actions'

import { View, Text, StatusBar, StyleSheet, AsyncStorage } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'

import Profile from './Profile'
import EventsListStackNavigator from '../components/Events-list-stack-navigator'
import Login from './Login'
import SignIn from './Sign-in'
import AddEvent from './Add-event'

import style from '../styles/Style'

const Tabs = TabNavigator({
  EventsList: { screen: EventsListStackNavigator },
  Profile: { screen: Profile },
  AddEvent: { screen: AddEvent },

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

const navigationOptions = {
  headerStyle: style.header,
  headerTitleStyle: style.headerTitle
}

const Home = StackNavigator({
  Login: { screen: Login, navigationOptions},
  SignIn: { screen: SignIn, navigationOptions },
});


class App extends Component {

  componentDidMount() {
      AsyncStorage.getItem('login')
        .then((value) => {
            if(value!= null) {
                const login = value.split('/')
                const email = login[0]
                const password = login[1]
                this.props.onSignInUser(email, password)
            }
        })
        .catch( (error) => {
          console.log(error)
        })
  }

  render() {
    const {user} = this.props
      return (
          user.user ?  <Tabs /> :  <Home />
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
export default connect(mapStateToProps, mapDispatchToProps )(App);
