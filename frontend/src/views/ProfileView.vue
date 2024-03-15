<script>
import PeopleYouMayKnow from "../components/PeopleYouMayKnow.vue";
import Trending from "../components/Trending.vue";
import { useUserStore } from "@/stores/user";
import FeedItem from "../components/FeedItem.vue";
import axios from "axios";

export default {
  setup() {
    const userStore = useUserStore();

    return {
      userStore,
    };
  },

  name: "ProfileView",
  components: {
    PeopleYouMayKnow,
    Trending,
    FeedItem,
  },

  data() {
    return {
      posts: [],
      body: "",
      user: {},
    };
  },

  mounted() {
    this.getFeed();
  },

  //Get feed when you switch between two profiles
  watch: {
    "$route.params.id": {
      handler: function () {
        this.getFeed();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    sendFriendRequest() {
      axios
        .post(`/api/account/friends/request/${this.$route.params.id}`)
        .then((response) => {
          console.log("data", response.data);
          //this.user = response.data.user;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    getFeed() {
      axios
        .get(`/api/posts/profile/${this.$route.params.id}`)
        .then((response) => {
          //console.log("data", response.data.posts);
          this.posts = response.data.posts;
          this.user = response.data.user;
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
      <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
        <img
          src="/images/placeholder.jpg"
          alt="Profile Image"
          class="rounded-full"
        />
        <p class="mt-4">
          <strong>{{ user.name }}</strong>
        </p>
        <div class="mt-6 flex space-x-8 justify-around">
          <p class="text-xs text-gray-500">182 friends</p>
          <p class="text-xs text-gray-500">120 posts</p>
        </div>
        <div class="mt-6">
          <button
            class="inline-block py-4 px-6 text-xs bg-purple-600 text-white rounded-lg"
            @click="sendFriendRequest"
          >
            Send friend request
          </button>
        </div>
      </div>
    </div>
    <div class="main-center col-span-2 space-y-4">
      <div
        class="p-4 bg-white border border-gray-200 rounded-lg"
        v-if="userStore.user.id === user.id"
      >
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

      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <div class="mb-6 flex items-center justify-between">
          <div class="flex items-center space-x-6">
            <img
              src="/images/person-40x40.png"
              alt="profile image"
              class="w-[40px] rounded-full"
            />
            <p><strong>Placeholder</strong></p>
          </div>
          <p class="text-gray-600">18 minutes ago</p>
        </div>
        <img src="/images/placeholder-image.jpg" alt="Post Image" />
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
        <FeedItem v-bind:post="post" />
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
