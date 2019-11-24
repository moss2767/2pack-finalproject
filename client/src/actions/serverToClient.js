export const SEND_ANSWER_TO_PLAYERS = 'SEND_ANSWER_TO_PLAYERS'
export const SEND_START_GAME_TO_PLAYERS = 'SEND_START_GAME_TO_PLAYERS'
export const SEND_QUESTION_TO_PLAYERS = 'SEND_QUESTION_TO_PLAYERS'

export const sendAnswerToPlayers = answer => ({
  type: SEND_ANSWER_TO_PLAYERS,
  answer
})

export const sendQuestionToPlayers = (question, currentQuestionIndex) => {
  return {
    type: SEND_QUESTION_TO_PLAYERS,
    question,
    currentQuestionIndex
  }
}

export const sendStartGameToPlayers = numberOfQuestions => ({
  type: SEND_START_GAME_TO_PLAYERS,
  numberOfQuestions
})
