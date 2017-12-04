const red = '#D92719'

export default {
  container: {
    alignItems: 'stretch',
    flex: 1,
  },
  body: {
    flex: 9,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#333',
  },
  toolbar: {
    backgroundColor: red,
    height: 70,
    paddingTop: 0
  },
  textInput: {
    height: 40,
    width: 200,
    color: '#fff',
    textAlign: 'center',
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
    padding: 15,
    backgroundColor: red
  },
  primaryButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18
  },
  image: {
    width: 100,
    height: 100
  }
}