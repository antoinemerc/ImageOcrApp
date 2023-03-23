<script setup lang="ts">

import { reactive } from 'vue'
import WorkspaceItemImage from './WorkspaceItemImage.vue';
import { imageStore, errorStore } from '../services/stores';
import { ImageProperty } from '../models/ImageProperty';

interface ReactiveState {
}
const state: ReactiveState = reactive({
});

const workspaceItemDeleteItem = (imageProperty: ImageProperty) => {
  imageStore.deleteImageById(imageProperty.id);
  errorStore.resetActiveError();
}

const workspaceItemSelectItem = (imageProperty: ImageProperty, isSelected: boolean) => {
  imageStore.setImageSelected(imageProperty.id, isSelected);
  errorStore.resetActiveError();
}
</script>

<template>
  <div class="workspace-container">
    <WorkspaceItemImage v-for='(imageProperty, index) in imageStore.imageList'
                        :key='imageProperty.id'
                        :image-property="imageProperty"
                        :image-index="index"
                        @delete-item="workspaceItemDeleteItem(imageProperty)"
                        @select-item="workspaceItemSelectItem(imageProperty, $event)">
    </WorkspaceItemImage>
  </div>
</template>

<style scoped>

.workspace-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  gap: 5px;
  padding: 70px 5px 5px;
  --xy: 45% 90%;
  --b: 90deg;
  --a: 90deg;
  background: repeating-conic-gradient(from 90deg at 98% 98%,
      #ececec var(--a),
      #c7c7c7 0% 50%,
      #ececec 0% calc(180deg + var(--a)),
      #c7c7c7 0%);
  background-size: 30px 30px;
  overflow: auto;
}
</style>
