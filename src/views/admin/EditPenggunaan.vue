<template>
  <SidebarAdmin />
  <div class="ml-56 px-5 py-5 font-poppins">
    <form class="mt-3" @submit.prevent="handleEdit">
      <!-- <div v-if="errorMsg" class="mt-3 bg-red-500 text-white px-3 py-1">
        {{ errorMsg }}
      </div> -->
      <div class="flex gap-4 mb-4 flex-col">
        <label for="namaPelanggan" class="font-semibold">Pelanggan</label>
        <input
          type="text"
          v-model="namaPelanggan"
          class="px-2 py-1 border-2 rounded w-full"
        />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex gap-4 mb-4 flex-col">
          <label for="bulan" class="font-semibold">Bulan</label>
          <select
            name="bulan"
            id="bulan"
            class="px-3 py-1.5 border-2 rounded"
            v-model="bulan"
          >
            <option v-for="opsi in pilihanBulan" :value="opsi">
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
  </div>
</template>

<script>
import supabase from "@/database/supabase";
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import Button from "primevue/button";

export default {
  name: "Test",
  async created() {
    let { data: penggunaan, error } = await supabase
      .from("penggunaan")
      .select("*, pelanggan(*)")
      .eq("id_penggunaan", this.$route.params.id);

    if (error) {
      console.error(error);
      return;
    }

    this.dataPenggunaan = penggunaan[0];
    this.namaPelanggan = this.dataPenggunaan.pelanggan.nama_pelanggan;
    this.bulan = this.dataPenggunaan.bulan;
    this.tahun = this.dataPenggunaan.tahun;
    this.meterAwal = this.dataPenggunaan.meter_awal;
    this.meterAkhir = this.dataPenggunaan.meter_akhir;
  },
  data() {
    return {
      dataPenggunaan: [],
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
      namaPelanggan: "",
      bulan: "",
      tahun: "",
      meterAwal: null,
      meterAkhir: null,
    };
  },
  methods: {
    async handleEdit() {
      const { data, error } = await supabase
        .from("penggunaan")
        .update({
          id_pelanggan: this.namaPelanggan,
          bulan: this.bulan,
          tahun: this.tahun,
          meter_awal: this.meterAwal,
          meter_akhir: this.meterAkhir,
        })
        .eq("id_penggunaan", this.$route.params.id)
        .select();

      alert("Penggunaan berhasil diubah");
      this.$router.push("/admin/penggunaan");
    },
  },
  props: {},
  components: {
    SidebarAdmin,
    Button,
  },
};
</script>

<style lang="scss" scoped></style>
