import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, remove, onValue } from 'firebase/database';

// ============================================
// FIREBASE CONFIGURATION
// ============================================
// To set up your own Firebase (FREE):
// 1. Go to https://console.firebase.google.com/
// 2. Click "Create a project" (or "Add project")
// 3. Give it a name (e.g., "my-recipe-book")
// 4. Disable Google Analytics (optional) and click Create
// 5. Once created, click on "Realtime Database" in the left menu
// 6. Click "Create Database"
// 7. Choose a location, then select "Start in TEST MODE" and click Enable
// 8. Go to Project Settings (gear icon) → scroll down to "Your apps"
// 9. Click the </> (web) icon to add a web app
// 10. Register the app and copy the firebaseConfig values below
// ============================================

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

let app = null;
let database = null;
let recipesRef = null;

const isConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";

if (isConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    database = getDatabase(app);
    recipesRef = ref(database, 'recipes');
    console.log('✅ Firebase connected - Recipes will sync across all users!');
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
} else {
  console.log('⚠️ Firebase not configured - See src/firebase/config.js for setup instructions.');
}

export { database, recipesRef, isConfigured };
export { ref, push, set, remove, onValue };
