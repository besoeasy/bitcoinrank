<template>
	<div class="m-auto container">
		<div class="flex min-h-screen">
			<div class="w-1/3 m-auto p-10" @mouseenter="getbitcoinPrice()">
				<input
					class="p-4 w-full bg-orange-300 hover:bg-orange-400 rounded-lg text-center text-gray-800"
					v-model="address"
					placeholder="Enter Bitcoin address"
				/>

				<div class="my-5"></div>

				<button class="w-full bg-orange-300 px-4 py-3 rounded-lg text-bold hover:bg-orange-400" @click="getBalance">
					FETCH
				</button>
			</div>
			<div class="w-2/3 m-auto p-10">
				<div class="text-center max-w-lg mx-auto">
					<h2
						v-if="rank !== null"
						class="mb-5 text-6xl md:text-7xl font-bold font-heading text-center tracking-px-n leading-tight"
					>
						Old Rank: {{ oldrank }} - New Rank: {{ rank }}
					</h2>

					<p class="mb-7 text-lg text-gray-600 font-medium" v-if="balance !== null">
						Balance: {{ balance / 10 ** 8 }} BTC
					</p>

					<p class="mb-7 text-lg text-gray-600 font-medium" v-if="balance !== null">
						Balance: {{ (balance / 10 ** 8) * bitcoinPrice }} USD
					</p>

					<p class="mb-7 text-lg text-gray-600 font-medium" v-if="bossman !== null">
						Bossman: {{ bossman }} - Boss Balance {{ bossmanBal / 10 ** 8 }} BTC - Bossman By
						{{ (bossmanBal - balance) / 10 ** 8 }} BTC
					</p>

					<p class="mb-7 text-lg text-gray-600 font-medium" v-if="bitcoinPrice !== null">
						Bitcoin Price: {{ bitcoinPrice }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import axios from 'axios';

	let balance = ref(null);
	let address = ref('');
	let rank = ref(null);
	let bossman = ref(null);
	let bossmanBal = ref(null);
	let oldrank = ref(null);
	let bitcoinPrice = ref(null);

	getbitcoinPrice();

	if (localStorage.getItem('address')) {
		address.value = localStorage.getItem('address');
		oldrank.value = localStorage.getItem('oldrank');
	}

	async function axiosCall(url) {
		console.log(url);

		const response = await axios.get(url);

		console.log(response.data);

		if (response.data.status === 430) {
			console.log('430 error');
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
		const data = await axiosCall('https://aws.okx.com/api/v5/market/ticker?instId=BTC-USD-SWAP');

		bitcoinPrice.value = data.data[0].last;
	}

	const getBalance = async () => {
		if (address.value) {
			localStorage.setItem('address', address.value);

			balance.value = await getBitcoinBalance(address.value);

			const exp2 = await axiosCall(
				`https://api.blockchair.com/bitcoin/addresses?a=count()&q=balance(${balance.value}..34859739823342)`
			);

			rank.value = exp2.data[0]['count()'] || 0;

			localStorage.setItem('oldrank', rank.value);

			const exp3 = await axiosCall(
				`https://api.blockchair.com/bitcoin/addresses?q=balance(${
					balance.value + 1
				}..34859739823342)&limit=5&s=balance(asc)`
			);

			bossman.value = exp3.data[0].address;

			bossmanBal.value = await getBitcoinBalance(bossman.value);
		}
	};
</script>
