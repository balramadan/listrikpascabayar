<template>
  <h2 class="my-5 font-bold">Riwayat Pembayaran</h2>
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
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ riwayat.tanggal_pembayaran }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            Rp. {{ riwayat.total_bayar + riwayat.biaya_admin }}
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ riwayat.tagihan.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import supabase from '@/database/supabase';

export default {
  name: "Tabel Pembayaran",
  /**
   * Metode yang dijalankan saat komponen ini dibuat.
   * Mengambil data pengguna dari local storage dan melakukan query ke database untuk mendapatkan data pembayaran yang telah dibayar oleh pengguna.
   * Data pembayaran yang telah dibayar akan disimpan dalam variabel dataPembayaran.
   * @vuese
   */
  async created() {
    this.dataUser = JSON.parse(localStorage.getItem("data"));

    let { data: pembayaran, error } = await supabase
      .from("pembayaran")
      .select("*, tagihan(*)")
      .eq("id_pelanggan", this.dataUser.id_pelanggan);

    if (error) {
      console.error(error);
      return;
    }

    // @vuese
    // Memfilter pembayaran yang tagihannya dalam status dibayar
    this.dataPembayaran = pembayaran.filter(
      (p) => p.tagihan.status === "Dibayar"
    );
  },
  data() {
    return {
      /**
       * Data pengguna yang diambil dari local storage.
       */
      dataUser: [],
      /**
       * Data pembayaran yang telah dibayar oleh pengguna.
       */
      dataPembayaran: [],
    };
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
