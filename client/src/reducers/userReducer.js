import { JOIN_GAME, SEND_ANSWER, SHOW_ANSWER_TO_PLAYER } from '../actions/actions'

const initialState = {
  name: 'Anonymous',
  answer: null,
  points: 0
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOIN_GAME:
      return {
        ...state,
        name: action.name
      }

    case SEND_ANSWER:
      return {
        ...state,
        answer: action.answer
      }

    case SHOW_ANSWER_TO_PLAYER:
      return {
        ...state,
        points: state.answer === action.answer ? state.points + 1 : state.points
      }

    default:
      return state
  }
}
export default userReducer
