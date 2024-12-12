
  <template>
    <div class="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 class="text-xl font-bold mb-4">Edit Diary</h2>
      <form @submit.prevent="updateDiary">
        <div class="mb-4">
            <label for="date" class="block text-sm font-medium text-gray-700">Tanggal</label>
            <input
            type="text"
            id="date"
            v-model="diary.date"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            required
            readonly
            />
        </div>
        <div class="mb-4">
          <label for="mood" class="block text-sm font-medium text-gray-700">Mood</label>
          <select
            id="mood"
            v-model="diary.mood"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            required
          >
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Neutral">Neutral</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="content" class="block text-sm font-medium text-gray-700">Konten</label>
          <textarea
            id="content"
            v-model="diary.content"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            rows="4"
            required
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="image" class="block text-sm font-medium text-gray-700">Gambar</label>
          <img
            id="image"
            v-if="diary.imagePreview"
            :src="diary.imagePreview"
            alt="Gambar"
            class="w-20 h-20 rounded-full mb-2"
          />
          <button
            type="button"
            @click="togglePhotoModal"
            class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Ganti Gambar
          </button>
        </div>
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Simpan
        </button>
        <router-link to="/diary-list">
          <button
            type="button"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 ml-2"
          >
            Batal
          </button>
        </router-link>
      </form>
    </div>
  
    <!-- Pop-up Modal -->
    <div
      v-if="showPhotoModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded w-96">
        <h3 class="text-lg font-bold mb-4">Pilih Gambar</h3>
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
          Upload Gambar
        </button>
        <button
          @click="togglePhotoModal"
          class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
        >
          Tutup
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { getDiaryById, updateDiary } from "../services/diaryService";
  
  export default {
    data() {
      return {
        diary: {
          id: null,
          date: '',
          mood: '',
          content: '',
          image: null,
          imagePreview: null,
        },
        showPhotoModal: false,
        stream: null,
      };
    },
    computed: {
      formattedDate: {
        get() {
          // Mengonversi tanggal ke format yang sesuai untuk input date
          return this.diary.date ? this.diary.date.split('T')[0] : '';
        },
        set(value) {
          // Mengonversi kembali ke format yang diinginkan saat mengubah input
          this.diary.date = value;
        }
      }
    },
    async created() {
      const diaryId = this.$route.params.id;
      this.diary = await getDiaryById(diaryId);
    },
    
    methods: {
        async updateDiary() {
        console.log('Tombol simpan diklik');
        try {
        console.log('Data yang dikirim:', this.diary);
        const formData = new FormData();
        formData.append("date", this.diary.date);
        formData.append("content", this.diary.content);
        formData.append("mood", this.diary.mood);
        if (this.diary.image) {
            formData.append("image", this.diary.image);
        }
        await updateDiary(this.diary.id, formData);
        console.log('API merespons dengan benar');
        this.$router.push({ name: "DiaryList" });
        this.$toast.success("Diary berhasil diupdate");
        } catch (error) {
        console.error('API tidak merespons dengan benar:', error);
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
        this.diary.imagePreview = photoDataURL;
  
        // Opsional: Konversi canvas ke Blob jika perlu
        canvas.toBlob((blob) => {
          this.diary.image = blob;
        });
  
        alert("Foto berhasil ditangkap!");
      },
      async uploadPhoto(event) {
        const file = event.target.files[0];
        if (file) {
          this.diary.image = file;
          this.diary.imagePreview = URL.createObjectURL(file);
        }
      },
    },
    beforeDestroy() {
      this.stopCamera();
    },
  };
  </script>
  
  <style scoped>
  /* Anda dapat menambahkan gaya tambahan di sini jika diperlukan */
  </style>