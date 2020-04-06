import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 50
  },
  appContainer: {
    background: 'white'
  }
}))

export const Uploader = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container className={classes.appContainer}>
        This is the uploader.
      </Container>
    </div>
  )
}

export default Uploader;