const config = {
  server: {
    // Get from https://console.firebase.google.com/project/PROJECT_NAME/settings/serviceaccounts/adminsdk
    databaseURL: "databaseURL",
    credential: {
      type: "type",
      project_id: "project_id",
      private_key_id: "private_key_id",
      private_key: "private_key",
      client_email: "client_email",
      client_id: "client_id",
      auth_uri: "auth_uri",
      token_uri: "token_uri",
      auth_provider_x509_cert_url: "auth_provider_x509_cert_url",
      client_x509_cert_url: "client_x509_cert_url"
    }
  },

  client: {
    // Get from https://console.firebase.google.com/project/PROJECT_NAME/settings/general/
    apiKey: "apiKey",
    authDomain: "authDomain",
    databaseURL: "databaseURL",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId8"
  }
};

module.exports = { config };
