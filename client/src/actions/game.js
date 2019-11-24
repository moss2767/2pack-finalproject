export const CREATE_GAME = 'CREATE_GAME'
export const JOIN_GAME = 'JOIN_GAME'

export const createGame = room => ({
  type: CREATE_GAME,
  room: room
})

export const joinGame = data => ({
  type: JOIN_GAME,
  room: data.code,
  name: data.name
})
