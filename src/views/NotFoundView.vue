<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <section class="container section not-found">
    <h1>404</h1>
    <p>Страница <code>{{ route.fullPath }}</code> не найдена 🛸</p>
    <RouterLink to="/" class="btn btn--primary">На главную</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding-block: 120px;
}
h1 {
  font-size: clamp(5rem, 20vw, 9rem);
  margin: 0;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
