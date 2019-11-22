import React from 'react'
import { makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  points: {
    textAlign: 'center'
  }
}))

const Scoreboard = (props) => {
  const classes = useStyles()
  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Score</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.players.map(player => (
          <TableRow key={player.name}>
            <TableCell component="th" scope="row">{player.name}</TableCell>
            <TableCell className={classes.points} component="th" scope="row">{player.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Scoreboard
