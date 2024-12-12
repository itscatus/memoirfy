<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded shadow-md w-96">
        <h2 class="text-2xl font-bold mb-4 text-center">Register</h2>
        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Email</label>
            <input type="email" v-model="email" class="w-full border p-2 rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Password</label>
            <input type="password" v-model="password" class="w-full border p-2 rounded" required />
          </div>
          <button type="submit" class="bg-blue-600 text-white w-full p-2 rounded">Register</button>
        </form>
        <div v-if="successMessage" class="mt-4 p-2 bg-green-100 text-green-700 rounded">
          {{ successMessage }}
        </div>
        <p class="text-sm text-center mt-4">
          Sudah punya akun? <router-link to="/login" class="text-blue-600">Login</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import PocketBase from "pocketbase";
  const pb = new PocketBase("http://127.0.0.1:8090");
  
  export default {
    data() {
      return {
        email: "",
        password: "",
        successMessage: "", // Variabel untuk pesan sukses
      };
    },
    methods: {
      async handleRegister() {
        try {
          await pb.collection("users").create({
            email: this.email,
            password: this.password,
            passwordConfirm: this.password,
          });
          this.successMessage = "Register berhasil! Anda akan diarahkan ke halaman login.";
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000); // Redirect ke halaman login setelah 2 detik
        } catch (error) {
          alert("Register failed: " + error.message);
        }
      },
    },
  };
  </script>
  