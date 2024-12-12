<template>
    <div class="min-h-screen bg-gray-100">
      <Navbar />
      <div class="p-8">
        <h2 class="text-xl font-bold mb-4">Profil Saya</h2>
        <div class="bg-white p-4 rounded shadow">
          <div class="flex items-center mb-4">
            <img
            :src="profile.avatar 
                ? `http://127.0.0.1:8090/api/files/${profile.collectionId}/${profile.id}/${profile.avatar}` 
                : 'https://via.placeholder.com/100'"
            alt="Profile Picture"
            class="w-24 h-24 rounded-full object-cover border"
            />

            <div class="ml-4">
              <p><strong>Nama:</strong> {{ profile.name }}</p>
              <p><strong>Email:</strong> {{ profile.email }}</p>
            </div>
          </div>
          <div class="mt-4">
            <button
              @click="editProfile"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Profil
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from "../components/Navbar.vue";
  import { getProfile } from "../services/profileService";
  
  export default {
    components: { Navbar },
    data() {
      return {
        profile: {},
      };
    },
    async mounted() {
      this.profile = await getProfile();
    },
    methods: {
      editProfile() {
        this.$router.push("/profile-form");
      },
    },
  };
  </script>
  