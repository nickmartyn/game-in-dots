<template>
  <div class="leader-board">
    <h2 class="is-size-4">Leader Board</h2>
    <div>
      <div v-for="(winner, index) in winners" class="winner-item" :key="index">
        <span class="winner-name">{{ winner.winner }}</span>
        <span class="winner-date">{{ winner.date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeaderBoard',
  props: {
    winners: Array,
  },
};
</script>

<style scoped lang="scss">
  h2 {
    text-align: left;
    color: #2c3e50;
  }
  .winner-item {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 15px 20px;
    background: #cfd8dc;
    color: #2c3e50;
    margin-bottom: 5px;
  }
  .winner-name {
    padding-right: 7px;
  }
</style>
