import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "axios";

// Vue Icons
import { OhVueIcon, addIcons } from "oh-vue-icons";

//Use vue icons
import { BiChatSquareText } from "oh-vue-icons/icons";
import { HiChatAlt } from "oh-vue-icons/icons";
import { HiHome } from "oh-vue-icons/icons";
import { MdNotificationsnone } from "oh-vue-icons/icons";
import { IoSearch } from "oh-vue-icons/icons";
import { FaRegularHeart } from "oh-vue-icons/icons";
import { IoChatbubbleOutline } from "oh-vue-icons/icons";
import { BiThreeDotsVertical } from "oh-vue-icons/icons";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faMessage, faBell } from "@fortawesome/free-regular-svg-icons";

/* add icons to the library */
library.add(faMessage, faHouse, faMagnifyingGlass, faBell);

//Add vue icons
addIcons(
  BiChatSquareText,
  HiChatAlt,
  HiHome,
  IoSearch,
  MdNotificationsnone,
  FaRegularHeart,
  IoChatbubbleOutline,
  BiThreeDotsVertical
);

axios.defaults.baseURL = "http://127.0.0.1:8000";

const app = createApp(App);

app.use(createPinia());
app.use(router, axios);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("v-icon", OhVueIcon);

app.mount("#app");
