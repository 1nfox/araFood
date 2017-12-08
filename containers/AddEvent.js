import {
    AppRegistry,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableHighlight,
    ActivityIndicator,
    Image,
    Button,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native'


import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { onAddEvent } from '../actions/firebase_event_handler';

import styles from '../styles/loginStyle'

class AddEvent extends React.Component {

  static navigationOptions = {
    tabBarIcon: () => {
      return <Image source={require('../components/icons/addEvent.png')} style={{ width: 20, height: 20 }} />
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      date: '',
      heure: '',
      description: '',
      image: '',
      loading: false
    }
  }

  onAddEvent(){
    Keyboard.dismiss(),
    this.props.onAddEvent(this.state.name, this.state.dte, this.state.heure, this.state.description, this.state.image, this.props.user.user.id)
  }

  render () {
    const { navigate } = this.props.navigation;
    const content = 
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({name: text})}
          placeholder={"Nom de l'évenement"} />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({date: text})}
          placeholder={"Date"} />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({heure: text})}
          placeholder={"Heure"} />
        <TextInput
          style={ styles.textInput, {height: 50}}
          onChangeText={(text) => this.setState({description: text})}
          placeholder={"Description de l'évenement"}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({image: text})}
          placeholder={"Image"} />
        <TouchableHighlight style={styles.primaryButton} onPress={() => {this.onAddEvent()}}>
          <Text style={styles.primaryButtonText}>Créer</Text>
        </TouchableHighlight>
      </View>;
      
      
    return (
       <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={{ height: 65, backgroundColor: '#c0392b' }}>
          <Text style={{ paddingTop: 30, fontSize: 18, fontWeight: '700', marginLeft: 15, color: '#FFF' }}>Créer un évenement</Text>
        </View>
        <View style={styles.body}>
          {content}
        </View>
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
  onAddEvent
})(AddEvent);

AppRegistry.registerComponent('AddEvent', () => AddEvent);
