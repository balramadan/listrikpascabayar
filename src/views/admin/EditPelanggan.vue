<template>
  <!-- Komponen SidebarAdmin -->
  <SidebarAdmin />
  <div class="ml-56 px-5 py-5 font-poppins">
    <form @submit.prevent="handleEdit">
      <div class="flex gap-4 mb-4 flex-col">
        <label for="nama" class="font-semibold">Nama lengkap</label>
        <input
          type="text"
          name="nama"
          id="nama"
          class="px-2 py-1 border-2 rounded w-full"
          v-model="nama"
        />
      </div>
      <div class="grid grid-cols-2 gap-4 w-full">
        <div class="flex gap-4 mb-4 flex-col">
          <label for="username" class="font-semibold w-24">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            class="px-2 py-1 border-2 rounded w-full"
            v-model="username"
          />
        </div>
        <div class="flex gap-4 mb-4 flex-col">
          <label for="password" class="font-semibold w-24">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            class="px-2 py-1 border-2 rounded w-full"
            v-model="password"
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex gap-4 mb-4 flex-col">
          <label for="nomorKwh" class="font-semibold w-24">Nomor Kwh</label>
          <input
            type="text"
            name="nomorKwh"
            id="nomorKwh"
            class="px-2 py-1 border-2 rounded w-full"
            v-model="nomorKwh"
          />
        </div>
        <div class="flex gap-4 mb-4 flex-col">
          <label for="daya" class="font-semibold">Daya listrik</label>
          <select
            name="daya"
            id="daya"
            class="px-3 py-2 border-2 w-full"
            v-model="pilihanDaya"
          >
            <option v-for="(opsi, index) in pilihan" :value="index + 1" :key="index">
              {{ opsi }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex gap-4 mb-4 flex-col">
        <label for="alamat" class="font-semibold">Alamat</label>
        <input
          type="text"
          name="alamat"
          id="alamat"
          class="px-2 py-1 border-2 rounded w-full"
          v-model="alamat"
        />
      </div>
      <div class="flex justify-between items-center gap-5">
        <div class="">
          <a
            @click="openPosition('top')"
            class="bg-red-500 text-white py-1 px-3 rounded font-bold cursor-pointer"
            >Delete</a
          >
        </div>
        <div class="flex gap-5 items-center">
          <a href="/admin/pelanggan" class="text-red-500 cursor-pointer"
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

  <!-- Modal -->
  <Dialog
    v-model:visible="confirmDelete"
    header="Hapus Pelanggan"
    :style="{
      width: '25rem',
      background: 'white',
      padding: '10px 20px',
      border: '1px solid #333',
      'border-radius': '8px',
    }"
    :position="position"
    :modal="true"
    :draggable="false"
  >
    <span class="mt-3">Yakin ingin menghapus {{ nama }}?</span>
    <form
      class="mt-3 flex flex-row justify-between"
      @submit.prevent="handleDelete"
    >
      <a
        @click.prevent="confirmDelete = false"
        class="text-blue-500 cursor-pointer"
        >Cancel</a
      >
      <input
        class="bg-red-500 text-white py-1 px-3 rounded font-bold cursor-pointer"
        type="submit"
        value="Ya"
      />
    </form>
  </Dialog>
</template>

<script>
import supabase from "@/database/supabase";
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import Dialog from "primevue/dialog";

export default {
  name: "EditPelanggan",
  async created() {
    // Mengambil data pelanggan dari database berdasarkan id_pelanggan
    let { data: pelanggan, error } = await supabase
      .from("pelanggan")
      .select("*")
      .eq("id_pelanggan", this.$route.params.id);

    if (error) {
      // Jika terjadi error, redirect ke halaman /admin/pelanggan
      this.$route.push("/admin/pelanggan");
      return;
    }
    // Mengisi data pelanggan ke dalam variabel dataPelanggan
    this.dataPelanggan = pelanggan[0];
    this.nama = this.dataPelanggan.nama_pelanggan;
    this.username = this.dataPelanggan.username;
    this.password = this.dataPelanggan.password;
    this.nomorKwh = this.dataPelanggan.nomor_kwh;
    this.pilihanDaya = this.dataPelanggan.id_tarif;
    this.alamat = this.dataPelanggan.alamat;
  },
  data() {
    return {
      dataPelanggan: {},
      pilihan: ["900 VA", "1300 VA", "2200 VA", "3500-5500 VA", "6600 VA"],
      visible: false,
      nama: "",
      username: "",
      password: "",
      nomorKwh: "",
      pilihanDaya: null,
      alamat: "",
      confirmDelete: false,
      position: "",
    };
  },
  methods: {
    // @vuese
    // Membuka dialog konfirmasi hapus pelanggan
    // @arg {String} position
    openPosition(position) {
      this.position = position;
      this.confirmDelete = true;
    },
    // @vuese
    // Mengupdate data pelanggan ke dalam database
    async handleEdit() {
      const { data, error } = await supabase
        .from("pelanggan")
        .update({
          username: this.username,
          password: this.password,
          nomor_kwh: this.nomorKwh,
          nama_pelanggan: this.nama,
          alamat: this.alamat,
          id_tarif: this.pilihanDaya,
        })
        .eq("id_pelanggan", this.$route.params.id)
        .select();

      alert("Pelanggan berhasil diubah");
      // Redirect ke halaman /admin/pelanggan setelah berhasil mengubah data
      this.$router.push("/admin/pelanggan");
    },
    // @vuese
    // Menghapus data pelanggan dari database
    async handleDelete() {
      const { error } = await supabase
        .from("pelanggan")
        .delete()
        .eq("id_pelanggan", this.$route.params.id);

      if (error) {
        alert("Gagal menghapus pelanggan");
        this.confirmDelete = false;
        console.error(error);
        return;
      }

      alert("Pelanggan berhasil dihapus");
      // Redirect ke halaman /admin/pelanggan setelah berhasil menghapus data
      this.$router.push("/admin/pelanggan");
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
