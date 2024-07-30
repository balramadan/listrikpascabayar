<template>
  <!-- Komponen SidebarAdmin -->
  <SidebarAdmin />

  <div class="ml-0 sm:ml-56 px-5 py-5 font-poppins">
    <form @submit.prevent="handleEdit">
      <div class="flex flex-col mb-3">
        <label for="daya">Daya</label>
        <input
          v-model="daya"
          type="text"
          name="daya"
          id="daya"
          class="px-2 py-1 border-2 rounded w-full"
        />
      </div>

      <div class="flex flex-col mb-5">
        <label for="tarifperkwh">Tarif per Kwh</label>
        <input
          v-model="tarifperkwh"
          type="number"
          name="tarifperkwh"
          id="tarifperkwh"
          class="px-2 py-1 border-2 rounded w-full"
        />
      </div>

      <div class="flex justify-between items-center gap-5">
        <div class="">
          <!-- Tombol Delete -->
          <a
            @click="openPosition('top')"
            class="bg-red-500 text-white py-1 px-3 rounded font-bold cursor-pointer"
            >Delete</a
          >
        </div>
        <div class="flex gap-5 items-center">
          <!-- Tombol Cancel -->
          <a href="/admin/tarif" class="text-red-500 cursor-pointer">Cancel</a>
          <!-- Tombol Save -->
          <input
            class="bg-blue-500 text-white py-1 px-3 rounded font-bold cursor-pointer"
            type="submit"
            value="Save"
          />
        </div>
      </div>
    </form>

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
      <span class="mt-3">Yakin ingin menghapus {{ daya }}?</span>
      <form
        class="mt-3 flex flex-row justify-between"
        @submit.prevent="handleDelete"
      >
        <!-- Tombol Cancel -->
        <a
          @click.prevent="confirmDelete = false"
          class="text-blue-500 cursor-pointer"
          >Cancel</a
        >
        <!-- Tombol Ya -->
        <input
          class="bg-red-500 text-white py-1 px-3 rounded font-bold cursor-pointer"
          type="submit"
          value="Ya"
        />
      </form>
    </Dialog>
  </div>
</template>

<script>
import supabase from "@/database/supabase";
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import Dialog from "primevue/dialog";

export default {
  name: "EditTarif",
  /**
   * Komponen EditTarif digunakan untuk mengedit data tarif.
   * Komponen ini menampilkan form untuk mengedit daya dan tarif per kWh.
   * Jika tombol "Delete" di klik, akan muncul dialog konfirmasi untuk menghapus tarif.
   * Jika tombol "Cancel" di klik, pengguna akan diarahkan kembali ke halaman tarif admin.
   * Jika tombol "Save" di klik, data tarif akan diupdate ke database.
   * Jika tombol "Ya" di klik pada dialog konfirmasi hapus, data tarif akan dihapus dari database.
   */
  async created() {
    // Mengambil data tarif berdasarkan id
    let { data: tarif, error } = await supabase
      .from("tarif")
      .select("*")
      .eq("id_tarif", this.$route.params.id);

    if (error) {
      console.error("Error fetching data:", error.message);
      this.$router.push("/admin/tarif");
    }

    // Mengisi data tarif ke dalam variabel
    this.dataTarif = tarif[0];
    this.daya = tarif[0].daya;
    this.tarifperkwh = tarif[0].tarifperkwh;
  },
  data() {
    return {
      dataTarif: {},
      daya: "",
      tarifperkwh: 0,
      confirmDelete: false,
      position: "",
    };
  },
  methods: {
    /**
     * @vuese
     * Membuka dialog konfirmasi hapus.
     * @arg {string} position - Posisi dialog konfirmasi (top, bottom, left, right).
     */
    openPosition(position) {
      this.position = position;
      this.confirmDelete = true;
    },
    // @vuese
    // Mengupdate data tarif
    async handleEdit() {
      const { data, error } = await supabase
        .from("tarif")
        .update({ daya: this.daya, tarifperkwh: this.tarifperkwh })
        .eq("id_tarif", this.$route.params.id)
        .select();
    },
    // @vuese
    // Menghapus data tarif
    async handleDelete() {
      const { error } = await supabase
        .from("tarif")
        .delete()
        .eq("id_tarif", this.$route.params.id);

      if (error) {
        alert("Gagal menghapus tarif");
        this.confirmDelete = false;
        return;
      }

      alert("Tarif berhasil dihapus");
      this.$router.push("/admin/tarif");
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
