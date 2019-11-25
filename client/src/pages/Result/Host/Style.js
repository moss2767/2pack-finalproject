import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  result: {
    margin: '1rem 0'
  },
  percentage: {
    height: '5rem',
    width: '5rem'
  },
  percentageAndTextWrapper: {
    display: 'flex'
  },
  text: {
    width: '30rem',
    marginLeft: '1rem'
  },
  submitWrapper: {
    display: 'flex',
    flexDirection: 'row',
    margin: '1rem 0'
  },
  formControl: {
    marginRight: '0.5rem',
    minWidth: 200
  }
}))

export default useStyles
