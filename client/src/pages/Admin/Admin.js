import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Button, Container, TextField, Typography } from '@material-ui/core'
import useStyles from './Style'

const url = process.env.NODE_ENV === 'production' ? 'https://starry-expanse-259012.appspot.com' : 'http://localhost:8000'

const Admin = () => {
  const classes = useStyles('')
  const [question, setQuestion] = useState('')
  const [quizId, setQuizId] = useState('')
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [option3, setOption3] = useState('')
  const [option4, setOption4] = useState('')
  const [option5, setOption5] = useState('')

  const addQuestion = async () => {
    const answers = [option1, option2]
    const res = await fetch(`${url}/quizzes/add-question`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: question,
        quizId: quizId,
        answers: answers
      })
    })
    console.log(res)
    if (res.status === 400) {
      const data = await res.json()
      alert('Error inserting questions: ', data)
    }
  }

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg">
        <Typography className={classes.header} variant="h3">
          Admin
        </Typography>

        <Typography variant="h5">
          Add Quiz
        </Typography>

        <Typography variant="h5">
          Add Question
        </Typography>
        <TextField id="question" label="Question" variant="outlined" value={question} onChange={(event) => setQuestion(event.target.value)} />
        <TextField
          id="quiz-id"
          label="Quiz ID"
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
          value={quizId} onChange={(event) => setQuizId(event.target.value)}
        />
        <br></br>
        Max 5 options - leave the options you don't want unfilled to ignore them.
        <br></br>
        <TextField id="option1" label="Option 1" variant="outlined" value={option1} onChange={(event) => setOption1(event.target.value)} />
        <TextField id="option2" label="Option 2" variant="outlined" value={option2} onChange={(event) => setOption2(event.target.value)} />
        <TextField id="option3" label="Option 3" variant="outlined" value={option3} onChange={(event) => setOption3(event.target.value)} />
        <TextField id="option4" label="Option 4" variant="outlined" value={option4} onChange={(event) => setOption4(event.target.value)} />
        <TextField id="option5" label="Option 5" variant="outlined" value={option5} onChange={(event) => setOption5(event.target.value)} />
        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={addQuestion}>
            Add Question
        </Button>
      </Container>
    </div>
  )
}

export default Admin
