import React, { useEffect } from 'react';
import './App.css';
import Question from './components/Question'
import { useDispatch, useSelector } from 'react-redux'
import { setQuestions } from './actions/actions'

const apiQuestions = {"response_code":0,"results":[{"category":"Science & Nature","type":"boolean","difficulty":"medium","question":"The Neanderthals were a direct ancestor of modern humans.","correct_answer":"False","incorrect_answers":["True"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"hard","question":"Which of these songs was released in 1996?","correct_answer":"The Smashing Pumpkins - &quot;1979&quot;","incorrect_answers":["Prince - &quot;1999&quot;","James Blunt - &quot;1973&quot;","David Bowie - &quot;1984&quot;"]},{"category":"General Knowledge","type":"boolean","difficulty":"medium","question":"Sitting for more than three hours a day can cut two years off a person&#039;s life expectancy.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Video Games","type":"boolean","difficulty":"medium","question":"In Rocket League, you can play Basketball.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"How many regular Sunken Sea Scrolls are there in &quot;Splatoon&quot;?","correct_answer":"27","incorrect_answers":["32","30","5"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"Toby Fox&#039;s &quot;Megalovania&quot; was first used where?","correct_answer":"Radiation&#039;s Earthbound Halloween Hack","incorrect_answers":["Homestuck: [S] Wake","Undertale","Mother: Cognitive Dissonance"]},{"category":"Entertainment: Japanese Anime & Manga","type":"multiple","difficulty":"medium","question":"In the &quot;To Love-Ru&quot; series, how many Trans-weapons were created?","correct_answer":"3","incorrect_answers":["1","2","4"]},{"category":"Entertainment: Cartoon & Animations","type":"multiple","difficulty":"medium","question":"What was the number on Gerald&#039;s shirt in &quot;Hey Arnold!&quot;?","correct_answer":"33","incorrect_answers":["88","38","83"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"Which stage was planned to be a part of &quot;Sonic the Hedgehog 2&quot;, but was scrapped during development?","correct_answer":"Genocide City Zone","incorrect_answers":["Stardust Speedway Zone","Sky High Zone ","Clockwork Zone"]},{"category":"General Knowledge","type":"multiple","difficulty":"easy","question":"What nuts are used in the production of marzipan?","correct_answer":"Almonds","incorrect_answers":["Peanuts","Walnuts","Pistachios"]}]}

function App() {
  const dispatch = useDispatch()

  const currentQuestion = useSelector((state) => state.session.current)
  const points = useSelector((state) => state.session.points)
  
  useEffect(() => {
    dispatch(setQuestions(apiQuestions.results))
  }, [dispatch])

  const questions = useSelector((state) => {
    return state.questions
  })
 
  return (
    <div className="App">
      <h1> this quiz is ten questions then it will show you your points </h1>
      { currentQuestion !== questions.length && 
        <Question question={questions[currentQuestion]}/>
      }
      <p>Points: {points}</p>
    </div>
  );
}

export default App;
