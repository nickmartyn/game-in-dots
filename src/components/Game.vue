<template>
  <div class="game-block">
    <div>
      <GameplayControls
        v-bind="{ gameSettings, gameStarted, gameFinished }"
        @gameModeSelected="onGameModeSelected($event)"
        @playerNameChanged="onPlayerNameChanged($event)"
        @startGame="onStartGame"
      />
      <Board
        v-bind="{ board, boardSize }"
        @playerClicked="onPlayerClicked($event)"
      />
    </div>
    <div>
      <LeaderBoard v-bind="{winners: winnersOrdered}"/>
    </div>
  </div>

</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import Board from './Board.vue';
import GameplayControls from './GameplayControls.vue';
import LeaderBoard from './LeaderBoard.vue';
import * as utils from '../utils';

export default {
  name: 'Game',
  components: {
    Board,
    GameplayControls,
    LeaderBoard,
  },
  data() {
    return {
      board: [],
      gameStarted: false,
      gameFinished: null,
      trapFocus: false,
      blue: 'hsl(204, 86%, 53%)',
      green: 'hsl(141, 71%, 48%)',
      red: 'hsl(348, 100%, 61%)',
    };
  },
  computed: {
    ...mapState([
      'gameSettings',
      'currentGameSettings',
      'playerName',
      'winners',
    ]),
    winnersOrdered() {
      return this.winners.slice().reverse();
    },
    boardSize() {
      const { field } = this.currentGameSettings;
      return Math.pow(field || 5, 2);
    },
  },
  methods: {
    ...mapActions([
      'fetchGameSettings',
      'sendWinnerToServer',
      'fetchWinners',
    ]),
    ...mapMutations([
      'setCurrentGameSettings',
      'setPlayerName',
    ]),
    onStartGame() {
      if (!this.playerName) {
        this.$buefy.toast.open('Please, enter your name');
        return;
      }
      if (!this.currentGameSettings.mode) {
        this.$buefy.toast.open('Please, select game mode');
        this.trapFocus = true;
        return;
      }
      if (this.gameFinished !== null) {
        this.initBoard();
      }
      setTimeout(() => this.startGame(), 700);
    },
    onGameModeSelected(payload) {
      this.setCurrentGameSettings(payload);
      this.initBoard();
    },
    onPlayerNameChanged(payload) {
      this.setPlayerName(payload);
    },
    onPlayerClicked(index) {
      const { color } = this.board[index];
      if (this.gameStarted
        && color !== this.red
        && color !== '') {
        this.board[index].color = this.green;
      }
    },
    startGame() {
      let counter = 0;
      let matchFinished = false;
      this.gameFinished = matchFinished;
      this.gameStarted = true;

      let winner;
      let winnerScore;
      let playerScore;
      let computerScore;

      const playProcess = () => {
        const { board } = this;
        let index;
        const getIndex = () => {
          return utils.getRandomInt(0, this.boardSize - 1);
        };

        const getAvailableIndex = () => {
          index = getIndex();
          if (board[index].marked) {
            getAvailableIndex();
          }
        };

        getAvailableIndex();

        this.board[index].color = this.blue;
        setTimeout(() => {
          if (this.board[index].color === this.blue) {
            this.board[index].color = this.red;
          }
          this.board[index].marked = true;
          counter++;
          calculateResults();
          if (counter < this.board.length && !matchFinished) {
            playProcess();
          } else {
            calculateResults();
            finishGame(winner);
            showMessage(winner, winnerScore);
          }
        }, this.currentGameSettings.delay);
      };

      const finishGame = (winnerName) => {
        console.log('WinnerName', winnerName)
        winnerScore = winner === this.playerName ? playerScore : computerScore;
        const date = utils.getFormattedDate();
        this.sendWinnerToServer({ winner: winnerName, date });
        this.gameStarted = false;
        this.gameFinished = true;
      };

      const showMessage = (name, score) => {
        let message;
        let type;
        const duration = 5000;
        if (name === this.playerName) {
          message = `Congratulations! You won the game!  with score ${score}`;
          type = 'is-success';
        } else {
          message = `Computer won with score ${score}`;
          type = 'is-danger';
        };

        this.$buefy.toast.open({
          message,
          type,
          duration,
        });

        console.log('ShowMessage', winner);
        console.log(`${name} won with score ${score}`);
      };

      const calculateResults = () => {
        const getScore = color => this.board.filter(el => el.color === color).length;
        playerScore = getScore(this.green);
        computerScore = getScore(this.red);
        const winPoint = Math.ceil((this.boardSize) / 2);

        if (playerScore >= winPoint) {
          matchFinished = true;
          winner = this.playerName;
        } else if (computerScore >= winPoint) {
          matchFinished = true;
          winner = this.playerName;
        }

        if (!matchFinished) {
          console.log('!matchFinished, returning');
          return;
        }
        console.log('matchFinished');

        if (playerScore > this.boardSize) {
          winner = this.playerName;
          matchFinished = true;
        } else if (computerScore > this.boardSize) {
          winner = 'computer';
          matchFinished = true;
        }
        if (playerScore > computerScore) {
          winner = this.playerName;
          matchFinished = true;
        } else if (playerScore < computerScore) {
          winner = 'computer';
          matchFinished = true;
        } else {
          alert('Draw!');
        }
      };

      playProcess();
    },
    initBoard() {
      console.log('initBord');
      const { boardSize } = this;
      this.board = new Array(boardSize).fill(null).map(() => ({ color: '' }));
    },
  },
  created() {
    this.fetchGameSettings();
    this.fetchWinners();
    this.initBoard();
  },
};
</script>

<style lang="scss" scoped>
  .game-block {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    padding: 40px 0;
    flex-wrap: wrap;
    & > div {
      padding: 5px;
    }
  }
</style>
