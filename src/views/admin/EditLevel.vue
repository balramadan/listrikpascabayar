<template>
  <!-- Komponen sidebar admin -->
  <SidebarAdmin />
  
  <div class="ml-0 sm:ml-56 px-5 py-5 font-poppins">
    <form class="mt-3" @submit.prevent="handleEdit">
      <div class="flex gap-4 mb-4 flex-col">
        <label for="role" class="font-semibold">Role</label>
        <input
          type="text"
          name="role"
          id="role"
          class="px-2 py-1 border-2 rounded w-full"
          v-model="role"
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
          <a href="/admin/level" class="text-red-500 cursor-pointer">Cancel</a>
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
  name: "Test",
  /**
   * Metode yang dijalankan saat komponen dibuat.
   * Mengambil data level berdasarkan id dari route params.
   */
  async created() {
    let { data: level, error } = await supabase
      .from("level")
      .select("*")
      .eq("id_level", this.$route.params.id);

    if (error) {
      alert(error.message);
      return;
    }

    this.role = level[0].nama_level;
  },
  data() {
    return {
      /**
       * Role yang akan diubah.
       */
      role: "",
      /**
       * Menyimpan status konfirmasi penghapusan data.
       */
      confirmDelete: false,
      /**
       * Menyimpan posisi dialog konfirmasi penghapusan data.
       */
      position: "",
    };
  },
  methods: {
    /**
     * @vuese
     * Membuka dialog konfirmasi penghapusan data.
     * @arg {string} position - Posisi dialog konfirmasi penghapusan data.
     */
    openPosition(position) {
      this.position = position;
      this.confirmDelete = true;
    },
    /**
     * @vuese
     * Menghandle proses pengeditan data level.
     */
    async handleEdit() {
      const { data, error } = await supabase
        .from("level")
        .update({ nama_level: this.role })
        .eq("id_level", this.$route.params.id)
        .select();

      if (error) {
        alert(error.message);
        return;
      }

      alert("Data berhasil diubah");
      this.$router.push("/admin/level");
    },
    /**
     * @vuese
     * Menghandle proses penghapusan data level.
     */
    async handleDelete() {
      const { error } = await supabase
        .from("level")
        .delete()
        .eq("id_level", this.$route.params.id);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Data berhasil dihapus");
      this.$router.push("/admin/level");
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
