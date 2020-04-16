import firebase from "firebase/app";

export const getFirebaseDatabase = () => {
  const db = process.browser
    ? firebase.database()
    : ({ ref: () => {} } as firebase.database.Database);
  return db;
};

export const getFirebaseAuth = () => {
  const auth = process.browser
    ? firebase.auth()
    : ({ onAuthStateChanged: (...a:any) => {} } as firebase.auth.Auth);
  return auth;
};
