export const setQuestions = questions => {
  return {
    type: 'SET_QUESTIONS',
    questions
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

export const actionSetName = name => {
  console.log(name)
  return {
    type: 'SET_NAME',
    name
  }
}