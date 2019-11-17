import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers/rootReducer'
import socketMiddleware from './middleware/socket'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

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

serviceWorker.unregister()