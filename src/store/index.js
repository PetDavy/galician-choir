import { createStore } from 'vuex';

export default createStore({
  state: {
    isMenuOpen: false,
    auth: null,
    db: null,
    logedIn: false,
    events: [], // event: {id: string, title: string, time: timestamp, img: string, link: string, text: string}
    isModalFormOpen: false,
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
    updateLogedIn(state, payload) {
      state.logedIn = payload.logedIn;
    },
    updateIsModalFormOpen(state, payload) {
      state.isModalFormOpen = payload.isModalFormOpen;
    },
    setEvents(state, payload) {
      state.events = payload.events;
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
    events: (state) => state.events,
  },
});
