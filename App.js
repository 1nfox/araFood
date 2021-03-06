import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import Thunk from 'redux-thunk';
import rootReducer from './reducers'

import AppContainer from './containers/App'

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        //loggerMiddleware,
        Thunk
    )
);

export default class App extends React.Component {

    constructor() {
        super();
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }

  render() {
      return (
          <Provider store={store}>
              <AppContainer />
          </Provider>
      );
  }

}






  

