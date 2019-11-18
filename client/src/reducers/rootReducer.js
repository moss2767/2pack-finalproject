import { combineReducers } from 'redux'
import questionsReducer from './questionsReducer'
import sessionReducer from './sessionReducer'
import userReducer from './userReducer'
import hostReducer from './hostReducer'

const rootReducer = combineReducers({
  questions: questionsReducer,
  session: sessionReducer,
  user: userReducer,
  host: hostReducer
})


export default rootReducer