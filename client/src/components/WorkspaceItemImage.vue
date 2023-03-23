<script setup lang="ts">

import { reactive } from 'vue'
import { ImageProperty } from '../models/ImageProperty.js';
import { computedAsync } from '@vueuse/core'
import { computed } from '@vue/reactivity';

interface ReactiveState { }
const state: ReactiveState = reactive({});

interface Props {
  imageProperty: ImageProperty;
  imageIndex: number;
}
const props = defineProps<Props>();

const displayedId = computed(() => {
  return props.imageIndex !== undefined ? props.imageIndex + 1 : 0;
});

const imageSource = computedAsync<string>(
  async () => {
    return new Promise((resolve) => {
      var fr = new FileReader();

      fr.onload = () => {
        resolve(fr.result as string);
      }
      fr.readAsDataURL(props.imageProperty.file as Blob);
    });
  },
  '', undefined
);
</script>

<template>
  <div class="item-container"
       :class="{ 'item-selected': props.imageProperty.selected }">
    <div class="image-title">
      {{ displayedId }} - {{ props.imageProperty.file.name }}
    </div>
    <div class="image-content">
      <img class="image-test"
           v-bind:src="imageSource" />
    </div>
    <div class="button-container">
      <input type="checkbox"
             :checked="props.imageProperty.selected"
             @change="$emit('select-item', ($event.target as HTMLInputElement).checked)" />
      <button class="delete-button"
              @click="$emit('delete-item')">X</button>
      <div class="processed-indicator"></div>
    </div>

  </div>
</template>

<style scoped>
.item-container {
  display: flex;
  position: relative;
  height: 400px;
  width: 300px;
}

.image-content {
  height: 400px;
  width: 300px;
  display: flex;
  justify-content: center;
}

.image-title {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgb(var(--main-accent-color));
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 10px);
  display: block;
  padding: 2px 5px;
  z-index: 10;
}

.image-title:hover {
  white-space: unset;
  text-overflow: unset;
}

.item-container {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.1s ease-in-out;
}

.item-container::after {
  content: "";
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  width: 100%;
  height: 100%;
  position: absolute;
}

.item-container:hover::after {
  opacity: 1;
}

.item-container:hover>.button-container {
  opacity: 1;
}

.item-container.item-selected {
  transition: box-shadow 0.1s ease-in-out;
  box-shadow: 0 0px 5px 2px rgb(0, 157, 255);
}

.button-container {
  position: absolute;
  top: 0;
  right: -30px;
  width: 30px;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  background-color: rgb(52, 52, 52);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 0px 7px 7px 0px;
  box-shadow: 8px 8px 15px 0px rgba(0, 0, 0, 0.3);
  padding: 5px 0px 0px;
}
</style>
