import { ref, watch } from 'vue'

/** Возвращает копию source, которая обновляется не чаще, чем раз в delay мс. */
export function useDebounce(source, delay = 300) {
  const debounced = ref(source.value)
  let timer
  watch(source, (value) => {
    clearTimeout(timer)
    timer = setTimeout(() => { debounced.value = value }, delay)
  })
  return debounced
}
