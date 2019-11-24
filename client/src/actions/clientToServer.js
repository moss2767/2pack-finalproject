export const SEND_ANSWER_TO_SERVER = 'SEND_ANSWER_TO_SERVER'
export const SEND_QUESTION_TO_SERVER = 'SEND_QUESTION_TO_SERVER'
export const SEND_START_GAME_TO_SERVER = 'SEND_START_GAME_TO_SERVER'
export const TELL_SERVER_TO_SEND_ANSWER = 'TELL_SERVER_TO_SEND_ANSWER'

export const sendAnswerToServer = answer => {
  return {
    type: SEND_ANSWER_TO_SERVER,
    answer
  }
}

export const sendQuestionToServer = (question, currentQuestionIndex) => console.log(question) || ({
  type: SEND_QUESTION_TO_SERVER,
  question,
  currentQuestionIndex
})

export const sendStartGameToServer = numberOfQuestions => ({
  type: SEND_START_GAME_TO_SERVER,
  numberOfQuestions: numberOfQuestions
})

export const tellServerToSendAnswer = () => ({
  type: TELL_SERVER_TO_SEND_ANSWER
})
