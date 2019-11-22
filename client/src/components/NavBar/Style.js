import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  menuButton: {
    marginRight: 2
  },
  title: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  rightSide: {
    marginLeft: 'auto'
  },
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
}))

export default useStyles
