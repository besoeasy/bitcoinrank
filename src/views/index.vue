<template>
	<div class="flex min-h-screen m-auto container max-w-6xl" @click="setAddress()">
		<div class="w-1/2 m-auto p-10">
			<img class="w-full h-full" :src="`https://robohash.org/` + address + `.png?set=set2&size=500x500`" />

			<div class="my-5"></div>

			<input class="p-4 w-full bg-green-300 hover:bg-orange-400 rounded-lg text-center text-gray-800" v-model="address" placeholder="Enter Bitcoin address" />

			<div class="my-5"></div>

			<RouterLink :to="getRoute"><button class="p-4 w-full bg-green-300 hover:bg-orange-300 rounded-lg text-center text-xl">Fetch</button></RouterLink>
		</div>

		<div class="w-1/2 m-auto p-10">
			<p class="mb-14 text-lg leading-10 text-darkBlueGray-400 max-w-4xl">
				Ever wondered where you stand in the world of Bitcoin? This app, drawing inspiration from the Bitcoin Rich List, gives you the scoop on your Bitcoin address and its global rank. Plus, it
				throws in a bunch of other cool stats about your Bitcoin wallet to satisfy your curiosity!
			</p>
			<a class="inline-flex items-center text-green-600 hover:text-green-700 border-b border-green-600 pb-1 hover:border-green-700" href="https://github.com/besoeasy/bitcoinrank">
				<span class="text-xl font-bold tracking-tight">Github</span>
				<svg class="ml-4" width="16" height="13" viewbox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10.8 1L15 7H1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
					<path d="M11 12L15 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
				</svg>
			</a>
		</div>
	</div>
</template>

<script setup>
import { getWithTTL, setWithTTL } from "@/func.js";

import { RouterLink } from "vue-router";

import { ref, computed } from "vue";

let address = ref("");

if (getWithTTL("btcaddress")) {
	address.value = getWithTTL("btcaddress");
}

function setAddress() {
	console.log("Setting address in localStorage");
	setWithTTL("btcaddress", address.value, 60 * 60 * 24 * 10);
}

let getRoute = computed(() => {
	if (address.value) {
		return { name: "go", params: { addr: address.value } };
	} else {
		return { name: "home" }; // replace 'home' with the name of your fallback route
	}
});
</script>
