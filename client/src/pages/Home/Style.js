import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginBottom: '2rem'
  },
  TextField: {
    marginTop: theme.spacing(1)
  },
  FirstTextField: {
    marginTop: theme.spacing(2)
  },
  button: {
    height: "3.5rem",
    margin: theme.spacing(1),
    minWidth: "14rem"
  },
  host: {
    margin: "auto",
    marginTop: theme.spacing(1)
  },
  form: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
}))

export default useStyles