<template>
  <div class="board">
    <div class="wrapper" :style="boardWidth">
    <template v-for="(item, index) in board">
      <BoardSquare
        :key="index"
        :index="index + 1"
        :color="item.color ? item.color : '#fff'"
        @click.native="handleSelect(index)"
      />
    </template>
    </div>
  </div>
</template>

<script>
import BoardSquare from './BoardSquare.vue';

export default {
  name: 'Board',
  components: { BoardSquare },
  props: {
    board: {
      type: Array,
      required: true,
    },
    boardSize: {
      type: Number,
      required: true,
    },
  },
  methods: {
    handleSelect(e) {
      this.$emit('playerClicked', e);
    },
  },
  computed: {
    boardWidth() {
      return `width: ${Math.sqrt(this.boardSize) * 40 }px`;
    },
  },
};
</script>

<style scoped lang="scss">
.board {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  .wrapper {
    border: 1px solid #ccc9;
    font-size: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    box-sizing: content-box;
  }
}

</style>
