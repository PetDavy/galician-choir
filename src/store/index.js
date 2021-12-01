import { createStore } from 'vuex';

export default createStore({
  state: {
    isMenuOpen: false,
    auth: null,
    db: null,
    storage: null,
    logedIn: false,
    events: [], // event: {id: string, title: string, time: timestamp, img: string, imgName: string, link: string, text: string}
    aboutBlocks: [], // block {id, grand-title, title, sub-title, text, img} <string>
    isModalFormOpen: false,
    locale: 'ua',
    storedPhotos: [],
    uploadedPhotos: [],
  },
  mutations: {
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
    updateIsWaitingAuthState(state, payload) {
      state.isWaitingAuthState = payload.isWaitingAuthState;
    },
    updateAuth(state, payload) {
      state.auth = payload.auth;
    },
    updateDB(state, payload) {
      state.db = payload.db;
    },
    updateStorage(state, payload) {
      state.storage = payload.storage;
    },
    updateLogedIn(state, payload) {
      state.logedIn = payload.logedIn;
    },
    updateIsModalFormOpen(state, payload) {
      state.isModalFormOpen = payload.isModalFormOpen;
    },
    setLocale(state, payload) {
      state.locale = payload.locale;
    },
    setEvents(state, payload) {
      state.events = payload.events;
    },
    setAboutBlocks(state, payload) {
      state.aboutBlocks = payload.aboutBlocks;
    },
    addStoredPhoto(state, payload) {
      state.storedPhotos = [...state.storedPhotos, payload.newPhoto];
    },
    addUploadedPhoto(state, payload) {
      state.uploadedPhotos = [...state.uploadedPhotos, payload.uploadedPhoto];
    },
  },
  actions: {
    updateLogedIn(context, payload) {
      context.commit('updateLogedIn', payload);
    },
    updateDB(context, payload) {
      context.commit('updateDB', payload);
    },
    updateAuth(context, payload) {
      context.commit('updateAuth', payload);
    },
  },
  modules: {
  },
  getters: {
    isMenuOpen: (state) => state.isMenuOpen,
    isModalFormOpen: (state) => state.isModalFormOpen,
    logedIn: (state) => state.logedIn,
    auth: (state) => state.auth,
    db: (state) => state.db,
    storage: (state) => state.storage,
    events: (state) => state.events,
    aboutBlocks: (state) => state.aboutBlocks,
    locale: (state) => state.locale,
    storedPhotos: (state) => state.storedPhotos,
    uploadedPhotos: (state) => state.uploadedPhotos,
  },
});
