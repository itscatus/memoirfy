<template>
    <div class="min-h-screen bg-gray-100">
      <Navbar />
      <div class="p-8">
        <h2 class="text-xl font-bold mb-4">Edit Profil</h2>
        <form @submit.prevent="updateProfile">
          <div class="mb-4">
            <label class="block font-bold mb-2">Nama</label>
            <input
              type="text"
              v-model="profile.name"
              class="w-full border p-2 rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block font-bold mb-2">Email</label>
            <input
              type="email"
              v-model="profile.email"
              class="w-full border p-2 rounded"
              required 
              readonly
            />
          </div>
          <div class="mb-4">
            <label class="block font-bold mb-2">Foto Profil</label>
            <img
              v-if="profile.avatarPreview"
              :src="profile.avatarPreview"
              alt="Foto Profil"
              class="w-20 h-20 rounded-full mb-2"
            />
            <button
              type="button"
              @click="togglePhotoModal"
              class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Ganti Foto Profil
            </button>
          </div>
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Simpan
          </button>
        </form>
      </div>
  
      <!-- Pop-up Modal -->
      <div
        v-if="showPhotoModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white p-6 rounded w-96">
          <h3 class="text-lg font-bold mb-4">Pilih Foto Profil</h3>
          <div class="mb-4">
            <video
              ref="cameraStream"
              class="w-full h-40 border rounded mb-2"
              autoplay
              playsinline
              muted
            ></video>
            <button
              @click="captureFromCamera"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Capture Camera
            </button>
          </div>
          <input
            type="file"
            @change="uploadPhoto"
            accept="image/*"
            class="hidden"
            ref="fileInput"
          />
          <button
            @click="() => $refs.fileInput.click()"
            class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 w-full"
          >
            Upload Foto
          </button>
          <button
            @click="togglePhotoModal"
            class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from "../components/Navbar.vue";
  import {
    getProfile,
    updateProfile,
    requestEmailChange,
    requestPasswordReset,
  } from "../services/profileService";
  
  export default {
    components: { Navbar },
    data() {
      return {
        profile: {
          name: "",
          email: "",
          stream: null,
          avatar: null,
          avatarPreview: null,
        },
        showPhotoModal: false,
        stream: null,
      };
    },
    async mounted() {
      const userProfile = await getProfile();
      this.profile = {
        ...userProfile,
        avatarPreview: userProfile.avatar
          ? `http://127.0.0.1:8090/api/files/${userProfile.collectionId}/${userProfile.id}/${userProfile.avatar}`
          : null,
      };
    },
    methods: {
      async updateProfile() {
        try {
          await updateProfile(this.profile);
          alert("Profil berhasil diperbarui!");
        } catch (error) {
          alert("Gagal memperbarui profil: " + error.message);
        }
      },
      togglePhotoModal() {
        this.showPhotoModal = !this.showPhotoModal;
        if (this.showPhotoModal) this.startCamera();
        else this.stopCamera();
      },
      async startCamera() {
        try {
          this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
          this.$refs.cameraStream.srcObject = this.stream;
        } catch (error) {
          alert("Tidak dapat mengakses kamera: " + error.message);
        }
      },
      stopCamera() {
        if (this.stream) {
          this.stream.getTracks().forEach((track) => track.stop());
          this.stream = null;
        }
      },
      captureFromCamera() {
        const video = this.$refs.cameraStream;
        if (!video) return;
  
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
  
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
        const photoDataURL = canvas.toDataURL("image/png");
        this.profile.avatarPreview = photoDataURL;
  
        // Opsional: Konversi canvas ke Blob jika perlu
        canvas.toBlob((blob) => {
          this.profile.avatar = blob;
        });
  
        alert("Foto berhasil ditangkap!");
      },
      async uploadPhoto(event) {
        const file = event.target.files[0];
        if (file) {
          this.profile.avatar = file;
          this.profile.avatarPreview = URL.createObjectURL(file);
        }
      },
    },
    beforeDestroy() {
      this.stopCamera();
    },
  };
  </script>
  