import React from 'react';
import { useDispatch } from 'react-redux'
import { correctAnswer, incorrectAnswer } from '../../actions/actions'

const Question = ({question}) => {
  console.log(question)
  const dispatch = useDispatch()
  const correctAnswerlol = question.answers.find(answer => answer.correct ==='true')
  shuffle(question.answers)
  
const handleAnswer = (answer) => {
  if (answer === correctAnswerlol.option) {
    alert("You were right!")
    dispatch(correctAnswer())
  } else {
    alert(`You were wrong! The correct answer was ${correctAnswerlol.option}`)
    dispatch(incorrectAnswer())
  }
}

  return (
    <div>
      <h1>{question.question}</h1>
      {question.answers.map(answer => (<button onClick={()=>handleAnswer(answer.option)}>{answer.option}</button>))}
    </div>
  );
}

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
 
export default Question;