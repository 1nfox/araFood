import {
    AppRegistry,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableHighlight,
    ActivityIndicator,
    Image,
    Button
} from 'react-native'


import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { logoutUser } from '../actions'

import styles from '../styles/ProfileStyle'

class Profile extends React.Component {

  static navigationOptions = {
    tabBarIcon: () => {
      return <Image source={require('../components/icons/user.png')} style={{ width: 20, height: 20 }} />
    }
  }

  constructor (props) {
    super(props)
  }

  logout() {
    this.props.logoutUser()
  }


  render () {
    const { navigate } = this.props.navigation;
    const content = 
      <View>
        <TextInput
          style={styles.textInput}
          value={this.props.user.user.email}
          placeholder={"Email Address"} />
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          placeholder={"Password"} />
        <TouchableHighlight onPress={() => this.logout()} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Logout</Text>
        </TouchableHighlight>
      </View>;
      
    return (
       <View style={ styles.container }>
        <View style={ styles.titleContainer }>
          <Text style={ styles.title }>Profil de {this.props.user.user.username}</Text>
        </View>
        <View style={ styles.imgContainer }>
          <Image source={{ uri: this.props.user.user.avatar }} style={ styles.img }/>
        </View>
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
  logoutUser
})(Profile);

AppRegistry.registerComponent('Profile', () => Profile);
