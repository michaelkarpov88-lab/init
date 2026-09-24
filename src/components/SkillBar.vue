<script setup>
defineProps({
  name: { type: String, required: true },
  level: { type: Number, required: true },
})
</script>

<template>
  <div v-reveal class="skill">
    <div class="skill__head">
      <span>{{ name }}</span>
      <span class="skill__level">{{ level }}%</span>
    </div>
    <div class="skill__track">
      <div class="skill__fill" :style="{ '--level': `${level}%` }" />
    </div>
  </div>
</template>

<style scoped>
.skill__head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: 500;
}
.skill__level {
  color: var(--text-muted);
  font-family: var(--font-mono);
}
.skill__track {
  height: 8px;
  border-radius: 999px;
  background: var(--surface-2);
  overflow: hidden;
}
.skill__fill {
  height: 100%;
  width: 0;
  border-radius: inherit;
  background: var(--gradient);
  transition: width 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s;
}
/* Полоса «заполняется», когда директива v-reveal добавляет класс */
.skill.is-revealed .skill__fill { width: var(--level); }
</style>
