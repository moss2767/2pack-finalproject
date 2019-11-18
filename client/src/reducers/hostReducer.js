const initialState = {
  users: [],
  currentQuestion: 0,
  room: null
}

const hostReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case 'SET_USERS':
      return {...state, users: action.users}
    
    case 'CREATE_GAME':
      return {...state, room: action.room}

    case 'NEXT_QUESTION':
      return {...state, currentQuestion: state.currentQuestion + 1}
    
    default:
      return state
  }
}
export default hostReducer