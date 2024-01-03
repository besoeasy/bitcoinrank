<template>
	<div class="flex min-h-screen m-auto container max-w-6xl">
		<div class="w-full m-auto p-10 hidden md:block">
			<section class="py-8 bg-blueGray-50">
				<div class="container px-4 mx-auto">
					<div class="flex flex-wrap -mx-3">
						<div class="w-full md:w-1/3 px-3 mb-6">
							<div class="h-full px-8 py-10 bg-white rounded-3xl">
								<div class="flex items-center mb-4">
									<h3
										class="mr-auto pr-1 text-sm text-darkBlueGray-300 font-heading font-medium"
									>
										Current Block
									</h3>
								</div>
								<div class="flex items-center mb-5">
									<span
										class="inline-block mr-2 text-2xl font-heading font-medium"
										>{{ blocknum }}</span
									>
								</div>
							</div>
						</div>
						<div class="w-full md:w-1/3 px-3 mb-6">
							<div class="h-full px-8 py-10 bg-white rounded-3xl">
								<div class="flex items-center mb-4">
									<h3
										class="mr-auto pr-1 text-sm text-darkBlueGray-300 font-heading font-medium"
									>
										Bitcoin Circulation
									</h3>
								</div>
								<div class="flex items-center mb-5">
									<span
										class="inline-block mr-2 text-2xl font-heading font-medium"
										>{{ totalbtc }} BTC</span
									>
								</div>
							</div>
						</div>

						<div class="w-full md:w-1/3 px-3 mb-6">
							<div class="h-full px-8 py-10 bg-white rounded-3xl">
								<div class="flex items-center mb-4">
									<h3
										class="mr-auto pr-1 text-sm text-darkBlueGray-300 font-heading font-medium"
									>
										Transactions - 24 Hours
									</h3>
								</div>
								<div class="flex items-center mb-5">
									<span
										class="inline-block mr-2 text-2xl font-heading font-medium"
										>{{ txn23hr }}</span
									>
								</div>
							</div>
						</div>

						<div class="w-full md:w-1/3 px-3 mb-6">
							<div class="h-full px-8 py-10 bg-white rounded-3xl">
								<div class="flex items-center mb-4">
									<h3
										class="mr-auto pr-1 text-sm text-darkBlueGray-300 font-heading font-medium"
									>
										Blockchain Size
									</h3>
								</div>
								<div class="flex items-center mb-5">
									<span
										class="inline-block mr-2 text-2xl font-heading font-medium"
										>{{ blockchain_size }} GB
									</span>
								</div>
							</div>
						</div>

						<div class="w-full md:w-1/3 px-3 mb-6">
							<div class="h-full px-8 py-10 bg-white rounded-3xl">
								<div class="flex items-center mb-4">
									<h3
										class="mr-auto pr-1 text-sm text-darkBlueGray-300 font-heading font-medium"
									>
										Total Nodes
									</h3>
								</div>
								<div class="flex items-center mb-5">
									<span
										class="inline-block mr-2 text-2xl font-heading font-medium"
										>{{ totalnodes }}
									</span>
								</div>
							</div>
						</div>

						<div class="w-full md:w-1/3 px-3 mb-6">
							<div class="h-full px-8 py-10 bg-white rounded-3xl">
								<div class="flex items-center mb-4">
									<h3
										class="mr-auto pr-1 text-sm text-darkBlueGray-300 font-heading font-medium"
									>
										Blocks - 24 Hours
									</h3>
								</div>
								<div class="flex items-center mb-5">
									<span
										class="inline-block mr-2 text-2xl font-heading font-medium"
										>{{ block24hr }}</span
									>
								</div>
							</div>
						</div>

						<div class="w-full md:w-1/4 px-3 mb-6">
							<div class="h-full px-8 py-10 bg-white rounded-3xl">
								<div class="flex items-center mb-4">
									<h3
										class="mr-auto pr-1 text-sm text-darkBlueGray-300 font-heading font-medium"
									>
										MEMPOOL Size
									</h3>
								</div>
								<div class="flex items-center mb-5">
									<span
										class="inline-block mr-2 text-2xl font-heading font-medium"
										>{{ mempoolsize }} MB</span
									>
								</div>
							</div>
						</div>

						<div class="w-full md:w-1/4 px-3 mb-6">
							<div class="h-full px-8 py-10 bg-white rounded-3xl">
								<div class="flex items-center mb-4">
									<h3
										class="mr-auto pr-1 text-sm text-darkBlueGray-300 font-heading font-medium"
									>
										MEMPOOL Transactions
									</h3>
								</div>
								<div class="flex items-center mb-5">
									<span
										class="inline-block mr-2 text-2xl font-heading font-medium"
										>{{ mempooltxn }}
									</span>
								</div>
							</div>
						</div>

						<div class="w-full md:w-1/4 px-3 mb-6">
							<div class="h-full px-8 py-10 bg-white rounded-3xl">
								<div class="flex items-center mb-4">
									<h3
										class="mr-auto pr-1 text-sm text-darkBlueGray-300 font-heading font-medium"
									>
										Average Fees - 24 Hours
									</h3>
								</div>
								<div class="flex items-center mb-5">
									<span
										class="inline-block mr-2 text-2xl font-heading font-medium"
										>{{ avgfees }} USD</span
									>
								</div>
							</div>
						</div>

						<div class="w-full md:w-1/4 px-3 mb-6">
							<div class="h-full px-8 py-10 bg-white rounded-3xl">
								<div class="flex items-center mb-4">
									<h3
										class="mr-auto pr-1 text-sm text-darkBlueGray-300 font-heading font-medium"
									>
										Pricing - 24 Hours
									</h3>
								</div>
								<div class="flex items-center mb-5">
									<span
										class="inline-block mr-2 text-2xl font-heading font-medium"
										>{{ btcprice }} USD</span
									>
								</div>
							</div>
						</div>

						<div class="w-full md:w-1/4 px-3 mb-6">
							<div class="h-full px-8 py-10 bg-white rounded-3xl">
								<div class="flex items-center mb-4">
									<h3
										class="mr-auto pr-1 text-sm text-darkBlueGray-300 font-heading font-medium"
									>
										All Time High
									</h3>
								</div>
								<div class="flex items-center mb-5">
									<span
										class="inline-block mr-2 text-2xl font-heading font-medium"
										>{{ ath }} USD</span
									>
								</div>
							</div>
						</div>

						<div class="w-full md:w-1/4 px-3 mb-6">
							<div class="h-full px-8 py-10 bg-white rounded-3xl">
								<div class="flex items-center mb-4">
									<h3
										class="mr-auto pr-1 text-sm text-darkBlueGray-300 font-heading font-medium"
									>
										All Time Date
									</h3>
								</div>
								<div class="flex items-center mb-5">
									<span
										class="inline-block mr-2 text-2xl font-heading font-medium"
										>{{ timeAgo(athdate) }}
									</span>
								</div>
							</div>
						</div>

						<div class="w-full md:w-1/4 px-3 mb-6">
							<div class="h-full px-8 py-10 bg-white rounded-3xl">
								<div class="flex items-center mb-5">
									<span
										class="inline-block mr-2 text-2xl font-heading font-medium"
										>{{ totaladdress }}
									</span>
								</div>
								<div class="flex items-center mb-4">
									<h3
										class="mr-auto pr-1 text-sm text-darkBlueGray-300 font-heading font-medium"
									>
										Hodling Addresses
									</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { getBitcoinNetwork, getCoingecko, timeAgo } from '@/func.js';

	let blocknum = ref(0);
	let totalbtc = ref(0);
	let block24hr = ref(0);
	let txn23hr = ref(0);

	let mempoolsize = ref(0);
	let mempooltxn = ref(0);

	let blockchain_size = ref(0);
	let totalnodes = ref(0);

	let avgfees = ref(0);
	let btcprice = ref(0);

	let totaladdress = ref(0);

	let ath = ref(0);
	let athdate = ref(0);

	(async () => {
		const cgdata = await getCoingecko();

		ath.value = cgdata.ath;
		athdate.value = cgdata.athdate;

		const maindata = await getBitcoinNetwork();

		blocknum.value = maindata.blocks;
		totalbtc.value = maindata.circulation / 100000000;
		totalbtc.value = parseInt(totalbtc.value);

		block24hr.value = maindata.blocks_24h;
		txn23hr.value = maindata.transactions_24h;

		mempoolsize.value = maindata.mempool_size;
		mempoolsize.value = parseInt(mempoolsize.value / 1000000);

		mempooltxn.value = maindata.mempool_transactions;

		blockchain_size.value = parseInt(maindata.blockchain_size / 1000000000);
		totalnodes.value = maindata.nodes;

		avgfees.value = maindata.average_transaction_fee_usd_24h;
		avgfees.value = parseInt(avgfees.value);

		btcprice.value = maindata.market_price_usd;

		totaladdress.value = maindata.hodling_addresses;
	})();
</script>
