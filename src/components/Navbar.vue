<template>
  <div
    :class="`relative flex flex-row sm:hidden px-5 py-5 justify-between items-center z-40`"
  >
    <div class="flex flex-row items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50px"
        height="50px"
        viewBox="0 0 48 48"
      >
        <path
          fill="#3b82f6"
          d="M33.7 5L22 17l15 5l-15.7 14.7l5.1 2.8L12 43l2.7-14.8l2.9 5.1L27 24l-15-5L25 5z"
        />
      </svg>
      <span class="-ml-2 font-bold text-blue-500 text-lg"> ectro </span>
    </div>
    <div class="">
      <button @click="clickButton">
        <svg
          id="burger-menu"
          class="block transition-all duration-300"
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 32 32"
        >
          <path
            fill="none"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8h15M5 16h22M5 24h22M5 11l3-3l-3-3"
          />
        </svg>
        <svg
          id="close-menu"
          class="hidden transition-all duration-300"
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
        >
          <path
            fill="black"
            d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";

export default {
  name: "Navbar",
  created() {},
  data() {
    return {};
  },
  methods: {
    // @vuese
    // Button untuk sidebar di mobile
    clickButton() {
      this.$emit("update:openSidebar", !this.openSidebar);
      if (this.openSidebar) {
        document.getElementById("burger-menu").style.display = "block";
        document.getElementById("close-menu").style.display = "none";
      } else {
        document.getElementById("burger-menu").style.display = "none";
        document.getElementById("close-menu").style.display = "block";
      }
    },
  },
  props: {
    // @vuese
    // Props boolean untuk membuka atau menutup sidebar
    openSidebar: {
      // Boolean
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
