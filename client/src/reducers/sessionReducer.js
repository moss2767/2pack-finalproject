const sessionReducer = (session = {points: 0, current: 0, isInGame: false, room: null, error: null}, action) => {
  switch (action.type) {
    case 'CORRECT_ANSWER':
      return {...session, points: session.points + 1, current: session.current + 1}
    case 'INCORRECT_ANSWER':
      return {...session, current: session.current + 1}
    case 'JOIN_GAME':
      return {...session, isInGame: true, room: action.room}
    case 'LEAVE_GAME':
      return {...session, isInGame: false}
    case 'WRONG_CODE':
      return {...session, error: "Wrong code"}
    default:
      return session
  }
}
export default sessionReducer