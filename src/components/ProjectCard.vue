<script setup>
import { vTilt } from '@/directives/tilt'
import { useFavoritesStore } from '@/stores/favorites'

defineProps({
  project: { type: Object, required: true },
})
const emit = defineEmits(['open'])

const favorites = useFavoritesStore()
</script>

<template>
  <article v-tilt class="card" tabindex="0" @click="emit('open', project)" @keydown.enter="emit('open', project)">
    <div class="card__cover" :style="{ background: project.gradient }">
      <span class="card__emoji">{{ project.emoji }}</span>
      <button
        class="card__fav"
        :class="{ 'card__fav--active': favorites.has(project.id) }"
        :aria-label="favorites.has(project.id) ? 'Убрать из избранного' : 'В избранное'"
        @click.stop="favorites.toggle(project.id)"
      >
        {{ favorites.has(project.id) ? '♥' : '♡' }}
      </button>
    </div>
    <div class="card__body">
      <div class="card__meta">
        <span>{{ project.category }}</span>
        <span>{{ project.year }}</span>
      </div>
      <h3>{{ project.title }}</h3>
      <p>{{ project.short }}</p>
      <ul class="tags">
        <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--border);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease-out, box-shadow 0.3s, border-color 0.3s;
  will-change: transform;
}
.card:hover,
.card:focus-visible {
  box-shadow: var(--shadow);
  border-color: var(--accent);
}
.card__cover {
  position: relative;
  display: grid;
  place-items: center;
  height: 160px;
}
.card__emoji {
  font-size: 4rem;
  filter: drop-shadow(0 8px 16px rgb(0 0 0 / 0.25));
  transition: transform 0.4s;
}
.card:hover .card__emoji { transform: scale(1.15) rotate(-6deg); }
.card__fav {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.85);
  color: #e11d48;
  font-size: 1.2rem;
  transition: transform 0.2s;
}
.card__fav:hover { transform: scale(1.15); }
.card__fav--active { animation: heart 0.4s; }
@keyframes heart { 50% { transform: scale(1.4); } }
.card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
}
.card__meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
}
h3 { margin: 8px 0; font-size: 1.25rem; }
p { margin: 0 0 16px; color: var(--text-muted); flex: 1; }
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.tags li {
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--surface-2);
  font-size: 0.78rem;
  font-weight: 500;
}
</style>
