import { createApp } from 'vue';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import App from './App.vue';
import router from './router';
import store from './store';

const firebaseConfig = {
  apiKey: 'AIzaSyA1-ptnTpQ-W-_AKwGpSC1Mf4HI85UJ1A4',
  authDomain: 'galician-choir.firebaseapp.com',
  projectId: 'galician-choir',
  storageBucket: 'galician-choir.appspot.com',
  messagingSenderId: '532825033346',
  appId: '1:532825033346:web:cd8e4f925330021ed3829b',
  measurementId: 'G-MQ17VLCMJM',
};

initializeApp(firebaseConfig);
let isAppInitialized = false;

const auth = getAuth();
const db = getFirestore();
store.dispatch('updateDB', { db });
store.dispatch('updateAuth', { auth });

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch('updateLogedIn', { logedIn: true });
  } else {
    store.dispatch('updateLogedIn', { logedIn: false });
  }

  if (!isAppInitialized) {
    createApp(App).use(store).use(router).mount('#app');
    isAppInitialized = true;
  }
});
