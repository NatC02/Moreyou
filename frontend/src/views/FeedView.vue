<script>
import PeopleYouMayKnow from "../components/PeopleYouMayKnow.vue";
import Trending from "../components/Trending.vue";
import axios from "axios";

export default {
  name: "FeedView",
  components: {
    PeopleYouMayKnow,
    Trending,
  },
  data() {
    return {
      posts: [],
      body: "",
    };
  },
  mounted() {
    this.getFeed();
  },
  methods: {
    getFeed() {
      axios
        .get("/api/posts")
        .then((response) => {
          // console.log("data", response.data);
          this.posts = "response.data";
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    submitForm() {
      //console.log("submitForm", this.body);
      axios
        .post("/api/posts/create/", { body: this.body })
        .then((response) => {
          //console.log("data", response.data);
          //Push ands to the end of the list n unshift adds to the beginning
          this.posts.unshift(response.data);
          this.body = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<template>
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <div class="main-left col-span-1">
      <form method="post" v-on:submit.prevent="submitForm">
          <div class="p-4">
            <textarea
              class="p-4 w-full bg-gray-100 rounded-lg"
              placeholder="What's on your mind today?"
              v-model="body"
            ></textarea>
          </div>
          <div class="p-4 border-t border-gray-100 flex justify-between">
            <a
              href="#"
              class="inline-block py-4 px-6 bg-gray-600 text-white rounded-lg"
              >Attach</a
            >
            <button
              type="submit"
              class="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg"
            >
              Post
            </button>
          </div>
        </form>
    </div>
    <div class="main-center col-span-3 space-y-4">
      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <div class="p-4">
          <textarea
            class="p-4 w-full bg-gray-100 rounded-lg"
            placeholder="What's on your mind today?"
          ></textarea>
        </div>
        <div class="p-4 border-t border-gray-100 flex justify-between">
          <a
            href="#"
            class="inline-block py-4 px-6 bg-gray-600 text-white rounded-lg"
            >Attach</a
          >
          <a
            href="#"
            class="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg"
            >Post</a
          >
        </div>
      </div>
      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <div class="mb-6 flex items-center justify-between">
          <div class="flex items-center space-x-6">
            <img src="person-40x40.png" alt="" class="w-[40px] rounded-full" />
            <p><strong>Placeholder</strong></p>
          </div>
          <p class="text-gray-600">18 minutes ago</p>
        </div>
        <img src="placeholder-image.jpg" alt="" />
        <div class="my-6 flex justify-between">
          <div class="flex space-x-6">
            <div class="flex items-center space-x-2">
              <v-icon name="fa-regular-heart" />
              <span class="text-gray-500 text-xs">82 likes</span>
            </div>
            <div class="flex items-center space-x-2">
              <v-icon name="io-chatbubble-outline" />
              <span class="text-gray-500 text-xs">8 comments</span>
            </div>
          </div>
          <div><v-icon name="bi-three-dots-vertical" /></div>
        </div>
      </div>
      <div
        class="p-4 bg-white border border-gray-200 rounded-lg"
        v-for="post in posts"
        v-bind:key="post.id"
      >
        <div class="mb-6 flex items-center justify-between">
          <div class="flex items-center space-x-6">
            <img src="person-40x40.png" alt="" class="w-[40px] rounded-full" />
            <p>
              <strong>{{ post.created_by.name }}</strong>
            </p>
          </div>
          <p class="text-gray-600">{{ post.time_since_created }} ago</p>
        </div>
        <p>
          {{ post.body }}
        </p>
        <div class="my-6 flex justify-between">
          <div class="flex space-x-6">
            <div class="flex items-center space-x-2">
              <v-icon name="fa-regular-heart" />
              <span class="text-gray-500 text-xs">82 likes</span>
            </div>
            <div class="flex items-center space-x-2">
              <v-icon name="io-chatbubble-outline" />
              <span class="text-gray-500 text-xs">8 comments</span>
            </div>
          </div>
          <div><v-icon name="bi-three-dots-vertical" /></div>
        </div>
      </div>
    </div>
    <!-- Right Column -->
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