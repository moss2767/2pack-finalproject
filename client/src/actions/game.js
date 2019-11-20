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

export const giveAnswer = answer => {
  return {
    type: 'GIVE_ANSWER',
    answer
  }
}

export const revealAnswer = answer => {
  console.log(answer)
  return {
    type: 'REVEAL_ANSWER',
    answer
  }
}