import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'

export const useFavoritesStore = defineStore('favorites', () => {
  const ids = useLocalStorage('favorites', [])

  const count = computed(() => ids.value.length)
  const has = (id) => ids.value.includes(id)

  function toggle(id) {
    ids.value = has(id) ? ids.value.filter((x) => x !== id) : [...ids.value, id]
  }

  return { ids, count, has, toggle }
})
