<script setup>
import {RouterLink } from 'vue-router';
import Header from './components/Header.vue';
import axios from 'axios';
</script>

<template>
  <div class="headerShow">
  <Header />
  </div>

  <div class="contentShow">
  <RouterView />
  </div>
</template>

<style lang="scss" scoped>
  .headerShow{
    width: 100vw;
    height: 15vh;
  }

  .contentShow{
    width: 100vw;
    height: 115vh;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    }
    // text-align: center;    //文字置中對齊
</style>
