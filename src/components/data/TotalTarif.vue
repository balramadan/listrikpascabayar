<template>
  <span>{{ dataTarif.length }}</span>
</template>

<script>
import supabase from '@/database/supabase';

export default {
  name: "Test",
  async created() {
    let { data: tarif, error } = await supabase.from("tarif").select("*");

    if (error) {
      console.error(error);
      return;
    }

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
