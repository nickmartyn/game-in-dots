import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameSettings: {},
    currentGameSettings: {},
    playerName: '',
    apiBaseURL: 'https://starnavi-frontend-test-task.herokuapp.com',
    apiEndPoints: {
      gameSettings: 'game-settings',
      winners: 'winners',
    },
    winners: [],
  },
  getters: {},
  mutations: {
    setGameSettings(state, payload) {
      state.gameSettings = payload;
    },
    setCurrentGameSettings(state, mode) {
      if (mode in state.gameSettings) {
        state.currentGameSettings = { ...state.gameSettings[mode], mode };
      }
    },
    setPlayerName(state, name) {
      state.playerName = name;
    },
    setWinners(state, payload) {
      state.winners = [...payload];
    },
  },
  actions: {
    async fetchGameSettings({ commit, state: { apiBaseURL, apiEndPoints } }) {
      const { data } = await axios.get(`${apiBaseURL}/${apiEndPoints.gameSettings}`);
      commit('setGameSettings', data);
    },
    async fetchWinners({ state, state: { apiBaseURL, apiEndPoints } }) {
      const { data: winners } = await axios.get(`${apiBaseURL}/${apiEndPoints.winners}`);
      state.winners = [...winners];
    },
    async sendWinnerToServer({ state, state: { apiBaseURL, apiEndPoints } }, { winner, date }) {
      // axios.post(`${apiBaseURL}/${apiEndPoints.winners}`, {
      //   winner,
      //   date,
      // })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   }
      state.winners = [...state.winners, { winner, date }];
    },
  },
  modules: {},
});
