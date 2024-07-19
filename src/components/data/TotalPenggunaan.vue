<template>
  <span>{{ dataPenggunaan.length }}</span>
</template>

<script>
import supabase from '@/database/supabase';

export default {
  name: "Test",
  async created() {
    let { data: penggunaan, error } = await supabase
      .from("penggunaan")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

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
