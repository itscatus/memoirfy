<template>
    <div class="min-h-screen bg-gray-100">
      <Navbar />
      <div class="p-8 text-center">
        <h1 class="text-2xl font-bold">Halo, {{ userName }}!</h1>
        <p class="mt-4 text-lg">Ada apa hari ini?</p>
        <div class="mt-8 flex justify-center gap-4">
          <router-link
            to="/add-diary"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Tambahkan Diary
          </router-link>
          <router-link
            to="/diary-list"
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Lihat Diary
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from "../components/Navbar.vue";
  import { getCurrentUser } from "../services/authService";
  
  export default {
    components: { Navbar },
    data() {
      return {
        userName: "",
      };
    },
    async mounted() {
      try {
        const user = await getCurrentUser();
        this.userName = user.name; // Pastikan field `name` ada di data user Anda
      } catch (error) {
        console.error("Failed to load user data:", error.message);
        this.$router.push("/login"); // Redirect jika pengguna tidak terautentikasi
      }
    },
  };
  </script>
  