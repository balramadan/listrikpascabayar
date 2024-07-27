<template>
  <!-- Sidebar component -->
  <Sidebar />

  <div class="sm:ml-56 py-5 font-poppins">
    <div class="mx-auto px-5">
      <header class="text-left">
        <h2 class="text-lg font-bold text-gray-900">Pembayaran</h2>
      </header>

      <div class="mt-5">
        <div class="">
          <!-- Grid layout for displaying information -->
          <div class="grid grid-cols-6">
            <h3 class="mr-3">Nama:</h3>
            <p class="col-span-5">
              {{ nama }}
            </p>
          </div>
          <div class="grid grid-cols-6 mt-3">
            <h3 class="mr-3">Nomor Kwh:</h3>
            <p class="col-span-5">{{ nomorKwh }}</p>
          </div>
          <div class="grid grid-cols-6 mt-3">
            <h3 class="mr-3">Bulan:</h3>
            <p class="col-span-5">{{ bulan }}</p>
          </div>
          <div class="grid grid-cols-6 mt-3">
            <h3 class="mr-3">Tahun:</h3>
            <p class="col-span-5">{{ tahun }}</p>
          </div>
          <div class="grid grid-cols-6 mt-3">
            <h3 class="mr-3">Jumlah Meter:</h3>
            <p class="col-span-5">{{ jumlahMeter }}</p>
          </div>
        </div>

        <div class="mt-8 flex justify-between border-t border-gray-200 pt-8">
          <div class="w-full">
            <dl class="space-y-0.5 text-sm text-gray-700">
              <div class="flex justify-between">
                <dt>Subtotal</dt>
                <dd>Rp. {{ subtotal }}</dd>
              </div>

              <div class="flex justify-between">
                <dt>Biaya admin</dt>
                <dd>Rp. {{ biayaAdmin }}</dd>
              </div>

              <div class="flex justify-between !text-base font-medium">
                <dt>Total</dt>
                <dd class="font-bold">Rp. {{ total }}</dd>
              </div>
            </dl>

            <div class="flex flex-col mt-5">
              <label class="text-sm" for="">Bukti pembayaran</label>
              <input
                class="text-sm"
                type="file"
                name=""
                id=""
                accept="image/*"
                @change="handleFileUpload"
              />
            </div>

            <div class="flex justify-end mt-5" v-if="bukti">
              <a
                @click.prevent="bayar"
                href="#"
                class="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
              >
                Bayar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import supabase from "@/database/supabase";
import Sidebar from "@/components/Sidebar.vue";
import { useToast } from 'primevue/usetoast';

export default {
  name: "HalamanBayar",
  async created() {
    try {
      const id = this.$route.params.id;
      // Fetch pembayaran data from the database
      let { data: pembayaran, error } = await supabase
        .from("pembayaran")
        .select("*, tagihan(*), pelanggan(*)")
        .eq("id_tagihan", id);

      if (error) {
        console.error(error);
        return;
      }

      // Set the data for displaying in the template
      this.dataPembayaran = pembayaran[0];
      this.nama = pembayaran[0].pelanggan.nama_pelanggan;
      this.nomorKwh = pembayaran[0].pelanggan.nomor_kwh;
      this.bulan = pembayaran[0].tagihan.bulan;
      this.tahun = pembayaran[0].tagihan.tahun;
      this.jumlahMeter = pembayaran[0].tagihan.jumlah_meter;
      this.subtotal = pembayaran[0].total_bayar;
      this.biayaAdmin = pembayaran[0].biaya_admin;
      this.total = pembayaran[0].total_bayar + pembayaran[0].biaya_admin;
    } catch (error) {
      location.href = "/";
    }
  },
  data() {
    return {
      dataPembayaran: [],
      nama: "",
      nomorKwh: "",
      bulan: "",
      tahun: "",
      jumlahMeter: 0,
      subtotal: 0,
      biayaAdmin: 0,
      total: 0,
      check: false,
      bukti: null,
    };
  },
  props: {},
  methods: {
    // @vuese
    // Mengubah boolean checkout
    checkout() {
      this.checkout = !this.checkout;
    },
    // @vuese
    // Menangani file yang diupload
    // @arg File
    handleFileUpload(e) {
      // Handle file upload event
      this.bukti = e.target.files[0];
    },
    // @vuese
    // Mengirim bukti pembayaran
    async bayar() {
      if (!this.bukti) {
        alert("Please upload an image");
        return;
      }

      const filePath = `${this.bukti.name.replace(/\s/g, "_")}`;
      const { data: dataStorage, error: uploadError } = await supabase.storage
        .from("bukti")
        .upload(filePath, this.bukti, {
          upsert: true,
        });

      if (uploadError) {
        alert("Error uploading image", uploadError);
        console.error(uploadError);
        return;
      }

      let { data: dataBukti, error: updateBukti } = await supabase
        .from("pembayaran")
        .update({
          bukti: filePath,
        })
        .eq("id_tagihan", this.$route.params.id);

      if (updateBukti) {
        alert("Kirim bukti gagal", updateBukti.message);
        return;
      }

      let { data: dataTagihan, error: updateStatus } = await supabase
        .from("tagihan")
        .update({
          status: "Diproses",
        })
        .eq("id_tagihan", this.$route.params.id);

      if (updateStatus) {
        alert("Update status gagal", updateStatus.message);
        return;
      }

      this.showSuccess();
      this.$router.push("/tagihan");
    },
    showSuccess() {
      this.$toast.add({
        severity: "success",
        summary: "Sukses",
        detail: "Sukses melakukan pembayaran, silahkan tunggu konfirmasi",
        life: 3000,
      });
    },
  },
  components: {
    Sidebar,
  },
};
</script>

<style lang="scss" scoped></style>
