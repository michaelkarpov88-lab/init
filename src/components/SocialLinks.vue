<script setup>
import { profile } from '@/data/portfolio'

const icons = {
  github:
    'M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5z',
  telegram:
    'M9.8 15.3 9.4 20c.6 0 .9-.3 1.2-.6l2.9-2.8 6 4.4c1.1.6 1.9.3 2.2-1l4-18.6c.4-1.6-.6-2.3-1.7-1.9L.9 8.7c-1.6.6-1.6 1.5-.3 1.9l6 1.9L20.4 3.8c.7-.4 1.3-.2.8.2z',
  linkedin:
    'M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z',
}
</script>

<template>
  <ul class="socials">
    <li v-for="s in profile.socials" :key="s.name">
      <a :href="s.url" target="_blank" rel="noopener" :aria-label="s.name" :title="s.name">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path :d="icons[s.icon]" /></svg>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.socials {
  display: flex;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
}
a {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--surface-2);
  color: var(--text-muted);
  transition: color 0.2s, transform 0.2s;
}
a:hover {
  color: var(--accent);
  transform: translateY(-3px);
}
</style>
