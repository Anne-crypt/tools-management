import { createApp } from "vue";
// import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./styles/style.css"; // Import de Tailwind
import Base from "./components/layout/BaseLayout.vue";

const app = createApp(App);
// const pinia = createPinia();

// 2. Enregistrement global (le premier argument est le nom de la balise HTML que vous utiliserez)
app.component("BaseLayout", Base);

// app.use(pinia); // On active Pinia
app.use(router); // On active le Routeur

app.mount("#app");
