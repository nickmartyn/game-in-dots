<template>
  <b-dropdown
    v-model="selected"
    :disabled="gameStarted"
    aria-role="list"
    @change="$emit('gameModeSelected', $event)">
    <button class="button dropdownButton is-primary" type="button" slot="trigger">
      <template v-if="selected">
        <span>{{ selected.replace('Mode', '') }}</span>
      </template>
      <template v-else>
        <span>Select Game Mode</span>
      </template>
      <b-icon icon="menu-down"></b-icon>
    </button>

    <template v-for="(item, index) in items">
      <b-dropdown-item :value="item" aria-role="listitem" :key="index">
        <div class="media">
          <b-icon class="media-left" icon="earth"/>
          <div class="media-content">
            <h3>{{ item.replace('Mode', '') }}</h3>
          </div>
        </div>
      </b-dropdown-item>
    </template>

  </b-dropdown>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    items: {
      type: Array,
      required: true,
    },
    gameStarted: {
      type: Boolean,
    },
  },
  data() {
    return {
      selected: '',
    };
  },
};

</script>

<style lang="scss">
button.dropdownButton {
  min-width: 200px;
  justify-content: space-between;
}
</style>
