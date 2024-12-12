<template>
    <div class="min-h-screen bg-gray-100">
      <Navbar />
      <div class="p-8">
        <h2 class="text-xl font-bold mb-4">Tambah Diary</h2>
        <form @submit.prevent="addDiary">
          <div class="mb-4">
            <label class="block font-bold mb-2">Tanggal</label>
            <input
              type="date"
              v-model="date"
              class="w-full border p-2 rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block font-bold mb-2">Konten</label>
            <textarea
              v-model="content"
              class="w-full border p-2 rounded"
              rows="4"
              required
            ></textarea>
          </div>
          <div class="mb-4">
            <label class="block font-bold mb-2">Mood</label>
            <select
              v-model="mood"
              class="w-full border p-2 rounded"
              required
            >
              <option value="" disabled>Pilih mood</option>
              <option value="Happy">Happy</option>
              <option value="Sad">Sad</option>
              <option value="Neutral">Neutral</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block font-bold mb-2">Foto (opsional)</label>
            <input type="file" @change="handleFile" class="w-full border p-2" />
          </div>
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
import Navbar from "../components/Navbar.vue";
import { createDiary } from "../services/diaryService";
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

  export default {
    components: { Navbar },
    data() {
      return {
        date: "",
        content: "",
        mood: "",
        image: null,
      };
    },
    methods: {
    handleFile(event) {
        this.image = event.target.files[0]; // Pastikan file terpilih benar
    },
    async addDiary() {
    try {
        const userId = pb.authStore.model.id;
        console.log("User ID:", userId); // Cek apakah ID user valid
        
        const diaryData = {
            date: new Date(this.date).toISOString(),
            content: this.content,
            mood: this.mood,
            users: userId,
            image: this.image,
        };
        console.log("Diary data being sent:", diaryData); // Cek data lengkap
        
        await createDiary(diaryData);
        this.$router.push("/diary-list");
    } catch (error) {
        console.error("Failed to save diary:", error.message); // Tampilkan error
        alert("Failed to save diary: " + error.message);
    }
    }
    }
};
  </script>
  