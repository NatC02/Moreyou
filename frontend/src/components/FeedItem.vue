<script>
export default {
  props: {
    post: Object,
  },
};
</script>
<!-- <script setup>
const props = defineProps(["post"]);

console.log(props.post);
</script> -->
<template>
  <div class="mb-6 flex items-center justify-between">
    <div class="flex items-center space-x-6">
      <img
        src="/images/person-40x40.png"
        alt=""
        class="w-[40px] rounded-full"
      />
      <p>
        <strong>
          <RouterLink
            :to="{ name: 'profile', params: { id: post.created_by.id } }"
            >{{ post.created_by.name }}</RouterLink
          >
        </strong>
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
</template>
