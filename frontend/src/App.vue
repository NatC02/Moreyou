<script>
import { RouterLink, RouterView } from "vue-router";
import Toast from "./components/Toast.vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";

export default {
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
  components: {
    Toast,
  },
  beforeCreate() {
    this.userStore.initStore();
    const token = this.userStore.user.access;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
};
< /script>

  < template >
  <nav class="py-10 px-8 border-b border-gray-200">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between">
        <div class="menu-left">
          <a href="#" class="text-xl">Socio</a>
        </div>
        <div
          class="menu-center flex space-x-12"
          v-if="userStore.user.isAuthenticated"
        >
          <v-icon name="hi-home" class="text-purple-700" />
          <v-icon name="hi-chat-alt" />
          <v-icon name="md-notificationsnone" />
          <RouterLink to="/search"><v-icon name="io-search" /></RouterLink>
        </div>
        <div class="menu-right">
          <template v-if="userStore.user.isAuthenticated">
            <div>
              <RouterLink
                :to="{ name: 'profile', params: { id: userStore.user.id } }"
              >
                <img src="/images/person-40x40.png" alt="" class="w-8 rounded-full" />
              </RouterLink>
            </div>
          </template>
          <template v-else>
            <div>
              <RouterLink
                to="/login"
                class="py-4 px-6 bg-gray-600 text-white rounded-lg mr-4"
                >Log in</RouterLink
              >
              <RouterLink
                to="/signup"
                class="py-4 px-6 bg-purple-600 text-white rounded-lg"
                >Sign up</RouterLink
              >
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
  <main class="px-8 py-6 bg-gray-100">
    <RouterView />
  </main>
  <Toast />
</template>
<style scoped></style>