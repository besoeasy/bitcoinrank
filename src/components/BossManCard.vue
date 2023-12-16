<template>
	<div class="py-40 m-auto container">
		<div class="mb-20 max-w-2xl mx-auto text-center">
			<span
				class="inline-block mb-5 px-3 py-1.5 text-sm text-white uppercase tracking-tight font-semibold bg-gray-600 rounded-full"
				style="background: url('https://shuffle.dev/basko-assets/images/gradient.png'); background-repeat: no-repeat; background-size: cover"
				>Your Competition</span
			>
			<h2 class="font-heading text-3xl tracking-tighter">Wallets that scored more than you</h2>
		</div>
		<section class="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			<div v-for="(bossman, index) of bossmans" :key="index">
				<RouterLink :to="{ name: 'go', params: { addr: bossman.address } }">
					<div
						@mouseover="hovered[index] = true"
						@mouseleave="hovered[index] = false"
						class="bg-yellow-50 flex flex-col col-span-1 hover:col-span-2 items-center justify-center shadow-xl p-10 transform duration-500 hover:scale-105 border-2 rounded-lg hover:border-dashed border-double border-black"
					>
						<p class="font-medium text-xl"># {{ myrank - index - 1 }}</p>

						<p class="bg-green-100 px-2">+ {{ parseFloat(bossman.humanbal - mybalance).toFixed(8) }} BTC</p>

						<img class="w-full h-full" :src="`https://robohash.org/` + bossman.address + `.png?set=set2&size=500x500`" />

						<div class="my-3"></div>

						<p class="font-medium text-xl">{{ bossman.humanbal }} BTC</p>

						<div class="my-2"></div>

						<p class="text-sm">
							{{ bossman.address }}
						</p>

						<p class="text-sm bg-yellow-200 text-gray-600" v-if="hovered[index]">
							{{ timeAgo(bossman.date) }}
						</p>
					</div>
				</RouterLink>
			</div>
		</section>
	</div>
</template>

<script setup>
import { RouterLink } from "vue-router";

import { ref } from "vue";

import { timeAgo } from "@/func.js";

let hovered = ref([]);

const { bossmans, myrank, mybalance } = defineProps({
	bossmans: {
		type: Array,
		required: true,
	},
	myrank: {
		type: Number,
		required: true,
	},
	mybalance: {
		type: Number,
		required: true,
	},
});
</script>
