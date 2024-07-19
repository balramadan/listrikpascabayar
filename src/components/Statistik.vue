<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 gap-5">
    <div
      class="px-4 py-2 text-center h-full rounded-xl bg-white ring ring-indigo-50"
    >
      <h3 class="text-xs">Total Pelanggan</h3>
      <div class="flex flex-row justify-center items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
        >
          <path
            fill="blue"
            d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
          />
        </svg>
        <TotalPelanggan />
      </div>
    </div>

    <div
      class="px-4 py-2 text-center h-full rounded-xl bg-white ring ring-indigo-50"
    >
      <h3 class="text-xs">Total Penggunaan</h3>
      <div class="flex flex-row justify-center items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          viewBox="0 0 2048 2048"
        >
          <path
            fill="blue"
            d="M1792 1280h128v768H128V640h128V256h128V0h1408zM512 128v128h1024v1024h128V128zM384 384v256h347l640 640h37V384zm1408 1536v-512h-475L677 768H256v1152z"
          />
        </svg>
        <TotalPenggunaan />
      </div>
    </div>

    <div
      class="px-4 py-2 text-center h-full rounded-xl bg-white ring ring-indigo-50"
    >
      <h3 class="text-xs">Total Tarif</h3>
      <div class="flex flex-row justify-center items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="blue"
            stroke-width="2"
            d="M16 16c0-1.105-3.134-2-7-2s-7 .895-7 2s3.134 2 7 2s7-.895 7-2ZM2 16v4.937C2 22.077 5.134 23 9 23s7-.924 7-2.063V16M9 5c-4.418 0-8 .895-8 2s3.582 2 8 2M1 7v5c0 1.013 3.582 2 8 2M23 4c0-1.105-3.1-2-6.923-2s-6.923.895-6.923 2s3.1 2 6.923 2S23 5.105 23 4Zm-7 12c3.824 0 7-.987 7-2V4M9.154 4v10.166M9 9c0 1.013 3.253 2 7.077 2S23 10.013 23 9"
          />
        </svg>
        <TotalTarif />
      </div>
    </div>
  </div>
</template>

<script>
import TotalPelanggan from "./data/TotalPelanggan.vue";
import TotalPenggunaan from "./data/TotalPenggunaan.vue";
import TotalTarif from "./data/TotalTarif.vue";

export default {
  name: "Informasi",
  async created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
  components: {
    TotalPelanggan,
    TotalPenggunaan,
    TotalTarif,
  },
};
</script>

<style lang="scss" scoped></style>
