<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="py-10 px-8 border-b border-gray-200">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between">
        <div class="menu-left">
          <a href="#" class="text-xl">Socio</a>
        </div>
        <div class="menu-center flex space-x-12">
          <v-icon name="hi-home" class="text-purple-700" />
          <v-icon name="hi-chat-alt" />
          <v-icon name="md-notificationsnone" />
          <v-icon name="io-search" />
        </div>
        <div class="menu-right">
          <div>
            <img src="person-40x40.png" alt="" class="w-8 rounded-full" />
          </div>
          <div class="hidden">
            <RouterLink to="/login">Login</RouterLink>
            <RouterLink to="/login">Signup</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <main class="px-8 py-6 bg-gray-100">
    <RouterView />
  </main>
</template>

<style scoped></style>