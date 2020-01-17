<template>
  <div class="board-square"
       :style="{ backgroundColor: color }">
  </div>
</template>

<script>
export default {
  name: 'BoardSquare',
  props: {
    color: {
      type: String,
      required: false,
      default: '#fff',
    },
    index: null,
  },
};
</script>

<style scoped lang="scss">
  .board-square {
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    border: 1px solid #ccc9;
    cursor: pointer;
    &:hover {
      background-color: #f5f5f5;
    }
  }
</style>
