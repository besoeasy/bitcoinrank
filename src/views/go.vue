<template>
  <TopBar :btcaddress="btcaddress" class="bg-yellow-200" />

  <section
    class="py-24 lg:py-40 overflow-hidden"
    id="main"
    @mouseenter="fetchPrice"
  >
    <div class="container px-4 mx-auto">
      <div class="flex flex-wrap items-center -m-8">
        <div class="w-full md:w-2/4 p-8">
          <div class="m-auto flex items-center justify-center">
            <img
              class="bg-yellow-200 transform hover:-translate-y-2 transition duration-500 rounded-2xl"
              :src="
                `https://robohash.org/` +
                btcaddress +
                `.png?set=set2&size=500x500`
              "
              alt=""
            />
          </div>
        </div>
        <div class="w-full md:w-2/4 p-8">
          <div class="md:max-w-md">
            <div class="flex flex-wrap -m-4">
              <div class="w-full lg:w-4/4 p-4">
                <h2 class="mb-2 text-xl font-bold uppercase text-gray-600">
                  You're in the top
                  <span class="bg-blue-100 text-2xl px-2 text-gray-700">{{
                    rankpostest
                  }}</span>
                  of all Bitcoin addresses—ranked
                  <span class="bg-green-100 text-2xl px-2 text-gray-700">{{
                    myrank
                  }}</span>
                  out of
                  <span class="bg-red-100 text-2xl px-2 text-gray-700">{{
                    totalcount
                  }}</span
                  >.
                </h2>
              </div>

              <div class="w-full lg:w-4/4 p-4">
                <h2 class="mb-2 font-bold uppercase text-gray-600">
                  Balance is
                  <span class="bg-blue-100 text-2xl px-1 text-gray-700"
                    >{{ mybalance }} BTC</span
                  >
                  Equals Approximately
                  <span class="bg-green-100 text-2xl px-1 text-gray-700">{{
                    parseInt(mybalance * btcprice)
                  }}</span>
                  USD, ATH Balance :
                  <span class="bg-red-100 text-xl px-1 text-gray-700"
                    >{{ parseInt(coingeckoData.ath * mybalance) }} USD</span
                  >
                </h2>
              </div>

              <div class="w-full lg:w-4/4 p-4">
                <h2 class="mb-2 text-l font-bold uppercase text-gray-600">
                  Recent Maxium Balance was
                  <span class="bg-red-100 text-xl px-1 text-gray-700"
                    >{{ biggestbalance }} BTC</span
                  >
                  Almost
                  <span class="bg-cyan-100 text-xl px-1 text-gray-700"
                    >{{ lastseen }} </span
                  >, Total Transactions
                  <span class="bg-blue-100 text-xl px-1 text-gray-700">{{
                    mytx
                  }}</span
                  >, Last Seen

                  <span class="bg-green-100 text-xl px-1 text-gray-700"
                    >{{ timeAgo(biggestbalancedate) }}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <BossmanCard
    :bossmans="bossmans"
    :myrank="myrank"
    :mybalance="mybalance"
    class="bg-yellow-200"
  />

  <BalChart :mytxs="mytxs" />

  <TxnTable :txns="mytxs" />

  <NotBar :btcaddress="btcaddress" class="bg-yellow-200" />
</template>

<script setup>
import BossmanCard from "@/components/BossManCard.vue";

import BalChart from "@/components/BalChart.vue";

import TopBar from "@/components/TopBar.vue";

import NotBar from "@/components/NotBar.vue";

import TxnTable from "@/components/TxnTable.vue";

import {
  axiosCall,
  timeAgo,
  getBossman,
  findBalPos,
  getBitcoinBalance,
  calculatePercentile,
  getBitcoinPrice,
  getBitcoinNetwork,
  getCoingecko,
} from "@/func.js";

import { ref, onMounted } from "vue";

let addr = ref("");

const data = defineProps(["addr"]);

let btcaddress = data.addr;

let mybalance = ref(0);
let myrank = ref(0);
let mytx = ref(0);
let mytxs = ref([]);

let lastseen = ref("");

let biggestbalance = ref(0);
let biggestbalancedate = ref(new Date());

let totalcount = ref(0);
let rankpostest = ref(0);

let bossmans = ref([]);
let btcprice = ref(0);

let coingeckoData = ref({
  price: 0,
  ath: 0,
  athdate: "",
});

const fetchData = async () => {
  try {
    const maindata = await getBitcoinNetwork();

    totalcount.value = maindata.hodling_addresses;

    btcprice.value = await getBitcoinPrice();

    const { bal, humanbal, tx, txs } = await getBitcoinBalance(btcaddress);

    if (tx > 0) {
      lastseen.value = timeAgo(txs[0].confirmed);

      for (const tx of txs) {
        mytxs.value.push({
          tx: tx.tx_hash,
          balance: tx.ref_balance,
          date: tx.confirmed,
          block: tx.block_height,
          confirmations: tx.confirmations,
        });

        if (biggestbalance.value < tx.ref_balance) {
          biggestbalance.value = tx.ref_balance;
          biggestbalancedate.value = tx.confirmed;
        }
      }
    }

    biggestbalance.value = biggestbalance.value / 10 ** 8;

    mytx.value = tx;

    mybalance.value = humanbal;

    myrank.value = await findBalPos(bal);

    if (myrank.value === 0) return;

    const bossmanx = await getBossman(bal + 1);

    for (const address of bossmanx) {
      const { bal, humanbal, txs } = await getBitcoinBalance(address);
      const date = txs[0].confirmed;
      bossmans.value.push({ address, bal, humanbal, date });
    }

    console.log(bossmans);

    rankpostest.value = await calculatePercentile(
      myrank.value,
      totalcount.value
    );

    const cg = await getCoingecko();
    coingeckoData.value = {
      price: cg.price,
      ath: cg.ath,
      athdate: cg.athdate,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchPrice = async () => {
  btcprice.value = (await getBitcoinPrice()) || btcprice.value;
  cg.ath = await getCoingecko().ath;
};

onMounted(fetchData);

setInterval(async () => {
  fetchPrice();
}, 1000 * 11);
</script>
