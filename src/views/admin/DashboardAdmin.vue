<template>
  <SidebarAdmin />
  <div class="ml-56 px-5 py-5 font-poppins">
    <h2 class="text-sm">
      Selamat Datang, <span class="font-bold">{{ dataAdmin.nama_admin }}</span>
    </h2>
    <Statistik />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div class="mb-5 lg:mb-0">
        <PembayaranSebulan />
      </div>
      <div class="">
        <PembayaranFull />
      </div>
    </div>
  </div>
</template>

<script>
import supabase from "@/database/supabase";
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import PembayaranSebulan from "@/components/PembayaranSebulan.vue";
import PembayaranFull from "@/components/PembayaranFull.vue";
import Statistik from "@/components/Statistik.vue";

export default {
  name: "Dashboard Admin",
  async created() {
    this.dataAdmin = JSON.parse(localStorage.getItem("dataAdmin"));
  },
  data() {
    return {
      dataAdmin: {},
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

<style lang="scss" scoped></style>
