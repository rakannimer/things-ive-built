import React from "react";

import { FirebaseAuthConsumer } from "@react-firebase/auth";
import * as firebase from "firebase/app";
import Button from "@material-ui/core/Button";

export const AuthAction = () => (
  <FirebaseAuthConsumer>
    {({ isSignedIn }) =>
      isSignedIn ? (
        <Button
          color="inherit"
          onClick={async () => {
            await firebase.auth().signOut();
          }}
        >
          Signout
        </Button>
      ) : (
        <Button
          color="inherit"
          onClick={async () => {
            const provider = new firebase.auth.GithubAuthProvider();
            await firebase.auth().signInWithPopup(provider);
          }}
        >
          Login With Github
        </Button>
      )
    }
  </FirebaseAuthConsumer>
);
