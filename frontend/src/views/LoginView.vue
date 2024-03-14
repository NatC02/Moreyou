<script>
import axios from "axios";
import { useUserStore } from "@/stores/user";
export default {
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: [],
    };
  },
  methods: {
    async submitForm() {
      this.errors = [];
      if (this.form.email === "") {
        this.errors.push("Your e-mail is missing");
      }
      if (this.form.password === "") {
        this.errors.push("Your password is missing");
      }
      if (this.errors.length === 0) {
        await axios
          .post("/api/account/login/", this.form)
          .then((response) => {
            this.userStore.setToken(response.data);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.access;
          })
          .catch((error) => {
            console.log("error", error);
            this.errors.push(
              "The email or password is incorrect! Or the user is not activated!"
            );
          });
      }
      if (this.errors.length === 0) {
        await axios
          .get("/api/account/me/")
          .then((response) => {
            this.userStore.setUserInfo(response.data);
            this.$router.push("/feed");
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
  },
};
</script>

<template>
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="main-left">
      <div class="p-12 bg-white border border-gray-200 rounded-lg">
        <h1 class="mb-6 text-2xl">Login</h1>
        <p class="mb-6 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          deleniti architecto omnis hic, officia enim! Earum velit omnis ea
          ipsa!
        </p>
        <p class="font-bold">
          Don't have an account?
          <RouterLink :to="{ name: 'signup' }" class="underline"
            >Click here</RouterLink
          >
          to create one!
        </p>
      </div>
    </div>
    <div class="main-right">
      <div class="p-12 bg-white border border-gray-200 rounded-lg">
        <form class="space-y-6" v-on:submit.prevent="submitForm">
          <div>
            <label for="email">E-mail</label> <br />
            <input
              type="email"
              name="email"
              v-model="form.email"
              placeholder="Your Email Address"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>
          <div>
            <label for="password">Password</label> <br />
            <input
              type="password"
              name="password"
              v-model="form.password"
              placeholder="Your Password"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>
          <template v-if="errors.length > 0">
            <div class="bg-red-300 text-white rounded-lg p-6">
              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>
          </template>
          <div>
            <button class="py-4 px-6 bg-purple-600 text-white rounded-lg">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>