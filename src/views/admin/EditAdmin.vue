<template>
  <SidebarAdmin />
  <div class="ml-56 px-5 py-5 font-poppins">
    <form class="mt-3" @submit.prevent="handleEdit">
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

      <div class="flex justify-between items-center gap-5">
        <div class="">
          <a
            @click="openPosition('top')"
            class="bg-red-500 text-white py-1 px-3 rounded font-bold cursor-pointer"
            >Delete</a
          >
        </div>
        <div class="flex gap-5 items-center">
          <a href="/admin/list" class="text-red-500 cursor-pointer">Cancel</a>
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
import Button from "primevue/button";

export default {
  name: "Test",
  async created() {
    let { data: user, error } = await supabase
      .from("user")
      .select("*, level(*)")
      .eq("id_user", this.$route.params.id);

    if (error) {
      console.error(error);
      return;
    }

    this.dataUser = user[0];
    this.nama = user[0].nama_admin;
    this.username = user[0].username;
    this.password = user[0].password;
    this.role = user[0].id_level;
  },
  data() {
    return {
      dataUser: {},
      nama: "",
      username: "",
      password: "",
      role: null,
      pilihanRole: ["superadmin", "admin"],
      confirmDelete: false,
      position: "",
    };
  },
  methods: {
    openPosition(position) {
      this.position = position;
      this.confirmDelete = true;
    },
    async handleDelete() {
      const { data, error } = await supabase
        .from("user")
        .delete()
        .eq("id_user", this.$route.params.id)
        .select();

      if (error) {
        console.error(error);
        return;
      }

      alert("Data berhasil dihapus");
      this.$router.push("/admin/list");
    },
    async handleEdit() {
      const { data, error } = await supabase
        .from("user")
        .update({
          nama_admin: this.nama,
          username: this.username,
          password: this.password,
          id_level: this.role,
        })
        .eq("id_user", this.$route.params.id)
        .select();

      if (error) {
        alert(error.message);
        return;
      }

      alert("Data berhasil diubah");
      this.$router.push("/admin/list");
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
