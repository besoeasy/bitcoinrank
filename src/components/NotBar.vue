<template>
	<div class="bg-yellow-100 text-black">
		<div class="m-auto container py-20">
			<div class="flex items-center justify-center text-base lg:text-xl space-x-4 lg:space-x-8 font-semibold uppercase">
				<a v-for="(explorer, index) in blockexplorers" :key="index" :href="explorer.url + btcaddress" target="_blank">
					{{ explorer.name }}
				</a>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';

	let address = ref([]);

	let blockexplorers = [
		{ url: 'https://bitinfocharts.com/bitcoin/address/', name: 'bitinfocharts.com' },
		{ url: 'https://oxt.me/address/', name: 'oxt.me' },
		{ url: 'https://blockchair.com/bitcoin/address/', name: 'Blockchair.com' },
		{ url: 'https://blockchain.info/address/', name: 'Blockchain.info' },
		{ url: 'https://explorer.btc.com/btc/address/', name: 'btc.com' },
	];

	const { btcaddress } = defineProps({
		btcaddress: {
			type: String,
			required: true,
		},
	});

	address.value = btcaddress;
</script>
