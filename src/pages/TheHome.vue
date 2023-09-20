<script setup lang="ts">
import TheHeader from "../components/TheHeader.vue";
</script>

<template>
  <div class="container">
    <TheHeader />
    <main class="main"></main>
  </div>
</template>

<style scoped lang="scss">
.main {
  display: grid;
  grid-template-columns: 290px 1fr;
  min-height: 575px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
