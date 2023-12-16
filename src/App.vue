<template>
	<RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";

const x = localStorage.length;

console.log(`App loaded with : ${x}`);
</script>
