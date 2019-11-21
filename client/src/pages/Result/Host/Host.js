import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../../../components/NavBar/NavBar'
import { Avatar, Container, Typography, Table, TableCell, TableBody, TableRow, TableHead } from '@material-ui/core'
import useStyles from './Style'
import { Button, FormControl, MenuItem, Select, InputLabel } from '@material-ui/core'
import SimpleSnackbar from '../../../components/SimpleSnackbar/SimpleSnackbar'
const url = process.env.NODE_ENV === 'production' ? 'https://starry-expanse-259012.appspot.com' : 'http://localhost:8000'

const HostResult = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [snackMessage, setSnackMessage] = useState('')
  const [ batch, setBatch ] = useState('Fall 2019 - Stockholm')
  const { quiz, users } = useSelector(state => state.game)
  const maxPoints = quiz.questions.length * users.length
  const scoredPoints = users.reduce((total, user) => total + user.points, 0)
  let percentage = Math.round(scoredPoints/maxPoints * 100)
  if(isNaN(percentage)) {
    percentage = 0
  }

  const [leaderboard, setLeaderboard] = useState([ { batch: null, percentage: null } ])

  useEffect(() => {
    const getLeaderboard = async () => {
      
      const res = await fetch(`${url}/leaderboard/${1}`, {
        method: 'GET'
      })
      const data = await res.json()
      setLeaderboard([...data[0].leaderboard, {batch: batch, percentage: percentage}])
    }

    getLeaderboard()
  }, [batch, percentage, quiz.id])

  const postLeaderboard = async () => {
      const res = await fetch(`${url}/leaderboard`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({quizId: quiz.id, batch: batch, percentage: percentage})
      })

      if(res.status === 400) {
        setOpen(true)
        setSnackMessage('Score not posted! You probably don\'t have a quiz ID')
      }
      if (res.status === 204) {
        setOpen(true)
        setSnackMessage('Score posted!')
      }
  }
  
  return (
  <div>
    <NavBar />
    <SimpleSnackbar open={open} setOpen={setOpen} message={snackMessage}/>
    <Container>
    <Typography className={classes.result} variant="h2">
      Result
    </Typography>
    <div className={classes.percentageAndTextWrapper}>
      <Avatar className={classes.percentage}>{percentage}%</Avatar>
      <Typography className={classes.text} variant="body1">
        <b>Well done!</b><br></br>
        You friends performed great.
      </Typography>
    </div>

    <FormControl className={classes.formControl}>
        <InputLabel id="select-batch">Select batch</InputLabel>
        <Select
          labelId="select-batch"
          id="select-batch"
          value={batch}
          onChange={(event) => setBatch(event.target.value)}
        >
          <MenuItem value={"Fall 2019 - Stockholm"}>Fall 2019 - Stockholm</MenuItem>
          <MenuItem value={"Winter 2020 - Stockholm"}>Winter 2020 - Stockholm</MenuItem>
          <MenuItem value={"Spring 2020 - Amsterdam"}>Spring 2020 - Amsterdam</MenuItem>
        </Select>
      </FormControl>
    
    <Button color="primary" variant="contained" onClick={postLeaderboard}>Submit Score!</Button>

    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Score</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {leaderboard.map((entry, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              {entry.batch === batch ? <b>{entry.batch}</b> : entry.batch}
            </TableCell>
            <TableCell className={classes.points} component="th" scope="row">
              {entry.batch === batch ? <b>{entry.percentage}%</b> : <span>{entry.percentage}%</span>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    </Container>
  </div>
   );
}
 
export default HostResult;