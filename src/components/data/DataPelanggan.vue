<template>
  <div class="flex gap-4 mb-4 flex-col">
    <label for="namaPelanggan" class="font-semibold">Pelanggan</label>
    <select
      name="namaPelanggan"
      id="namaPelanggan"
      class="px-3 py-1.5 border-2 rounded"
      @input="$emit('update:namaPelanggan', $event.target.value)"
    >
      <option
        v-for="opsi in dataPelanggan"
        :value="opsi.id_pelanggan"
        :key="opsi.id_pelanggan"
      >
        {{ opsi.nama_pelanggan }}
      </option>
    </select>
  </div>
</template>

<script>
import supabase from "@/database/supabase";

export default {
  name: "DataPelanggan",
  async created() {
    let { data: pelanggan, error } = await supabase
      .from("pelanggan")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    /**
     * Daftar pelanggan yang diambil dari database.
     * @type {Array}
     */
    this.dataPelanggan = pelanggan;
  },
  data() {
    return {
      dataPelanggan: [],
    };
  },
  props: {
    /**
     * Nama pelanggan yang akan digunakan di komponen lain.
     * @type {Number}
     * @required
     */
    namaPelanggan: {
      type: Int16Array,
      required: true,
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
