export const SET_USERS = 'SET_USERS'
export const SEND_QUESTIONS_TO_SERVER = 'SEND_QUESTIONS_TO_SERVER'
export const SET_ALL_QUESTIONS_TO_PLAYERS = 'SET_ALL_QUESTIONS_TO_PLAYERS'

export const setUsers = users => {
  return {
    type: SET_USERS,
    users: users
  }
}

export const sendQuestionsToServer = quiz => {
  return {
    type: SEND_QUESTIONS_TO_SERVER,
    quiz: quiz
  }
}

export const setAllQuestionsToPlayers = quiz => {
  return {
    type: SET_ALL_QUESTIONS_TO_PLAYERS,
    quiz: quiz
  }
}

// Re-using SET_USERS action type with empty error
export const closeRoom = () => {
  return {
    type: 'SET_USERS',
    users: []
  }
}
