import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { useSelector } from 'react-redux'

const PlayerResult = () => {
  const { quiz } = useSelector(state => state.game)
  const { name, points } = useSelector(state => state.user)

  const maxPoints = quiz.questions.length

  return (
    <div>
      <NavBar />
      <h1>Result</h1>
      <p> Congrats {name}, you scored {points}, out of a possible {maxPoints}</p>
    </div>
  )
}

export default PlayerResult
