<template>
  <Sidebar />
  <div class="ml-56 px-5 py-5 font-poppins">
    <h2 class="mb-5 font-bold">Tambah Penggunaan</h2>
    <form class="flex flex-col" @submit.prevent="handlePenggunaan">
      <div class="grid grid-cols-2 gap-5">
        <div class="flex flex-col">
          <label for="bulan">Bulan:</label>
          <select
            name="bulan"
            id="bulan"
            class="px-3 py-1.5 border-2 rounded"
            v-model="bulan"
          >
            <option v-for="opsi in pilihan" :value="opsi">
              {{ opsi }}
            </option>
          </select>
        </div>
        <div class="">
          <label for="tahun">Tahun:</label>
          <input
            type="text"
            class="border py-1 px-3 w-full border-gray-400 rounded"
            name="tahun"
            id="tahun"
            v-model="tahun"
          />
        </div>
      </div>
      <label for="meterAwal">Meter Awal:</label>
      <input
        type="number"
        class="border py-1 px-3 w-full border-gray-400 rounded"
        name="meterAwal"
        id="meterAwal"
        v-model="meterAwal"
      />
      <label for="meterAkhir">Meter Akhir:</label>
      <input
        type="number"
        class="border py-1 px-3 w-full border-gray-400 rounded"
        name="meterAkhir"
        id="meterAkhir"
        v-model="meterAkhir"
      />
      <input
        type="submit"
        class="mt-5 px-3 py-2 bg-blue-500 text-white font-bold rounded cursor-pointer"
        value="Kirim"
      />
    </form>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "Test",
  created() {
    this.dataUser = JSON.parse(localStorage.getItem("data"));
    this.id_pelanggan = this.dataUser.id_pelanggan;
  },
  data() {
    return {
      dataUser: {},
      pilihan: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      bulan: "",
      tahun: "",
      meterAwal: 0,
      meterAkhir: 0,
      id_pelanggan: null,
    };
  },
  props: {},
  methods: {
    async handlePenggunaan() {
      const { data: penggunaan, error } = await supabase
        .from("penggunaan")
        .insert([
          {
            id_pelanggan: this.id_pelanggan,
            bulan: this.bulan,
            tahun: this.tahun,
            meter_awal: this.meterAwal,
            meter_akhir: this.meterAkhir,
          },
        ])
        .select();
    },
  },
  components: {
    Sidebar,
  },
};
</script>

<style lang="scss" scoped></style>
