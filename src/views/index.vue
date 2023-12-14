<template>
    <div class="flex min-h-screen" @click="setAddress()">
        <div class="w-1/2 m-auto p-10">
            <img class="w-full h-full" :src="`https://robohash.org/` + address + `.png?set=set2&size=500x500`" />

            <div class="my-5"></div>

            <input class="p-4 w-full bg-green-300 hover:bg-orange-400 rounded-lg text-center text-gray-800" v-model="address" placeholder="Enter Bitcoin address" />

            <div class="my-5"></div>

            <RouterLink :to="getRoute"><button class="p-4 w-full bg-green-300 hover:bg-orange-300 rounded-lg text-center text-xl">Fetch</button></RouterLink>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref, computed } from "vue";

let address = ref("");

if (localStorage.getItem("btcaddress")) {
    console.log("Found address in localStorage");
    address.value = localStorage.getItem("btcaddress");
}

function setAddress() {
    console.log("Setting address in localStorage");
    localStorage.setItem("btcaddress", address.value);
}

let getRoute = computed(() => {
    if (address.value) {
        return { name: 'go', params: { addr: address.value } };
    } else {
        return { name: 'home' }; // replace 'home' with the name of your fallback route
    }
});
</script>