<template>
  <div class="gameplay-controls">
    <div class="gameplay-controls--field">
      <Dropdown :items="Object.keys(gameSettings)"
                :gameStarted="gameStarted"
                @gameModeSelected="$emit('gameModeSelected', $event)"/>
    </div>
    <div class="gameplay-controls--field">
      <b-field
        :type="isPlayerNameValid ? validationType : ''"
        :message="isPlayerNameValid ? validationMessage : ''">
        <b-input
          v-model="playerName"
          placeholder="Enter your name"
          @blur="handlePlayerNameInput"
        />
      </b-field>
    </div>
    <div class="gameplay-controls--button">
      <b-button
        type="is-success"
        @click="$emit('startGame')"
        :disabled="gameStarted || isPlayerNameValid">
        Play {{ gameFinished ? 'Again' : '' }}
      </b-button>
    </div>
  </div>
</template>

<script>
import Dropdown from './Dropdown.vue';

export default {
  name: 'GamePlayControls',
  components: { Dropdown },
  props: {
    gameSettings: {
      type: Object,
      required: true,
    },
    gameStarted: {
      type: Boolean,
      required: false,
      default: false,
    },
    gameFinished: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      playerName: '',
      playerNameTouched: false,
      validationType: 'is-danger',
      validationMessage: 'Name has to be minimum <br>of 3 characters',
    };
  },
  computed: {
    isPlayerNameValid() {
      return this.playerNameTouched && this.playerName.length < 3;
    },
  },
  methods: {
    handlePlayerNameInput() {
      this.playerNameTouched = true;
      this.$emit('playerNameChanged', this.playerName);
    },
  },
  beforeMount() {
    this.$emit('playerNameChanged', this.playerName);
  },
};
</script>

<style scoped lang="scss">
.gameplay-controls {
  padding: 0 25px 25px;
  display: flex;
  flex-flow: row wrap;
}
.gameplay-controls--field {
  padding: 5px 0;
  min-width: 100px;
  max-width: 200px;
  margin-right: 5px;
}
.gameplay-controls--button {
  padding: 5px 0;
}
.button {
  min-width: 100px;
}
</style>
