import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Scoreboard = (props) => {
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Scoreboard