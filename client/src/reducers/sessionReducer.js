const sessionReducer = (session = {points: 0, current: 0}, action) => {
  switch (action.type) {
    case 'CORRECT_ANSWER':
      return {...session, points: session.points + 1, current: session.current + 1}
    case 'INCORRECT_ANSWER':
        return {...session, current: session.current + 1}
    default:
      return session
  }
}
export default sessionReducer