<script setup lang="ts">

import { reactive } from 'vue'
import { ImageProperty } from '../models/ImageProperty';
import { HttpRequest } from '../services/http-request';
import { imageStore, errorStore, ErrorTypes, workspaceStepStore } from '../services/stores';
import { saveAs } from 'file-saver';

interface ReactiveState {
  directDownload: boolean;
}
const state: ReactiveState = reactive({
  directDownload: false,
});

const sidebarItemDeleteItem = (imageProperty: ImageProperty) => {
  imageStore.deleteImageById(imageProperty.id);
  errorStore.resetActiveError();
}

const sidebarItemSelectItem = (imageProperty: ImageProperty, isSelected: boolean) => {
  imageStore.setImageSelected(imageProperty.id, isSelected);
  errorStore.resetActiveError();
}

const sidebarSendAllImages = async () => {
  const selectedImages = imageStore.imageList.filter(image => image.selected);

  if (selectedImages.length === 0 && !errorStore.activeError.some(error => error.id === ErrorTypes.MINIMUM_IMAGE_ERROR))
    errorStore.setMinimumImageError();
  
  if (errorStore.activeError.length !== 0) {
    alert('The images cannot be sent in this state, please review error summary');
    return;
  }

  const formData = new FormData();

  selectedImages.forEach(selectedImage => {
    formData.append(`imagesToAnnotate`, selectedImage.file, selectedImage.file.name)
  });

  const httpClient = new HttpRequest();
  const response = await httpClient.post('gc/annotate-images', { body: formData })
  
  if (response.ok) {
    const annotations = await response.json();
    const fileName = `pictureAnnotations-${new Date().toISOString()}.json`;
    const fileToSave = new Blob([JSON.stringify(annotations)], {
      type: 'application/json'
    });

    if (state.directDownload === true) {
      saveAs(fileToSave, fileName);
    } else {
      workspaceStepStore.goToNextStep();
    }
  } else {
    console.log("error")
    // add a notification error
  }  
}

// No upsert yet, if double are uploaded it's the users fault
const handleFilesChanged = (files: File[]) => {
  const newImageProperties = files.map((data: File) => {
    return new ImageProperty({ id: Date.now() + Math.random(), file: data, displayName: data.name });
  });
  imageStore.addBulkImage(newImageProperties);
  errorStore.resetActiveError();
}

</script>

<template>
  <div class="sidebar-container">
    <img class="logo"
         src="../assets/vue.svg"
         alt="Logo tool" />
    <div class="sidebar-item-container">
      <FileSelector accept-extensions=".jpg,.svg,.png"
                    :multiple="true"
                    @changed="handleFilesChanged">
        Import Images
      </FileSelector>
    </div>
    <div class="sidebar-item-container">
      <ul class="filename-list">
        <li v-for='(imageProperty, index) in imageStore.imageList'
            :key='imageProperty.id'
            class="filename-item">
          <button class="delete-button"
                  @click="sidebarItemDeleteItem(imageProperty)">X
          </button>
          <div class="picture-name"
               :title="`${index + 1} - ${imageProperty.file.name}`">
            {{ index + 1 }} - {{ imageProperty.file.name }}
          </div>
          <!-- ok button -->
          <div class="picture-selected">
            <input type="checkbox"
                   :checked="imageProperty.selected"
                   @change="sidebarItemSelectItem(imageProperty, ($event.target as HTMLInputElement).checked)" />
          </div>
        </li>
      </ul>
    </div>
    <div class="sidebar-item-container sidebar-bottom">
      <div class="sidebar-bottom-information">
        <div class="send-hint">Send selected pictures to Google Vision</div>
        <div>
          <input type="checkbox"
                  v-model="state.directDownload" 
                  class="direct-download-checkbox"/>
          <span>Direct raw google vision data download</span>
        </div>
        <div v-if="errorStore.activeError.length !== 0"
             class="error-summary-container">
          <span class="error-summary-title">Error Summary</span>
          <ul class="error-summary-list">
            <li v-for='(activeError, index) in errorStore.activeError'
                :key='activeError.id'>
              <span class="error-item-title">{{ activeError.title }}:</span>
              <span class="error-item-message"> {{ activeError.message }}</span>
            </li>
          </ul>
        </div>
        <div>
          <button @click="sidebarSendAllImages()">Send</button>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.sidebar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: rgba(var(--main-accent-color), 1);
}

.sidebar-item-container {
  padding: 10px 5px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.sidebar-item-container::before {
  content: "";
  width: 80%;
  height: 1px;
  z-index: 99999;
  border-bottom: solid 1px #ececec;
  position: absolute;
  top: 0;
}

.sidebar-bottom {
  margin-top: auto;
}

.filename-list {
  list-style: none;
  padding-left: 0;
  width: 100%;
}

.filename-item {
  display: flex;
  flex-direction: row;
}

.picture-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80%;
}

.send-hint {
  padding: 0px 10px;
}

.error-summary-container {
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  color: var(--danger-color);
}

.error-summary-title {
  font-weight: bold;
}
.error-summary-list {
  padding: 0;
  list-style-type: none;

}
.error-item-title {
  font-weight: bold;
  padding-right: 5px;
}
.sidebar-bottom-information {
  width: 100%;
}

.sidebar-bottom-information > div {
 padding-left: 10px;
 padding-bottom: 5px;
}
.direct-download-checkbox {
  margin-right: 10px;
}
</style>
