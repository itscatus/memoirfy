import { createRouter, createWebHistory } from 'vue-router';
import { isLoggedIn } from '../services/authService.js';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Home from '../views/Home.vue';
import AddDiary from '../views/AddDiary.vue';
import DiaryList from '../views/DiaryList.vue';
import Profile from '../views/Profile.vue';
import EditProfile from '../views/ProfileForm.vue';
import EditDiary from '../views/EditDiary.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/profile-form', component: EditProfile, meta: { requiresAuth: true }, },
  { path: '/home', component: Home, meta: { requiresAuth: true }, },
  { path: '/add-diary', component: AddDiary, meta: { requiresAuth: true }, },
  { path: '/edit-diary/:id', component: EditDiary, meta: { requiresAuth: true }, },
  { path: '/diary-list', name: 'DiaryList', component: DiaryList, meta: { requiresAuth: true }, },
  { path: '/profile', component: Profile, meta: { requiresAuth: true }, },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isLoggedIn()) {
      alert('You need to login first!');
      next('/login');
    } else if ((to.path === '/login' || to.path === '/register') && isLoggedIn()) {
      alert('You are already logged in!');
      next('/home');
    } else {
      next();
    }
  });

export default router;
