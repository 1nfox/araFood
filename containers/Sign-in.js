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

import { FormLabel, FormInput } from 'react-native-elements'

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
            imageHeight : new Animated.Value(150),
            disabledButton: true,
            usernameError: '',
            passwordError: '',
            passwordConfirmationError: '',
            passwordConfirmationLengthError: '',
            emailError: ''
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

    validateUsername(username){
        this.setState({
            username: username
        }, () => {
          if(username.length < 4){
                this.setState({ usernameError:"4 caractères minimum." })
            }else{
                this.setState({ usernameError:false }, () => {this.formValidated() })
            }
        });            
    }

    validatePasswordLength(password){
        this.setState({
            password: password
        }, () => {
          if(password.length < 6){
                this.setState({ passwordError:"6 caractères minimum." })
            }else{
                this.setState({ passwordError:false }, () => {this.formValidated() })
            }
        });   
    }

    validatePasswordConfirmationLength(confirmPassword){
        this.setState({
            confirmPassword: confirmPassword
        }, () => {
            if(confirmPassword.length < 6){
                this.setState({ passwordConfirmationLengthError:"6 caractères minimum." })
            }else{
                this.setState({ passwordConfirmationLengthError:false }, () => {this.formValidated() })
            }

            if(this.state.password != this.state.confirmPassword){
                this.setState({ passwordConfirmationError:"Les mots de passes ne sont pas identiques." })
            }else{
                this.setState({ passwordConfirmationError:false }, () => {this.formValidated() })
            }

        });
    }

    validateEmail(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({
            email: email
        }, () => {
            if(re.test(email) === false){
                this.setState({ emailError:"Adresse e-mail incorrecte." })
            }else{
                this.setState({ emailError:false }, () => {this.formValidated() })
                
            }
        });            
    }

    formValidated(){
        if((this.state.usernameError === false) && (this.state.passwordConfirmationError === false) && (this.state.emailError === false)){
            this.setState({ disabledButton:false })
        }else{
            this.setState({ disabledButton: true })
        }
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
            onChangeText={(username) => this.validateUsername(username)}
            value={this.state.username}
            placeholder={"username*"} />
        <Text style={{ color: 'red', fontStyle: 'italic', textAlign: 'center'}}>{this.state.usernameError}</Text>

        <TextInput
            style={styles.textInput}
            onChangeText={(password) => this.validatePasswordLength(password)}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password*"} />
        <Text style={{ color: 'red', fontStyle: 'italic', textAlign: 'center'}}>{this.state.passwordError}</Text>

        <TextInput
            style={styles.textInput}
            onChangeText={(confirmPassword) => this.validatePasswordConfirmationLength(confirmPassword)}
            value={this.state.confirmPassword}
            secureTextEntry={true}
            placeholder={"Confirm Password*"} />
            <Text style={{ color: 'red', fontStyle: 'italic', textAlign: 'center'}}>{this.state.passwordConfirmationLengthError}</Text>
        <Text style={{ color: 'red', fontStyle: 'italic', textAlign: 'center'}}>{this.state.passwordConfirmationError}</Text>

        <TextInput
            style={styles.textInput}
            onChangeText={(email) => this.validateEmail(email)}
            value={this.state.email}
            keyboardType='email-address'
            placeholder={"email*"} />
        <Text style={{ color: 'red', fontStyle: 'italic', textAlign: 'center'}}>{this.state.emailError}</Text>

        <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({phone: text})}
            value={this.state.phone}
            keyboardType='phone-pad'
            placeholder={"phone"} />
        <TouchableOpacity onPress={this._pickImage}>
          <View style={{justifyContent: 'center', alignItems: 'center',}}>
            { !avatar &&
            <Text style={textStyle.TextStyle, { borderBottomWidth: 1, textAlign: 'center', color: '#FFF', width: 200, marginTop: 20}}>Avatar</Text>}
            { avatar &&
            <Image  source={{ uri: 'data:image/jpeg;base64,'+avatar }}  
                    style={{borderWidth:1,
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
        <TouchableHighlight onPress={() => this.onButtonPress()} style={styles.primaryButton} disabled={this.state.disabledButton}>
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

