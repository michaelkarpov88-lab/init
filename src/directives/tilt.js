/** v-tilt — лёгкий 3D-наклон карточки вслед за курсором. */
export const vTilt = {
  mounted(el, binding) {
    if (window.matchMedia('(hover: none)').matches) return
    const max = binding.value ?? 8

    el._onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `perspective(800px) rotateX(${-y * max}deg) rotateY(${x * max}deg) translateY(-4px)`
    }
    el._onLeave = () => { el.style.transform = '' }

    el.addEventListener('mousemove', el._onMove)
    el.addEventListener('mouseleave', el._onLeave)
  },
  unmounted(el) {
    el.removeEventListener('mousemove', el._onMove)
    el.removeEventListener('mouseleave', el._onLeave)
  },
}
