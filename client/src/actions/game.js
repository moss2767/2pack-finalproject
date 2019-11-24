export const CREATE_GAME = 'CREATE_GAME'
export const START_GAME = 'START_GAME'
export const GAME_STARTED = 'GAME_STARTED'
export const JOIN_GAME = 'JOIN_GAME'
export const SEND_QUESTION_TO_PLAYERS = 'SEND_QUESTIONS_TO_PLAYERS'
export const SHOW_ANSWER_TO_PLAYER = 'SHOW_ANSWER_TO_PLAYER'
export const SEND_ANSWER_TO_PLAYERS = 'SEND_ANSWER_TO_PLAYERS'

export const createGame = room => ({
  type: CREATE_GAME,
  room: room
})

export const startGame = numberOfQuestions => ({
  type: START_GAME,
  numberOfQuestions: numberOfQuestions
})

export const gameStarted = numberOfQuestions => ({
  type: GAME_STARTED,
  numberOfQuestions
})

export const joinGame = data => ({
  type: JOIN_GAME,
  room: data.code,
  name: data.name
})

export const sendQuestionToPlayers = (question, currentQuestionIndex) => ({
  type: SEND_QUESTION_TO_PLAYERS,
  question,
  currentQuestionIndex
})

export const showAnswerToPlayer = answer => ({
  type: SHOW_ANSWER_TO_PLAYER,
  answer
})

export const sendAnswerToPlayers = () => ({
  type: SEND_ANSWER_TO_PLAYERS
})
