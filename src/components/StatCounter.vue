<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCountUp } from '@/composables/useCountUp'

const props = defineProps({
  value: { type: Number, required: true },
  label: { type: String, required: true },
  suffix: { type: String, default: '' },
})

const el = ref(null)
const visible = ref(false)
const current = useCountUp(props.value, visible)

let observer
onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      visible.value = true
      observer.disconnect()
    }
  })
  observer.observe(el.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="el" class="stat">
    <strong>{{ current.toLocaleString('ru-RU') }}{{ suffix }}</strong>
    <span>{{ label }}</span>
  </div>
</template>

<style scoped>
.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 24px;
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--border);
  text-align: center;
}
strong {
  font-size: 2.2rem;
  font-variant-numeric: tabular-nums;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
span { color: var(--text-muted); }
</style>
