const initialState = [
  {
    question: null,
    incorrect_answers: [],
    correct_answer: null 
  }
]

const questionsReducer = (questions = initialState, action) => {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return action.questions
    default:
      return questions
    }
}

export default questionsReducer
