import React from "react";

import { FirebaseAuthConsumer } from "@react-firebase/auth";
import * as firebase from "firebase/app";
import Button from "@material-ui/core/Button";
import { getTestIdProp } from "../utils/test-id-prop";
import { signIn, signOut } from "../firebase-auth/";
export const AuthAction = () => (
  <FirebaseAuthConsumer>
    {({ isSignedIn }) =>
      isSignedIn ? (
        <Button
          {...getTestIdProp("signout")}
          color="inherit"
          onClick={async () => {
            await signOut(firebase);
          }}
        >
          Sign Out
        </Button>
      ) : (
        <Button
          {...getTestIdProp("signin")}
          color="inherit"
          onClick={async () => {
            await signIn({ firebase });
          }}
        >
          Sign In
        </Button>
      )
    }
  </FirebaseAuthConsumer>
);
