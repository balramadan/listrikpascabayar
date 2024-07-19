<template>
  <div class="flex flex-col h-screen justify-center items-center">
    <div
      class="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
    >
      <span
        class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
      ></span>
      <h2 class="font-bold text-center mb-5">Register</h2>

      <!-- Error message -->
      <div
        v-if="errorMsg"
        class="w-80 mb-5 bg-red-500 text-white px-3 py-2 text-center"
      >
        <span class="">{{ errorMsg }}</span>
      </div>
      <form class="flex flex-col w-80" @submit.prevent="handleRegister">
        <label for="namalengkap">Nama Lengkap:</label>
        <input
          type="text"
          class="px-3 py-2 border-2"
          name="namalengkap"
          v-model="namalengkap"
        />
        <label for="username">Username:</label>
        <input
          type="text"
          class="px-3 py-2 border-2"
          name="username"
          v-model="username"
        />
        <label for="nomorKwh">Nomor Kwh:</label>
        <input
          type="text"
          class="px-3 py-2 border-2"
          name="nomorKwh"
          v-model="nomorKwh"
        />
        <label for="HeadlineAct" class=""> Daya Listrik: </label>
        <select
          name="HeadlineAct"
          id="HeadlineAct"
          class="px-3 py-2 border-2"
          v-model="pilihanDaya"
        >
          <option v-for="(opsi, index) in pilihan" :value="index + 1">
            {{ opsi }}
          </option>
        </select>
        <label for="alamat">Alamat:</label>
        <input
          type="text"
          class="px-3 py-2 border-2"
          name="alamat"
          v-model="alamat"
        />
        <label for="password">Password:</label>
        <input
          type="password"
          class="px-3 py-2 border-2"
          name="password"
          v-model="password"
        />
        <input
          type="submit"
          class="px-3 py-2 bg-blue-500 mt-5 font-bold text-white cursor-pointer"
          value="Register"
        />
      </form>
      <p class="text-sm mt-5 text-center">
        Sudah punya akun?<a class="ml-1 text-blue-500" href="/login">Login</a>
      </p>
    </div>
  </div>
</template>

<script>
import supabase from "@/database/supabase";

export default {
  name: "Test",
  created() {},
  data() {
    return {
      namalengkap: "",
      username: "",
      nomorKwh: "",
      pilihan: ["900 VA", "1300 VA", "2200 VA", "3500-5500 VA", "6600 VA"],
      pilihanDaya: null,
      alamat: "",
      password: "",
      errorMsg: "",
    };
  },
  methods: {
    async handleRegister() {
      const { data: register, error } = await supabase
        .from("pelanggan")
        .insert([
          {
            username: this.username,
            password: this.password,
            nomor_kwh: this.nomorKwh,
            nama_pelanggan: this.namalengkap,
            alamat: this.alamat,
            id_tarif: this.pilihanDaya,
          },
        ])
        .select();

      if (error) {
        this.errorMsg = error.message;
      } else {
        alert("Register berhasil!");
        location.href = "/login";
      }
    },
  },
  props: {},
};
</script>

<style lang="scss" scoped></style>
