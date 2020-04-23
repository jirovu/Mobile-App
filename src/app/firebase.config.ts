import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyD_4sxtQIFtBCAGkthl4QtH27bqpzNzZGA',
  authDomain: 'myapp-5ee8c.firebaseapp.com',
  databaseURL: 'https://myapp-5ee8c.firebaseio.com',
  projectId: 'myapp-5ee8c',
  storageBucket: 'myapp-5ee8c.appspot.com',
  messagingSenderId: '80633445687',
  appId: '1:80633445687:web:f7bcec2637e5a5014a2eb2',
  measurementId: 'G-L5VH4NV8L1',
};
const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
