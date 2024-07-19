<template>
  <span>{{ dataPelanggan.length }}</span>
</template>

<script>
import supabase from '@/database/supabase';

export default {
  name: "Test",
  async created() {
    let { data: pelanggan, error } = await supabase
      .from("pelanggan")
      .select("*");

    if (error) {
      console.error(error)
      return
    }

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