<template>
	<div class="my-40">
		<div class="flex m-auto container">
			<div class="w-1/2">
				<img class="w-full h-full" :src="`https://robohash.org/` + btcaddress + `.png?set=set2&size=500x500`" />
			</div>

			<div class="w-1/2">
				<div class="m-auto">
					<p class="transition-opacity duration-300 mt-2 text-xl">Your Global Rank # {{ myrank }}</p>

					<div class="my-3"></div>

					<p class="transition-opacity duration-300 mt-2 text-2xl">{{ mybalance }} BTC</p>

					<div class="my-3"></div>

					<p class="transition-opacity duration-300 mt-2 text-2xl">{{ parseInt(mybalance * btcprice) }} USD</p>

					<div class="my-3"></div>

					<p class="transition-opacity duration-300 mt-2 text-sm">{{ btcaddress }}</p>

					<div class="my-3"></div>

					<p class="transition-opacity duration-300 mt-2 text-sm">Total Transactions: {{ mytx }}</p>

					<div class="my-3"></div>

					<p class="transition-opacity duration-300 mt-2 text-sm">Last Seen : {{ lastseen }}</p>

					<div class="my-3"></div>
				</div>
			</div>
		</div>
	</div>

	<div class="my-40">
		<div class="flex m-auto container">
			<div class="w-1/2">
				<canvas id="myChart"></canvas>
			</div>
		</div>
	</div>

	<div class="py-20 m-auto container">
		<p class="text-3xl text-center">People Who Outrank You !</p>
		<div class="my-20"></div>
		<section class="grid w-full grid-cols-1 gap-10 md:grid-cols-3">
			<div v-for="(bossman, index) of bossmans" :key="index">
				<a target="_blank" :href="`https://explorer.btc.com/btc/address/` + bossman.address">
					<div
						class="bg-yellow-50 flex flex-col col-span-1 hover:col-span-2 items-center justify-center shadow-xl py-10 px-10 transform duration-500 hover:scale-110 border-2 rounded-lg hover:border-dashed border-double border-black"
					>
						<h3 class="font-medium text-xl"># {{ myrank - index - 1 }}</h3>
						<p class="bg-green-200 px-2">+ {{ parseFloat(bossman.humanbal - mybalance).toFixed(6) }} BTC</p>

						<div class="relative p-5 transform duration-500 hover:scale-105">
							<div class="absolute z-10 w-full h-full -mt-5 -ml-5 rounded-full"></div>
							<img class="relative z-10 w-full" :src="`https://robohash.org/` + bossman.address + `.png?set=set2&size=500x500`" />
						</div>
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
	const exp3 = await axiosCall(`https://api.blockchair.com/bitcoin/addresses?q=balance(${balance}..34859739823342)&limit=12&s=balance(asc)`);

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
				mytxs.value.push({ tx: tx.tx_hash, balance: tx.ref_balance, date: tx.confirmed });
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
						backgroundColor: ["rgba(255, 99, 132, 0.2)"],
						borderColor: ["rgba(255, 99, 132, 1)"],
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
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
