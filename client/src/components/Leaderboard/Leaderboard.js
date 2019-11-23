import React, { useEffect, useState } from 'react'
import { makeStyles, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
const url = process.env.NODE_ENV === 'production' ? 'https://starry-expanse-259012.appspot.com' : 'http://localhost:8000'

const useStyles = makeStyles(() => ({
  points: {
    textAlign: 'right'
  },
  noLeaderboard: {
    marginTop: '2rem'
  },
  leaderboard: {
    marginBottom: '2rem'
  }
}))

const Leaderboard = ({ id }) => {
  const classes = useStyles()
  const [leaderboard, setLeaderboard] = useState([{ course: null, percentage: null }])
  const [noLeaderboard, setNoLeaderboard] = useState(false)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch(`${url}/leaderboard/${id}`)
      const data = await res.json()
      const filteredLeaderboard = data[0].leaderboard.filter(entry => !isNaN(Number(entry.percentage)))
      const sortedLeaderboard = filteredLeaderboard.sort((a, b) => Number(b.percentage) - Number(a.percentage))
      if (sortedLeaderboard.length === 0) {
        setNoLeaderboard(true)
      }
      setLeaderboard(sortedLeaderboard)
    }
    fetchLeaderboard()
  }, [id])

  return (
    <div className={classes.leaderboard}>
      {noLeaderboard && (
        <Typography className={classes.noLeaderboard} variant="h4">No Leaderboard!</Typography>
      )}
      {!noLeaderboard && (
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard.map((batch, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">{batch.batch}</TableCell>
                <TableCell className={classes.points} component="th" scope="row">{batch.percentage}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default Leaderboard
