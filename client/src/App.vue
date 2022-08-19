<script setup lang="ts">
import TheSidebar from './components/TheSidebar.vue';
import TheWorkspace from './components/TheWorkspace.vue';
</script>

<template>
  <div class="page-container">
    <TheSidebar></TheSidebar>
    <TheWorkspace></TheWorkspace>
  </div>

</template>

<style scoped>
@import './assets/styles/variables.css';

.page-container {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 300px auto;
}
</style>
