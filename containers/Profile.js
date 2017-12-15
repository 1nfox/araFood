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

import styles from '../styles/loginStyle'

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
       <View style={styles.container}>
        <View style={{ height: 65, backgroundColor: '#c0392b' }}>
          <Text style={{ paddingTop: 30, fontSize: 18, fontWeight: '700', marginLeft: 15, color: '#FFF' }}>Profil de {this.props.user.user.username}</Text>
        </View>
        <View style={ styles.img, { backgroundColor: '#333',justifyContent: 'center', alignItems: 'center', paddingTop:120 }}>
          <Image source={{ uri: this.props.user.user.avatar }}    style={{
                                                                      borderWidth:1,
                                                                      borderColor:'rgba(0,0,0,0.2)',
                                                                      alignItems:'center',
                                                                      justifyContent:'center',
                                                                      width:150,
                                                                      height:150,
                                                                      backgroundColor:'#333',
                                                                      borderRadius:150,
                                                                    }}/>
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
