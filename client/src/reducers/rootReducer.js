import { combineReducers } from 'redux'
import questionsReducer from './questionsReducer'
import sessionReducer from './sessionReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  questions: questionsReducer,
  session: sessionReducer,
  user: userReducer
})


export default rootReducer