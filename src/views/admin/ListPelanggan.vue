<template>
  <!-- Komponen SidebarAdmin -->
  <SidebarAdmin />

  <div class="ml-56 bg-white px-5 py-5 font-poppins">
    <div class="flex flex-row justify-between">
      <h2 class="font-bold">Data Pelanggan</h2>
      <a
        class="py-2 px-3 rounded text-xs cursor-pointer font-bold text-white bg-blue-500"
        @click.prevent="visible = true"
        >Tambah Pelanggan</a
      >
    </div>

    <div class="overflow-x-auto my-5">
      <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead class="ltr:text-left rtl:text-right">
          <tr>
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Nama Pelanggan
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Nomor Kwh
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Alamat
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Username
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Daya
            </th>
            <th
              class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900"
            ></th>
          </tr>
        </thead>

        <tbody class="divide-y text-center divide-gray-200">
          <tr v-for="pelanggan in dataPelanggan" :key="pelanggan.id_pelanggan">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {{ pelanggan.nama_pelanggan }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ pelanggan.nomor_kwh }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ pelanggan.alamat }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ pelanggan.username }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ pelanggan.tarif.daya }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              <a
                :href="`/admin/pelanggan/${pelanggan.id_pelanggan}`"
                class="px-3 py-1 bg-blue-500 font-semibold text-white rounded"
                >Edit</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal -->
  <Dialog
    v-model:visible="visible"
    modal
    header="Tambah Pelanggan"
    :style="{
      width: '30rem',
      background: 'white',
      padding: '10px 20px',
      border: '1px solid #333',
      'border-radius': '8px',
    }"
  >
    <form class="mt-3" @submit.prevent="handleTambah">
      <div v-if="errorMsg" class="mt-3 bg-red-500 text-white px-3 py-1">
        {{ errorMsg }}
      </div>
      <div class="flex gap-4 mb-4 flex-col">
        <label for="nama" class="font-semibold">Nama lengkap</label>
        <input
          type="text"
          name="nama"
          id="nama"
          class="px-2 py-1 border-2 rounded w-full bg-white text-black"
          v-model="nama"
        />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex gap-4 mb-4 flex-col">
          <label for="username" class="font-semibold w-24">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            class="px-2 py-1 border-2 rounded w-full bg-white text-black"
            v-model="username"
          />
        </div>
        <div class="flex gap-4 mb-4 flex-col">
          <label for="password" class="font-semibold w-24">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            class="px-2 py-1 border-2 rounded w-full bg-white text-black"
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
            class="px-2 py-1 border-2 rounded w-full bg-white text-black"
            v-model="nomorKwh"
          />
        </div>
        <div class="flex gap-4 mb-4 flex-col">
          <label for="daya" class="font-semibold w-24">Daya listik</label>
          <select
            name="daya"
            id="daya"
            class="px-3 py-2 border-2 w-full bg-white text-black"
            v-model="pilihanDaya"
          >
            <option
              v-for="(opsi, index) in pilihan"
              :value="index + 1"
              :key="index"
            >
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
          class="px-2 py-1 border-2 rounded w-full bg-white text-black"
          v-model="alamat"
        />
      </div>
      <div class="flex justify-end gap-5">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="visible = false"
          :style="{ color: 'red' }"
        ></Button>
        <input
          class="bg-blue-500 text-white py-1 px-3 rounded font-bold cursor-pointer"
          type="submit"
          value="Save"
        />
      </div>
    </form>
  </Dialog>
</template>

<script>
import supabase from "@/database/supabase";
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Toast from "primevue/toast";

export default {
  name: "ListPelanggan",
  async created() {
    // Mengambil data pelanggan dari database saat komponen dibuat
    let { data: pelanggan, error } = await supabase
      .from("pelanggan")
      .select("*, tarif(*)");

    if (error) {
      console.error(error);
    } else {
      this.dataPelanggan = pelanggan;
    }
  },
  data() {
    return {
      // Kode ini melanggar konvensi penamaan, tetapi kita menggunakan nama ini karena
      // mengikuti istilah yang umum digunakan dalam domain bisnis.
      dataPelanggan: [], // Data pelanggan yang akan ditampilkan
      pilihan: ["900 VA", "1300 VA", "2200 VA", "3500-5500 VA", "6600 VA"], // Pilihan daya listrik
      visible: false, // Menyimpan status tampilan modal
      nama: "", // Nama pelanggan yang akan ditambahkan
      username: "", // Username pelanggan yang akan ditambahkan
      password: "", // Password pelanggan yang akan ditambahkan
      nomorKwh: "", // Nomor Kwh pelanggan yang akan ditambahkan
      pilihanDaya: null, // Daya listrik yang dipilih untuk pelanggan yang akan ditambahkan
      alamat: "", // Alamat pelanggan yang akan ditambahkan
      errorMsg: "", // Pesan error jika terjadi kesalahan saat menambahkan pelanggan
    };
  },
  methods: {
    // @vuese
    // Menambahkan pelanggan baru ke database
    async handleTambah() {
      const { data: tambah, error } = await supabase
        .from("pelanggan")
        .insert([
          {
            username: this.username,
            password: this.password,
            nomor_kwh: this.nomorKwh,
            nama_pelanggan: this.nama,
            alamat: this.alamat,
            id_tarif: this.pilihanDaya,
          },
        ])
        .select();

      if (error) {
        console.log(error.message)
      } else {
        this.showSuccess("Berhasil menambahkan pelanggan!");
        sessionStorage.removeItem("pelanggan");
        sessionStorage.setItem("pelanggan", JSON.stringify(tambah));
        this.visible = false;
        location.reload();
      }
    },
  },
  props: {},
  components: {
    SidebarAdmin,
    Dialog,
    Button,
  },
};
</script>

<style>
Toast {
  all: revert;
}
</style>
