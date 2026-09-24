import { ref, watch } from 'vue'

/** Реактивное значение, которое автоматически синхронизируется с localStorage. */
export function useLocalStorage(key, initial) {
  const read = () => {
    try {
      const raw = localStorage.getItem(key)
      return raw === null ? initial : JSON.parse(raw)
    } catch {
      return initial
    }
  }

  const state = ref(read())

  watch(state, (value) => {
    try {
      if (value === null || value === undefined) localStorage.removeItem(key)
      else localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* хранилище недоступно — просто работаем в памяти */
    }
  }, { deep: true })

  return state
}
