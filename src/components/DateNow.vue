<template>
  <div class="">
    <p>{{ currentDate }}</p>
  </div>
</template>


<script>
export default {
  name: "DateNow",
  data() {
    return {
      currentDate: "",
      currentTime: "",
    };
  },
  created() {
    this.getCurrentDateTime();
  },
  methods: {
    getCurrentDateTime() {
      const now = new Date();
      this.currentDate = now.toLocaleDateString();;
    },
  },
};
</script>


<style lang="scss" scoped></style>