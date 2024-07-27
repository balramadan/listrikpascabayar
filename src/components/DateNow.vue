<template>
  <div class="flex flex-row justify-between items-center text-sm font-poppins">
    <h2 class="">Selamat datang, <span class="font-semibold">{{ dataPelanggan.nama_pelanggan }}</span></h2>
    <p>{{ currentDate }}</p>
  </div>
</template>


<script>
export default {
  name: "DateNow",
  data() {
    return {
      currentDate: "",
      currentTime: "",
      dataPelanggan: {},
    };
  },
  created() {
    this.getCurrentDateTime();
    this.dataPelanggan = JSON.parse(localStorage.getItem("data"));
  },
  methods: {
    // @vuese
    // Mengambil tanggal dan waktu saat ini.
    getCurrentDateTime() {
      const now = new Date();
      this.currentDate = now.toLocaleDateString();;
    },
  },
};
</script>


<style lang="scss" scoped></style>