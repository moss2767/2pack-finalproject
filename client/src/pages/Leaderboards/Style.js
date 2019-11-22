import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  leaderboard: {
    marginTop: "1rem"
  },
  subtitle: {
    margin: "1rem 0",
  },
  gamesContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "1rem",
  },
  container: {
    marginBottom: "2rem"
  }
})

export default useStyles