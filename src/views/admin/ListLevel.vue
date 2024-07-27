<template>
  <!-- Komponen SidebarAdmin -->
  <SidebarAdmin />

  <div class="ml-56 px-5 py-5 font-poppins">
    <div class="flex flex-row justify-between">
      <h2 class="font-bold">List Level</h2>
      <a
        class="py-2 px-3 rounded text-xs cursor-pointer font-bold text-white bg-blue-500"
        @click.prevent="visible = true"
        >Tambah Level</a
      >
    </div>

    <div class="overflow-x-auto my-5">
      <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead class="ltr:text-left rtl:text-right">
          <tr class="">
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              No
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
            <tr v-for="(level, index) in dataLevel" :key="index">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {{ index + 1 }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ level.nama_level }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              <a
                :href="`/admin/level/${level.id_level}`"
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
    header="Tambah Tarif"
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

      <div class="flex flex-col mb-3">
        <label for="role">Role</label>
        <input
          v-model="role"
          type="text"
          name="role"
          id="role"
          class="px-2 py-1 border-2 rounded w-full"
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

export default {
  name: "ListLevel",
  async created() {
    // Mengambil data level dari database saat komponen dibuat
    let { data: level, error } = await supabase.from("level").select("*");

    if (error) {
      alert(error.message);
      return;
    }

    this.dataLevel = level;
  },
  data() {
    return {
      dataLevel: [], // Data level yang akan ditampilkan
      visible: false, // Menyimpan status tampilan modal
      role: "", // Menyimpan nilai inputan role
      errorMsg: "", // Menyimpan pesan error
    };
  },
  methods: {
    // @vuese
    // Menambahkan level baru ke database
    async handleTambah() {
      const { data, error } = await supabase
        .from("level")
        .insert([{ nama_level: this.role }])
        .select();

      if (error) {
        this.errorMsg = error.message;
      }

      this.visible = false; // Menutup modal
      location.reload(); // Me-refresh halaman
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
