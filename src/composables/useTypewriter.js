import { ref, onMounted, onBeforeUnmount } from 'vue'

/** Печатает и стирает фразы по очереди — эффект «пишущей машинки». */
export function useTypewriter(words, { typeSpeed = 80, deleteSpeed = 40, pause = 1600 } = {}) {
  const text = ref('')
  let wordIndex = 0
  let deleting = false
  let timer

  function tick() {
    const word = words[wordIndex]
    text.value = deleting ? word.slice(0, text.value.length - 1) : word.slice(0, text.value.length + 1)

    let delay = deleting ? deleteSpeed : typeSpeed
    if (!deleting && text.value === word) {
      deleting = true
      delay = pause
    } else if (deleting && text.value === '') {
      deleting = false
      wordIndex = (wordIndex + 1) % words.length
      delay = 300
    }
    timer = setTimeout(tick, delay)
  }

  onMounted(tick)
  onBeforeUnmount(() => clearTimeout(timer))

  return text
}
