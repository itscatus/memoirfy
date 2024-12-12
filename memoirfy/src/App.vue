<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar v-if="isLoggedIn" />
    <router-view />
  </div>
</template>

<script>
import { isLoggedIn } from './services/authService';
import Navbar from './components/Navbar.vue';
import moment from 'moment';

export default {
  computed: {
    isLoggedIn() {
      return isLoggedIn();
    },
  },
    filters:{
    formatDate(value) {
        console.log('Filter formatDate dijalankan');
        return moment.parseZone(value).locale('id').format('DD-MM-YYYY HH:mm:ss')
    }
}
};

</script>
