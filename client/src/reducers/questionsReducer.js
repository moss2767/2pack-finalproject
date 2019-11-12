const questionsReducer = (questions = [], action) => {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return action.questions
    default:
      return questions
    }
}

export default questionsReducer
