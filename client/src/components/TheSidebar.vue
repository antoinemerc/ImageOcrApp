<script setup lang="ts">

import { reactive } from 'vue'
import { ImageProperty } from '../models/ImageProperty';
import { imageStore } from '../services/store';
import { saveAs } from 'file-saver';

interface ReactiveState {
}
const state: ReactiveState = reactive({
});

const sidebarItemDeleteItem = (imageProperty: ImageProperty) => {
  imageStore.deleteImageById(imageProperty.id);
}

const sidebarItemSelectItem = (imageProperty: ImageProperty, isSelected: boolean) => {
  imageStore.setImageSelected(imageProperty.id, isSelected);
}

const sidebarSendAllImages = async () => {
  const selectedImages = imageStore.imageList.filter(image => image.selected);
  const formData = new FormData();
  selectedImages.forEach(selectedImage => {
    formData.append(`imagesToAnnotate`, selectedImage.file, selectedImage.file.name)
  });

  const response = await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/gc/annotate-images`, {
    method: 'POST',
    body: formData,
  })
  const annotations = await response.json();
  const fileName = `pictureAnnotations-${new Date().toISOString()}.json`;
  const fileToSave = new Blob([JSON.stringify(annotations)], {
    type: 'application/json'
  });
  saveAs(fileToSave, fileName);
}

// No upsert yet, if double are uploaded it's the users fault
const handleFilesChanged = (files: File[]) => {
  const newImageProperties = files.map((data: File) => {
    return new ImageProperty({ id: Date.now() + Math.random(), file: data, displayName: data.name });
  });
  imageStore.addBulkImage(newImageProperties);
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
      <p class="send-hint">Send selected pictures to Google Cloud Vision (1000 free images per month)</p>
      <button @click="sidebarSendAllImages()">Send</button>
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
  background-color: rgba(var(--main-accent-tri-0), 1);
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
</style>
