<template>
  <nav class="bg-blue-600 p-4 text-white flex justify-between items-center relative">
    <!-- Logo -->
    <div class="text-xl font-bold">Memoirfy</div>

    <!-- Hamburger Button -->
    <button
      class="lg:hidden block"
      @click="toggleMenu"
      aria-label="Toggle Menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>

    <!-- Menu Items -->
    <div
      :class="{
        hidden: !isMenuOpen,
        flex: isMenuOpen,
      }"
      class="lg:flex flex-col lg:flex-row gap-4 items-center absolute lg:static top-full lg:top-auto left-0 lg:left-auto bg-blue-600 lg:bg-transparent w-full lg:w-auto shadow-md lg:shadow-none z-10"
    >
      <router-link
        to="/home"
        class="hover:underline py-2 lg:py-0 text-center w-full lg:w-auto"
      >
        Home
      </router-link>
      <router-link
        to="/add-diary"
        class="hover:underline py-2 lg:py-0 text-center w-full lg:w-auto"
      >
        Add Diary
      </router-link>
      <router-link
        to="/diary-list"
        class="hover:underline py-2 lg:py-0 text-center w-full lg:w-auto"
      >
        Diaries
      </router-link>
      <router-link
        to="/profile"
        class="hover:underline py-2 lg:py-0 text-center w-full lg:w-auto"
      >
        Profile
      </router-link>
      <button
        @click="logout"
        class="hover:underline py-2 lg:py-0 text-center w-full lg:w-auto"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
import { logout } from '../services/authService';
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    logout() {
      // Add logout logic here
      logout();
      alert("Logged out!");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/* Optional: Styling for dropdown shadow on mobile */
@media (max-width: 1024px) {
  nav > div {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}
</style>
