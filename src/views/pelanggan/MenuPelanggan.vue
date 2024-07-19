<template>
  <Sidebar />
  <div class="ml-56 px-5 py-5 font-poppins">
    <div class="">
      <!-- Menampilkan tanggal -->
      <DateNow />
    </div>
    <div class="grid grid-cols-2 gap-5">
      <div class="">
        <!-- Tabel tagihan pengguna -->
        <TabelTagihan />
      </div>
      <div class="">
        <!-- Tabel pembayaran pengguna -->
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
  name: "Test",
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
