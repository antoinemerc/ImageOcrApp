# Vue 3 + TypeScript + Vite

This run on vite
The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

# Client App

Client app to upload, select and send images to the backend for annotation 
Return a JSON object with the annotations for the selected picture and download the JSON

Annotation implementation status:
 - Google Cloud vision: OK
 - Azure Vision: todo
 - Tesseract: todo

## Google Cloud Vision

Google Cloud vision has a 1000 image per month limit so remember to be carefull with it

## Azure Vision

todo

## Tesseract

todo