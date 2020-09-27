import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "@material-ui/core/Link";
import { Link as RouterLink, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menueButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
        history.push("/");
      })
      .catch(function (error) {
        // An error happened.
        console.log(error.message);
      });
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            EG3301R ASI-304 Sample Demo Site
          </Typography>
          <Button>
            <Link component={RouterLink} to="/futurework">
              <Typography color="textPrimary"> Future Work </Typography>
            </Link>
          </Button>
          <Button onClick={handleLogout}>
            <Typography color="textPrimary">Log Out</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
