<template>
  <!-- Komponen SidebarAdmin -->
  <SidebarAdmin />

  <div class="ml-0 sm:ml-56 px-5 py-5 font-poppins">
    <h2 class="text-sm">
      Selamat Datang, <span class="admin-name font-bold">{{ nama }}</span>
    </h2>

    <!-- Komponen Statistik -->
    <Statistik />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div class="mb-5 lg:mb-0">
        <!-- Komponen PembayaranSebulan -->
        <PembayaranSebulan />
      </div>
      <div class="">
        <!-- Komponen PembayaranFull -->
        <PembayaranFull />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import PembayaranSebulan from "@/components/PembayaranSebulan.vue";
import PembayaranFull from "@/components/PembayaranFull.vue";
import Statistik from "@/components/Statistik.vue";

export default {
  name: "DashboardAdmin",
  // Metode yang dijalankan saat komponen dibuat
  async created() {
    try {
      this.dataAdmin = JSON.parse(localStorage.getItem("dataAdmin"));
      this.nama = await this.dataAdmin.nama_admin;
    } catch (error) {
      location.href = "/admin";
    }
  },
  data() {
    return {
      dataAdmin: {},
      nama: "",
    };
  },
  props: {},
  methods: {},
  components: {
    SidebarAdmin,
    PembayaranSebulan,
    PembayaranFull,
    Statistik,
  },
};
</script>

<style scoped>
</style>
