import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'

let toastId = 0

export const useUiStore = defineStore('ui', () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme = useLocalStorage('theme', prefersDark ? 'dark' : 'light')

  watch(theme, (value) => {
    document.documentElement.dataset.theme = value
  }, { immediate: true })

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  const toasts = ref([])

  function notify(text, type = 'success', timeout = 4000) {
    const id = ++toastId
    toasts.value.push({ id, text, type })
    setTimeout(() => dismiss(id), timeout)
  }

  function dismiss(id) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  return { theme, toggleTheme, toasts, notify, dismiss }
})
