<template>
	<section class="py-24 lg:pb-36 overflow-hidden" v-if="show">
		<div class="max-w-6xl m-auto">
			<canvas class="p-2" id="myChart"></canvas>
		</div>
	</section>
</template>

<script setup>
	import { ref, onMounted } from 'vue';

	import Chart from 'chart.js/auto';

	import { timeAgo } from '@/func.js';

	let mytranscation = ref([]);
	let show = ref(false);

	const { mytxs } = defineProps({
		mytxs: {
			type: Array,
			required: true,
		},
	});

	const fetchData = () => {
		setTimeout(() => {
			mytranscation.value = mytxs.reverse();
			const ctx = document.getElementById('myChart').getContext('2d');

			if (mytranscation.value.length > 0) {
				show.value = true;
			}

			const myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: mytranscation.value.map((tx) => timeAgo(tx.date)),
					datasets: [
						{
							label: 'Balance Over Time',
							data: mytranscation.value.map((tx) => tx.balance / 10 ** 8),
							borderColor: ['rgba(255, 99, 132, 1)'],
							borderWidth: 1,
						},
					],
				},
				options: {
					scales: {
						x: {
							ticks: {
								display: false, // Hide x-axis labels
							},
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
							display: true,
						},
					},
				},
			});
		}, 1000 * 10);
	};

	onMounted(fetchData);
</script>
