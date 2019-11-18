const initialState = {
  points: 0,
  isInGame: false, 
  room: null, 
  name: null,
  gameStarted: false
}

const sessionReducer = (session = initialState, action) => {
  switch (action.type) {
    
    case 'CORRECT_ANSWER':
      return { ...session, points: session.points + 1 }

    case 'INCORRECT_ANSWER':
      return { ...session }
    
    case 'LEAVE_GAME':
      return {...session, isInGame: false}

    case 'GAME_STARTED':
      return {...session, gameStarted: true}
    
    default:
      return session

  }
}
export default sessionReducer