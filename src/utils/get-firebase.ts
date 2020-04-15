import firebase from "firebase/app";

export const getFirebaseDatabase = () => {
  const db = process.browser
    ? firebase.database()
    : ({ ref: () => {} } as firebase.database.Database);
  return db;
};
