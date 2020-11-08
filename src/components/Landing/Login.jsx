import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { Grid, Paper, Typography, Divider } from "@material-ui/core";
import { useStore } from 'react-redux'
import { loginSuccess, loginFailure } from "../../redux/actions/authAction";


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
  main: {
    // position: "absolute",
    // left: "50%",
    // top: "50%",
    // transform: "translate(-50%, -50%)",
    padding: "10%",
  },
}));

export default function Login() {
  const classes = useStyles();

  const store = useStore()
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false)

  const handleSubmit = () => {
    setDisabled(true)
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        console.log(error.message);
      });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch(loginSuccess())
        history.push("/map"); //After successful login, user will be redirected to map
        console.log("logged in")
      } else {
        console.log("logged out")
      }
    });
    
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid
          container
          className={classes.main}
          direction="row"
          alignItems="center"
          justify="space-between"
        >
        <Grid container item xs={10} lg={6}>
          <Typography variant='h2' component='h2' color='secondary' gutterBottom>Welcome!</Typography>
          <Typography variant='p' component='p' align='justify' color='secondary'  gutterBottom>This web application is the culmination of a year’s work on machine learning with satellite data by a group of 
            Innovation and Design Programme (iDP) students from the National University of Singapore (NUS). 
            Our team consists of Keerthika Reddy, Khairul Iman, Tessa Zhang and Chen Chih Chieh from Electrical and Computer Engineering.</Typography>
          <Divider variant='middle' light/>
          <Typography variant='p' component='p' align='justify' color='secondary'  gutterBottom>You are welcome to explore the potential of renewable energy for any place across the world with our web application. 
            Our energy predictions are currently at an accuracy of ~70%, for three types of renewable energy: Solar, Wind and Geothermal.</Typography>
          <Divider variant='middle' light/>
          <Typography variant='p' component='p' align='justify' color='secondary' gutterBottom>There are only 3 steps to getting an energy prediction for your desired location. 
            Simply login (or sign up as a new user) with your credentials, click on a location with our map and choose the type of 
            renewable energy plant you are interested in getting a prediction for.</Typography>
        </Grid>
        <Grid
          container item xs={10} lg={5}
          direction="column"
          alignItems="center"
          justify="space-between"
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
                disabled={disabled}
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
        </Grid>

    </form>
  );
}
