import { createRouter, createWebHistory } from "vue-router";
import MenuPelanggan from "@/views/MenuPelanggan.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "menu-pelanggan",
      component: MenuPelanggan,
      meta: {
        requresAuth: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: '/penggunaan',
      name: 'penggunaan',
      component: () => import('../views/TambahPenggunaan.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tagihan',
      name: 'tagihan',
      component: () => import('../views/Tagihan.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/bayar',
      name: 'bayar',
      component: () => import('../views/Bayar.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/algoritma",
      name: "algoritma",
      component: () => import("../views/AlgoritmaView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requresAuth) {
    const auth = JSON.parse(localStorage.getItem("data"));
    if (auth) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
