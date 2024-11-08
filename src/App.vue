<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="content">
 <Suspense>
  <RouterView />
</Suspense>
</div>
</template>

<style scoped>
@import 'assets/main.css'
</style>
