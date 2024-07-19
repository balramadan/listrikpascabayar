<template>
  <SidebarAdmin />
  <div class="ml-56 px-5 py-5 font-poppins">
    <form @submit.prevent="handleEdit">
      <div class="flex flex-col mb-3">
        <label for="nama">Nama Pelanggan</label>
        <input
          type="text"
          name="nama"
          id="nama"
          v-model="nama"
          class="px-2 py-1 border-2 rounded w-full"
          disabled
        />
      </div>
      <div class="flex flex-col mb-3">
        <label for="nomorKwh">Nomor Kwh</label>
        <input
          type="text"
          name="nomorKwh"
          id="nomorKwh"
          v-model="nomorKwh"
          class="px-2 py-1 border-2 rounded w-full"
          disabled
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 mb-3 gap-3">
        <div class="">
          <label for="bulan">Bulan</label>
          <input
            type="text"
            name="bulan"
            id="bulan"
            v-model="bulan"
            class="px-2 py-1 border-2 rounded w-full"
            disabled
          />
        </div>
        <div class="">
          <label for="tahun">Tahun</label>
          <input
            type="text"
            name="tahun"
            id="tahun"
            v-model="tahun"
            class="px-2 py-1 border-2 rounded w-full"
            disabled
          />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 mb-3 gap-3">
        <div class="">
          <label for="biayaAdmin">Biaya Admin</label>
          <input
            type="number"
            name="biayaAdmin"
            id="biayaAdmin"
            v-model="biayaAdmin"
            class="px-2 py-1 border-2 rounded w-full"
            disabled
          />
        </div>
        <div class="">
          <label for="harga">Harga</label>
          <input
            type="number"
            name="harga"
            id="harga"
            v-model="harga"
            class="px-2 py-1 border-2 rounded w-full"
            disabled
          />
        </div>
      </div>
      <div class="flex flex-col mb-3">
        <label for="totalHarga">Total Harga</label>
        <input
          type="number"
          name="totalHarga"
          id="totalHarga"
          v-model="totalHarga"
          class="px-2 py-1 border-2 rounded w-full"
          disabled
        />
      </div>
      <div class="mb-3" v-if="bukti">
        <h3>Bukti Pembayaran</h3>
        <img
          :src="`https://hoxbxnpxojpepygogkds.supabase.co/storage/v1/object/public/bukti/${bukti}`"
          class="w-1/2 border mt-2"
          alt="Bukti Pembayaran"
        />
      </div>
      <div class="flex flex-col mb-3">
        <label for="status">Status</label>
        <select
          name="status"
          id="status"
          class="px-3 py-1.5 border-2 rounded"
          v-model="status"
        >
          <option v-for="opsi in pilihanStatus" :value="opsi">
            {{ opsi }}
          </option>
        </select>
      </div>

      <div class="flex justify-end items-center gap-5">
        <div class="flex gap-5 items-center">
          <a href="/admin/pembayaran" class="text-red-500 cursor-pointer"
            >Cancel</a
          >
          <input
            class="bg-blue-500 text-white py-1 px-3 rounded font-bold cursor-pointer"
            type="submit"
            value="Save"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import supabase from "@/database/supabase";
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import Dialog from "primevue/dialog";

export default {
  name: "Test",
  async created() {
    let { data: pembayaran, error } = await supabase
      .from("pembayaran")
      .select("*, pelanggan(*), tagihan(*)")
      .eq("id_pembayaran", this.$route.params.id);

    if (error) {
      console.error(error);
      return;
    }

    this.dataPembayaran = pembayaran[0];
    this.nama = pembayaran[0].pelanggan.nama_pelanggan;
    this.nomorKwh = pembayaran[0].pelanggan.nomor_kwh;
    this.bulan = pembayaran[0].tagihan.bulan;
    this.tahun = pembayaran[0].tagihan.tahun;
    this.biayaAdmin = pembayaran[0].biaya_admin;
    this.harga = pembayaran[0].total_bayar;
    this.totalHarga = pembayaran[0].total_bayar + pembayaran[0].biaya_admin;
    this.status = pembayaran[0].tagihan.status;
    this.bukti = pembayaran[0].bukti;
  },
  data() {
    return {
      dataPembayaran: {},
      nama: "",
      nomorKwh: "",
      bulan: "",
      tahun: "",
      biayaAdmin: 0,
      harga: 0,
      totalHarga: 0,
      status: "",
      bukti: null,
      pilihanStatus: ["Belum Dibayar", "Diproses", "Dibayar"],
    };
  },
  methods: {
    async handleEdit() {
      const { data, error } = await supabase
        .from("tagihan")
        .update({ status: this.status })
        .eq("id_tagihan", this.dataPembayaran.id_tagihan)
        .select();

      if (error) {
        alert(error.message);
        return;
      }

      alert("Data berhasil diubah");
      this.$router.push("/admin/pembayaran");
    },
  },
  props: {},
  components: {
    SidebarAdmin,
    Dialog,
  },
};
</script>

<style lang="scss" scoped></style>
