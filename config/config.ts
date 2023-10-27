export const Config =  {
    firebase: {
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      client_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      project_id: process.env.FIREBASE_PROJECT_ID,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      type: process.env.FIREBASE_ACCOUNT_TYPE,
    },
    port: process.env.PORT || 9001
  }