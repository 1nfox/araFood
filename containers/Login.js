import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  ToolbarAndroid,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  StatusBar,
  AsyncStorage,
  Animated,
  Button
} from 'react-native';

import styles from '../styles/loginStyle.js'
import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { loginUser } from '../actions'

import logo from '../components/icons/logo-ara.png';

class Login extends Component {

    static navigationOptions = {
      title: 'Connexion',
    }

    constructor(props){
        super(props);
        this.state = {
          email: 'jbelmont@groupe-ara.com',
          password: 'jbelara',
          loading: false,
          imageHeight : new Animated.Value(150)
        }
    }

    onButtonPress() {
        this.props.loginUser(this.state.email, this.state.password)
    }

      componentWillMount () {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
      }

      componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }


      keyboardDidShow = (event) => {
        Animated.timing(this.state.imageHeight, {
          toValue: 80,
        }).start();
      };

      keyboardDidHide = (event) => {
        Animated.timing(this.state.imageHeight, {
          toValue: 150,
        }).start();
    };


  render() {
    const {user} = this.props
    const { navigate } = this.props.navigation
    const content = user.loading ? <ActivityIndicator size="large"/> :
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}
          keyboardType="email-address"
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
        <Text onPress={() => navigate('SignIn') } style={{justifyContent: 'center', color: '#FFF', textAlign: 'center'}}>Sign In</Text>
      </View>;

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Animated.Image source={logo} style={[styles.logo, { height: this.state.imageHeight }]} />
                {content}
                <View style={{ height: 60 }} />
            </KeyboardAvoidingView>
        );
  }

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps, {
  loginUser
})(Login);

AppRegistry.registerComponent('Login', () => Login);

