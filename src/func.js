export const setWithTTL = (key, value) => {
	const ttlInSeconds = 60 * 60 * 24 * 7; // 1 week

	localStorage.setItem(key, JSON.stringify(value));
	localStorage.setItem(`${key}_ttl`, Date.now() + ttlInSeconds * 1000);
};

export const getWithTTL = (key) => {
	const itemStr = localStorage.getItem(key);

	return JSON.parse(itemStr);
};

export function removeWithTTL() {
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);

		if (key.includes('_ttl')) {
			const ttl = localStorage.getItem(key);

			if (Date.now() > ttl) {
				console.log('removing', key);

				localStorage.removeItem(key);
				localStorage.removeItem(key.replace('_ttl', ''));
			}
		}
	}
}

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

	removeWithTTL();

	console.log(url, Date.now(), hashed);

	try {
		if (getWithTTL(hashed)) {
			return getWithTTL(hashed);
		}

		const response = await axios.get(url);

		if (response.data && cache) {
			setWithTTL(hashed, response.data);
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

	return { bal: data.balance, humanbal: data.balance / 10 ** 8, tx: data.n_tx, txs: data.txrefs };
}

export async function getBitcoinNetwork() {
	const maindata = await axiosCall('https://api.blockchair.com/bitcoin/stats');

	return maindata.data;
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

export async function getCoingecko() {
	const coingeckdata = await axiosCall(`https://api.coingecko.com/api/v3/coins/bitcoin?tickers=false&market_data=true`);

	const mardat = coingeckdata.market_data;

	return {
		price: mardat.current_price.usd,
		ath: mardat.ath.usd,
		athdate: mardat.ath_date.usd,
	};
}
