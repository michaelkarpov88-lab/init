<script setup>
import { version } from 'vue'
import { profile } from '@/data/portfolio'
import SocialLinks from './SocialLinks.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p>© {{ year }} {{ profile.name }}. Сделано с 💚 на Vue {{ version }}</p>
      <SocialLinks />
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 80px;
  padding: 28px 0;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.9rem;
}
.footer__inner {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
}
</style>
