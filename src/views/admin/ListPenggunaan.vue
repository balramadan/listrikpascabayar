<template>
  <!-- Komponen SidebarAdmin -->
  <SidebarAdmin />

  <div class="ml-56 px-5 py-5 font-poppins">
    <div class="flex flex-row justify-between">
      <h2 class="font-bold">Data Penggunaan</h2>
      <a
        class="py-2 px-3 rounded text-xs cursor-pointer font-bold text-white bg-blue-500"
        @click.prevent="visible = true"
        >Tambah Penggunaan</a
      >
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
        <thead class="ltr:text-left rtl:text-right">
          <tr class="">
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Nama Pelanggan
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Bulan
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Tahun
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Meter Awal
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Meter Akhir
            </th>
            <th
              class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900"
            ></th>
          </tr>
        </thead>

        <tbody class="divide-y text-center divide-gray-200">
            <tr v-for="penggunaan in filteredPenggunaan" :key="penggunaan.id_pengunaan">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {{ penggunaan.pelanggan.nama_pelanggan }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ penggunaan.bulan }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ penggunaan.tahun }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ penggunaan.meter_awal }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {{ penggunaan.meter_akhir }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              <a
                :href="`/admin/penggunaan/${penggunaan.id_penggunaan}`"
                class="px-3 py-1 bg-blue-500 font-semibold text-white rounded"
                >Edit</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal -->
  <Dialog
    v-model:visible="visible"
    modal
    header="Tambah Penggunaan"
    :style="{
      width: '30rem',
      background: 'white',
      padding: '10px 20px',
      border: '1px solid #333',
      'border-radius': '8px',
    }"
  >
    <form class="mt-3" @submit.prevent="handleTambah">
      <div v-if="errorMsg" class="mt-3 bg-red-500 text-white px-3 py-1">
        {{ errorMsg }}
      </div>
      <!-- <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Update your information.</span
      > -->
      <DataPelanggan
        :nama-pelanggan="namaPelanggan"
        @update:namaPelanggan="(val) => (namaPelanggan = val)"
      />
      <div class="grid grid-cols-2 gap-4">
        <div class="flex gap-4 mb-4 flex-col">
          <label for="bulan">Bulan:</label>
          <select
            name="bulan"
            id="bulan"
            class="px-3 py-1.5 border-2 rounded"
            v-model="bulan"
          >
            <option v-for="opsi in pilihanBulan" :value="opsi" :key="opsi">
              {{ opsi }}
            </option>
          </select>
        </div>
        <div class="flex gap-4 mb-4 flex-col">
          <label for="tahun" class="font-semibold w-24">Tahun</label>
          <input
            type="number"
            name="tahun"
            id="tahun"
            class="px-2 py-1 border-2 rounded w-full"
            v-model="tahun"
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex gap-4 mb-4 flex-col">
          <label for="meterAwal" class="font-semibold w-24">Meter Awal</label>
          <input
            type="number"
            name="meterAwal"
            id="meterAwal"
            class="px-2 py-1 border-2 rounded w-full"
            v-model="meterAwal"
          />
        </div>
        <div class="flex gap-4 mb-4 flex-col">
          <label for="meterAkhir" class="font-semibold w-24">Meter Akhir</label>
          <input
            type="number"
            name="meterAkhir"
            id="meterAkhir"
            class="px-2 py-1 border-2 rounded w-full"
            v-model="meterAkhir"
          />
        </div>
      </div>
      <div class="flex justify-end gap-5">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="visible = false"
          :style="{ color: 'red' }"
        ></Button>
        <input
          class="bg-blue-500 text-white py-1 px-3 rounded font-bold cursor-pointer"
          type="submit"
          value="Save"
        />
      </div>
    </form>
  </Dialog>
</template>

<script>
import supabase from "@/database/supabase";
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import DataPelanggan from "@/components/data/DataPelanggan.vue";

export default {
  name: "ListPenggunaan",
  async created() {
    // Mengambil data penggunaan dari database saat komponen dibuat
    let { data: penggunaan, error } = await supabase
      .from("penggunaan")
      .select("*, pelanggan(*)")
      .order("id_penggunaan", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    this.dataPenggunaan = penggunaan;
  },
  data() {
    return {
      dataPenggunaan: [], // Data penggunaan yang diambil dari database
      dataPelanggan: [], // Data pelanggan yang diambil dari database
      pilihanBulan: [
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
      visible: false, // Menyimpan status tampilan modal
      namaPelanggan: null, // Menyimpan nama pelanggan yang dipilih
      bulan: "", // Menyimpan bulan yang dipilih
      tahun: "", // Menyimpan tahun yang dipilih
      meterAwal: null, // Menyimpan meter awal yang diinput
      meterAkhir: null, // Menyimpan meter akhir yang diinput
      filterNamaPelanggan: "", // Menyimpan filter nama pelanggan
      errorMsg: "", // Menyimpan pesan error
    };
  },
  computed: {
    // @vuese
    // Mengambil data penggunaan yang telah difilter berdasarkan nama pelanggan
    filteredPenggunaan() {
      if (this.filterNamaPelanggan) {
        return this.dataPenggunaan.filter((penggunaan) => {
          const namaPelanggan = penggunaan.pelanggan?.nama_pelanggan;
          return (
            namaPelanggan &&
            namaPelanggan
              .toLowerCase()
              .includes(this.filterNamaPelanggan.toLowerCase())
          );
        });
      } else {
        return this.dataPenggunaan;
      }
    },
  },
  methods: {
    /**
     * @vuese
     * Menambahkan data penggunaan ke database
     */
    async handleTambah() {
      const { data, error } = await supabase
        .from("penggunaan")
        .insert([
          {
            id_pelanggan: this.namaPelanggan,
            bulan: this.bulan,
            tahun: this.tahun,
            meter_awal: this.meterAwal,
            meter_akhir: this.meterAkhir,
          },
        ])
        .select();

      if (error) {
        this.errorMsg = error.message;
        return;
      }
      alert("Data berhasil ditambahkan");
      this.visible = false;
      location.reload();
    },
  },
  props: {},
  components: {
    SidebarAdmin,
    Dialog,
    Button,
    DataPelanggan,
  },
};
</script>

<style lang="scss" scoped></style>
