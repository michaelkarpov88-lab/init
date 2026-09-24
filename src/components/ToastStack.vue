<script setup>
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
</script>

<template>
  <Teleport to="body">
    <TransitionGroup tag="div" name="toast" class="toasts" aria-live="polite">
      <div v-for="t in ui.toasts" :key="t.id" class="toast" :class="`toast--${t.type}`" @click="ui.dismiss(t.id)">
        <span>{{ t.type === 'success' ? '✅' : '⚠️' }}</span>
        {{ t.text }}
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped>
.toasts {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: calc(100vw - 32px);
}
.toast {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 14px 18px;
  border-radius: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  cursor: pointer;
}
.toast--success { border-left: 4px solid #10b981; }
.toast--error { border-left: 4px solid #ef4444; }

.toast-enter-active,
.toast-leave-active { transition: all 0.35s ease; }
.toast-enter-from { opacity: 0; transform: translateX(60px); }
.toast-leave-to { opacity: 0; transform: scale(0.8); }
.toast-leave-active { position: absolute; right: 0; }
.toast-move { transition: transform 0.35s ease; }
</style>
