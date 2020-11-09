import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { LatLngContext } from './LatLngProvider';
import Maps from './Maps';
import firebase from 'firebase/app';

const drawerWidth = 240;

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

export const SidePanelMaps = React.memo(() => {
  const classes = useStyles();
  const [currentRenewable, setRenewable] = React.useState('');
  const { currentLatLng } = React.useContext(LatLngContext);

  const onRenewableClick = (renewableText) => {
    setRenewable(renewableText);
    console.log(currentRenewable);
    console.log(currentLatLng);
  };

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    setCurrentDate(date + '/' + month + '/' + year + ' ' + hours + ':' + min);
  }, []);

  const [turbine, setTurbine] = React.useState('');

  const handleTurbine = (event) => {
    setTurbine(event.target.value);
    console.log(turbine);
  };

  const handlePredict = (event) => {
    var predVal = 90;
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
        prediction: predVal,
      });

    firebase
      .database()
      .ref('users/' + uid)
      .child('index')
      .set(firebase.database.ServerValue.increment(1));
  };
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          {['Solar', 'Wind', 'Hydro', 'Geothermal'].map((text, index) => (
            <ListItem button key={text} onClick={() => onRenewableClick(text)}>
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
          {['Get Data', 'Get Prediction', 'Save Results'].map((text, index) => (
            <ListItem button key={text} onClick={handlePredict}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.toolbar} />
      <Maps />
    </div>
  );
});

export default SidePanelMaps;
