import { createApp } from 'vue';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import App from './App.vue';
import router from './router';
import store from './store';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
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
