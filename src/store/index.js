import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameSettings: {"easyMode":{"field":5,"delay":2000},"normalMode":{"field":10,"delay":1000},"hardMode":{"field":15,"delay":900}},
    currentGameSettings: {},
    playerName: '',
    apiBaseURL: 'https://starnavi-frontend-test-task.herokuapp.com',
    apiEndPoints: {
      gameSettings: 'game-settings',
      winners: 'winners',
    },
    winners: [],
  },
  getters: {

  },
  mutations: {
    setGameSettings(state, payload) {
      state.gameSettings = payload;
    },
    setCurrentGameSettings(state, mode) {
      if (mode in state.gameSettings) {
        state.currentGameSettings = { ...state.gameSettings[mode], mode };
      }
      console.log(state.currentGameSettings.mode);
    },
    setPlayerName(state, name) {
      state.playerName = name;
      console.log(state.playerName);
    },
    setWinners(state, payload) {
      state.winners = [...payload];
    },
  },
  actions: {
    async fetchGameSettings({ commit, state: { apiUrls } }) {
      // const { data } = await axios.get(apiUrls.gameSettings);
      const data = {
        easyMode: {
          field :5, delay: 2000,
        },
        normalMode:{"field":10,"delay":1000},
        hardMode:{"field":15,"delay":900}
      }

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
  modules: {

  },
});
