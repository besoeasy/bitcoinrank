<template>
  <div class="flex min-h-screen m-auto container max-w-6xl">
    <div class="w-full md:w-1/2 m-auto p-10">
      <img
        class="w-full h-full"
        :src="`https://robohash.org/` + address + `.png?set=set2&size=500x500`"
      />

      <div class="my-5"></div>

      <input
        class="p-4 w-full rounded-lg text-center text-gray-800 border-solid border-2 border-gray-800 focus:border-green-700 focus:outline-none font-semibold"
        v-model="address"
        placeholder="Enter Bitcoin address"
      />

      <div class="my-5"></div>

      <RouterLink :to="getRoute" v-if="isValid"
        ><button
          @click="setAddress()"
          class="inline-flex items-center justify-center p-4 w-full rounded-lg font-semibold text-center text-xl bg-yellow-200 border-solid border-2 border-gray-800"
        >
          FETCH
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 ml-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
            />
          </svg></button
      ></RouterLink>
    </div>

    <div class="w-full md:w-1/2 m-auto p-10 hidden md:block">
      <p class="mb-14 text-lg leading-10 text-darkBlueGray-400 max-w-4xl">
        Ever wondered where you stand in the world of Bitcoin? This app, drawing
        inspiration from the Bitcoin Rich List, gives you the scoop on your
        Bitcoin address and its global rank. Plus, it throws in a bunch of other
        cool stats about your Bitcoin wallet to satisfy your curiosity!
      </p>
      <RouterLink
        :to="{ name: 'network' }"
        class="uppercase inline-flex items-center text-green-600 hover:text-green-800 border-b border-l border-green-600 pl-2 pb-2 hover:border-green-700 mr-4"
      >
        <span class="text-sm font-bold tracking-tight">Network</span>
      </RouterLink>

      <a
        class="uppercase inline-flex items-center text-green-600 hover:text-green-800 border-b border-l border-green-600 pl-2 pb-2 hover:border-green-700 mr-4"
        href="https://github.com/besoeasy/bitcoinrank"
      >
        <span class="text-sm font-bold tracking-tight">Github </span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { getWithTTL, setWithTTL } from "@/func.js";
import { RouterLink } from "vue-router";
import { ref, computed } from "vue";
import { validate } from "bitcoin-address-validation";

let address = ref("");

let isValid = computed(() => {
  return validate(address.value);
});

if (getWithTTL("btcaddress")) {
  address.value = getWithTTL("btcaddress");
}

function setAddress() {
  setWithTTL("btcaddress", address.value);
}

let getRoute = computed(() => {
  if (address.value) {
    return { name: "go", params: { addr: address.value } };
  } else {
    return { name: "home" };
  }
});
</script>
