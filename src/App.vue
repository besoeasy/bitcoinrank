<template>
	<div class="m-auto container">
		<div class="flex min-h-screen">
			<div class="w-1/3 m-auto p-10" v-if="bossman2 !== null">
				<h2 class="text-xl md:text-3xl font-bold">
					<div># {{ rank - 2 }}</div>
				</h2>

				<div class="my-5"></div>

				<img :src="`https://robohash.org/` + bossman2 + `.png?set=set2&size=500x500`" />

				<div class="my-5"></div>

				<input class="p-4 w-full bg-orange-300 hover:bg-orange-400 rounded-lg text-center text-gray-800" v-model="bossman2" />

				<div class="my-5"></div>

				<p class="text-xl font-bold bg-orange-300 p-3 rounded-lg text-center">BTC : {{ bossmanBal2 / 10 ** 8 }}</p>
			</div>

			<div class="w-1/3 m-auto p-10" v-if="bossman !== null">
				<h2 class="text-xl md:text-3xl font-bold">
					<div># {{ rank - 1 }}</div>
				</h2>

				<div class="my-5"></div>

				<img :src="`https://robohash.org/` + bossman + `.png?set=set2&size=500x500`" />

				<div class="my-5"></div>

				<input class="p-4 w-full bg-orange-300 hover:bg-orange-400 rounded-lg text-center text-gray-800" v-model="bossman" />

				<div class="my-5"></div>

				<p class="text-xl font-bold bg-orange-300 p-3 rounded-lg text-center">BTC : {{ bossmanBal / 10 ** 8 }}</p>
			</div>

			<div class="w-1/3 m-auto p-10">
				<h2 class="text-xl md:text-3xl font-bold">
					<div v-if="rank !== null"># {{ rank }}</div>
				</h2>

				<div class="my-5"></div>

				<img :src="`https://robohash.org/` + address + `.png?set=set2&size=500x500`" />
				<div class="my-5"></div>

				<input class="p-4 w-full bg-green-300 hover:bg-orange-400 rounded-lg text-center text-gray-800" v-model="address" placeholder="Enter Bitcoin address" />

				<div class="my-5"></div>

				<p class="text-xl font-bold bg-green-300 p-3 rounded-lg text-center">BTC : {{ balance / 10 ** 8 }}</p>

				<button class="mt-5 w-full bg-green-300 px-4 py-3 rounded-lg text-bold hover:bg-green-400" @click="getBalance" v-if="!bossmanBal">FETCH</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
let bitcoinPrice = ref(null);

let balance = ref(null);
let address = ref("");
let rank = ref(null);

let bossman = ref(null);
let bossmanBal = ref(null);

let bossman2 = ref(null);
let bossmanBal2 = ref(null);

setInterval(() => {
	if (Math.random() > 0.5) {
		getbitcoinPrice();
	}
}, 3000);

if (localStorage.getItem("address")) {
	address.value = localStorage.getItem("address");
}

async function axiosCall(url) {
	console.log(url);

	const response = await axios.get(url);

	console.log(response.data);

	if (response.data.status === 430) {
		console.log("430 error");
		return;
	}

	return response.data;
}

async function getBitcoinBalance(address) {
	const data = await axiosCall(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`);

	console.log(data.balance);

	return data.balance;
}

async function getbitcoinPrice() {
	const data = await axiosCall("https://aws.okx.com/api/v5/market/ticker?instId=BTC-USD-SWAP");

	bitcoinPrice.value = data.data[0].last;
}

const getBalance = async () => {
	if (address.value) {
		localStorage.setItem("address", address.value);

		balance.value = await getBitcoinBalance(address.value);

		const exp2 = await axiosCall(`https://api.blockchair.com/bitcoin/addresses?a=count()&q=balance(${balance.value}..34859739823342)`);

		rank.value = exp2.data[0]["count()"] || 0;

		const exp3 = await axiosCall(`https://api.blockchair.com/bitcoin/addresses?q=balance(${balance.value + 1}..34859739823342)&limit=5&s=balance(asc)`);

		bossman.value = exp3.data[0].address;

		bossmanBal.value = await getBitcoinBalance(bossman.value);

		bossman2.value = exp3.data[1].address;

		bossmanBal2.value = await getBitcoinBalance(bossman2.value);
	}
};
</script>
