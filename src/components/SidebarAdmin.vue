<template>
  <!-- Komponen SidebarAdmin -->
  <div
    class="fixed left-0 hidden sm:flex w-56 h-screen flex-col justify-between border-e bg-white"
  >
    <div class="px-4 py-6">
      <div class="flex flex-row items-center">
        <!-- Logo -->
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

      <ul class="mt-6 space-y-1">
        <!-- Menu Dashboard -->
        <li>
          <a
            href="/admin"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Dashboard
          </a>
        </li>

        <!-- Menu Data Pelanggan -->
        <li>
          <a
            href="/admin/pelanggan"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Data Pelanggan
          </a>
        </li>

        <!-- Menu Data Penggunaan -->
        <li>
          <a
            href="/admin/penggunaan"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Data Penggunaan
          </a>
        </li>

        <!-- Menu Data Pembayaran -->
        <li>
          <a
            href="/admin/pembayaran"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Data Pembayaran
          </a>
        </li>

        <!-- Menu Tarif Listrik -->
        <li>
          <a
            href="/admin/tarif"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Tarif Listrik
          </a>
        </li>

        <!-- Menu Pengaturan Admin (hanya ditampilkan jika id_level = 1) -->
        <li v-if="dataAdmin.id_level == 1">
          <details class="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <span class="text-sm font-medium"> Pengaturan Admin </span>

              <span
                class="shrink-0 transition duration-300 group-open:-rotate-180"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <ul class="mt-2 space-y-1 px-4">
              <!-- Submenu Data Admin -->
              <li>
                <a
                  href="/admin/list"
                  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Data Admin
                </a>
              </li>

              <!-- Submenu Data Level -->
              <li>
                <a
                  href="/admin/level"
                  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Data Level
                </a>
              </li>
            </ul>
          </details>
        </li>

        <!-- Menu Logout -->
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
              dataAdmin.nama_admin
            }}</strong>

            <span> {{ role }} </span>
          </p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar Admin",
  created() {
    try {
      // Mengambil data admin dari local storage
      this.dataAdmin = JSON.parse(localStorage.getItem("dataAdmin"));
      // Menentukan peran berdasarkan id_level
      if (this.dataAdmin.id_level == 1) {
        this.role = "Super Admin";
      } else if (this.dataAdmin.id_level == 2) {
        this.role = "Admin";
      }
    } catch (error) {
      location.href = "/admin";
    }
  },
  data() {
    return {
      dataAdmin: {},
      role: "",
    };
  },
  methods: {
    // @vuese
    // Menghandle proses logout admin
    handleLogout() {
      localStorage.removeItem("dataAdmin");
      this.$router.push("/admin/login");
    },
  },
  props: {},
};
</script>

<style></style>
