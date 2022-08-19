<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
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
