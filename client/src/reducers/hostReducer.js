const initialState = {
  users: [{
    name: "Axel",
    points: 0
  }],
  room: null
}

const hostReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case 'SET_USERS':
      return {...state, users: action.users}
    case 'CREATE_GAME':
      return {...state, room: action.room}
    default:
      return state
  }
}
export default hostReducer