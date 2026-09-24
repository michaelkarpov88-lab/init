<script setup>
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
</script>

<template>
  <button
    class="theme-toggle"
    :aria-label="ui.theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'"
    @click="ui.toggleTheme"
  >
    <Transition name="spin" mode="out-in">
      <span :key="ui.theme">{{ ui.theme === 'dark' ? '🌙' : '☀️' }}</span>
    </Transition>
  </button>
</template>

<style scoped>
.theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  font-size: 1.2rem;
  background: var(--surface-2);
}
.spin-enter-active,
.spin-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}
.spin-enter-from { transform: rotate(-90deg) scale(0.5); opacity: 0; }
.spin-leave-to { transform: rotate(90deg) scale(0.5); opacity: 0; }
span { display: inline-block; }
</style>
