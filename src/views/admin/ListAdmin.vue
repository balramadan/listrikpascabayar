<template>
  <SidebarAdmin />
  <div class="ml-56 px-5 py-5 font-poppins">
    <div class="flex flex-row justify-between">
      <h2 class="font-bold">Data User</h2>
      <a
        class="py-2 px-3 rounded text-xs cursor-pointer font-bold text-white bg-blue-500"
        @click.prevent="visible = true"
        >Tambah User</a
      >
    </div>

    <div class="overflow-x-auto my-5">
      <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead class="ltr:text-left rtl:text-right">
          <tr class="">
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Nama
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Username
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Role
            </th>
            <th
              class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900"
            ></th>
          </tr>
        </thead>

        <tbody class="divide-y text-center divide-gray-200">
          <tr v-for="admin in users">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {{ admin.nama_admin }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ admin.username }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ admin.level.nama_level }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              <a
                :href="`/admin/list/${admin.id_user}`"
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
    header="Tambah User"
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
          class="px-2 py-1 border-2 rounded w-full"
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
      <div class="flex gap-4 mb-4 flex-col">
        <label for="role" class="font-semibold w-24">Role</label>
        <select
          name="role"
          id="role"
          class="px-3 py-2 border-2 w-full"
          v-model="role"
        >
          <option v-for="(opsi, index) in pilihanRole" :value="index + 1">
            {{ opsi }}
          </option>
        </select>
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

export default {
  name: "Test",
  async created() {
    let { data: user, error } = await supabase
      .from("user")
      .select("*, level(*)");

    if (error) {
      console.log(error);
      return;
    }

    this.users = user;
  },
  data() {
    return {
      users: [],
      visible: false,
      pilihanRole: ["superadmin", "admin"],
      nama: "",
      username: "",
      password: "",
      role: null,
      errorMsg: "",
    };
  },
  methods: {
    async handleTambah() {
      const { data, error } = await supabase
        .from("user")
        .insert([
          {
            nama_admin: this.nama,
            username: this.username,
            password: this.password,
            id_level: this.role,
          },
        ])
        .select();

        if(error) {
          this.errorMsg = error.message;
          return;
        }

        this.visible = false;
        location.reload();
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

<style lang="scss" scoped></style>
