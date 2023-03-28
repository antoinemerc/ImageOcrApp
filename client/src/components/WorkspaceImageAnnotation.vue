<script setup lang="ts">

import { reactive } from 'vue'
import { computedAsync } from '@vueuse/core'

interface ReactiveState { }
const state: ReactiveState = reactive({});

interface Props {
  displayedId: number;
}
const props = defineProps<Props>();

const imageSource = computedAsync<string>(
  async () => {
    return new Promise((resolve) => {/*
      var fr = new FileReader();

      fr.onload = () => {
        resolve(fr.result as string);
      }
      fr.readAsDataURL(props.imageProperty.file as Blob);*/
    });
  },
  '', undefined
);
</script>

<template>
  
</template>

<style scoped>
</style>
