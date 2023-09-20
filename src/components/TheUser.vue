<script lang="ts" setup>
import type { State } from "../store";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore<State>();

const user = computed(() => store.state.user);
const status = computed(() => store.state.userStatus);
const error = computed(() => store.state.userError);
const searchValue = computed(() => store.state.searchValue);

const onBackClick = () => {
  store.commit("resetState");
};
</script>

<template>
  <div class="user">
    <button class="btn" @click="onBackClick" v-if="status !== 'nothing'">
      Сбросить
    </button>
    <div class="user__content" v-if="status === 'success' && user">
      <div class="wrapper">
        <div class="user__content-image">
          <img src="/images/no-image-big.png" alt="no-image" />
        </div>
        <div class="user__content-info">
          <h3 class="user__content-info__title">{{ user.name }}</h3>
          <p class="user__content-info__text">
            <b>email:</b> {{ user.email }}
          </p>
          <p class="user__content-info__text">
            <b>phone:</b> {{ user.phone }}
          </p>
          <h3 class="user__content-info__title">О себе:</h3>
          <p class="user__content-info__text">
            Данный сотрудник не предоставил информации о себе
          </p>
        </div>
      </div>
    </div>
    <div class="user__empty" v-else>
      <p v-if="searchValue && status === 'nothing'">
        Выберите сотрудника, чтобы посмотреть его профиль
      </p>
      <p v-if="!searchValue && status === 'nothing'">
        Для начала, найдите сотрудника, воспользовавшись поиском
      </p>
      <p v-if="status === 'loading'">Загружаем данные о сотруднике...</p>
      <p class="error" v-if="status === 'error' && error">
        Произошла ошибка: {{ error }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/variables";

p {
  color: #76787d;
  font-size: 14px;
  font-weight: 400;
}

.user {
  width: 100%;
  height: 100%;
  padding: $container-padding;
  &__content {
    width: 100%;
    height: 100%;

    .wrapper {
      width: inherit;
      height: inherit;
      padding: 20px 30px;
      display: flex;
      gap: 61px;
    }
    &-image {
      width: 424px;
      height: 286px;
      img {
        width: inherit;
        height: inherit;
        object-fit: cover;
      }
    }
    &-info {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
  &__empty {
    width: inherit;
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
