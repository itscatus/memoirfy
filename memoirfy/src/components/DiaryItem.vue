<template>
    <div class="bg-white p-4 mb-4 rounded shadow">
      <p><strong>Tanggal:</strong> {{ diary.date }}</p>
      <p><strong>Mood:</strong> {{ diary.mood }}</p>
      <p><strong>Konten:</strong> {{ diary.content }}</p>
      <!-- Kondisi untuk gambar -->
      <div v-if="diary.image && diary.image.length > 0" class="max-w-xs mx-auto">
        <img :src="getPhotoUrl()" class="object-cover w-full h-full" />
      </div>
      <!-- Aksi untuk edit dan delete -->
      <div class="mt-4">
        <router-link :to="`/edit-diary/${this.diary.id}`">
          <button
            class="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
          >
            Edit
          </button>
        </router-link>
        <button
          @click="deleteDiary"
          class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 ml-2"
        >
          Delete
        </button>
      </div>
    </div>
  </template>

  
  <script>
  export default {
    props: {
      diary: {
        type: Object,
        required: true,
      },
    },
    mounted() {
    console.log(this.diary.date);
    console.log("Diary image:", this.diary.image);

    },
    methods: {
      async editDiary() {
        try {
          const data = {
            date: this.diary.date,
            content: this.diary.content,
            mood: this.diary.mood,
          };
          this.$emit('update-diary', this.diary.id, data);
        } catch (error) {
          console.error(error);
        }
      },
      deleteDiary() {
        this.$emit("delete-diary", this.diary.id);
      },
      getPhotoUrl() {
        if (this.diary.token) {
          return `https://memoirfy.pockethost.io/api/files/${this.diary.collectionId}/${this.diary.id}/${this.diary.image}?token=${this.diary.token}`;
        } else {
          return `https://memoirfy.pockethost.io/api/files/${this.diary.collectionId}/${this.diary.id}/${this.diary.image}`;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Anda dapat menambahkan gaya tambahan di sini jika diperlukan */
  </style>
