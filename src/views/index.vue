<template>
	<div class="flex min-h-screen" @click="setAddress()">
		<div class="w-1/4 m-auto p-10">
			<img class="w-full h-full" :src="`https://robohash.org/` + address + `.png?set=set2&size=500x500`" />

			<div class="my-5"></div>

			<input
				class="p-4 w-full bg-green-300 hover:bg-orange-400 rounded-lg text-center text-gray-800"
				v-model="address"
				placeholder="Enter Bitcoin address"
			/>

			<div class="my-5"></div>

			<RouterLink :to="{ name: 'go', params: { addr: address } }"
				><button class="p-4 w-full bg-green-300 hover:bg-orange-300 rounded-lg text-center text-xl">
					Fetch
				</button></RouterLink
			>
		</div>
	</div>
</template>

<script setup>
	import { RouterLink } from 'vue-router';

	import { ref } from 'vue';

	let address = ref('');

	if (localStorage.getItem('btcaddress')) {
		address.value = localStorage.getItem('btcaddress');
	}

	function setAddress() {
		localStorage.setItem('btcaddress', address.value);
	}
</script>
