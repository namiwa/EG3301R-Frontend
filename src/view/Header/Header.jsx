import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: '#000000',
  }
}))

export const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}> 
      <AppBar position="fixed" className={classes.appBar}>
        <br/>
        EG3301R Sample Web Page
        <br/>
        <br/>
      </AppBar>
    </div>
  )
}

export default Header;