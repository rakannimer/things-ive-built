import { User } from "firebase";
import * as React from "react";
import { initializeFirebaseApp } from "initialize-firebase-app";

import { config } from "../config/config";

export const useFirebase = () => {
  const [firebase, setFirebase] = React.useState<
    null | typeof import("firebase")
  >(null);
  React.useEffect(() => {
    import("firebase/app").then(f => {
      setFirebase(f);
    });
  }, []);
  return firebase;
};

type FirebaseAuthState = {
  isAuthed: Boolean;
  user: User | null;
};
const reducer: React.Reducer<
  FirebaseAuthState,
  { newState: FirebaseAuthState }
> = (s, action) => {
  const { newState } = action;
  return newState;
};

export const useFirebaseAuth = () => {
  const firebase = useFirebase();
  const [state, dispatch] = React.useReducer(reducer, {
    isAuthed: false,
    user: null
  });
  React.useEffect(
    () => {
      if (firebase === null) return;
      initializeFirebaseApp({ firebase, ...config.client });
      const unsub = firebase
        .app()
        .auth()
        .onAuthStateChanged(user => {
          dispatch({
            newState: {
              isAuthed: !(user === null),
              user
            }
          });
        });
      return unsub;
    },
    [firebase]
  );

  return { ...state, firebase };
};
