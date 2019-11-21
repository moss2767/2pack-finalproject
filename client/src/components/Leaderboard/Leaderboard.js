import React, { useEffect, useState } from 'react';
import { makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
const url = process.env.NODE_ENV === 'production' ? 'https://starry-expanse-259012.appspot.com' : 'http://localhost:8000'

const useStyles = makeStyles(() => ({
  points: {
    textAlign: "center"
  }
}))

const Leaderboard = ({id}) => {
  const classes = useStyles()
  const [leaderboard, setLeaderboard] = useState([
    {
      course: null,
      percentage: null
    }
  ])

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch(`${url}/leaderboard/${id}`)
      const data = await res.json()
      const sortedLeaderboard = data[0].leaderboard.sort((a,b) => Number(b.percentage) - Number(a.percentage))
      const filteredLeaderboard = sortedLeaderboard.filter(entry => !isNaN(Number(entry.percentage)))
      setLeaderboard(filteredLeaderboard)
    }
    fetchLeaderboard()
  }, [id])

  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Score</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {leaderboard.map(batch => (
          <TableRow key={batch.course}>
            <TableCell component="th" scope="row">{batch.course}</TableCell>
            <TableCell className={classes.points} component="th" scope="row">{batch.percentage}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Leaderboard