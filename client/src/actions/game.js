export const createGame = room => {
  return {
    type: 'CREATE_GAME',
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

export const leaveGame = () => {
  return {
    type: 'LEAVE_GAME'
  }
}

export const nextQuestion = question => {
  return {
    type: 'NEXT_QUESTION',
    question
  }
}