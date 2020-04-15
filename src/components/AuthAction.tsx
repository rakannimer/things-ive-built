import React from "react";

import firebase from "firebase/app";
import Button from "@material-ui/core/Button";
import { getTestIdProp } from "../utils/test-id-prop";
import { signIn, signOut } from "../firebase-auth/";
import { useAuthState } from "react-firebase-hooks/auth";

export const AuthAction = () => {
  const [user] = useAuthState(firebase.auth());
  if (Boolean(user) === true) {
    return (
      <Button
        {...getTestIdProp("signout")}
        color="inherit"
        onClick={async () => {
          await signOut(firebase);
        }}
      >
        Sign Out
      </Button>
    );
  }
  return (
    <Button
      {...getTestIdProp("signin")}
      color="inherit"
      onClick={async () => {
        await signIn({ firebase });
      }}
    >
      Sign In
    </Button>
  );
};
