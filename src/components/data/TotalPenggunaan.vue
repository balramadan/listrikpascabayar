<template>
  <span>{{ dataPenggunaan.length }}</span>
</template>

<script>
import supabase from '@/database/supabase';

export default {
  name: "Total Penggunaan",
  async created() {
    let { data: penggunaan, error } = await supabase
      .from("penggunaan")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    // @vuese
    // Data disimpan dalam variabel dataPenggunaan.
    this.dataPenggunaan = penggunaan;
  },
  data() {
    return {
      dataPenggunaan: [],
    };
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
