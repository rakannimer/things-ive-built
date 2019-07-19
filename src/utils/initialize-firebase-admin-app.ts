import firebaseAdmin from "firebase-admin";

export const initializeApp = ({
  firebase = firebaseAdmin,
  databaseURL,
  credential
}) => {
  try {
    firebase.initializeApp({
      databaseURL,
      credential: firebaseAdmin.credential.cert(credential)
    });
    return;
  } catch (err) {
    if (err.code === "app/duplicate-app") {
      return;
    }
    throw err;
  }
};
