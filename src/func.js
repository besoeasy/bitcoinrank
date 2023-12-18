export const setWithTTL = (key, value, ttlInSeconds) => {
	const now = new Date().getTime();

	const item = {
		value: value,
		expiry: now + ttlInSeconds * 1000,
	};

	if (localStorage.length > 1) {
		for (let i = 0; i < localStorage.length; i++) {
			const storageKey = localStorage.key(i);
			const storedItem = JSON.parse(localStorage.getItem(storageKey));

			if (storedItem && storedItem.expiry && storedItem.expiry < now) {
				localStorage.removeItem(storageKey);
				console.log('cleaning up cache');
			}
		}
	}

	localStorage.setItem(key, JSON.stringify(item));
};

export const getWithTTL = (key) => {
	const itemStr = localStorage.getItem(key);

	if (!itemStr) return null;

	const item = JSON.parse(itemStr);

	return item.value || null;
};

import { sha256 } from 'js-sha256';

async function toHash(data) {
	const hash = sha256.create();
	hash.update(data);
	return hash.hex();
}

import { useToast } from 'vue-toast-notification';

const $toast = useToast();

import axios from 'axios';

export async function axiosCall(url, cache = true) {
	const hashed = await toHash(url);

	const domain = new URL(url).hostname;

	try {
		if (getWithTTL(hashed)) {
			return getWithTTL(hashed);
		}

		console.log(url, Date.now());

		const response = await axios.get(url);

		if (response.data && cache) {
			setWithTTL(hashed, response.data, 60 * 60 * 24 * 4);
		}

		return response.data;
	} catch (error) {
		$toast.info(`Error fetching data for ${domain}`, { position: 'bottom', queue: true, duration: 1000 * 10, pauseOnHover: true });

		console.log(error);
	}
}

import { formatDistanceToNow } from 'date-fns';

export const timeAgo = (date) => formatDistanceToNow(new Date(date), { addSuffix: true });

export function calculatePercentile(position, totalEntries) {
	if (totalEntries === 0) {
		throw new Error('Total entries cannot be zero');
	}

	const percentile = parseInt(position) / parseInt(totalEntries);

	return (percentile * 100).toFixed(4) + '%';
}

export async function getBitcoinBalance(address) {
	const data = await axiosCall(`https://api.blockcypher.com/v1/btc/main/addrs/${address}`);

	console.log(data);

	return { bal: data.balance, humanbal: data.balance / 10 ** 8, tx: data.n_tx, txs: data.txrefs };
}

export async function findBalPos(bal) {
	const exp2 = await axiosCall(`https://api.blockchair.com/bitcoin/addresses?a=count()&q=balance(${bal}..34859739823342)`);

	return exp2.data[0]['count()'] || 0;
}

export async function getBossman(balance) {
	const exp3 = await axiosCall(`https://api.blockchair.com/bitcoin/addresses?q=balance(${balance}..34859739823342)&limit=8&s=balance(asc)`);

	let bossmans = [];

	for (let i = 0; i < exp3.data.length; i++) {
		bossmans.push(exp3.data[i].address);
	}

	return bossmans;
}

export async function getBitcoinPrice() {
	const btcp = await axiosCall(`https://www.okx.com/api/v5/market/ticker?instId=BTC-USD-SWAP`, false);

	return btcp.data[0].last || 1;
}
