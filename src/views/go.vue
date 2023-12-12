<template>XXX {{ btcaddress }}</template>

<script setup>
	import { ref, onMounted } from 'vue';

	let addr = ref('');

	const data = defineProps(['addr']);

	let btcaddress = data.addr;

	import axios from 'axios';

	async function axiosCall(url) {
		console.log(url);

		const response = await axios.get(url);

		if (response.data.status === 430) {
			console.log('430 error');
			return;
		}

		return response.data;
	}

	async function getBitcoinBalance(address) {
		const data = await axiosCall(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`);

		console.log(data.balance);

		return data.balance;
	}

	async function findBalPos(address) {
		const balance = await getBitcoinBalance(address);

		const exp2 = await axiosCall(`https://api.blockchair.com/bitcoin/addresses?a=count()&q=balance(${balance}..34859739823342)`);

		const rank = exp2.data[0]['count()'] || 0;

		return {
			bal: balance,
			rank: rank,
			humanbal: balance / 10 ** 8,
		};
	}

	async function getBossman(balance) {
		const exp3 = await axiosCall(
			`https://api.blockchair.com/bitcoin/addresses?q=balance(${balance}..34859739823342)&limit=10&s=balance(asc)`
		);

		let bossmans = [];

		for (let i = 0; i < exp3.data.length; i++) {
			bossmans.push(exp3.data[i].address);
		}

		return bossmans;
	}

	onMounted(async () => {
		const { bal, rank, humanbal } = await findBalPos(btcaddress);

		console.log('xxxxxxxxxxxxxxxxx');
		console.log(bal, rank, humanbal);

		const bossmans = await getBossman(bal + 1);
		console.log('yyyyyyyyyyyyyyyyyyyyyyyyyy');

		console.log(bossmans);
	});
</script>
