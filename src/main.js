import Vue, { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import './assets/main.css'

import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "bootstrap"

import {BootstrapVue3} from "bootstrap-vue-3";
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "@ant-design/icons-vue"

import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App)
app.use(BootstrapVue3)
app.use(Antd)
app.use(VueAxios,axios)
app.use(store)
app.use(router)
app.mount('#app')

app.config.globalProperties.$axios = axios;





