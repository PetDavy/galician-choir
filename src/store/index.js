import { createStore } from 'vuex';

export default createStore({
  state: {
    isMenuOpen: false,
  },
  mutations: {
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    isMenuOpen: (state) => state.isMenuOpen,
  },
});
