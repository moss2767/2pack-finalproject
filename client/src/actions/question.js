export const SET_QUESTION = 'SET_QUESTION'
export const SEND_ANSWER = 'SEND_ANSWER'

export const setQuestion = (question, currentQuestionIndex) => {
  return {
    type: SET_QUESTION,
    question,
    currentQuestionIndex
  }
}

export const sendAnswer = answer => {
  return {
    type: SEND_ANSWER,
    answer
  }
}
