import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vue-file-selector/dist/main.css';
import FileSelector from 'vue-file-selector';

createApp(App)
  .use(FileSelector)
  .mount('#app')
