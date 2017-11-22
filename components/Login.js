import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  ToolbarAndroid,
  ActivityIndicator
} from 'react-native';

import styles from '../styles/loginStyle.js'
import React, {Component} from 'react';


import * as firebase from 'firebase'

export default class Login extends Component {

  static navigationOptions = {
    tabBarIcon: () => {
      return <Image source={require('./icons/user.png')} style={{ width: 20, height: 20 }} />
    }
  }

  constructor(props){
    super(props);
    // We have the same props as in our signup.js file and they serve the same purposes.
    this.state = {
      loading: false,
      email: '',
      password: ''
    }
  }


  render() {
    // The content of the screen should be inputs for a username, password and submit button.
    // If we are loading then we display an ActivityIndicator.
    const content = this.state.loading ? <ActivityIndicator size="large"/> :
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}
          placeholder={"Email Address"} />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          secureTextEntry={true}
          placeholder={"Password"} />
        <TouchableHighlight onPress={this.login.bind(this)} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Login</Text>
        </TouchableHighlight>

      </View>;

    // A simple UI with a toolbar, and content below it.
        return (
          <View style={styles.container}>
                  <ToolbarAndroid
              style={styles.toolbar}
              title="Login" />
            <View style={styles.body}>
              {content}
            </View>
          </View>
        );
  }

  login () {
    this.setState({
      loading: true
    });
    // Log in and display an alert to tell the user what happened.
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password
    ).then((userData) => {
        this.setState({
          loading: false
        });

        alert('tu as réussi à te connecter, gg')
        const { navigate } = this.props.navigation;
        //navigate('Account', { email: 'rolivier@rol.rol', hello: 'world' })
        /*this.props.navigator.push({
          component: Account
        });*/
        
      }
    ).catch((error) => {
          this.setState({
          loading: false
        });
        alert('Login Failed. Please try again');
    });
  }

  // Go to the signup page
  goToSignup(){
    this.props.navigator.push({
      component: Signup
    });
  }


}

AppRegistry.registerComponent('Login', () => Login);

