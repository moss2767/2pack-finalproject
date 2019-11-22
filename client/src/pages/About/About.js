import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Card, CardContent, CardMedia, Container, Grid, Link, Typography } from '@material-ui/core'

import axel from '../../assets/axel_cropped.jpg'
import sasha from '../../assets/sasha_cropped.jpg'
import victor from '../../assets/victor_cropped.jpg'
import per from '../../assets/per.jpg'
import useStyles from './Style'

const About = () => {
  const classes = useStyles()
  const members = [
    { name: 'Victor "Biggie" Stenström-Diaz', image: victor },
    { name: 'Sasha "2pac" Murray', image: sasha },
    { name: 'Axel "Snoop Lion" Eriksson', image: axel }
  ]

  return (
    <div>
      <NavBar />
      <Container maxWidth="xl" className={classes.container}>
        <Typography className={classes.about} variant="h2">About</Typography>
        <Typography className={classes.text} variant="h6">
          2Pack Quiz was our final project at <Link target="_blank" rel="noopener" href="https://www.study-at-salt.com/">{'</salt>'}</Link> done by the team/mob 2Pack
        </Typography>

        <Grid className={classes.root} container direction="row" justify="center" alignItems="center" spacing={2}>

          {members.map(member => (
            <Grid key={member.name} item xs={12} sm={4}>
              <Card>
                <CardMedia
                  className={classes.image}
                  image={member.image}
                  title={member.name}
                />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {member.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}

        </Grid>

        <Typography className={classes.text} variant="h6">
          Honorable Members
        </Typography>

        <Grid container direction="row" alignItems="center" spacing={2} >

          <Grid item xs={12} sm={4}>
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

        </Grid>

      </Container>
    </div>
  )
}

export default About
