import {
    ActivityIndicator,
    Animated,
    AppRegistry,
    AsyncStorage,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    ToolbarAndroid,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';

import styles from '../styles/loginStyle.js'
import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { signInUser } from '../actions'
import { ImagePicker } from 'expo';

import logo from '../components/icons/logo-ara.png';

class SignIn extends Component {

    static navigationOptions = {
        title: 'Création de compte',
    }

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            phone: '',
            avatar: null,
            loading: false,
            imageHeight : new Animated.Value(150)
        }
    }

    componentWillMount () {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    onButtonPress() {
        this.props.signInUser(this.state.email, this.state.password, this.state.email, this.state.phone, this.state.avatar)
    }

    keyboardDidShow = (event) => {
        Animated.timing(this.state.imageHeight, {
            toValue: 40,
        }).start();
    };

    keyboardDidHide = (event) => {
        Animated.timing(this.state.imageHeight, {
            toValue: 150,
        }).start();
    };

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [16, 9],
            base64: true,
            exif: true
        });
        if (!result.cancelled) {
            this.setState({ avatar: result.base64 });
        }
    };


    render() {
    const {user} = this.props
    let avatar = this.state.avatar;
    const content = user.loading ? <ActivityIndicator size="large"/> :
      <View>
        <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({username: text})}
            value={this.state.username}
            placeholder={"username*"} />
        <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password*"} />
        <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({confirmPassword: text})}
            value={this.state.confirmPassword}
            secureTextEntry={true}
            placeholder={"Confirm Password*"} />
        <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            keyboardType='email-address'
            placeholder={"email"} />
        <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({phone: text})}
            value={this.state.phone}
            keyboardType='phone-pad'
            placeholder={"phone"} />
        <TouchableOpacity onPress={this._pickImage}>
          <View style={{justifyContent: 'center', alignItems: 'center',}}>
            { !avatar &&
            <Text style={textStyle.TextStyle}>Avatar</Text>}
            { avatar &&
            <Image source={{ uri: 'data:image/jpeg;base64,'+avatar }}  style={{borderWidth:1,
                                                                                borderColor:'rgba(0,0,0,0.2)',
                                                                                alignItems:'center',
                                                                                justifyContent:'center',
                                                                                width:80,
                                                                                height:80,
                                                                                backgroundColor:'#333',
                                                                                borderRadius:80,
                                                                              }} />}
          </View>
        </TouchableOpacity>
        <TouchableHighlight onPress={() => this.onButtonPress()} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Sign In</Text>
        </TouchableHighlight>

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
  signInUser
})(SignIn);

AppRegistry.registerComponent('SignIn', () => SignIn);

const textStyle = StyleSheet.create({

  TextStyle: {
    backgroundColor: '#dedede',
    color: '#333',
    textAlign: 'center',
    padding: 10,
    margin: 10,
    width: 200,
    borderBottomWidth: 0
  }

});

