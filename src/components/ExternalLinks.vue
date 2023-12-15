<template>
	<section class="bg-white py-24 2xl:pt-44 2xl:pb-48">
		<div class="container px-4 mx-auto">
			<h2 class="mb-16 font-heading font-medium text-center text-6xl leading-relaxed">Explore On Other Platforms</h2>
			<div class="flex flex-wrap -mx-2">
				<div class="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 px-2 mb-6 xl:mb-0">
					<div class="flex items-center py-4 px-5 bg-gray-50 rounded-9xl">
						<div class="flex items-center justify-center bg-white w-16 h-16 rounded-5xl shadow-sm">
							<img
								class="h-8"
								src="https://static.shuffle.dev/uploads/files/52/522012c3f1fb8e26ae3db43d4ca84f5911dec6df/bitcoin-btc-logo.png"
								alt=""
							/>
						</div>
						<a :href="`https://bitinfocharts.com/bitcoin/address/` + address" target="_blank">
							<p class="ml-6 text-xl font-heading font-medium">bitinfocharts.com</p></a
						>
					</div>
				</div>
				<div class="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 px-2 mb-6 xl:mb-0">
					<div class="flex items-center py-4 px-5 lg:mt-16 bg-gray-50 rounded-9xl">
						<div class="flex items-center justify-center w-16 h-16 bg-white rounded-5xl shadow-sm">
							<img
								class="h-8"
								src="https://static.shuffle.dev/uploads/files/52/522012c3f1fb8e26ae3db43d4ca84f5911dec6df/bitcoin-btc-logo.png"
								alt=""
							/>
						</div>
						<a :href="`https://oxt.me/address/` + address" target="_blank">
							<p class="ml-6 text-xl font-heading font-medium">oxt.me</p></a
						>
					</div>
				</div>
				<div class="hidden xl:block xl:w-1/5 px-2 mb-6 xl:mb-0">
					<div class="flex items-center py-4 px-5 lg:mt-16 bg-gray-50 rounded-9xl">
						<div class="flex items-center justify-center w-16 h-16 bg-white rounded-5xl shadow-sm">
							<img
								class="h-8"
								src="https://static.shuffle.dev/uploads/files/52/522012c3f1fb8e26ae3db43d4ca84f5911dec6df/bitcoin-btc-logo.png"
								alt=""
							/>
						</div>
						<a :href="`https://blockchair.com/bitcoin/address/` + address" target="_blank">
							<p class="ml-6 text-xl font-heading font-medium">Blockchair.com</p></a
						>
					</div>
				</div>
				<div class="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 px-2 mb-6 lg:mb-0">
					<div class="flex items-center py-4 px-5 lg:mt-16 bg-gray-50 rounded-9xl">
						<div class="flex items-center justify-center w-16 h-16 bg-white rounded-5xl shadow-sm">
							<img
								class="h-8"
								src="https://static.shuffle.dev/uploads/files/52/522012c3f1fb8e26ae3db43d4ca84f5911dec6df/bitcoin-btc-logo.png"
								alt=""
							/>
						</div>
						<a :href="`https://blockchain.info/address/` + address" target="_blank">
							<p class="ml-6 text-xl font-heading font-medium">Blockchain.info</p></a
						>
					</div>
				</div>
				<div class="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 px-2 mb-6 lg:mb-0">
					<div class="flex items-center py-4 px-5 bg-gray-50 rounded-9xl">
						<div class="flex items-center justify-center w-16 h-16 bg-white rounded-5xl shadow-sm">
							<img
								class="h-8"
								src="https://static.shuffle.dev/uploads/files/52/522012c3f1fb8e26ae3db43d4ca84f5911dec6df/bitcoin-btc-logo.png"
								alt=""
							/>
						</div>
						<a :href="`https://explorer.btc.com/btc/address/` + address" target="_blank">
							<p class="ml-6 text-xl font-heading font-medium">btc.com</p>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
	import { ref } from 'vue';

	let address = ref([]);

	const { btcaddress } = defineProps({
		btcaddress: {
			type: String,
			required: true,
		},
	});

	address.value = btcaddress;
</script>
