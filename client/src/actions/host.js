export const setUsers = users => {
  return {
    type: 'SET_USERS',
    users: users
  }
}

export const sendQuestionsToServer = questions => {
  return {
    type: 'SEND_QUESTIONS_TO_SERVER',
    questions: questions
  }
}

export const setAllQuestionsToPlayers = questions => {
  return {
    type: 'SET_ALL_QUESTIONS_TO_PLAYERS',
    questions: questions
  }
}