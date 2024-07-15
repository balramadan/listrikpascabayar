const readlineSync = require("readline-sync");
let numbers = [];
let sortedNumbers = [];

function showMenu() {
  console.log("\n=== Menu Pilihan ===");
  console.log("1. Input Angka");
  console.log("2. Sorting");
  console.log("3. Searching");
  console.log("4. Selesai");
}

function handleInputAngka() {
  console.log("\nMenu Input Angka")
  const answer = readlineSync.question("Masukkan jumlah angka: ");
  console.log(`Angka yang dimasukkan: ${answer}`);
  for (let i = 0; i < parseInt(answer); i++) {
    const number = readlineSync.question(`Masukkan angka ke-${i + 1}: `);
    numbers.push(parseInt(number));
  }
  const answerYesorNo = readlineSync.question(
    "Kembali ke menu sebelumnya? (Y/n): "
  );
  if (answerYesorNo.toLowerCase() === "y") {
    showMenu();
    handleMenuSelection();
  } else {
    console.log("Terima kasih telah menggunakan program ini. Sampai jumpa!");
  }
}

function handleSorting() {
  console.log("\nMenu Sorting");
  // Implement your sorting logic here
  console.log("Angka yang anda masukkan: ", numbers)
  sortedNumbers = selectionSort(numbers);
  console.log("Hasil Sorting: ", sortedNumbers);
  const answerYesorNo = readlineSync.question(
    "Kembali ke menu sebelumnya? (Y/n): "
  );
  if (answerYesorNo.toLowerCase() === "y") {
    showMenu();
    handleMenuSelection();
  } else {
    console.log("Terima kasih telah menggunakan program ini. Sampai jumpa!");
  }
}

// Metode selection sort
function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      swap(arr, i, minIndex);
    }
  }
  return arr;
}

// Mengurutkan angka
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// Menu searching
function handleSearching() {
  console.log("\nMenu Searching");
  const searchNumber = readlineSync.question("Masukkan angka yang ingin dicari: ");
  const index = linearSearch(sortedNumbers, parseInt(searchNumber));
  if (index !== -1) {
    console.log(`Angka ${searchNumber} ditemukan pada index ${index}`);
  } else {
    console.log(`Angka ${searchNumber} tidak ditemukan`);
  }
  const answerYesorNo = readlineSync.question(
    "Kembali ke menu sebelumnya? (Y/n): "
  );
  if (answerYesorNo.toLowerCase() === "y") {
    showMenu();
    handleMenuSelection();
  } else {
    console.log("Terima kasih telah menggunakan program ini. Sampai jumpa!");
  }
}

// Metode linear search
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

// Menu Pilihan
function handleMenuSelection() {
  const answer = readlineSync.question("Pilih menu: ");
  switch (answer) {
    case "1":
      handleInputAngka();
      break;
    case "2":
      handleSorting();
      break;
    case "3":
      handleSearching();
      break;
    case "4":
      break;
    default:
      console.log("Menu tidak valid. Silakan pilih menu yang sesuai.");
      showMenu();
      handleMenuSelection();
      break;
  }
}

// Show menu
showMenu();
handleMenuSelection();
