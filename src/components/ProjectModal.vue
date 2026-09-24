<script setup>
import { watch, onBeforeUnmount } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'

const project = defineModel({ type: Object, default: null })
const favorites = useFavoritesStore()

const close = () => { project.value = null }
const onKey = (e) => { if (e.key === 'Escape') close() }

watch(project, (value) => {
  document.body.style.overflow = value ? 'hidden' : ''
  if (value) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <!-- Teleport выносит модалку в <body>, чтобы её не обрезали родительские стили -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="project" class="overlay" @click.self="close">
        <div class="modal" role="dialog" aria-modal="true" :aria-label="project.title">
          <div class="modal__cover" :style="{ background: project.gradient }">
            <span>{{ project.emoji }}</span>
            <button class="modal__close" aria-label="Закрыть" @click="close">✕</button>
          </div>
          <div class="modal__body">
            <p class="modal__meta">{{ project.category }} · {{ project.year }}</p>
            <h2>{{ project.title }}</h2>
            <p>{{ project.description }}</p>
            <ul class="tags">
              <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
            </ul>
            <div class="modal__actions">
              <a :href="project.link" class="btn btn--primary" target="_blank" rel="noopener">Открыть проект ↗</a>
              <button class="btn btn--ghost" @click="favorites.toggle(project.id)">
                {{ favorites.has(project.id) ? '♥ В избранном' : '♡ В избранное' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 150;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgb(0 0 0 / 0.55);
  backdrop-filter: blur(4px);
}
.modal {
  width: min(560px, 100%);
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow);
}
.modal__cover {
  position: relative;
  display: grid;
  place-items: center;
  height: 180px;
  font-size: 5rem;
}
.modal__close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgb(0 0 0 / 0.35);
  color: #fff;
  font-size: 1rem;
  line-height: 1;
}
.modal__body { padding: 24px; }
.modal__meta {
  margin: 0;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.85rem;
}
h2 { margin: 6px 0 12px; }
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  padding: 0;
}
.tags li {
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--surface-2);
  font-size: 0.8rem;
}
.modal__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
}

.modal-enter-active,
.modal-leave-active { transition: opacity 0.3s; }
.modal-enter-active .modal,
.modal-leave-active .modal { transition: transform 0.3s cubic-bezier(0.3, 1.4, 0.6, 1); }
.modal-enter-from,
.modal-leave-to { opacity: 0; }
.modal-enter-from .modal,
.modal-leave-to .modal { transform: scale(0.9) translateY(20px); }
</style>
