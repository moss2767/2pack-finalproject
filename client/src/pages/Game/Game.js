import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setQuestions } from '../../actions/actions'
import io from 'socket.io-client'
import Question from '../../components/Question/Question'
import NavBar from '../../components/NavBar/NavBar'

const Game = () => {

  const query = new URLSearchParams(useLocation().search)
  const quizId = query.get('id')
  const dispatch = useDispatch()

  const socket = io('http://localhost:8000')

  socket.on('test', data => {
    console.log(data, 'it works')
  })

  const currentQuestion = useSelector((state) => state.session.current)
  const points = useSelector((state) => state.session.points)
  
  useEffect(() => {
    fetch(`http://localhost:8000/quizzes/${quizId}`)
      .then(res => res.json())
      .then(data => dispatch(setQuestions(data)))
  }, [dispatch, quizId])

  const questions = useSelector((state) => {
    return state.questions
  })

  return (
    <div className="App">
      <NavBar />
      <h1>Home!</h1>
      <h1> this quiz is ten questions then it will show you your points </h1>
      { currentQuestion !== questions.length && 
        <Question question={questions[currentQuestion]}/>
      }
      <p>Points: {points}</p>
    </div>
  );
}
 
export default Game;