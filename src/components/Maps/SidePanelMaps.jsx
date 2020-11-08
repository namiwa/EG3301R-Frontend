import React from 'react';
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
  const [turbine, setTurbine] = React.useState('');

  const handleChange = (event) => {
    setTurbine(event.target.value);
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
                  onChange={handleChange}
                >
                  <MenuItem value={'Single flash'}>Single flash</MenuItem>
                  <MenuItem value={'Double flash'}>Double flash</MenuItem>
                  <MenuItem value={'ORC'}>ORC</MenuItem>
                  <MenuItem value={'Dry steam'}>Dry steam</MenuItem>
                </Select>
              ) : (
                null
              )}
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Get Data', 'Get Prediction', 'Save Results'].map((text, index) => (
            <ListItem button key={text}>
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
