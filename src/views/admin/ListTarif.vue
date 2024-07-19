<template>
  <SidebarAdmin />
  <div class="ml-56 px-5 py-5 font-poppins">
    <div class="flex flex-row justify-between">
      <h2 class="font-bold">List Tarif</h2>
      <a
        class="py-2 px-3 rounded text-xs cursor-pointer font-bold text-white bg-blue-500"
        @click.prevent="visible = true"
        >Tambah Tarif</a
      >
    </div>

    <div class="overflow-x-auto my-5">
      <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead class="ltr:text-left rtl:text-right">
          <tr class="">
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Daya
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
              Tarif per Kwh
            </th>
            <th
              class="whitespace-nowrap px-4 py-2 font-semibold text-gray-900"
            ></th>
          </tr>
        </thead>

        <tbody class="divide-y text-center divide-gray-200">
          <tr v-for="tarif in dataTarif">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {{ tarif.daya }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              Rp. {{ tarif.tarifperkwh }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              <a
                :href="`/admin/tarif/${tarif.id_tarif}`"
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
    header="Tambah Tarif"
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

      <div class="flex flex-col mb-3">
        <label for="daya">Daya</label>
        <input
          v-model="daya"
          type="text"
          name="daya"
          id="daya"
          class="px-2 py-1 border-2 rounded w-full"
        />
      </div>

      <div class="flex flex-col mb-5">
        <label for="tarifperkwh">Tarif per Kwh</label>
        <input
          v-model="tarifperkwh"
          type="number"
          name="tarifperkwh"
          id="tarifperkwh"
          class="px-2 py-1 border-2 rounded w-full"
        />
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

export default {
  name: "Test",
  async created() {
    let { data: tarif, error } = await supabase.from("tarif").select("*");

    if (error) {
      console.error(error);
      return;
    }

    this.dataTarif = tarif;
  },
  data() {
    return {
      dataTarif: [],
      visible: false,
      daya: "",
      tarifperkwh: 0,
      errorMsg: "",
    };
  },
  methods: {
    async handleTambah() {
      const { data, error } = await supabase
        .from("tarif")
        .insert([{ daya: this.daya, tarifperkwh: this.tarifperkwh }])
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
  },
};
</script>

<style lang="scss" scoped></style>
