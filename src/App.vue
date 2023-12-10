<template>
	<header></header>

	<main>
		<div class="wrapper">
			<input class="border p-2 rounded" v-model="address" placeholder="Enter Bitcoin address" />
			<button class="bg-blue-500 text-white p-2 rounded" @click="getBalance">Check Balance</button>
			<p v-if="balance !== null">Balance: {{ balance / 10 ** 8 }}</p>

			<p v-if="rank !== null">Rank: {{ rank }}</p>

      <p v-if="bossman !== null">Bossman: {{ bossman }}</p>
		</div>
	</main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

let balance = ref(null);
let address = ref("");
let rank = ref(null);
let bossman = ref(null);

async function axiosCall(url) {

  console.log(url);

	const response = await axios.get(url);

	console.log(response.data);

	return response.data;
}

const getBalance = async () => {
	if (address.value) {
		const exp1 = await axiosCall(`https://api.blockchair.com/bitcoin/dashboards/address/${address.value}`);

		balance.value = exp1.data[address.value].address.balance;

		const exp2 = await axiosCall(`https://api.blockchair.com/bitcoin/addresses?a=count()&q=balance(` + balance.value + `..34859739823342)`);

		rank.value = exp2.data[0]["count()"] || 0;

		const exp3 = await axiosCall(`https://api.blockchair.com/bitcoin/addresses?q=balance(` + (balance.value + 1) + `..34859739823342)&limit=5&s=balance(asc)`);

    bossman.value = exp3.data[0].address;
  }
};
</script>
