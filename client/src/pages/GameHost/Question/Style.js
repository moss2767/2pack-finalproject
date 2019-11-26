import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paperAnswer: {
    backgroundColor: '#5C6BC0',
    margin: '1rem',
    padding: theme.spacing(3, 2)
  },
  paperQuestion: {
    margin: '1rem',
    padding: theme.spacing(3, 2)
  },
  correct: {
    '& div': {
      backgroundColor: 'green'
    }
  },
  answer: {
    color: 'white',
    textAlign: 'center'
  }
}))

export default useStyles
