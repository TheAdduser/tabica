import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import dragAndDrop from './directives/dragAndDrop';
import './style.css';

const app = createApp(App);
app.directive('drag-and-drop', dragAndDrop);
app.use(router);
app.mount('#app');
