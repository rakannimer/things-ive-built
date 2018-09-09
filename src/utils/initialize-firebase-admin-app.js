const firebase = require("firebase-admin");
// export type FirebaseCredential = {
//   type: string;
//   project_id: string;
//   private_key_id: string;
//   private_key: string;
//   client_email: string;
//   client_id: string;
//   auth_uri: string;
//   token_uri: string;
//   auth_provider_x509_cert_url: string;
// };

// export type InitializeAppArgs = {
//   firebase: typeof firebase;
//   databaseURL: string;
//   credential: FirebaseCredential;
// };
// export type InitializeApp = (args: InitializeAppArgs) => void;

const initializeApp = ({ firebase, databaseURL, credential }) => {
  try {
    firebase.initializeApp({
      databaseURL,
      credential: firebase.credential.cert(credential)
    });
    return;
  } catch (err) {
    if (err.code === "app/duplicate-app") {
      return;
    }
    throw err;
  }
};
module.exports = { initializeApp };
