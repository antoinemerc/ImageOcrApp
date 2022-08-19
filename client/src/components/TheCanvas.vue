<script setup lang="ts">

import { onMounted, reactive } from 'vue'

let vueCanvas: CanvasRenderingContext2D | null = null
const state = reactive({});

onMounted(() => {
  const canvas = document.getElementById("drawing-canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  vueCanvas = ctx;
})

</script>

<template>
  <canvas id="drawing-canvas"></canvas>
</template>

<style scoped>
#drawing-canvas {
  width: 100%;
  height: 100%;
}
</style>