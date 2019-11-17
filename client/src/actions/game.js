export const createGame = room => {
  return {
    type: 'CREATE_GAME',
    room: room
  }
}

export const joinGame = room => {
  return {
    type: 'JOIN_GAME',
    room: room
  }
}

export const leaveGame = () => {
  return {
    type: 'LEAVE_GAME'
  }
}