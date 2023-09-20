<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { type State } from "../store";
import { searchFormatter } from "../utils";

const store = useStore<State>();

const searchValue = computed({
  get() {
    return store.state.searchValue ?? "";
  },
  set(value) {
    store.commit("changeSearch", searchFormatter(value));
  },
});
</script>

<template>
  <input
    class="search"
    type="text"
    v-model="searchValue"
    placeholder="Введите Id или имя "
  />
</template>

<style lang="scss" scoped>
.search {
  width: 100%;
  outline: none;
  padding: 16px;
  font-size: 14px;
  border-radius: 8px;
  font-weight: 400;
  border: 1.5px solid #e9ecef;
}
</style>
