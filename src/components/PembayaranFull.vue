<template>
  <div
    class="lg:my-5 h-full rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8"
  >
    <h2 class="font-bold">Total Seluruh Pembayaran</h2>
    <div class="mt-5">
      <h3 class="text-sm">Total Pembayaran</h3>
      <div class="flex flex-row justify-between items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
        >
          <g fill="none" fill-rule="evenodd">
            <path
              d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
            />
            <path
              fill="blue"
              d="M17 2a3 3 0 0 1 3 3v16a1 1 0 0 1-1.625.78l-1.875-1.5l-1.875 1.5a1 1 0 0 1-1.332-.073L12 20.414l-1.293 1.293a1 1 0 0 1-1.332.074L7.5 20.28l-1.875 1.5A1 1 0 0 1 4 21V5a3 3 0 0 1 3-3zm-5 10H9a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2m3-4H9a1 1 0 0 0-.117 1.993L9 10h6a1 1 0 0 0 .117-1.993z"
            />
          </g>
        </svg>
        <div class="text-2xl">{{ dataTagihan.length }}</div>
      </div>
    </div>
    <div class="mt-3">
      <h3 class="text-sm">Belum di Bayar</h3>
      <div class="flex flex-row justify-between items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          viewBox="0 0 14 14"
        >
          <g
            fill="none"
            stroke="blue"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M2.5 2.5h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1m-11-8v7a1 1 0 0 0 1 1H9"
            />
            <path
              d="M5.586 5.586a2 2 0 1 1 2.828 2.828M5.022 7.296a2.001 2.001 0 0 0 1.745 1.69M13.5 13.5L.5.5"
            />
          </g>
        </svg>
        <div class="text-2xl">
          {{
            dataTagihan.filter((tagihan) => tagihan.status === "Belum Dibayar")
              .length
          }}
        </div>
      </div>
    </div>
    <div class="mt-3">
      <h3 class="text-sm">Belum di Cek</h3>
      <div class="flex flex-row justify-between items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          viewBox="0 0 16 16"
        >
          <path
            fill="blue"
            d="M11.917 6A6.002 6.002 0 0 0 0 7a6 6 0 0 0 7 5.917V11.9q-.486.1-1 .1a5 5 0 1 1 4.9-6zM7.72 7.05A.5.5 0 0 0 7.5 7H6.002V4.5l-.009-.09a.5.5 0 0 0-.991.09v3l.008.09a.5.5 0 0 0 .492.41H7.17c.124-.351.311-.672.549-.95M14 7h-4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2m-.5 7h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1m0-2h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1m0-2h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1"
          />
        </svg>
        <div class="text-2xl">
          {{
            dataTagihan.filter((tagihan) => tagihan.status === "Diproses").length
          }}
        </div>
      </div>
    </div>
    <div class="mt-3">
      <h3 class="text-sm">Selesai</h3>
      <div class="flex flex-row justify-between items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
        >
          <path
            fill="blue"
            d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"
          />
        </svg>
        <div class="text-2xl">
          {{
            dataTagihan.filter((tagihan) => tagihan.status === "Dibayar").length
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import supabase from "@/database/supabase";

export default {
  name: "Test",
  async created() {
    let { data: tagihan, error } = await supabase.from("tagihan").select("*");

    if (error) {
      console.error(error);
    } else {
      this.dataTagihan = tagihan;
    }
  },
  data() {
    return {
      dataTagihan: [],
    };
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
