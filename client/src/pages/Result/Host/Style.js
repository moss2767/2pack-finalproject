import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  result: {
    margin: "1rem",
    textAlign: 'center'
  },
  percentage: {
    height: "5rem",
    width: "5rem"
  },
  percentageAndTextWrapper: {
    display: "flex",
    justifyContent: "center"
  },
  text: {
    width: '30rem',
    marginLeft: '1rem'
  },
  formControl: {
    marginRight: "0.5rem",
    minWidth: 200,
  },
}))

export default useStyles