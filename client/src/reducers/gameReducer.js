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
  gameStarted: false,
  answer: null,
  questions: []
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
      
    case 'GIVE_ANSWER':
        return {...state, answer: action.answer}
        
    case 'SET_QUESTION':
      return {
        ...state, 
        question: action.question
      }
    
    case 'SEND_QUESTIONS_TO_SERVER':
      return {...state, questions: action.questions}

    case 'SET_ALL_QUESTIONS_TO_PLAYERS':
      return {...state, questions: action.questions}
      
    default:
      return state
  }
}
export default hostReducer