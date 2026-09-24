<script setup>
import { computed, useId } from 'vue'

// defineModel — двусторонняя привязка v-model без лишнего кода
const model = defineModel({ type: String, default: '' })

const props = defineProps({
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  as: { type: String, default: 'input' }, // input | textarea | select
  error: { type: String, default: '' },
  maxlength: { type: Number, default: undefined },
  options: { type: Array, default: () => [] },
})
defineEmits(['blur'])
// атрибуты (placeholder, autocomplete…) пробрасываем на само поле, а не на обёртку
defineOptions({ inheritAttrs: false })

const id = useId()
const counter = computed(() => (props.maxlength ? `${model.value.length} / ${props.maxlength}` : ''))
</script>

<template>
  <div class="field" :class="{ 'field--error': error, 'field--filled': model }">
    <label :for="id">{{ label }}</label>

    <textarea
      v-if="as === 'textarea'"
      :id="id"
      v-model="model"
      class="input"
      rows="6"
      :maxlength="maxlength"
      :aria-invalid="!!error"
      v-bind="$attrs"
      @blur="$emit('blur')"
    />
    <select v-else-if="as === 'select'" :id="id" v-model="model" class="input" v-bind="$attrs" @blur="$emit('blur')">
      <option v-for="o in options" :key="o" :value="o">{{ o }}</option>
    </select>
    <input
      v-else
      :id="id"
      v-model.trim="model"
      class="input"
      :type="type"
      :maxlength="maxlength"
      :aria-invalid="!!error"
      v-bind="$attrs"
      @blur="$emit('blur')"
    />

    <div class="field__footer">
      <Transition name="slide">
        <span v-if="error" class="field__error" role="alert">{{ error }}</span>
      </Transition>
      <span v-if="counter" class="field__counter">{{ counter }}</span>
    </div>
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
label { font-weight: 500; font-size: 0.92rem; }
textarea { resize: vertical; min-height: 140px; }
.field--error .input { border-color: #ef4444; }
.field--error .input:focus { box-shadow: 0 0 0 3px rgb(239 68 68 / 0.2); }
.field__footer {
  display: flex;
  justify-content: space-between;
  min-height: 1.2em;
  font-size: 0.82rem;
}
.field__error { color: #ef4444; }
.field__counter {
  margin-left: auto;
  color: var(--text-muted);
  font-family: var(--font-mono);
}
.slide-enter-active,
.slide-leave-active { transition: all 0.2s; }
.slide-enter-from,
.slide-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
