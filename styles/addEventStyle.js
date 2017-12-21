import { StyleSheet, Dimensions } from 'react-native'

const red = '#D92719'
const width = Dimensions.get('window').width

export default {
  container: {
    backgroundColor: '#333',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0
  },

  titleContainer: {
    position: 'absolute',
    top:0,
    left:0,
    height: 65,
    paddingTop: 30, 
    width: width,
    backgroundColor: '#c0392b',
    zIndex: 10
  },

  title: {
    paddingTop: 0,
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 15,
    color: '#FFF',
  },

  imgContainer: {
    backgroundColor: '#333',
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop:100,
  },

  img: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:150,
    height:150,
    backgroundColor:'#333',
    borderRadius:150,
  },

  textInput: {
    height: 40,
    width: 200,
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  transparentButton: {
    marginTop: 10,
    padding: 15
  },

  transparentButtonText: {
    color: red,
    textAlign: 'center',
    fontSize: 16
  },
  primaryButton: {
    margin: 10,
    marginTop: 40,
    padding: 15,
    backgroundColor: red
  },
  primaryButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18
  },


}