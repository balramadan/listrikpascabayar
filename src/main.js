import "./assets/main.css";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Aura from "@primevue/themes/aura";
// import Aura from "./presets/aura";
// import { config } from 'dotenv'

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ToastService);
// app.use(config())

app.mount("#app");
