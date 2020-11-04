import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Grid, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    marginTop: 100,
  },
  paper: {
    background: '#ffffff',
    opacity: 0.85,
    paddingTop: '5%',
    paddingBottom: '5%',
    paddingRight: '3%',
    paddingLeft: '3%',
  },
  item: {
    paddingTop: '5%',
  },
  login: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

export default function Login() {
  const classes = useStyles();

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        console.log(error.message);
      });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.push('/app'); //After successful login, user will be redirected to home.html
      }
    });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <Grid
          container
          className={classes.login}
          direction="column"
          alignItems="center"
          justify="space-between"
          spacing={3}
        >
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <Grid item className={classes.item}>
              <TextField
                id="email"
                label="Email Address"
                type="email"
                variant="outlined"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                style={{ marginTop: 30 }}
                color="primary"
                disableElevation
                onClick={handleSubmit}
              >
                Confirm
              </Button>
            </Grid>
            <Grid item className={classes.item}>
              <Typography color="secondary">
                <Link to="/signup">Sign Up</Link>
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </div>
    </form>
  );
}
