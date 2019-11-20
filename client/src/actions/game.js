export const CREATE_GAME = "CREATE_GAME"

export const createGame = room => {
  return {
    type: CREATE_GAME,
    room: room
  }
}

export const startGame = () => {
  return {
    type: 'START_GAME'
  }
}

export const gameStarted = () => {
  return {
    type: 'GAME_STARTED'
  }
}

export const joinGame = data => {
  return {
    type: 'JOIN_GAME',
    room: data.code,
    name: data.name
  }
}

export const nextQuestion = question => {
  return {
    type: 'NEXT_QUESTION',
    question
  }
}

export const sendQuestionToPlayers = question => {
  return {
    type: 'SEND_QUESTION_TO_PLAYERS',
    question
  }
}

export const showAnswerToPlayer = answer => {
  return {
    type: 'SHOW_ANSWER_TO_PLAYER',
    answer
  }
}

export const revealAnswer = answer => {
  return {
    type: 'REVEAL_ANSWER',
    answer
  }
}