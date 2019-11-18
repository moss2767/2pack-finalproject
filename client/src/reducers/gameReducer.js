const initialState = {
  users: [],
  currentQuestion: 0,
  room: null,
  question: {
    question: null,
    answers: [
      {
        option: null,
        correct: null
      }
    ]
  },
  gameStarted: false
}

const hostReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case 'SET_USERS':
      return {...state, users: action.users}
    
    case 'CREATE_GAME':
      return {...state, room: action.room}

    case 'NEXT_QUESTION':
      return {...state, currentQuestion: state.currentQuestion + 1}

    case 'JOIN_GAME':
        return {...state, room: action.room}

    case 'GAME_STARTED':
        return {...state, gameStarted: true}
        
    case 'SET_QUESTION':
      return {
        ...state, 
        question: action.question
      }
    
    default:
      return state
  }
}
export default hostReducer