import React from "react";

import { FirebaseAuthConsumer } from "@react-firebase/auth";
import * as firebase from "firebase/app";
import Button from "@material-ui/core/Button";

import { signIn, signOut } from "../firebase-auth/";
export const AuthAction = () => (
  <FirebaseAuthConsumer>
    {({ isSignedIn }) =>
      isSignedIn ? (
        <Button
          color="inherit"
          onClick={async () => {
            await signOut(firebase);
          }}
        >
          Signout
        </Button>
      ) : (
        <Button
          color="inherit"
          onClick={async () => {
            await signIn({ firebase });
          }}
        >
          Login With Github
        </Button>
      )
    }
  </FirebaseAuthConsumer>
);
