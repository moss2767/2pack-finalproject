import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  header: {
    marginTop: '1rem'
  },
  subtitle: {
    margin: '1rem 0'
  },
  gamesContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '1rem'
  },
  connectedPlayersHeader: {
    marginBottom: '0'
  },
  wrapperCountdown: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem 0'
  }
}))

export default useStyles