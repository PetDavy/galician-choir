import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { header: ['full-width'] },
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      header: ['full-width', 'light'],
    },
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import('../views/Events.vue'),
    meta: {
      header: ['full-width', 'light'],
    },
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('../views/Gallery.vue'),
    meta: {
      header: ['full-width', 'light'],
    },
  },
  {
    path: '/videos',
    name: 'Videos',
    component: () => import('../views/Videos.vue'),
  },
  {
    path: '/contact',
    name: 'Contacts',
    component: () => import('../views/Contact.vue'),
    meta: {
      header: ['full-width', 'light'],
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      header: ['full-width', 'light'],
      // redirectOnAuth: 'Admin',
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      header: ['full-width', 'light'],
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLogedIn = store.getters.logedIn;

  if (to?.meta?.requiresAuth && !isLogedIn) {
    next({ name: 'Login' });
  } else if (to?.meta?.redirectOnAuth && isLogedIn) {
    next({ name: to.meta.redirectOnAuth });
  } else {
    next();
  }
});

export default router;
