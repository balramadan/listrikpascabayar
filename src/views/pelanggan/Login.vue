<template>
  <div class="flex flex-col h-screen">
    <!-- Tautan untuk login sebagai admin -->
    <div class="flex justify-end mt-3 mr-3">
      <a href="/admin" class="px-3 py-1 shadow-sm text-sm bg-slate-100 rounded"
        >Login sebagai admin</a
      >
    </div>
    <div class="flex flex-col my-auto justify-center items-center">
      <div
        class="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      >
        <!-- Lectro logo -->
        <span
          class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
        ></span>
        <div class="flex flex-row justify-center mb-5 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            viewBox="0 0 48 48"
          >
            <path
              fill="#3b82f6"
              d="M33.7 5L22 17l15 5l-15.7 14.7l5.1 2.8L12 43l2.7-14.8l2.9 5.1L27 24l-15-5L25 5z"
            />
          </svg>
          <span class="-ml-2 font-bold text-blue-500 text-lg"> ectro </span>
        </div>
        <h2 class="font-bold text-center mb-5">Login</h2>

        <!-- Pesan error -->
        <div
          v-if="errorMsg"
          class="mb-5 bg-red-500 text-white px-3 py-2 text-center"
        >
          <span class="">{{ errorMsg }}</span>
        </div>
        <form class="flex flex-col w-80" @submit.prevent="handleLogin">
          <label for="username">Username:</label>
          <input
            type="text"
            class="px-3 py-2 border-2"
            name="username"
            v-model="username"
          />
          <label for="password">Password</label>
          <input
            type="password"
            class="px-3 py-2 border-2"
            name="password"
            v-model="password"
          />
          <input
            type="submit"
            class="px-3 py-2 bg-blue-500 mt-5 font-bold text-white cursor-pointer"
            value="Login"
          />
        </form>
        <!-- <p class="text-sm mt-5 text-center" >Belum punya akun?<a class="ml-1 text-blue-500" href="/register">Register</a></p> -->
      </div>
    </div>
  </div>
</template>

<script>
import supabase from "@/database/supabase";

export default {
  name: "LoginPelanggan",
  created() {},
  data() {
    return {
      username: "",
      password: "",
      errorMsg: "",
    };
  },
  methods: {
    /**
     * @vuese
     * Menghandle proses login pengguna
     */
    async handleLogin() {
      let { data: login, error } = await supabase
        .from("pelanggan")
        .select("*")
        .eq("username", this.username)
        .eq("password", this.password);

      if (login.length == 0) {
        this.errorMsg = "Username atau password salah!";
      } else {
        // Set data pelanggan ke local storage
        localStorage.setItem("data", JSON.stringify(login[0]));
        location.href = "/";
      }
    },
  },
  props: {},
};
</script>

<style></style>
