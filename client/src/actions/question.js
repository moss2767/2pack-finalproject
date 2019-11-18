export const setQuestions = questions => {
  return {
    type: 'SET_QUESTIONS',
    questions
  }
}

//REFACTOR THIS 
export const setQuestion = question => {
  return {
    type: 'SET_QUESTION',
    question
  }
}

export const correctAnswer = () => {
  return {
    type: 'CORRECT_ANSWER'
  }
}

export const incorrectAnswer = () => {
  return {
    type: 'INCORRECT_ANSWER'
  }
}