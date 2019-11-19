import React from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../../components/NavBar/NavBar'

const HostResult = () => {
  const { questions, users } = useSelector(state => state.game)

  const sortedUsers = users.sort((a, b) => b.points - a.points)
  const maxPoints = questions.length * users.length
  const scoredPoints = users.reduce((total, user) => total + user.points, 0)
  //questions * users
  return (
  <div>
    <NavBar />
    <h1>Result</h1>
    <p>The result of your quiz!</p>
    <p>Total score: {scoredPoints}/ {maxPoints} </p>
    <ol>
  {sortedUsers.map(user => (<li>{user.name}: {user.points}</li>))}
    </ol>
  </div>
   );
}
 
export default HostResult;