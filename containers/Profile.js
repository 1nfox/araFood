import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    ActivityIndicator,
    Image,
    Button
} from 'react-native'


import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { signOutUser } from '../actions'

import style from '../styles/Style'

class Profile extends React.Component {

  static navigationOptions = {
    tabBarIcon: () => {
      return <Image source={require('../components/icons/user.png')} style={{ width: 20, height: 20 }} />
    }
  }

  onButtonPress() {
      this.props.signOutUser()
  }

  render () {
    const { navigate } = this.props.navigation;
    return (
      <View style={ style.container, { padding: 50 } }>
        <Text style={ style.title }>Ara Food - Profil</Text>
        <TouchableHighlight onPress={() => this.onButtonPress()} style={style.primaryButton}>
          <Text style={style.primaryButtonText}>Logout</Text>
        </TouchableHighlight>
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
  signOutUser
})(Profile);

AppRegistry.registerComponent('Profile', () => Profile);


