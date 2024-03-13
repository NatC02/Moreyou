<script>
import axios from "axios";
import PeopleYouMayKnow from "../components/PeopleYouMayKnow.vue";
import Trending from "../components/Trending.vue";
import FeedItem from "../components/FeedItem.vue";

export default {
  name: "SearchView",

  components: {
    PeopleYouMayKnow,
    Trending,
    FeedItem,
  },

  data() {
    return {
      query: "",
      users: [],
      posts: [],
    };
  },
  methods: {
    submitForm() {
      //console.log("Form submitted", this.query);

      axios
        .post("/api/search/", { query: this.query })
        .then((response) => {
          //console.log("response", response.data);
          this.users = response.data.users;
          this.posts = response.data.posts;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>
<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-left col-span-3 space-y-4">
      <div class="bg-white border border-gray-200 rounded-lg">
        <form v-on:submit.prevent="submitForm" class="p-4 flex space-x-4">
          <input
            type="search"
            v-model="query"
            class="p-4 w-full bg-gray-100 rounded lg"
            placeholder="Search terms ..."
          />
          <button
            type="submit"
            class="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg"
          >
            <v-icon name="io-search" />
          </button>
        </form>
      </div>
      <!-- Search Result -->

      <div
        class="p-4 bg-white border border-gray-200 rounded-lg grid grid-cols-4 gap-4"
        v-if="users.length > 0"
      >
        <!-- Account Result -->
        <div
          class="p-4 text-center bg-gray-100 rounded-lg"
          v-for="user in users"
          v-bind:key="user.id"
        >
          <img src="/images/placeholder.jpg" alt="" class="mb-6 rounded-full" />
          <p>
            <strong>
              <RouterLink :to="{ name: 'profile', params: { id: user.id } }">{{
                user.name
              }}</RouterLink>
            </strong>
          </p>
          <div class="mt-6 flex space-x-8 justify-around">
            <p class="text-xs text-gray-500">182 friends</p>
            <p class="text-xs text-gray-500">120 posts</p>
          </div>
        </div>
      </div>

      <!-- Posts -->

      <div
        class="p-4 bg-white border border-gray-200 rounded-lg"
        v-for="post in posts"
        v-bind:key="post.id"
      >
        <FeedItem v-bind:post="post" />
      </div>
    </div>
    <!-- Right Col -->

    <div class="main-right col-span-1 space-y-4">
      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <h3 class="mb-6 text-xl">People you may know</h3>
        <div class="space-y-4">
          <PeopleYouMayKnow />
          <PeopleYouMayKnow />
          <PeopleYouMayKnow />
          <PeopleYouMayKnow />
        </div>
      </div>
      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <h3 class="mb-6 text-xl">Trending</h3>
        <div class="space-y-4">
          <Trending />
          <Trending />
          <Trending />
        </div>
      </div>
    </div>
  </div>
</template>
