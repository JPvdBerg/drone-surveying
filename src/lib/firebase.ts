import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Public Firebase web config. These are identifiers, not secrets: access is
// controlled by Firestore security rules (see firestore.rules), so it's safe
// to ship them in the client bundle.
const firebaseConfig = {
  apiKey: 'AIzaSyB5kfBiw0X6hFITp0SnGqbmlLdspYlGCDo',
  authDomain: 'jdhoffman-aerial-solutions.firebaseapp.com',
  projectId: 'jdhoffman-aerial-solutions',
  storageBucket: 'jdhoffman-aerial-solutions.firebasestorage.app',
  messagingSenderId: '834849962143',
  appId: '1:834849962143:web:28aec1c1c1d0482038caaa',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
