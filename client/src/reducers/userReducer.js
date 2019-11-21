import { JOIN_GAME } from "../actions/game"
import { CORRECT_ANSWER, INCORRECT_ANSWER } from "../actions/question"

const initialState = {
  name: "Anonymous",
  points: 0
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case JOIN_GAME:
      return {
        ...state,
        name: action.name
      }
    
  case CORRECT_ANSWER:
      return { ...state, points: state.points + 1 }

  case INCORRECT_ANSWER:
    return { ...state }
    
  default:
    return state

  }
}
export default userReducer