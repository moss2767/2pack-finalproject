const sessionReducer = (session = {points: 0, current: 0}, action) => {
  switch (action.type) {
    case 'CORRECT_ANSWER':
      return {...session, points: session.points ++, current: session.current ++}
    default:
      return session
  }
}