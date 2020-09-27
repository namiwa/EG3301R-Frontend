import React, { useState, useRouter } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    marginTop: 100,
  },
}));

export default function Login() {
  const classes = useStyles();

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        console.log(error.message);
      });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.push("/app"); //After successful login, user will be redirected to home.html
      }
    });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="email"
          label="Email Address"
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button onClick={handleSubmit}>Login</Button>
        {/* <Redirect to={{ pathname: "/app" }} /> */}
      </div>
    </form>
  );
}
