<template>
  <h2 class="my-5 font-bold">Tagihan</h2>
  <div class="overflow-x-auto rounded-lg border border-gray-200">
    <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead class="ltr:text-left rtl:text-right">
        <tr>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Bulan/Tahun
          </th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Daya
          </th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Total Meter
          </th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Total Bayar
          </th>
          <th class="px-4 py-2"></th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
        <tr>
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            John Doe
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            Web Developer
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
          <td class="whitespace-nowrap px-4 py-2">
            <a
              href="#"
              class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
            >
              View
            </a>
          </td>
        </tr>

        <tr>
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Jane Doe
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">04/11/1980</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
            Web Designer
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">$100,000</td>
          <td class="whitespace-nowrap px-4 py-2">
            <a
              href="#"
              class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
            >
              View
            </a>
          </td>
        </tr>

        <tr>
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Gary Barlow
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">Singer</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">$20,000</td>
          <td class="whitespace-nowrap px-4 py-2">
            <a
              href="#"
              class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
            >
              View
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: "Test",
  created() {

  },
  data() {
    return {
      data: [],
    };
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
