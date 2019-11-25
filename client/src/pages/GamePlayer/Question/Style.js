import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  question: {
    margin: '2rem'
  },
  option: {
    width: '100%'
  },
  correct: {
    '& button': {
      backgroundColor: 'green'
    }
  },
  answerWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  paperQuestion: {
    margin: '1rem',
    padding: theme.spacing(3, 2)
  }
}))

export default useStyles
