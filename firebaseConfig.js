const admin = require('firebase-admin');
require('dotenv').config();

const connectFirebase = () => {
  try {
    // Check if Firebase is already initialized
    if (admin.apps.length > 0) {
      console.log('🔥 Firebase already initialized');
      return admin.firestore();
    }

    // Initialize Firebase with credentials from environment variables
    const serviceAccount = {
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(process.env.FIREBASE_CLIENT_EMAIL)}`,
      universe_domain: "googleapis.com"
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });

    console.log('🔥 Firebase Connected Successfully!');
    console.log('📊 Project ID:', process.env.FIREBASE_PROJECT_ID);
    console.log('📧 Client Email:', process.env.FIREBASE_CLIENT_EMAIL);
    return admin.firestore();
    
  } catch (error) {
    console.error('❌ Firebase Connection Error:', error.message);
    console.log('🔧 Please check your Firebase credentials');
    process.exit(1);
  }
};

module.exports = connectFirebase;