import { createApp } from 'vue';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import App from './App.vue';
import router from './router';
import store from './store';

const firebaseConfig = {
  apiKey: 'AIzaSyC3Frt_pJFIrPpZuiwe6JeXTRS3sx9tkxo',
  authDomain: 'choir-e1c92.firebaseapp.com',
  projectId: 'choir-e1c92',
  storageBucket: 'choir-e1c92.appspot.com',
  messagingSenderId: '164178242525',
  appId: '1:164178242525:web:516f63b65002b615642434',
  measurementId: 'G-Z135Z4T2NC',
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
