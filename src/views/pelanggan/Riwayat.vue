<template>
  <Sidebar />
  <div class="sm:ml-56 px-5 py-5 font-poppins">
    <h2 class="text-sm font-semibold">Data Tagihan</h2>
    <div class="overflow-x-auto rounded-lg border border-gray-200">
      <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead class="ltr:text-left rtl:text-right">
          <tr>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Bulan/Tahun
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Tanggal Pembayaran
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Total Bayar
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Status
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr v-for="riwayat in dataPembayaran" :key="riwayat.id">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {{ riwayat.tagihan.bulan }}/{{ riwayat.tagihan.tahun }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ riwayat.tanggal_pembayaran }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              Rp. {{ riwayat.total_bayar + riwayat.biaya_admin }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ riwayat.tagihan.status }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import supabase from "@/database/supabase";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "Riwayat",
  /**
   * @vuese
   * Komponen Riwayat digunakan untuk menampilkan riwayat pembayaran pelanggan.
   * Data riwayat pembayaran diambil dari database Supabase berdasarkan id_pelanggan.
   * Hanya riwayat pembayaran dengan status "Dibayar" yang ditampilkan.
   */
  async created() {
    try {
      this.dataUser = JSON.parse(localStorage.getItem("data"));
      const id = this.dataUser.id_pelanggan;

      let { data: pembayaran, error } = await supabase
        .from("pembayaran")
        .select("*, tagihan(*)")
        .eq("id_pelanggan", id);

      if (error) {
        console.error(error);
        return;
      }

      this.dataPembayaran = pembayaran.filter(
        (p) => p.tagihan.status === "Dibayar"
      );
    } catch (error) {
      location.href = "/";
    }
  },
  data() {
    return {
      dataUser: [],
      dataPembayaran: [],
    };
  },
  props: {},
  methods: {},
  components: {
    Sidebar
  }
};
</script>

<style lang="scss" scoped></style>
