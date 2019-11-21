export const CREATE_GAME = 'CREATE_GAME'
export const START_GAME = 'START_GAME'
export const GAME_STARTED = 'GAME_STARTED'
export const JOIN_GAME = 'JOIN_GAME'
export const NEXT_QUESTION = 'NEXT_QUESTION'
export const SEND_QUESTION_TO_PLAYERS = 'SEND_QUESTIONS_TO_PLAYERS'
export const SHOW_ANSWER_TO_PLAYER = 'SHOW_ANSWER_TO_PLAYER'
export const REVEAL_ANSWER = 'REVEAL_ANSWER'

export const createGame = room => ({
  type: CREATE_GAME,
  room: room
})

export const startGame = () => ({
  type: START_GAME
})

export const gameStarted = () => ({
  type: GAME_STARTED
})

export const joinGame = data => ({
  type: JOIN_GAME,
  room: data.code,
  name: data.name
})

export const nextQuestion = question => ({
  type: NEXT_QUESTION,
  question
})

export const sendQuestionToPlayers = question => ({
  type: SEND_QUESTION_TO_PLAYERS,
  question
})

export const showAnswerToPlayer = answer => ({
  type: SHOW_ANSWER_TO_PLAYER,
  answer
})

export const revealAnswer = answer => ({
  type: REVEAL_ANSWER,
  answer
})
