import React from 'react';
import { useDispatch } from 'react-redux'
import { correctAnswer, incorrectAnswer } from '../actions/actions'

const Question = ({question}) => {
  const dispatch = useDispatch()
  const options = question.incorrect_answers
  options.push(question.correct_answer)
  shuffle(options)
  
const handleAnswer = (answer) => {
  if (answer === question.correct_answer) {
    alert("You were right!")
    dispatch(correctAnswer())
  } else {
    alert(`You were wrong! The correct answer was ${question.correct_answer}`)
    dispatch(incorrectAnswer())
  }
}

  return (
    <div>
      <h1>{question.question}</h1>
      {options.map(answer => (<button onClick={()=>handleAnswer(answer)}>{answer}</button>))}
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