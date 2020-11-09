import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Grid } from '@material-ui/core';
import { logoutSuccess, logoutFailure, viewData, viewMap } from '../../redux/actions/appAction';
import { useStore, connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function Header(props) {
  const classes = useStyles();

  const store = useStore();
  const history = useHistory();
  const isLoggedIn = props.isLoggedIn;
  const isBrowseData = props.isBrowseData;

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        store.dispatch(logoutSuccess());
        history.push('/');
      })
      .catch(function (error) {
        // An error happened.
        console.log(error.message);
        store.dispatch(logoutFailure());
      });
  };

  const handleViewData = () => {
    store.dispatch(viewData())
    history.push('/mydata');
  };

  const handleViewMap = () => {
    store.dispatch(viewMap())
    history.push('/map');
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

            <Grid item>
              {isLoggedIn && (
                <ButtonGroup>
                  {!isBrowseData && (
                    <Button onClick={handleViewData}>
                      <Typography color="secondary">My Data</Typography>
                    </Button>
                  )}
                  {isBrowseData && (
                    <Button onClick={handleViewMap}>
                      <Typography color="secondary">App</Typography>
                    </Button>
                  )}
                  <Button onClick={handleLogout}>
                    <Typography color="secondary">Log Out</Typography>
                  </Button>
                </ButtonGroup>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    isBrowseData: state.isBrowseData,
  };
};

export default connect(mapStateToProps)(Header);
