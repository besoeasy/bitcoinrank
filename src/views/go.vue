<template>
	<section class="py-24 2xl:pt-64 2xl:pb-48 font-medium bg-yellow-500 overflow-hidden">
		<div class="container px-4 mx-auto">
			<span class="mb-9 tracking-widest text-xs leading-4">{{ btcaddress }}</span>
			<h2 class="my-12 font-heading text-5xl lg:text-6xl leading-tight">{{ mybalance }} BTC</h2>
			<h2 class="my-8 font-heading text-3xl lg:text-6xl leading-tight font-light"># {{ myrank }}</h2>

			<div class="my-12"></div>
		</div>
	</section>

	<section class="bg-white py-24 overflow-hidden">
		<div class="container px-4 mx-auto">
			<h2 class="mt-8 mb-24 text-3xl md:text-6xl font-heading font-medium text-center">Your Competion</h2>
			<div class="relative flex flex-wrap -mx-4 mb-20 lg:mb-32">
				<div
					class="hidden md:block absolute top-0 left-0 ml-40 mt-10 py-6 w-72 lg:w-60 border-t-2 border-r-2 border-blue-500 rounded-tr-xl z-10"
				></div>
				<div
					class="hidden lg:block absolute top-0 left-1/2 ml-40 mt-10 py-6 w-60 border-t-2 border-r-2 border-blue-500 rounded-tr-xl z-10"
				></div>
				<div
					class="hidden md:block lg:hidden absolute top-1/2 left-0 ml-40 mt-20 py-6 w-72 border-t-2 border-r-2 border-blue-500 rounded-tr-xl z-10"
				></div>
				<div class="relative w-full md:w-1/2 lg:w-1/4 px-4 mb-20 md:mb-0 bg-white">
					<img
						class="h-32 w-32 mb-12 rounded-lg"
						:src="`https://robohash.org/` + bossmans[0] + `.png?set=set2&size=500x500`"
						alt=""
					/>
					<h3 class="mb-2 text-3xl font-medium">#{{ myrank - 1 }}</h3>
					<p class="text-base text-gray-400 leading-relaxed">
						{{ bossmans[0] }}
					</p>
				</div>
				<div class="relative w-full md:w-1/2 lg:w-1/4 px-4 mb-20 lg:mb-0 md:mt-32 bg-white">
					<img
						class="h-32 w-32 mb-12 rounded-lg"
						:src="`https://robohash.org/` + bossmans[1] + `.png?set=set2&size=500x500`"
						alt=""
					/>
					<h3 class="mb-2 text-3xl font-medium">#{{ myrank - 2 }}</h3>
					<p class="text-base text-gray-400 leading-relaxed">
						{{ bossmans[1] }}
					</p>
				</div>
				<div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-20 md:mb-0 bg-white">
					<img
						class="h-32 w-32 mb-12 rounded-lg"
						:src="`https://robohash.org/` + bossmans[2] + `.png?set=set2&size=500x500`"
						alt=""
					/>
					<h3 class="mb-2 text-3xl font-medium">#{{ myrank - 3 }}</h3>
					<p class="text-base text-gray-400 leading-relaxed">
						{{ bossmans[2] }}
					</p>
				</div>
				<div class="w-full md:w-1/2 lg:w-1/4 px-4 md:mt-32 bg-white">
					<img
						class="h-32 w-32 mb-12 rounded-lg"
						:src="`https://robohash.org/` + bossmans[3] + `.png?set=set2&size=500x500`"
						alt=""
					/>
					<h3 class="mb-2 text-3xl font-medium">#{{ myrank - 4 }}</h3>
					<p class="text-base text-gray-400 leading-relaxed">
						{{ bossmans[3] }}
					</p>
				</div>
			</div>
			<div class="relative flex flex-wrap -mx-4 mb-20 lg:mb-32">
				<div
					class="hidden md:block absolute top-0 left-0 ml-40 mt-10 py-6 w-72 lg:w-60 border-t-2 border-r-2 border-blue-500 rounded-tr-xl z-10"
				></div>
				<div
					class="hidden lg:block absolute top-0 left-1/2 ml-40 mt-10 py-6 w-60 border-t-2 border-r-2 border-blue-500 rounded-tr-xl z-10"
				></div>
				<div
					class="hidden md:block lg:hidden absolute top-1/2 left-0 ml-40 mt-20 py-6 w-72 border-t-2 border-r-2 border-blue-500 rounded-tr-xl z-10"
				></div>
				<div class="relative w-full md:w-1/2 lg:w-1/4 px-4 mb-20 md:mb-0 bg-white">
					<img
						class="h-32 w-32 mb-12 rounded-lg"
						:src="`https://robohash.org/` + bossmans[4] + `.png?set=set2&size=500x500`"
						alt=""
					/>
					<h3 class="mb-2 text-3xl font-medium">#{{ myrank - 5 }}</h3>
					<p class="text-base text-gray-400 leading-relaxed">
						{{ bossmans[4] }}
					</p>
				</div>
				<div class="relative w-full md:w-1/2 lg:w-1/4 px-4 mb-20 lg:mb-0 md:mt-32 bg-white">
					<img
						class="h-32 w-32 mb-12 rounded-lg"
						:src="`https://robohash.org/` + bossmans[5] + `.png?set=set2&size=500x500`"
						alt=""
					/>
					<h3 class="mb-2 text-3xl font-medium">#{{ myrank - 6 }}</h3>
					<p class="text-base text-gray-400 leading-relaxed">
						{{ bossmans[5] }}
					</p>
				</div>
				<div class="w-full md:w-1/2 lg:w-1/4 px-4 mb-20 md:mb-0 bg-white">
					<img
						class="h-32 w-32 mb-12 rounded-lg"
						:src="`https://robohash.org/` + bossmans[6] + `.png?set=set2&size=500x500`"
						alt=""
					/>
					<h3 class="mb-2 text-3xl font-medium">#{{ myrank - 7 }}</h3>
					<p class="text-base text-gray-400 leading-relaxed">
						{{ bossmans[6] }}
					</p>
				</div>
				<div class="w-full md:w-1/2 lg:w-1/4 px-4 md:mt-32 bg-white">
					<img
						class="h-32 w-32 mb-12 rounded-lg"
						:src="`https://robohash.org/` + bossmans[7] + `.png?set=set2&size=500x500`"
						alt=""
					/>
					<h3 class="mb-2 text-3xl font-medium">#{{ myrank - 8 }}</h3>
					<p class="text-base text-gray-400 leading-relaxed">
						{{ bossmans[7] }}
					</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
	import { ref, onMounted } from 'vue';

	let addr = ref('');

	const data = defineProps(['addr']);

	let btcaddress = data.addr;

	import axios from 'axios';

	async function axiosCall(url) {
		console.log(url);

		const response = await axios.get(url);

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

	async function findBalPos(address) {
		const balance = await getBitcoinBalance(address);

		const exp2 = await axiosCall(`https://api.blockchair.com/bitcoin/addresses?a=count()&q=balance(${balance}..34859739823342)`);

		const rank = exp2.data[0]['count()'] || 0;

		return {
			bal: balance,
			rank: rank,
			humanbal: balance / 10 ** 8,
		};
	}

	async function getBossman(balance) {
		const exp3 = await axiosCall(
			`https://api.blockchair.com/bitcoin/addresses?q=balance(${balance}..34859739823342)&limit=10&s=balance(asc)`
		);

		let bossmans = [];

		for (let i = 0; i < exp3.data.length; i++) {
			bossmans.push(exp3.data[i].address);
		}

		return bossmans;
	}

	let mybalance = ref(0);
	let myrank = ref(0);
	let bossmans = ref([]);

	const fetchData = async () => {
		try {
			mybalance.value = (await getBitcoinBalance(btcaddress)) / 10 ** 8;

			const { bal, rank, humanbal } = await findBalPos(btcaddress);

			myrank.value = rank || 0;

			const bossmanx = await getBossman(bal + 1);

			console.log(bossmanx);

			bossmans.value = bossmanx;
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	onMounted(fetchData);
</script>
