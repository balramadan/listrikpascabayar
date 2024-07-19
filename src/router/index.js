import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";
import MenuPelanggan from "@/views/pelanggan/MenuPelanggan.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // User
    {
      path: "/algoritma",
      name: "algoritma",
      component: () => import("../views/AlgoritmaView.vue"),
    },
    {
      path: "/",
      name: "menu-pelanggan",
      component: MenuPelanggan,
      meta: {
        requiresAuth: true,
        title: "Lectro - Dashboard",
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/pelanggan/Register.vue"),
      meta: {
        title: "Lectro - Register",
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/pelanggan/Login.vue"),
      meta: {
        title: "Lectro - Login",
      },
    },
    {
      path: "/penggunaan",
      name: "penggunaan",
      component: () => import("../views/TambahPenggunaan.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/tagihan",
      name: "tagihan",
      component: () => import("../views/pelanggan/Tagihan.vue"),
      meta: {
        requiresAuth: true,
        title: "Lectro - Tagihan",
      },
    },
    {
      path: "/bayar/:id",
      name: "bayar",
      component: () => import("../views/pelanggan/Bayar.vue"),
      meta: {
        requiresAuth: true,
        title: "Lectro - Bayar",
      },
    },
    {
      path: '/riwayat',
      name: 'riwayat',
      component: () => import('../views/pelanggan/Riwayat.vue'),
      meta: {
        requiresAuth: true,
        title: 'Lectro - Riwayat'
      }
    },

    // Admin
    {
      path: "/admin",
      name: "dashboard-admin",
      component: () => import("../views/admin/DashboardAdmin.vue"),
      meta: {
        requiresAdmin: true,
        title: "Lectro - Admin Dasboard",
      },
    },
    {
      path: "/admin/login",
      name: "login-admin",
      component: () => import("../views/admin/LoginAdmin.vue"),
      meta: {
        requiresAdmin: true,
        title: "Lectro - Admin Login",
      },
    },
    {
      path: "/admin/pelanggan",
      name: "pelanggan",
      component: () => import("../views/admin/ListPelanggan.vue"),
      meta: {
        requiresAdmin: true,
        title: "Lectro - List Pelanggan",
      },
    },
    {
      path: "/admin/pelanggan/:id",
      name: "edit-pelanggan",
      component: () => import("../views/admin/EditPelanggan.vue"),
      meta: {
        requiresAdmin: true,
        title: "Lectro - Edit Pelanggan",
      },
    },
    {
      path: "/admin/penggunaan",
      name: "penggunaan",
      component: () => import("../views/admin/ListPenggunaan.vue"),
      meta: {
        requiresAdmin: true,
        title: "Lectro - List Penggunaan",
      },
    },
    {
      path: "/admin/penggunaan/:id",
      name: "edit-penggunaan",
      component: () => import("../views/admin/EditPenggunaan.vue"),
      meta: {
        requiresAdmin: true,
        title: "Lectro - Edit Penggunaan",
      },
    },
    {
      path: "/admin/pembayaran",
      name: "pembayaran",
      component: () => import("../views/admin/ListPembayaran.vue"),
      meta: {
        requiresAdmin: true,
        title: "Lectro - List Pembayaran",
      },
    },
    {
      path: "/admin/pembayaran/:id",
      name: "edit-pembayaran",
      component: () => import("../views/admin/EditPembayaran.vue"),
      meta: {
        requiresAdmin: true,
        title: "Lectro - Edit Pembayaran",
      },
    },
    {
      path: "/admin/tarif",
      name: "tarif",
      component: () => import("../views/admin/ListTarif.vue"),
      meta: {
        requiresAdmin: true,
        title: "Lectro - Tarif",
      },
    },
    {
      path: "/admin/tarif/:id",
      name: "edit-tarif",
      component: () => import("../views/admin/EditTarif.vue"),
      meta: {
        requiresAdmin: true,
        title: "Lectro - Edit Tarif",
      },
    },
    {
      path: "/admin/list",
      name: "admin-list",
      component: () => import("../views/admin/ListAdmin.vue"),
      meta: {
        requiresAdmin: true,
        title: "Lectro - List Admin",
      },
    },
    {
      path: "/admin/list/:id",
      name: "edit-admin",
      component: () => import("../views/admin/EditAdmin.vue"),
      meta: {
        requiresAdmin: true,
        title: "Lectro - Edit Admin",
      },
    },
    {
      path: "/admin/level",
      name: "level",
      component: () => import("../views/admin/ListLevel.vue"),
      meta: {
        requiresAdmin: true,
        title: "Lectro - List Level",
      },
    },
    {
      path: "/admin/level/:id",
      name: "edit-level",
      component: () => import("../views/admin/EditLevel.vue"),
      meta: {
        requiresAdmin: true,
        title: "Lectro - Edit Level",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const auth = JSON.parse(localStorage.getItem("data"));
    if (!auth && to.path !== "/login") {
      // tambahkan pengecekan untuk mencegah pengalihan tak terbatas
      next("/login");
      return;
    }
  }

  if (to.meta.requiresAdmin) {
    const authAdmin = JSON.parse(localStorage.getItem("dataAdmin"));
    if (!authAdmin && to.path !== "/admin/login") {
      // tambahkan pengecekan untuk mencegah pengalihan tak terbatas
      next("/admin/login");
      return;
    }
  }

  next();
});

router.afterEach((to, from) => {
  // Menggunakan `nextTick` untuk memastikan bahwa ini dipanggil
  // setelah `beforeRouteEnter` dan `beforeRouteUpdate` hooks
  nextTick(() => {
    document.title = to.meta.title || "Elebill";
  });
});

export default router;
