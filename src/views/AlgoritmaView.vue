<template lang="">
  <div>
    <div v-if="tampilan == 0">
      <h1>Menu Pilihan</h1>
      <ul>
        <li>1. Input Angka</li>
        <li>2. Sorting</li>
        <li>3. Search</li>
        <li>4. Selesai</li>
      </ul>
    </div>

    <!-- Jika pilih angka 1 -->
    <div v-if="tampilan == 1" class="">
      <h1>Menu Input Angka</h1>
      <form class="input-angka" @submit="simpanAngka">
        <p>Masukkan jumlah angka</p>
        <input type="number" v-model="jumlahAngka" />
        <br />
        <div class="jumlah-angka">
          <p>Masukkan angka random</p>
          <input
            v-for="jumlah in jumlahAngka"
            type="number"
            :key="jumlah"
            v-model="arrayAngka[jumlah - 1]"
          />
        </div>
        <div v-if="arrayAngka" class="">
          <input type="submit" />
        </div>
      </form>
    </div>

    <!-- Jika pilih angka 2 -->
    <div v-if="tampilan == 2" class="sorting">
      <h1>Menu Sorting</h1>
      <button @click="selectionSort">Selection Sort</button>
      <button @click="tampilan = 0">Kembali</button>
      {{ arrayAngka }}
      {{ angkaSort }}
    </div>

    <!-- Jika pilih angka 3 -->
    <div v-if="tampilan == 3" class="search">
      <h1>Menu Search</h1>
      <form @submit.prevent="search">
        <p>Masukkan angka yang ingin dicari</p>
        <input type="number" v-model.lazy="searchValue" />
        <input type="submit" value="Cari" />
      </form>
      <div v-if="searchResult !== -1">
        <p>Hasil Searching: {{ searchValue }} ditemukan</p>
      </div>
      <div v-else>
        <p>Hasil Searching: {{ searchValue }} tidak ditemukan</p>
      </div>

      <button @click="tampilan = 0">Kembali</button>
    </div>

    <!-- Jika pilih angka 4 -->
    <div v-if="tampilan == 4">
      <h1>Terima kasih</h1>
      <button @click="clearSessionStorage">Clear Session Storage</button>
    </div>

    <form v-if="tampilan == 0" @submit="tampilan = inputPilihan">
      <input type="number" v-model="inputPilihan" />
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tampilan: 0,
      inputPilihan: 0,
      jumlahAngka: 0,
      arrayAngka: [],
      yesorno: "",
      angkaSort: [],
      searchValue: 0,
      searchResult: -1,
    };
  },
  methods: {
    simpanAngka() {
      sessionStorage.clear();
      sessionStorage.setItem("arrayAngka", JSON.stringify(this.arrayAngka));
      window.alert("Angka berhasil disimpan");
    },
    selectionSort() {
      this.arrayAngka = JSON.parse(sessionStorage.getItem("arrayAngka"));
      const angkaSort = [...this.arrayAngka];
      for (let i = 0; i < angkaSort.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < angkaSort.length; j++) {
          if (angkaSort[j] < angkaSort[minIndex]) {
            minIndex = j;
          }
        }
        if (minIndex !== i) {
          let temp = angkaSort[i];
          angkaSort[i] = angkaSort[minIndex];
          angkaSort[minIndex] = temp;
        }
      }
      this.angkaSort = angkaSort;
      sessionStorage.setItem("angkaSort", JSON.stringify(this.angkaSort));
    },
    search() {
      this.angkaSort = JSON.parse(sessionStorage.getItem("angkaSort"));
      let left = 0;
      let right = this.angkaSort.length - 1;
      while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (this.angkaSort[mid] === this.searchValue) {
          this.searchResult = mid;
          return;
        } else if (this.angkaSort[mid] < this.searchValue) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      this.searchResult = -1;
    },
    clearSessionStorage() {
      sessionStorage.clear();
      this.tampilan = 0;
    },
  },
};
</script>
<style scoped>
.input-angka .jumlah-angka {
  display: flex;
  flex-direction: column;
}

.input-angka input {
  width: 200px;
  margin-top: 12px;
}

.sorting {
  display: flex;
  flex-direction: column;
}

.sorting button {
  margin-top: 12px;
  width: 200px;
  justify-content: center;
}

.search {
  margin-top: 12px;
}
</style>
