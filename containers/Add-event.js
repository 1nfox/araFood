import {
    AppRegistry,
    View,
    Text,
    TouchableOpacity,
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
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'

import { ImagePicker } from 'expo';
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
      date: "Date de l'évenement",
      description: '',
      image: null,
      loading: false,
      isDateTimePickerVisible: false,
    }
  }

  onAddEvent(){
    //Rajouter un controle des données reçu
    if(!this.state.image){
      image = 'https://firebasestorage.googleapis.com/v0/b/ara-food.appspot.com/o/Default%2Fplaceholder.jpg?alt=media&token=8bfe324b-c282-484c-bc87-9ee04c6dca92'
    }else{
      image = this.state.image
    }
    Keyboard.dismiss()
    this.props.onAddEvent(this.state.name, this.state.date, this.state.description, 'data:image/jpeg;base64,'+image, this.props.user.user.id)
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (dateNonSplit) => {
    goodDay = moment(dateNonSplit).format("YYYY-M-DD HH:mm")
    this.setState({ 
      date: goodDay
    })
    this._hideDateTimePicker();
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [16, 9],
      base64: true,
      exif: true
    });
    if (!result.cancelled) {
      this.setState({ image: result.base64 });
    }
  };

  render () {
    let image = this.state.image;
    const { navigate } = this.props.navigation;
    const content = 
      <View>
        <TextInput
          style={textStyle.TextStyle}
          onChangeText={(text) => this.setState({name: text})}
          placeholder={"Nom de l'évenement"} placeholderTextColor="#333" />

        <View>
          <TouchableOpacity>
            <Text style={textStyle.TextStyle}  onPress={this._showDateTimePicker} >{ this.state.date }</Text>
          </TouchableOpacity>
          <DateTimePicker
            mode={ 'datetime' }
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
        </View>

        <TextInput
          style={ textStyle.TextStyle}
          onChangeText={(text) => this.setState({description: text})}
          placeholder={"Description de l'évenement"}
          placeholderTextColor="#333"
        />

        <TouchableOpacity onPress={this._pickImage}>
          <View style={{justifyContent: 'center', alignItems: 'center',}}>
            { !image &&
            <Text style={textStyle.TextStyle}>Image</Text>}
            { image &&
            <Image source={{ uri: 'data:image/jpeg;base64,'+image }} style={{ width: 200, height: 200 }} />}
          </View>
        </TouchableOpacity>

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