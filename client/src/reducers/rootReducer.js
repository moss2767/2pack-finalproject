import { combineReducers } from 'redux'
import questionsReducer from './questionsReducer'
import sessionReducer from './sessionReducer'
import userReducer from './userReducer'
import usersReducer from './usersReducer'

const rootReducer = combineReducers({
  questions: questionsReducer,
  session: sessionReducer,
  user: userReducer,
  users: usersReducer
})


export default rootReducer