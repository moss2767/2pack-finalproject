import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  question: {
    margin: "2rem"
  },
  answer: {
    margin: "2rem"
  },
  answerWrapper: {
    display: "flex",
    flexDirection: 'column'
  }
}))

export default useStyles