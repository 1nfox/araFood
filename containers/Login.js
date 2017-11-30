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
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { signInUser } from '../actions'

class Login extends Component {

    constructor(props){
        super(props);
        // We have the same props as in our signup.js file and they serve the same purposes.
        this.state = {
          email: '',
          password: '',
          loading: false
        }
    }

    onButtonPress() {
        this.props.signInUser(this.state.email, this.state.password)
    }


  render() {
    const {user} = this.props
    // The content of the screen should be inputs for a username, password and submit button.
    // If we are loading then we display an ActivityIndicator.
    const content = user.loading ? <ActivityIndicator size="large"/> :
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
        <TouchableHighlight onPress={() => this.onButtonPress()} style={styles.primaryButton}>
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

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps, {
  signInUser
})(Login);

AppRegistry.registerComponent('Login', () => Login);
