import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Grid, Typography } from '@material-ui/core';
import DataTable from './DataTable';

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
    padding: '10%',
  },
}));

export default function History() {
  const classes = useStyles();
  var [rows, setRows] = useState([
    {
      id: 1,
      date: 'null',
      location: 'lat, long',
      energyType: 'null',
      turbineType: '-',
      predVal: 0,
    },
  ]);
  const [loaded, setLoaded] = useState(false);

  function updateData(data) {
    if (data.val() != null) {
      const mappedData = data.val().predictions.map((pred, index) => ({
        id: index,
        date: pred.date,
        location: `${pred.location.lat}, ${pred.location.lng}`,
        energyType: pred.energyType,
        turbineType: pred.turbineType,
        predVal: pred.prediction,
      }));
      setRows(mappedData);
    }
  }

  useEffect(() => {
    var uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref('users/' + uid)
      .on('value', function (snapshot) {
        updateData(snapshot);
      });
  }, []);

  useEffect(() => {
    console.log(rows);
    if (rows !== undefined) {
      setLoaded(true);
    }
  }, [rows]);

  return (
    <Grid
      container
      className={classes.main}
      direction="row"
      alignItems="center"
      justify="space-between"
    >
      <Typography variant="h4" component="h4" color="secondary" gutterBottom>
        My Prediction History
      </Typography>
      {loaded && <DataTable rows={rows} />}
    </Grid>
  );
}
