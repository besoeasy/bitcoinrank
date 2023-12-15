<template>
	<div class="py-20 m-auto container">
		<section class="grid w-full grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
			<div v-for="(bossman, index) of bossmans" :key="index">
				<a target="_blank" :href="`https://explorer.btc.com/btc/address/` + bossman.address">
					<div
						@mouseover="hovered[index] = true"
						@mouseleave="hovered[index] = false"
						class="bg-yellow-50 flex flex-col col-span-1 hover:col-span-2 items-center justify-center shadow-xl p-10 transform duration-500 hover:scale-105 border-2 rounded-lg hover:border-dashed border-double border-black"
					>
						<p class="font-medium text-xl"># {{ myrank - index - 1 }}</p>

						<p class="bg-green-100 px-2">+ {{ parseFloat(bossman.humanbal - mybalance).toFixed(6) }} BTC</p>

						<img class="w-full h-full" :src="`https://robohash.org/` + bossman.address + `.png?set=set2&size=500x500`" />

						<div class="my-3"></div>

						<p class="font-medium text-xl">{{ bossman.humanbal }} BTC</p>

						<div class="my-2"></div>

						<p class="text-sm">
							{{ bossman.address }}
						</p>

						<p class="text-sm hover:text-base hover:bg-yellow-200 text-gray-600" v-if="hovered[index]">{{ timeAgo(bossman.date) }}</p>
					</div>
				</a>
			</div>
		</section>
	</div>
</template>

<script setup>
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
