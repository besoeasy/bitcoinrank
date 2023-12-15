<template>
	<div class="bg-yellow-100 text-black">
		<div class="m-auto container py-10">
			<div class="flex items-center justify-center uppercase text-base lg:text-xl space-x-4 lg:space-x-8 font-bold">
				{{ btcaddress }}
			</div>
		</div>
	</div>

	<div class="my-20">
		<div class="flex space-x-10 m-auto container">
			<div class="w-1/4">
				<img class="shadow-xl bg-yellow-100 rounded-lg" :src="`https://robohash.org/` + btcaddress + `.png?set=set2&size=500x500`" />
			</div>

			<div class="w-1/4">
				<img class="shadow-xl rounded-lg" :src="`https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=` + btcaddress" />
			</div>

			<div class="w-1/2">
				<canvas class="p-2" id="myChart"></canvas>
			</div>
		</div>
	</div>

	<div class="my-20">
		<div class="container px-4 m-auto">
			<div class="flex flex-wrap -m-4">
				<div class="w-full lg:w-1/4 p-4">
					<div class="p-6 rounded bg-white">
						<div class="flex mb-2">
							<h3 class="text-sm text-gray-600">Global Rank :</h3>
						</div>
						<h2 class="mb-2 text-3xl font-bold"># {{ myrank }}</h2>
					</div>
				</div>

				<div class="w-full lg:w-1/4 p-4">
					<div class="p-6 rounded bg-white">
						<div class="flex mb-2">
							<h3 class="text-sm text-gray-600">Total Transactions :</h3>
						</div>
						<h2 class="mb-2 text-3xl font-bold">{{ mytx }}</h2>
					</div>
				</div>

				<div class="w-full lg:w-1/4 p-4">
					<div class="p-6 rounded bg-white">
						<div class="flex mb-2">
							<h3 class="text-sm text-gray-600">Balance</h3>
						</div>
						<h2 class="mb-2 text-3xl font-bold">{{ mybalance }} BTC</h2>
						<span class="text-green-500">
							<span class="inline-block mr-2">
								<svg width="18" height="10" viewbox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M16.5 5.83333C16.3906 5.83339 16.2822 5.81188 16.181 5.77002C16.0799 5.72817 15.988 5.66678 15.9106 5.58939C15.8332 5.512 15.7719 5.42011 15.73 5.31897C15.6881 5.21784 15.6666 5.10945 15.6667 5V2.84505L10.4225 8.08916C10.3452 8.16656 10.2533 8.22796 10.1522 8.26985C10.0511 8.31175 9.94277 8.33331 9.83333 8.33331C9.7239 8.33331 9.61554 8.31175 9.51445 8.26985C9.41335 8.22796 9.3215 8.16656 9.24414 8.08916L6.50002 5.34505L2.08919 9.75583C1.93245 9.90975 1.72127 9.99555 1.50159 9.99456C1.28191 9.99356 1.07151 9.90586 0.91617 9.75052C0.760831 9.59518 0.673123 9.38478 0.672128 9.1651C0.671133 8.94542 0.756932 8.73424 0.910858 8.5775L5.91086 3.5775C5.98822 3.5001 6.08007 3.4387 6.18116 3.39681C6.28226 3.35492 6.39062 3.33335 6.50005 3.33335C6.60948 3.33335 6.71784 3.35492 6.81893 3.39681C6.92003 3.4387 7.01188 3.5001 7.08924 3.5775L9.83336 6.32161L14.4883 1.66666H12.3334C12.1123 1.66666 11.9004 1.57887 11.7441 1.42259C11.5878 1.2663 11.5 1.05434 11.5 0.833329C11.5 0.612315 11.5878 0.400352 11.7441 0.244073C11.9004 0.0877924 12.1123 -4.76837e-06 12.3334 -4.76837e-06H16.5C16.6095 -6.67572e-05 16.7179 0.0214453 16.819 0.063302C16.9201 0.105159 17.012 0.166539 17.0894 0.243935C17.1668 0.321329 17.2282 0.413218 17.2701 0.514352C17.3119 0.615484 17.3334 0.723876 17.3334 0.833329V5C17.3334 5.10945 17.3119 5.21784 17.2701 5.31897C17.2282 5.42011 17.1668 5.512 17.0894 5.58939C17.012 5.66678 16.9201 5.72817 16.819 5.77002C16.7179 5.81188 16.6095 5.83339 16.5 5.83333Z"
										fill="#17BB84"
									></path>
								</svg>
							</span>
							<span>{{ parseInt(mybalance * btcprice) }} USD</span>
						</span>
					</div>
				</div>

				<div class="w-full lg:w-1/4 p-4">
					<div class="p-6 rounded bg-white">
						<div class="flex mb-2">
							<h3 class="text-sm text-gray-600">Last Seen :</h3>
						</div>
						<h2 class="mb-2 text-3xl font-bold">{{ lastseen }}</h2>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="bg-yellow-100 text-black">
		<div class="m-auto container py-10">
			<div class="flex items-center justify-center uppercase text-base lg:text-xl space-x-4 lg:space-x-8 font-bold">People Who Outrank You !</div>
		</div>
	</div>

	<div class="py-20 m-auto container">
		<section class="grid w-full grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
			<div v-for="(bossman, index) of bossmans" :key="index">
				<a target="_blank" :href="`https://explorer.btc.com/btc/address/` + bossman.address">
					<div
						class="bg-yellow-50 flex flex-col col-span-1 hover:col-span-2 items-center justify-center shadow-xl py-10 px-10 transform duration-500 hover:scale-110 border-2 rounded-lg hover:border-dashed border-double border-black"
					>
						<h3 class="font-medium text-xl"># {{ myrank - index - 1 }}</h3>
						<p class="bg-green-200 px-2">+ {{ parseFloat(bossman.humanbal - mybalance).toFixed(6) }} BTC</p>

						<img class="w-full" :src="`https://robohash.org/` + bossman.address + `.png?set=set2&size=500x500`" />

						<div class="mt-3 py-5 text-center">
							<p class="font-medium text-xl">{{ bossman.humanbal }} BTC</p>
							<div class="my-3"></div>
							<p class="text-sm">
								{{ bossman.address }}
							</p>
						</div>
					</div>
				</a>
			</div>
		</section>
	</div>

	<div class="bg-yellow-100 text-black">
		<div class="m-auto container py-10">
			<div class="flex items-center justify-center uppercase text-base lg:text-xl space-x-4 lg:space-x-8 font-bold">Recent Transactions</div>
		</div>
	</div>

	<section class="py-4 overflow-hidden">
		<div class="container px-4 mx-auto">
			<div class="pt-5 bg-neutral-50 border border-neutral-100 rounded-xl">
				<div class="px-6">
					<div class="w-full overflow-x-auto">
						<table class="w-full min-w-max">
							<thead>
								<tr class="text-left">
									<th class="p-0 border-b border-neutral-100">
										<div class="pb-3.5"><a class="text-sm text-gray-400 font-medium uppercase" href="#">Tx</a></div>
									</th>
									<th class="p-0 border-b border-neutral-100">
										<div class="pb-3.5"><a class="text-sm text-gray-400 font-medium" href="#">Balance</a></div>
									</th>
									<th class="p-0 border-b border-neutral-100">
										<div class="pb-3.5"><a class="text-sm text-gray-400 font-medium" href="#">Date</a></div>
									</th>
									<th class="p-0 border-b border-neutral-100">
										<div class="pb-3.5"><a class="text-sm text-gray-400 font-medium" href="#">Confirmations</a></div>
									</th>
									<th class="p-0 border-b border-neutral-100">
										<div class="pb-3.5"><a class="text-sm text-gray-400 font-medium" href="#">Block Number</a></div>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(tx, index) of mytxs" :key="index" class="cursor-pointer">
									<td class="py-3 pr-4">
										<a :href="'https://explorer.btc.com/btc/tx/' + tx.tx" target="_blank" class="text-sm">{{ tx.tx }}</a>
									</td>
									<td class="py-3 pr-4">
										<span class="text-sm">{{ tx.balance / 10 ** 8 }} BTC</span>
									</td>
									<td class="py-3 pr-4">
										<span class="text-sm">{{ timeAgo(tx.date) }}</span>
									</td>
									<td class="py-3 pr-4">
										<span class="text-sm">{{ tx.confirmations }}</span>
									</td>
									<td class="py-3 pr-4 border-b border-neutral-100">
										<span class="text-sm">{{ tx.block }}</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import Chart from "chart.js/auto";

import { axiosCall } from "@/func.js";

import { ref, onMounted } from "vue";

import { formatDistanceToNow } from "date-fns";

const timeAgo = (date) => formatDistanceToNow(new Date(date), { addSuffix: true });

let addr = ref("");

const data = defineProps(["addr"]);

let btcaddress = data.addr;

async function getBitcoinBalance(address) {
	const data = await axiosCall(`https://api.blockcypher.com/v1/btc/main/addrs/${address}`);

	console.log(data);

	return { bal: data.balance, humanbal: data.balance / 10 ** 8, tx: data.n_tx, txs: data.txrefs };
}

async function findBalPos(address) {
	const { bal, humanbal } = await getBitcoinBalance(address);

	const exp2 = await axiosCall(`https://api.blockchair.com/bitcoin/addresses?a=count()&q=balance(${bal}..34859739823342)`);

	return exp2.data[0]["count()"] || 0;
}

async function getBossman(balance) {
	const exp3 = await axiosCall(`https://api.blockchair.com/bitcoin/addresses?q=balance(${balance}..34859739823342)&limit=9&s=balance(asc)`);

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
let lastseen = ref("");

let bossmans = ref([]);
let btcprice = ref(0);

const fetchData = async () => {
	try {
		const btcp = await axiosCall(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`, false);

		btcprice.value = btcp.bitcoin.usd || 1;

		const { bal, humanbal, tx, txs } = await getBitcoinBalance(btcaddress);

		if (tx > 0) {
			lastseen.value = timeAgo(txs[0].confirmed);

			for (const tx of txs) {
				mytxs.value.push({ tx: tx.tx_hash, balance: tx.ref_balance, date: tx.confirmed, block: tx.block_height, confirmations: tx.confirmations });
			}
		}

		mytx.value = tx;

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

		const ctx = document.getElementById("myChart").getContext("2d");

		const myChart = new Chart(ctx, {
			type: "line",
			data: {
				labels: mytxs.value.map((tx) => timeAgo(tx.date)),
				datasets: [
					{
						label: "Balance",
						data: mytxs.value.map((tx) => tx.balance / 10 ** 8),
						borderColor: ["rgba(255, 99, 132, 1)"],
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					x: {
						grid: {
							display: false, // Hide x-axis background grid
						},
					},
					y: {
						grid: {
							display: false, // Hide y-axis background grid
						},
						// You can also customize the y-axis grid here if needed
					},
				},
				plugins: {
					legend: {
						display: false,
					},
				},
			},
		});
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

onMounted(fetchData);
</script>
