import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers/rootReducer'
import socketMiddleware from './middleware/socket'
import { Auth0Provider } from './react-auth0-spa'
import config from './auth_config.json'
import history from './utils/history'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
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
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
