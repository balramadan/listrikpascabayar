<template>
  <!-- Sidebar -->
  <!-- Komponen ini menampilkan navigasi sidebar. -->
  <Sidebar />
  <div class="sm:ml-56 px-5 py-5 font-poppins">
    <div class="">
      <!-- DateNow -->
      <!-- Komponen ini menampilkan tanggal saat ini. -->
      <DateNow />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div class="">
        <!-- TabelTagihan -->
        <!-- Komponen ini menampilkan tabel tagihan pengguna. -->
        <TabelTagihan />
      </div>
      <div class="">
        <!-- TabelPembayaran -->
        <!-- Komponen ini menampilkan tabel pembayaran pengguna. -->
        <TabelPembayaran />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import DateNow from "@/components/DateNow.vue";
import TabelTagihan from "@/components/TabelTagihan.vue";
import TabelPembayaran from "@/components/TabelPembayaran.vue";

export default {
  name: "MenuPelanggan",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
  components: {
    Sidebar,
    DateNow,
    TabelTagihan,
    TabelPembayaran,
  },
};
</script>

<style scoped></style>
