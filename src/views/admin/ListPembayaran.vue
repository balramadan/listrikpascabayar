<template>
  <SidebarAdmin />
  <div class="ml-56 px-5 py-5 font-poppins">
    <div class="flex flex-row justify-between">
      <h2 class="font-bold">Data Pembayaran</h2>
      <!-- <a
        class="py-2 px-3 rounded text-xs cursor-pointer font-bold text-white bg-blue-500"
        @click.prevent="visible = true"
        >Tambah Penggunaan</a
      > -->
    </div>

    <div class="flex flex-row mb-4">
      <input
        type="text"
        v-model="filterNamaPelanggan"
        placeholder="Filter Nama Pelanggan"
        class="px-3 py-1.5 border-2 rounded"
      />
    </div>

    <div class="overflow-x-auto my-5">
      <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead class="ltr:text-left rtl:text-right font-bold">
          <tr>
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Nama Pelanggan
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Bulan
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Jumlah Meter
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Total Harga
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Status
            </th>
            <th
              class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900"
            ></th>
          </tr>
        </thead>

        <tbody class="divide-y text-center divide-gray-200">
          <tr v-for="(pembayaran, index) in filteredPembayaran">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {{ pembayaran.pelanggan.nama_pelanggan }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ pembayaran.bulan_bayar }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ pembayaran.tagihan.jumlah_meter }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              Rp. {{ pembayaran.total_bayar }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ pembayaran.tagihan.status }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              <a
                :href="`/admin/pembayaran/${pembayaran.id_pembayaran}`"
                class="px-3 py-1 bg-blue-500 font-semibold text-white rounded"
                >Edit</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import supabase from "@/database/supabase";

export default {
  name: "Test",
  async created() {
    let { data: pembayaran, error } = await supabase
      .from("pembayaran")
      .select("*, pelanggan(*), tagihan(*)");

    if (error) {
      console.error(error);
      return;
    }

    this.dataPembayaran = pembayaran;
  },
  data() {
    return {
      dataPembayaran: [],
      filterNamaPelanggan: "",
    };
  },
  methods: {},
  computed: {
    filteredPembayaran() {
      if (this.filterNamaPelanggan) {
        return this.dataPembayaran.filter((pembayaran) => {
          const namaPelanggan = pembayaran.pelanggan.nama_pelanggan;
          return (
            namaPelanggan &&
            namaPelanggan
              .toLowerCase()
              .includes(this.filterNamaPelanggan.toLowerCase())
          );
        });
      } else {
        return this.dataPembayaran;
      }
    },
  },
  props: {},
  components: {
    SidebarAdmin,
  },
};
</script>

<style lang="scss" scoped></style>
