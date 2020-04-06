import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  appBar: {
    background: '#000000'
  }
}))

export const Header = () => {
  const classes = useStyles();
  return (
    <div> 
      <AppBar position="fixed" className={classes.appBar}>
        EG3301R Sample Web Page
      </AppBar>
    </div>
  )
}

export default Header;