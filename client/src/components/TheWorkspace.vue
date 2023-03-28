<script setup lang="ts">

import { reactive } from 'vue'
import WorkspaceItemImage from './WorkspaceItemImage.vue';
import TheWorkspaceSteps from './TheWorkspaceSteps.vue';
import { imageStore, errorStore, workspaceStepStore } from '../services/stores';
import { ImageProperty } from '../models/ImageProperty';
import { ValidSteps } from '../services/steps.skeleton';
import WorkspaceImageAnnotation from './WorkspaceImageAnnotation.vue';

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
const workspaceStepStepSelected = (stepId: number) => {
  workspaceStepStore.setStepById(stepId)
}
</script>

<template>
  <div class="workspace-container">
      <TheWorkspaceSteps :active-step-id="workspaceStepStore.activeStep"
                          @step-selected="workspaceStepStepSelected($event)">
        </TheWorkspaceSteps>
      <div class="item-image-container" v-show="workspaceStepStore.activeStep === ValidSteps.IMAGE_SELECTION_STEP">
        <WorkspaceItemImage v-for='(imageProperty, index) in imageStore.imageList'
                            :key='imageProperty.id'
                            :image-property="imageProperty"
                            :image-index="index"
                            @delete-item="workspaceItemDeleteItem(imageProperty)"
                            @select-item="workspaceItemSelectItem(imageProperty, $event)">
        </WorkspaceItemImage>
      </div>
      <div class="" v-show="workspaceStepStore.activeStep === ValidSteps.TEXT_ANNOTATION_STEP">
          <WorkspaceImageAnnotation :displayed-id="0">
          </WorkspaceImageAnnotation>
        </div>
      
  </div>
</template>

<style scoped>
.item-image-container {
  display: grid;
  gap: 5px;
  padding: 5px;
  grid-template-columns: repeat(auto-fill, 300px);
  overflow: auto;
}

.workspace-container {
  --xy: 45% 90%;
  --b: 90deg;
  --a: 90deg;
  background: repeating-conic-gradient(from 90deg at 98% 98%,
      #ececec var(--a),
      #c7c7c7 0% 50%,
      #ececec 0% calc(180deg + var(--a)),
      #c7c7c7 0%);
  background-size: 30px 30px;
}
</style>
