<template>
    <div class="min-h-screen bg-gray-100">
      <Navbar />
      <div class="p-8">
        <h2 class="text-xl font-bold mb-4">Daftar Diary</h2>
        <div v-if="diaries.length === 0" class="text-gray-500">
          Belum ada diary.
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DiaryItem
            v-for="diary in sortedDiaries"
            :key="diary.id"
            :diary="diary"
            @edit-diary="editDiary"
            @delete-diary="deleteDiary"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from "../components/Navbar.vue";
  import DiaryItem from "../components/DiaryItem.vue";
  import { getAllDiaries, deleteDiary, updateDiary } from "../services/diaryService";
  import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

 
  export default {
    components: { Navbar, DiaryItem },
    data() {
      return {
        diaries: [],
      };
    },
    async mounted() {
      try {
        const userId = pb.authStore.model.id; // Dapatkan userId pengguna
        console.log("User ID:", userId); // Debug
        this.diaries = await getAllDiaries(userId); // Ambil diary sesuai userId
        console.log("Fetched diaries:", this.diaries); // Debug
      } catch (error) {
        console.error("Error loading diaries:", error.message);
      }
    },
    computed: {
      sortedDiaries() {
        return this.diaries.sort((a, b) => new Date(b.date) - new Date(a.date));
      },
    },
    methods: {
      editDiary(diary) {
        this.$router.push({ name: "EditDiary", params: { id: diary.id } });
      },
      async updateDiary(id, data) {
        try {
          await updateDiary(id, data);
          this.diaries = this.diaries.map((diary) => {
            if (diary.id === id) {
              return { ...diary, ...data };
            }
            return diary;
          });
        } catch (error) {
          console.error(error);
        }
      },
      async deleteDiary(id) {
        try {
          await deleteDiary(id);
          this.diaries = this.diaries.filter((diary) => diary.id !== id);
        } catch (error) {
          alert("Failed to delete diary: " + error.message);
        }
      },
    },
  };
  </script>
  