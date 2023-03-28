<script setup lang="ts">

import { reactive } from 'vue';
import { stepsSkeleton } from '../services/steps.skeleton';

interface ReactiveState { }
const state: ReactiveState = reactive({});

interface Props { 
  activeStepId: number;
}
const props = defineProps<Props>();

</script>

<template>
  <div class="steps-container">
    <ul class="steps-list">
      <li v-for='(step, index) in stepsSkeleton'
                :key='step.id'
          @click="$emit('step-selected', step.id)"
          class="step-item"
          :class="{ 'item-selected': props.activeStepId === step.id }">
        {{ step.title }}  
      </li>
    </ul>

  </div>
</template>

<style scoped>
.steps-container {
  background-color: rgb(32, 32, 32);
}
.steps-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  justify-content: space-evenly;
}
.item-selected {
  color: rgb(0, 157, 255);
}

</style>
