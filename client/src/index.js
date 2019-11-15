import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers/rootReducer'
import io from 'socket.io-client'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const socketMiddleware = (url) => {
  let socket
  return next => action => {

    switch(action.type) {
      case "JOIN_GAME": {
        socket = io('http://localhost:8000')
        break
      }

      case "TEST_SOCKET": {
        socket.emit('test', 'Hello World!')
        break
      }

      default:
        break
    }

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)


    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(
    applyMiddleware(socketMiddleware)
  )
)

ReactDOM.render(
  <Provider store = {store}> 
    <App />
  </Provider>, 
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
