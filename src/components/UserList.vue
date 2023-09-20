<script lang="ts" setup>
import type { State } from "../store";
import { computed } from "vue";
import { useStore } from "vuex";
import UserListItem from "./UserListItem.vue";

const store = useStore<State>();

const results = computed(() => store.state.results);
const status = computed(() => store.state.resultsStatus);
const error = computed(() => store.state.resultsError);

const onBtnClick = () => {
  store.commit("resetState");
};
</script>

<template>
  <div class="results">
    <div
      v-if="status === 'success' && results?.length"
      class="results__content"
    >
      <UserListItem
        v-for="result in results"
        :key="result.id"
        :email="result.email"
        :name="result.name"
        :id="result.id"
      />
    </div>
    <div
      v-else-if="status === 'success' && !results?.length"
      class="results__empty"
    >
      <p>Ничего не найдено</p>
    </div>
    <div v-else-if="status === 'nothing'" class="results__empty">
      <p>Для начала, воспользуйтесь поиском</p>
    </div>
    <div v-if="status === 'error'" class="error">
      <p>Произошла ошибка: {{ error }}</p>
    </div>
    <div v-if="status === 'loading'">
      <p>Загрузка...</p>
    </div>
    <button
      class="btn results__btn"
      v-if="status === 'error'"
      @click="onBtnClick"
    >
      Сбросить
    </button>
  </div>
</template>

<style lang="scss" scoped>
p {
  color: #76787d;
  font-size: 14px;
  font-weight: 400;
}
.results {
  width: 100%;
  &__content {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }
  &__btn {
    margin-top: 10px;
    margin-left: 0;
  }
}
</style>
