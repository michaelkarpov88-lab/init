<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const progress = ref(0)

function update() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? (window.scrollY / max) * 100 : 0
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>

<template>
  <div class="scroll-progress" :style="{ width: `${progress}%` }" />
</template>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  z-index: 100;
  background: var(--gradient);
  transition: width 0.1s linear;
}
</style>
