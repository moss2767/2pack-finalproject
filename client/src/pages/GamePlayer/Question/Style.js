import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  question: {
    margin: '2rem'
  },
  option: {
    width: '100%'
  },
  correct: {
    border: '2px solid green',
    borderRadius: '5px'
  },
  incorrect: {
    border: '2px solid red',
    borderRadius: '5px'
  },
  answerWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  paperQuestion: {
    margin: '1rem',
    padding: theme.spacing(3, 2)
  },
  answerPrompt: {
    marginTop: '1rem'
  }
}))

export default useStyles
