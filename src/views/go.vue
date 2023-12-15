<template>
	<div class="bg-yellow-100 text-black">
		<div class="m-auto container py-8">
			<div class="flex items-center justify-center text-base lg:text-xl space-x-4 lg:space-x-8 font-semibold">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6 mr-2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
					/>
				</svg>

				{{ btcaddress }}
			</div>
		</div>
	</div>

	<section class="py-24 lg:py-40 overflow-hidden">
		<div class="container px-4 mx-auto">
			<div class="flex flex-wrap items-center -m-8">
				<div class="w-full md:w-2/4 p-8">
					<div class="m-auto flex items-center justify-center">
						<img
							class="bg-yellow-200 transform hover:-translate-y-2 transition duration-500 rounded-2xl"
							:src="`https://robohash.org/` + btcaddress + `.png?set=set2&size=500x500`"
							alt=""
						/>
					</div>
				</div>
				<div class="w-full md:w-2/4 p-8">
					<div class="md:max-w-md">
						<div class="flex flex-wrap -m-4">
							<div class="w-full lg:w-4/4 p-4">
								<h2 class="mb-2 text-xl font-bold uppercase">
									You're in the top
									<span class="bg-blue-100">{{ rankpostest }}</span> of all
									Bitcoin addresses—ranked
									<span class="bg-green-100">#{{ myrank }}</span> out of
									<span class="bg-red-100">{{ totalcount }}</span
									>.
								</h2>
							</div>

							<div class="w-full lg:w-3/4 p-4">
								<div class="p-6 rounded bg-white">
									<h3 class="text-sm text-gray-600 mb-2">Balance</h3>
									<h2 class="mb-2 text-3xl font-bold">{{ mybalance }} BTC</h2>
									<span class="text-green-500">
										<span class="inline-block mr-2">
											<svg
												width="18"
												height="10"
												viewbox="0 0 18 10"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M16.5 5.83333C16.3906 5.83339 16.2822 5.81188 16.181 5.77002C16.0799 5.72817 15.988 5.66678 15.9106 5.58939C15.8332 5.512 15.7719 5.42011 15.73 5.31897C15.6881 5.21784 15.6666 5.10945 15.6667 5V2.84505L10.4225 8.08916C10.3452 8.16656 10.2533 8.22796 10.1522 8.26985C10.0511 8.31175 9.94277 8.33331 9.83333 8.33331C9.7239 8.33331 9.61554 8.31175 9.51445 8.26985C9.41335 8.22796 9.3215 8.16656 9.24414 8.08916L6.50002 5.34505L2.08919 9.75583C1.93245 9.90975 1.72127 9.99555 1.50159 9.99456C1.28191 9.99356 1.07151 9.90586 0.91617 9.75052C0.760831 9.59518 0.673123 9.38478 0.672128 9.1651C0.671133 8.94542 0.756932 8.73424 0.910858 8.5775L5.91086 3.5775C5.98822 3.5001 6.08007 3.4387 6.18116 3.39681C6.28226 3.35492 6.39062 3.33335 6.50005 3.33335C6.60948 3.33335 6.71784 3.35492 6.81893 3.39681C6.92003 3.4387 7.01188 3.5001 7.08924 3.5775L9.83336 6.32161L14.4883 1.66666H12.3334C12.1123 1.66666 11.9004 1.57887 11.7441 1.42259C11.5878 1.2663 11.5 1.05434 11.5 0.833329C11.5 0.612315 11.5878 0.400352 11.7441 0.244073C11.9004 0.0877924 12.1123 -4.76837e-06 12.3334 -4.76837e-06H16.5C16.6095 -6.67572e-05 16.7179 0.0214453 16.819 0.063302C16.9201 0.105159 17.012 0.166539 17.0894 0.243935C17.1668 0.321329 17.2282 0.413218 17.2701 0.514352C17.3119 0.615484 17.3334 0.723876 17.3334 0.833329V5C17.3334 5.10945 17.3119 5.21784 17.2701 5.31897C17.2282 5.42011 17.1668 5.512 17.0894 5.58939C17.012 5.66678 16.9201 5.72817 16.819 5.77002C16.7179 5.81188 16.6095 5.83339 16.5 5.83333Z"
													fill="#17BB84"
												></path>
											</svg>
										</span>
										<span
											>{{
												parseInt(mybalance * btcprice)
											}}
											USD</span
										>
									</span>
								</div>
							</div>

							<div class="w-full lg:w-1/4 p-4">
								<div class="p-6 rounded bg-white">
									<h3 class="text-sm text-gray-600 mb-2">Transactions</h3>
									<h2 class="mb-2 text-3xl font-bold">{{ mytx }}</h2>
								</div>
							</div>

							<div class="w-full lg:w-2/4 p-4">
								<div class="p-6 rounded bg-white">
									<h3 class="text-sm text-gray-600 mb-2">Biggest Balance</h3>
									<h2 class="mb-2 text-xl font-bold">
										{{ biggestbalance }} BTC
									</h2>
									<span class="text-gray-500">
										<span>{{ timeAgo(biggestbalancedate) }}</span>
									</span>
								</div>
							</div>

							<div class="w-full lg:w-2/4 p-4">
								<div class="p-6 rounded bg-white">
									<div class="flex mb-2">
										<h3 class="text-sm text-gray-600">Last Seen</h3>
									</div>
									<h2 class="mb-2 text-lg font-bold">{{ lastseen }}</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<BossmanCard :bossmans="bossmans" :myrank="myrank" :mybalance="mybalance" />

	<BalChart :mytxs="mytxs" />

	<ExternalLinks :btcaddress="btcaddress" />
</template>

<script setup>
	import BossmanCard from '@/components/BossManCard.vue';

	import BalChart from '@/components/BalChart.vue';

	import ExternalLinks from '@/components/ExternalLinks.vue';

	import { axiosCall, timeAgo } from '@/func.js';

	import { ref, onMounted } from 'vue';

	let addr = ref('');

	const data = defineProps(['addr']);

	let btcaddress = data.addr;

	async function getBitcoinBalance(address) {
		const data = await axiosCall(`https://api.blockcypher.com/v1/btc/main/addrs/${address}`);

		console.log(data);

		return { bal: data.balance, humanbal: data.balance / 10 ** 8, tx: data.n_tx, txs: data.txrefs };
	}

	async function findBalPos(address) {
		const { bal, humanbal } = await getBitcoinBalance(address);

		const exp2 = await axiosCall(`https://api.blockchair.com/bitcoin/addresses?a=count()&q=balance(${bal}..34859739823342)`);

		return exp2.data[0]['count()'] || 0;
	}

	async function getBossman(balance) {
		const exp3 = await axiosCall(
			`https://api.blockchair.com/bitcoin/addresses?q=balance(${balance}..34859739823342)&limit=8&s=balance(asc)`
		);

		let bossmans = [];

		for (let i = 0; i < exp3.data.length; i++) {
			bossmans.push(exp3.data[i].address);
		}

		return bossmans;
	}

	let mybalance = ref(0);
	let myrank = ref(0);
	let mytx = ref(0);
	let mytxs = ref([]);
	let lastseen = ref('');
	let biggestbalance = ref(0);
	let biggestbalancedate = ref(new Date());
	let totalcount = ref(0);
	let rankpostest = ref(0);

	let bossmans = ref([]);
	let btcprice = ref(0);

	function calculatePercentile(position, totalEntries) {
		if (totalEntries === 0) {
			throw new Error('Total entries cannot be zero');
		}

		const percentile = parseInt(position) / parseInt(totalEntries);

		return (percentile * 100).toFixed(4) + '%';
	}

	const fetchData = async () => {
		try {
			const exp2 = await axiosCall(`https://api.blockchair.com/bitcoin/addresses?a=count()&q=balance(0..34859739823342)`);

			totalcount.value = exp2.data[0]['count()'] || 0;

			const btcp = await axiosCall(`https://www.okx.com/api/v5/market/ticker?instId=BTC-USD-SWAP`, false);

			btcprice.value = btcp.data[0].last || 1;

			const { bal, humanbal, tx, txs } = await getBitcoinBalance(btcaddress);

			if (tx > 0) {
				lastseen.value = timeAgo(txs[0].confirmed);

				for (const tx of txs) {
					mytxs.value.push({
						tx: tx.tx_hash,
						balance: tx.ref_balance,
						date: tx.confirmed,
						block: tx.block_height,
						confirmations: tx.confirmations,
					});

					if (biggestbalance.value < tx.ref_balance) {
						biggestbalance.value = tx.ref_balance;
						biggestbalancedate.value = tx.confirmed;
					}
				}
			}

			biggestbalance.value = biggestbalance.value / 10 ** 8;

			mytx.value = tx;

			mybalance.value = humanbal;

			myrank.value = await findBalPos(btcaddress);

			if (myrank.value === 0) return;

			const bossmanx = await getBossman(bal + 1);

			console.log(bossmanx);

			for (const address of bossmanx) {
				const { bal, humanbal, txs } = await getBitcoinBalance(address);
				const date = txs[0].confirmed;
				bossmans.value.push({ address, bal, humanbal, date });
			}

			console.log(bossmans);

			rankpostest.value = await calculatePercentile(myrank.value, totalcount.value);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	onMounted(fetchData);
</script>
