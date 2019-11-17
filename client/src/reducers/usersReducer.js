const initialState = [
  {
    name: "Axel",
    points: 0
  }
]

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case 'SET_USERS':
      return action.users
    
    default:
      return state
  }
}
export default userReducer