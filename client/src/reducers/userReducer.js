const initialState = {
  name: "No Name",
  question: {
    question: null,
    answers: [
      {
        option: null,
        correct: null
      }
    ]
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'SET_QUESTION':
      return {
        ...state, 
        question: action.question
      }
    default:
      return state
  }
}
export default userReducer