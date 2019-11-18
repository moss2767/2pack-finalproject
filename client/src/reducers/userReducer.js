const initialState = {
  name: "No Name",
  points: 0
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'JOIN_GAME':
      return {
        ...state,
        name: action.name
      }
    
  case 'CORRECT_ANSWER':
      return { ...state, points: state.points + 1 }

    case 'INCORRECT_ANSWER':
      return { ...state }
    
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }

    default:
      return state

  }
}
export default userReducer