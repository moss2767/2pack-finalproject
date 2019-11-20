import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Card, CardContent, CardMedia } from '@material-ui/core'
import { Container, Grid, Link, makeStyles, Typography } from '@material-ui/core'
import axel from '../../assets/axel.jpg'
import sasha from '../../assets/sasha.jpg'
import victor from '../../assets/victor.jpg'
import per from '../../assets/per.jpg'

const useStyles = makeStyles({
  about: {
    marginTop: "1rem"
  },
  image: {
    height: "40vh",
  },
  memberWrapper: {
    display: "grid",

  }
})

const About = () => {
  const classes = useStyles()
  return ( 
  <div>
    <NavBar />
    <Container>
      <Typography className={classes.about} variant="h2">About</Typography>
      <Typography variant="h6">
        2Pack was arguable the greatest mob in <Link target="_blank" rel="noopener" href="https://www.study-at-salt.com/">{"</salt>"}</Link> history.
      </Typography>
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
      >
        <Card>
          <CardMedia
            className={classes.image}
            image={victor}
            title='Victor "Biggie" Stenström-Diaz'
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              Victor "Biggie" Stenström-Diaz
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardMedia
            className={classes.image}
            image={sasha}
            title='Sasha "2pac" Murray'
          />
          <CardContent>
            <Typography variant="h5" component="h2">
            Sasha "2pac" Murray
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardMedia
            className={classes.image}
            image={axel}
            title='Axel "Snoop Lion" Eriksson'
          />
          <CardContent>
            <Typography variant="h5" component="h2">
            Axel "Snoop Lion" Eriksson
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Typography variant="h6">
        Honorable members
      </Typography>
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
      >
        <Card>
          <CardMedia
            className={classes.image}
            image={per}
            title='Per "M&M" Nybom'
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              Per "M&M" Nybom
            </Typography>
          </CardContent>
        </Card>
      </Grid>

     </Container>
  </div>
   );
}
 
export default About