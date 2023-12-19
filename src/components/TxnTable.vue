<template>
	<div class="flex flex-col">
		<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
				<div class="overflow-hidden">
					<table class="min-w-full border text-center">
						<thead class="border-b">
							<tr>
								<th scope="col" class="text-sm font-medium px-6 py-4 border-r">
									Transaction
								</th>
								<th scope="col" class="text-sm font-medium px-6 py-4 border-r">
									Balance
								</th>
								<th scope="col" class="text-sm font-medium px-6 py-4 border-r">
									Block Number
								</th>
								<th scope="col" class="text-sm font-medium px-6 py-4 border-r">
									Confirmations
								</th>
								<th scope="col" class="text-sm font-medium px-6 py-4 border-r">
									Time
								</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b" v-for="txn in uniqueTxns" :key="txn.tx">
								<td class="px-6 py-4 whitespace-nowrap text-sm font-medium border-r">
									<a
										:href="`https://explorer.btc.com/btc/transaction/${txn.tx}`"
										target="_blank"
									>
										{{ truncateAddress(txn.tx) }}
									</a>
								</td>
								<td class="text-smpx-6 py-4 whitespace-nowrap border-r">
									{{ txn.balance / 10 ** 8 }} BTC
								</td>
								<td class="text-sm px-6 py-4 whitespace-nowrap border-r">
									{{ txn.block }}
								</td>
								<td class="text-sm px-6 py-4 whitespace-nowrap border-r">
									{{ txn.confirmations }}
								</td>
								<td class="text-sm px-6 py-4 whitespace-nowrap border-r">
									{{ timeAgo(txn.date) }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
	import { onMounted, ref, computed } from 'vue';

	import { timeAgo } from '@/func.js';

	const truncateAddress = (address) => {
		if (address.length > 35) {
			const start = address.substring(0, 12);
			const end = address.substring(address.length - 13);
			return `${start}...${end}`;
		}
		return address;
	};

	const uniqueTxns = computed(() => {
		const seen = new Set();
		const unique = txns.filter((txn) => {
			if (seen.has(txn.tx)) {
				return false;
			} else {
				seen.add(txn.tx);
				return true;
			}
		});
		return unique.sort((a, b) => a.confirmations - b.confirmations);
	});

	const { txns } = defineProps({
		txns: {
			type: Array,
			required: true,
		},
	});
</script>
