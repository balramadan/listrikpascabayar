<template>
  <div
    id="sidebar"
    class="hidden sm:flex fixed left-0 w-56 h-screen flex-col justify-between border-e bg-white transition-all duration-300 z-50"
  >
    <!-- Header -->
    <div class="px-4 py-6">
      <div class="flex flex-row items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="0 0 48 48"
        >
          <path
            fill="#3b82f6"
            d="M33.7 5L22 17l15 5l-15.7 14.7l5.1 2.8L12 43l2.7-14.8l2.9 5.1L27 24l-15-5L25 5z"
          />
        </svg>
        <span class="-ml-2 font-bold text-blue-500 text-lg"> ectro </span>
      </div>

      <!-- Navigation -->
      <ul class="mt-6 space-y-1">
        <li>
          <a
            href="/"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Dashboard
          </a>
        </li>

        <li>
          <a
            href="/tagihan"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Tagihan
          </a>
        </li>

        <li>
          <a
            href="/riwayat"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Riwayat Bayar
          </a>
        </li>

        <li>
          <a
            @click.prevent="handleLogout"
            href="#"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Logout
          </a>
        </li>
      </ul>
    </div>

    <!-- User Profile -->
    <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
      <a href="#" class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          class="size-10 rounded-full object-cover"
        />

        <div>
          <p class="text-xs">
            <strong class="block font-medium">{{
              dataUser.nama_pelanggan
            }}</strong>

            <span> {{ dataUser.nomor_kwh }} </span>
          </p>
        </div>
      </a>
    </div>
  </div>

  <Navbar :openSidebar="openSidebar" @update:openSidebar="handleUpdate" />
</template>

<script>
import Navbar from "./Navbar.vue";

export default {
  name: "Sidebar",
  created() {
    this.dataUser = JSON.parse(localStorage.getItem("data"));
  },
  data() {
    return {
      dataUser: {},
      openSidebar: false,
      classSidebar: "",
    };
  },
  methods: {
    // @vuese
    // Memproses logout pelanggan
    handleLogout() {
      localStorage.removeItem("data");
      this.$router.push("/login");
    },
    // @vuese
    // Mengubah status sidebar
    handleUpdate(newValue) {
      this.openSidebar = newValue;
      const sidebar = document.getElementById("sidebar");
      if (newValue) {
        sidebar.classList.remove("hidden");
        sidebar.classList.add("flex");
      } else {
        sidebar.classList.remove("flex");
        sidebar.classList.add("hidden");
      }
    },
  },
  props: {},
  components: {
    Navbar,
  },
};
</script>

<style></style>
