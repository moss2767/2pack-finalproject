import { combineReducers } from 'redux'
import questionsReducer from './questionsReducer'
import sessionReducer from './sessionReducer'

const rootReducer = combineReducers({
  questions: questionsReducer,
  session: sessionReducer
})


export default rootReducer