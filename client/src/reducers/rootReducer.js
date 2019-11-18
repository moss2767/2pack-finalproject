import { combineReducers } from 'redux'
import sessionReducer from './sessionReducer'
import userReducer from './userReducer'
import hostReducer from './gameReducer'

const rootReducer = combineReducers({
  session: sessionReducer,
  user: userReducer,
  game: hostReducer
})


export default rootReducer