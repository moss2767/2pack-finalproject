export const setQuestions = questions => {
  return {
    type: 'SET_QUESTIONS',
    questions
  }
}

export const correctAnswer = () => {
  return {
    type: 'CORRECT_ANSWER'
  }
}

export const incorrectAnswer = () => {
  return {
    type: 'INCORRECT_ANSWER'
  }
}

export const actionSetName = name => {
  return {
    type: 'SET_NAME',
    name
  }
}

export const joinGame = () => {
  return {
    type: 'JOIN_GAME'
  }
}

export const leaveGame = () => {
  return {
    type: 'LEAVE_GAME'
  }
}

export const testSocket = () => {
  return {
    type:'TEST_SOCKET'
  }
}