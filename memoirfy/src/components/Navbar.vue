<template>
    <nav class="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div class="text-xl font-bold">Memoirfy</div>
      <div class="flex gap-4">
        <router-link to="/home" class="hover:underline">Home</router-link>
        <router-link to="/add-diary" class="hover:underline">Add Diary</router-link>
        <router-link to="/diary-list" class="hover:underline">Diaries</router-link>
        <router-link to="/profile" class="hover:underline">Profile</router-link>
        <button @click="logout" class="hover:underline">Logout</button>
      </div>
    </nav>
  </template>
  
  <script>
  import { logout } from "../services/authService";
  
  export default {
    methods: {
      logout() {
        logout();
        this.$router.push("/login");
      },
    },
  };
  </script>
  