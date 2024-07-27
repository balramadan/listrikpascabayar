<template>
  <span>{{ dataPelanggan.length }}</span>
</template>

<script>
import supabase from '@/database/supabase';

export default {
  name: "Total Pelanggan",
  async created() {
    let { data: pelanggan, error } = await supabase
      .from("pelanggan")
      .select("*");

    if (error) {
      console.error(error)
      return
    }

    // @vuese
    // Data disimpan dalam variabel dataPelanggan.
    this.dataPelanggan = pelanggan
  },
  data() {
    return {
      dataPelanggan: [],
    };
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>