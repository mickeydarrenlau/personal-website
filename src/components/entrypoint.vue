<template>
 <template v-if="isMobile">
    <Mobile />
  </template>
  <template v-else>
    <Desktop />
  </template>
  <SpeedInsights/>
</template>

<script setup>
import "../assets/main.css"
import Desktop from '/src/components/Desktop.vue';
import Mobile from '/src/components/Mobile.vue';
let isMobile = localStorage.mobile || window.navigator.maxTouchPoints > 1;
import { SpeedInsights } from "@vercel/speed-insights/vue"
</script>
