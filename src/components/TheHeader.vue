<script lang="ts" setup></script>

<template>
  <header class="header">
    <span class="logo">Жилфонд</span>
    <span class="username">Пользователь</span>
  </header>
</template>

<style lang="scss" scoped>
@import "../styles/palette.scss";

.header {
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  font-size: 32px;
  color: $red;
  font-weight: 700;
}

.username {
  color: #333;
  font-size: 16px;
  font-weight: 400;
}
</style>
