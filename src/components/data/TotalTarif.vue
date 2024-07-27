<template>
  <span>{{ dataTarif.length }}</span>
</template>

<script>
import supabase from '@/database/supabase';

export default {
  name: "Total Tarif",
  async created() {
    let { data: tarif, error } = await supabase.from("tarif").select("*");

    if (error) {
      console.error(error);
      return;
    }

    // @vuese
    // Data disimpan dalam variabel dataTarif.
    this.dataTarif = tarif;
  },
  data() {
    return {
      dataTarif: [],
    };
  },
  props: {},
  methods: {},
  components: {},
};
</script>

<style lang="scss" scoped></style>
