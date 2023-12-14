<template>
	<section class="py-24 2xl:pt-64 2xl:pb-48 font-medium bg-yellow-500 overflow-hidden">
		<div class="container px-4 mx-auto">
			<span class="mb-9 tracking-widest text-xs leading-4">{{ btcaddress }}</span>
			<h2 class="my-12 font-heading text-5xl lg:text-6xl leading-tight">{{ mybalance }} BTC</h2>
			<h2 class="my-8 font-heading text-3xl lg:text-6xl leading-tight font-light"># {{ myrank }}</h2>

			<div class="my-12"></div>
		</div>
	</section>

	<section>
		<div class="m-auto container my-20" v-if="bossmans.length > 5">
			<div class="flex flex-wrap -mx-4">
				<div
					v-for="(bossman, index) in bossmans"
					:key="index"
					class="relative w-full md:w-1/2 lg:w-1/4 px-4 mb-20 lg:mb-0 md:mt-32 bg-white"
				>
					<img
						class="h-32 w-32 mb-12 rounded-lg"
						:src="`https://robohash.org/` + bossman.address + `.png?set=set2&size=500x500`"
						alt=""
					/>
					<h3 class="mb-2 text-3xl font-medium">#{{ myrank - index }}</h3>
					<p class="text-base text-gray-400 leading-relaxed">
						Address: {{ bossman.address }}<br />
						Balance: {{ bossman.humanbal }}<br />
						Lead Balance: {{ bossman.humanbal - mybalance }}<br />
						More :
						<a :href="`https://www.blockchain.com/btc/address/` + bossman.address">Blockchain.com</a>
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

	import { sha256 } from 'js-sha256';

	async function toHash(data) {
		const hash = sha256.create();
		hash.update(data);
		return hash.hex();
	}

	async function axiosCall(url) {
		console.log(url);

		const hashed = await toHash(url);

		if (localStorage.getItem('lastcachedtime')) {
			if (Date.now() - localStorage.getItem('lastcachedtime') < 1000 * 60 * 60 * 24 * 7) {
				if (localStorage.getItem(hashed)) {
					console.log('cached');
					return JSON.parse(localStorage.getItem(hashed));
				}
			}
		}

		console.log('Fetchiiiing......... ' + Date.now());

		const response = await axios.get(url);

		localStorage.setItem(hashed, JSON.stringify(response.data));

		localStorage.setItem('lastcachedtime', Date.now());

		return response.data;
	}

	async function getBitcoinBalance(address) {
		const data = await axiosCall(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`);

		console.log(data.balance);

		return { bal: data.balance, humanbal: data.balance / 10 ** 8 };
	}

	async function findBalPos(address) {
		const { bal, humanbal } = await getBitcoinBalance(address);

		const exp2 = await axiosCall(`https://api.blockchair.com/bitcoin/addresses?a=count()&q=balance(${bal}..34859739823342)`);

		return exp2.data[0]['count()'] || 0;
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
			const { bal, humanbal } = await getBitcoinBalance(btcaddress);

			mybalance.value = humanbal;

			myrank.value = await findBalPos(btcaddress);

			if (myrank.value === 0) return;

			const bossmanx = await getBossman(bal + 1);

			console.log(bossmanx);

			for (const address of bossmanx) {
				const { bal, humanbal } = await getBitcoinBalance(address);
				bossmans.value.push({ address, bal, humanbal });
			}

			console.log(bossmans);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	onMounted(fetchData);
</script>
