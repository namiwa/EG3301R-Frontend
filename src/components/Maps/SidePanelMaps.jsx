import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LatLngContext } from './LatLngProvider';
import Maps from './Maps';
import firebase from 'firebase/app';
import MenuItem from '@material-ui/core/MenuItem';
import {
  wind_prediction_url,
  solar_prediction_url,
  geothermal_prediction_url,
  fetcher,
} from '../../utils';

const drawerWidth = 240;

const renewable_types = ['Solar', 'Wind', 'Geothermal'];

const types_url_map = {
  Solar: solar_prediction_url,
  Wind: wind_prediction_url,
  Geothermal: geothermal_prediction_url,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: 64,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  selected: {
    backgroundColor: 'red',
  },
  notSelected: {
    backgroundColor: 'white',
  },
}));

export const SidePanelMaps = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [currentRenewable, setRenewable] = React.useState('');
  const { currentLatLng } = React.useContext(LatLngContext);
  const [prediction, setPrediction] = React.useState(0);
  const [isLoading, setLoading] = React.useState(false);

  const onRenewableClick = (renewableText) => {
    setLoading(true);
    setRenewable(renewableText);
    console.log(isLoading);
    if (renewableText in types_url_map) {
      const lat = currentLatLng.lat.toFixed(3);
      const lng = currentLatLng.lng.toFixed(3);
      let url = '';
      console.log(renewableText);
      if (renewableText === 'Geothermal') {
        url = types_url_map[renewableText](lat, lng, turbine);
        console.log(url);
      } else {
        url = types_url_map[renewableText](lat, lng);
      }
      console.log(url);
      fetcher(url).then((res) => {
        console.log(res);
        if ('prediction' in res) {
          if (renewableText === 'Solar') {
            setPrediction(res['prediction'] / 1000000);
          }
          if (renewableText === 'Wind') {
            setPrediction(res['prediction'] / 1000);
          }
          if (renewableText === 'Geothermal') {
            setPrediction(res['prediction']);
          }
        }
        setLoading(false);
      });
      console.log(prediction);
    }

    console.log(currentRenewable);
    console.log(currentLatLng);
  };

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setCurrentDate(date + '/' + month + '/' + year);
  }, []);

  const [turbine, setTurbine] = React.useState('');

  const handleTurbine = (event) => {
    setTurbine(event.target.value);
    console.log(turbine);
  };

  const handlePredict = (event) => {
    var predVal = prediction;
    var predIndex = 0;
    var uid = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref('users/' + uid)
      .on('value', function (snapshot) {
        predIndex = snapshot.val().index;
      });

    firebase
      .database()
      .ref('users/' + uid)
      .child('predictions')
      .child(predIndex)
      .update({
        date: currentDate,
        location: currentLatLng,
        energyType: currentRenewable,
        turbineType: turbine,
        prediction: predVal,
      });

    firebase
      .database()
      .ref('users/' + uid)
      .child('index')
      .set(firebase.database.ServerValue.increment(1));
  };
  return (
    <div className={classes.root} ref={ref}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          {renewable_types.map((text, index) => (
            <ListItem
              button
              key={text}
              onClick={() => {
                onRenewableClick(text);
              }}
            >
              <ListItemText primary={text} />
              {text === 'Geothermal' ? (
                <Select
                  labelId="name_turbine_type"
                  id="name_turbine_type"
                  value={turbine}
                  onChange={handleTurbine}
                >
                  <MenuItem value={'Single flash'}>Single flash</MenuItem>
                  <MenuItem value={'Double flash'}>Double flash</MenuItem>
                  <MenuItem value={'ORC'}>ORC</MenuItem>
                  <MenuItem value={'Dry steam'}>Dry steam</MenuItem>
                </Select>
              ) : null}
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Save Prediction'].map((text, index) => (
            <ListItem button key={text} onClick={handlePredict}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Typography variant="h1"> </Typography>
        <Typography>Potential Power in MWs: </Typography>
        {isLoading ? (
          <CircularProgress
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ) : (
          <Typography>
            {prediction || prediction === 0
              ? prediction.toFixed(2)
              : 'Something went wrong'}
          </Typography>
        )}
      </Drawer>
      <div className={classes.toolbar} />
      <Maps />
    </div>
  );
});

export default SidePanelMaps;
