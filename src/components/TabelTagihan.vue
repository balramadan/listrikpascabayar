<template>
  <h2 class="my-5 font-bold">Tagihan</h2>
  <div class="overflow-x-auto rounded-lg border border-gray-200">
    <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead class="ltr:text-left rtl:text-right">
        <tr>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Bulan
          </th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Tahun
          </th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Total Meter
          </th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Status
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200 text-center">
        <tr v-for="tagihan in dataTagihan" :key="tagihan.id">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            {{ tagihan.bulan }}
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            {{ tagihan.tahun }}
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            {{ tagihan.jumlah_meter }}
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            {{ tagihan.status }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import supabase from "@/database/supabase";

export default {
  name: "Tabel Tagihan",
  async created() {
    this.dataUser = JSON.parse(localStorage.getItem("data"));

    let { data: tagihan, error } = await supabase
      .from("tagihan")
      .select("*")
      .eq("id_pelanggan", this.dataUser.id_pelanggan);

    if (error) {
      console.log(error);
    } else {
      // @vuese
      // Memfilter pembayaran yang tagihannya dalam status Diproses dan atau Belum Dibayar
      this.dataTagihan = tagihan.filter(
        (t) => t.status === "Diproses" || t.status === "Belum Dibayar"
      );
    }
  },
  data() {
    return {
      dataUser: {},
      dataTagihan: [],
    };
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
