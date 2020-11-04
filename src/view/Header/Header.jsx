import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        history.push('/');
      })
      .catch(function (error) {
        // An error happened.
        console.log(error.message);
      });
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h6">
                ASI-304 Intelligent Renewable Energy Prediction
              </Typography>
            </Grid>

            {/* if user is logged in, hide these */}
            <Grid item>
              <Button>
                <Link component={RouterLink} to="/futurework">
                  <Typography color="secondary">Future Work</Typography>
                </Link>
              </Button>
              <Button onClick={handleLogout}>
                <Typography color="secondary">Log Out</Typography>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
