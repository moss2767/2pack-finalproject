export const setUsers = users => {
  return {
    type: 'SET_USERS',
    users: users
  }
}

export const sendQuestionsToServer = quiz => {
  return {
    type: 'SEND_QUESTIONS_TO_SERVER',
    quiz: quiz
  }
}

export const setAllQuestionsToPlayers = quiz => {
  return {
    type: 'SET_ALL_QUESTIONS_TO_PLAYERS',
    quiz: quiz
  }
}