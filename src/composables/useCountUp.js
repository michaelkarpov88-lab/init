import { ref, watch } from 'vue'

/** Плавно анимирует число от 0 до target, когда active становится true. */
export function useCountUp(target, active, duration = 1500) {
  const value = ref(0)

  watch(active, (isActive) => {
    if (!isActive) return
    const start = performance.now()
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      value.value = Math.round(target * eased)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, { once: true })

  return value
}
