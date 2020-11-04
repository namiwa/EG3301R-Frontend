import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
