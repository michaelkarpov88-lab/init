<script setup>
import { ref, computed } from 'vue'
import { projects, categories } from '@/data/portfolio'
import { useDebounce } from '@/composables/useDebounce'
import { useFavoritesStore } from '@/stores/favorites'
import ProjectCard from '@/components/ProjectCard.vue'
import ProjectModal from '@/components/ProjectModal.vue'

const activeCategory = ref('Все')
const search = ref('')
const debouncedSearch = useDebounce(search, 250)
const onlyFavorites = ref(false)
const sortBy = ref('new')
const selected = ref(null)

const favorites = useFavoritesStore()

const filtered = computed(() => {
  const q = debouncedSearch.value.trim().toLowerCase()
  return projects
    .filter((p) => activeCategory.value === 'Все' || p.category === activeCategory.value)
    .filter((p) => !onlyFavorites.value || favorites.has(p.id))
    .filter((p) => !q || [p.title, p.short, ...p.tags].some((s) => s.toLowerCase().includes(q)))
    .toSorted((a, b) => (sortBy.value === 'new' ? b.year - a.year : a.title.localeCompare(b.title, 'ru')))
})

const countFor = (cat) => (cat === 'Все' ? projects.length : projects.filter((p) => p.category === cat).length)

// Уходящая карточка становится position: absolute — фиксируем её размеры и место,
// чтобы остальные плавно «съехались» на освободившееся место.
function freezeLeaving(el) {
  const { offsetWidth: width, offsetHeight: height, offsetLeft: left, offsetTop: top } = el
  Object.assign(el.style, { width: `${width}px`, height: `${height}px`, left: `${left}px`, top: `${top}px` })
}

function resetFilters() {
  activeCategory.value = 'Все'
  search.value = ''
  onlyFavorites.value = false
}
</script>

<template>
  <section class="container section">
    <h1 class="page-title">Проекты</h1>
    <p class="page-lead">
      Фильтруйте, ищите и добавляйте в избранное — состояние фильтров сохраняется благодаря
      <code>&lt;KeepAlive&gt;</code>, а избранное — в Pinia + localStorage.
    </p>

    <div class="toolbar">
      <div class="chips" role="tablist">
        <button
          v-for="cat in categories"
          :key="cat"
          role="tab"
          class="chip"
          :class="{ 'chip--active': activeCategory === cat }"
          :aria-selected="activeCategory === cat"
          @click="activeCategory = cat"
        >
          {{ cat }} <small>{{ countFor(cat) }}</small>
        </button>
      </div>

      <div class="controls">
        <input v-model="search" type="search" class="input" placeholder="🔍 Поиск по названию или технологии" />
        <select v-model="sortBy" class="input select" aria-label="Сортировка">
          <option value="new">Сначала новые</option>
          <option value="abc">По алфавиту</option>
        </select>
        <label class="switch">
          <input v-model="onlyFavorites" type="checkbox" />
          <span>Только избранное ({{ favorites.count }})</span>
        </label>
      </div>
    </div>

    <!-- TransitionGroup анимирует добавление, удаление и перестановку карточек -->
    <TransitionGroup tag="div" name="list" class="grid" @before-leave="freezeLeaving">
      <ProjectCard v-for="p in filtered" :key="p.id" :project="p" @open="selected = $event" />
    </TransitionGroup>

    <Transition name="fade">
      <div v-if="!filtered.length" class="empty">
        <p>😶 Ничего не найдено</p>
        <button class="btn btn--ghost" @click="resetFilters">Сбросить фильтры</button>
      </div>
    </Transition>

    <ProjectModal v-model="selected" />
  </section>
</template>

<style scoped>
.toolbar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip {
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-muted);
  font-weight: 500;
  transition: all 0.2s;
}
.chip small { opacity: 0.6; margin-left: 4px; }
.chip:hover { color: var(--text); border-color: var(--accent); }
.chip--active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
.chip--active:hover { color: #fff; }
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
.controls .input { flex: 1 1 260px; }
.controls .select { flex: 0 1 180px; }
.switch {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}
.switch input { width: 18px; height: 18px; accent-color: var(--accent); }
.grid { position: relative; }
.empty {
  text-align: center;
  padding: 48px 0;
  color: var(--text-muted);
  font-size: 1.2rem;
}

.list-move,
.list-enter-active,
.list-leave-active { transition: all 0.45s cubic-bezier(0.55, 0, 0.1, 1); }
.list-enter-from,
.list-leave-to { opacity: 0; transform: scale(0.85) translateY(20px); }
.list-leave-active { position: absolute; }
</style>
