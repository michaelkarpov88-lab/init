/**
 * v-reveal — плавное появление элемента при прокрутке (IntersectionObserver).
 * Необязательный аргумент — задержка в мс: v-reveal="200"
 */
const observer = typeof IntersectionObserver !== 'undefined'
  ? new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      }
    }, { threshold: 0.15 })
  : null

export const vReveal = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`
    if (observer) observer.observe(el)
    else el.classList.add('is-revealed')
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
