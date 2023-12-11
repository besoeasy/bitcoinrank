<template>
	<section class="pt-24 pb-28 bg-white overflow-hidden">
		<div class="container px-4 mx-auto">
			<div class="text-center max-w-lg mx-auto">
				<h2
					v-if="rank !== null"
					class="mb-5 text-6xl md:text-7xl font-bold font-heading text-center tracking-px-n leading-tight"
				>
					Rank: {{ rank }}
				</h2>

				<p class="mb-7 text-lg text-gray-600 font-medium" v-if="balance !== null">
					Balance: {{ balance / 10 ** 8 }} BTC
				</p>

				<input class="py-4 px-6 w-full my-10" v-model="address" placeholder="Enter Bitcoin address" />

				<div class="mb-11 md:inline-block">
					<button
						@click="getBalance"
						class="py-4 px-6 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
						type="button"
					>
						Get Rank
					</button>
				</div>

				<p class="mb-7 text-lg text-gray-600 font-medium" v-if="bossman !== null">
					Bossman: {{ bossman }} - Boss Balance {{ bossmanBal / 10 ** 8 }} BTC - Bossman By
					{{ (bossmanBal - balance) / 10 ** 8 }} BTC
				</p>
			</div>
		</div>
	</section>
</template>

<script setup>
	import { ref } from 'vue';
	import axios from 'axios';

	let balance = ref(null);
	let address = ref('');
	let rank = ref(null);
	let bossman = ref(null);
	let bossmanBal = ref(null);

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

	const getBalance = async () => {
		if (address.value) {
			const exp1 = await axiosCall(`https://api.blockchair.com/bitcoin/dashboards/address/${address.value}`);

			balance.value = exp1.data[address.value].address.balance;

			const exp2 = await axiosCall(
				`https://api.blockchair.com/bitcoin/addresses?a=count()&q=balance(${balance.value}..34859739823342)`
			);

			rank.value = exp2.data[0]['count()'] || 0;

			const exp3 = await axiosCall(
				`https://api.blockchair.com/bitcoin/addresses?q=balance(${
					balance.value + 1
				}..34859739823342)&limit=5&s=balance(asc)`
			);

			bossman.value = exp3.data[0].address;

			const exp4 = await axiosCall(`https://api.blockchair.com/bitcoin/dashboards/address/${bossman.value}`);

			bossmanBal.value = exp4.data[bossman.value].address.balance;
		}
	};
</script>
