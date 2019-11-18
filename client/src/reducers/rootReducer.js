import { combineReducers } from 'redux'
import userReducer from './userReducer'
import hostReducer from './gameReducer'

const rootReducer = combineReducers({
  user: userReducer,
  game: hostReducer
})


export default rootReducer