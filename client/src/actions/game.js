export const createGame = room => {
  return {
    type: 'CREATE_GAME',
    room: room
  }
}

export const joinGame = (data) => {
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