<script lang="ts" setup>
import { useStore } from "vuex";
import type { State } from "../store";

interface ResultsItemProps {
  imgUrl?: string;
  name: string;
  email: string;
  id: number;
}

const store = useStore<State>();

const props = defineProps<ResultsItemProps>();
const { email, imgUrl = "", name, id } = props;

const onResultClick = () => {
  store.dispatch("fetchUserForUser", id);
};
</script>

<template>
  <div class="item" @click="onResultClick">
    <div class="item__image">
      <img v-if="imgUrl.length" :src="imgUrl" :alt="name + '-image'" />
      <img v-else src="src/assets/images/no-image.png" alt="no-image" />
    </div>
    <div class="item__info">
      <h3 class="item__info-title">{{ name }}</h3>
      <span class="item__info-email" :title="email">{{ email }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  cursor: pointer;
  display: grid;
  width: 100%;
  grid-template-columns: 70px 170px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  transition: background 0.2s ease-in-out;
  &:hover {
    background: #e0e0e0;
  }
  &__image {
    background: #fff;
    width: 100%;
    height: 100%;
    border-right: 1px solid #e0e0e0;
    img {
      object-fit: cover;
      width: inherit;
      height: inherit;
    }
  }
  &__info {
    padding: 15px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;

    &-title {
      color: #333;
      font-size: 14px;
      font-weight: 600;
    }
    &-email {
      display: block;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #76787d;
      font-size: 14px;
      font-weight: 400;
      text-transform: capitalize;
    }
  }
}
</style>
