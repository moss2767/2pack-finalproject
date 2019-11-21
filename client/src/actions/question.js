export const SET_QUESTION = 'SET_QUESTION'
export const CORRECT_ANSWER = 'CORRECT_ANSWER'
export const INCORRECT_ANSWER = 'INCORRECT_ANSWER'

export const setQuestion = question => {
  return {
    type: SET_QUESTION,
    question
  }
}

export const correctAnswer = () => {
  return {
    type: CORRECT_ANSWER
  }
}

export const incorrectAnswer = () => {
  return {
    type: INCORRECT_ANSWER
  }
}