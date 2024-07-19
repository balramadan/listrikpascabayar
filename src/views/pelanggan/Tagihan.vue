<template>
  <Sidebar />
  <div class="ml-56 px-5 py-5 font-poppins">
    <h2 class="text-sm font-semibold">Data Tagihan</h2>
    <div class="overflow-x-auto mt-5 rounded-lg border border-gray-200">
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
            <th class="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr v-for="tagihan in dataTagihan" class="text-center">
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
            <td class="whitespace-nowrap px-4 py-2">
              <a
                v-if="tagihan.status === 'Belum Dibayar'"
                :href="`/bayar/${tagihan.id_tagihan}`"
                class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
              >
                Bayar
              </a>
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
  name: "Test",
  async created() {
    this.dataUser = JSON.parse(localStorage.getItem("data"));

    let { data: tagihan, error } = await supabase
      .from("tagihan")
      .select("*")
      .eq("id_pelanggan", this.dataUser.id_pelanggan);

    if (error) {
      console.log(error);
      return;
    } else {
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
  components: {
    Sidebar,
  },
};
</script>

<style lang="scss" scoped></style>
