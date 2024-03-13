<script>
import axios from "axios";
import { RouterLink } from "vue-router";
import { useToastStore } from "@/stores/toast";
export default {
  setup() {
    const toastStore = useToastStore();
    return {
      toastStore,
    };
  },
  data() {
    return {
      form: {
        email: "",
        name: "",
        password1: "",
        password2: "",
      },
      errors: [],
    };
  },
  methods: {
    submitForm() {
      this.errors = [];
      if (this.form.email === "") {
        this.errors.push("Your e-mail is missing");
      }
      if (this.form.name === "") {
        this.errors.push("Your name is missing");
      }
      if (this.form.password1 === "") {
        this.errors.push("Your password is missing");
      }
      if (this.form.password1 !== this.form.password2) {
        this.errors.push("The password does not match");
      }
      if (this.errors.length === 0) {
        axios
          .post("/api/account/signup/", this.form)
          .then((response) => {
            if (response.data.message === "success") {
              this.toastStore.showToast(
                5000,
                "The user is registered. Please activate your account by clicking your email link.",
                "bg-emerald-500"
              );
              this.form.email = "";
              this.form.name = "";
              this.form.password1 = "";
              this.form.password2 = "";
            } else {
              const data = JSON.parse(response.data.message);
              for (const key in data) {
                this.errors.push(data[key][0].message);
              }
              this.toastStore.showToast(
                5000,
                "Something went wrong. Please try again",
                "bg-red-300"
              );
            }
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
        <h1 class="mb-6 text-2xl">Sign up</h1>
        <p class="mb-6 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          deleniti architecto omnis hic, officia enim! Earum velit omnis ea
          ipsa!
        </p>
        <p class="font-bold">
          Already have an account?
          <RouterLink to="/login" class="underline">Click here</RouterLink> to
          login!
        </p>
      </div>
    </div>
    <div class="main-right">
      <div class="p-12 bg-white border border-gray-200 rounded-lg">
        <form class="space-y-6" v-on:submit.prevent="submitForm">
          <div>
            <label for="name">Name</label> <br />
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              v-model="form.name"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>
@@ -36,28 +117,41 @@ import { RouterLink } from "vue-router";
            <input
              type="email"
              name="email"
              v-model="form.email"
              placeholder="Your Email address"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>
          <div>
            <label for="password1">Password</label> <br />
            <input
              type="password"
              name="password1"
              v-model="form.password1"
              placeholder="Your  Password"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>
          <div>
            <label for="password2">Confirm Password</label> <br />
            <input
              type="password"
              name="password2"
              v-model="form.password2"
              placeholder="Confirm Your Password"
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