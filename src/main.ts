import { createApp } from "vue";


import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/main.css";
import pinia from "@/stores/index";

const app = createApp(App);

app.use(ElementPlus);
app.use(pinia);
app.use(router);


app.mount("#app");
