import { reactive, computed } from 'vue'

/**
 * Минимальная валидация форм: правила — функции, возвращающие текст ошибки или true.
 * Ошибка показывается только после того, как поле «тронули» (blur) или нажали submit.
 */
export function useFormValidation(form, rules) {
  const touched = reactive({})

  const errors = computed(() => {
    const result = {}
    for (const [field, fieldRules] of Object.entries(rules)) {
      for (const rule of fieldRules) {
        const outcome = rule(form[field], form)
        if (outcome !== true) {
          result[field] = outcome
          break
        }
      }
    }
    return result
  })

  const isValid = computed(() => Object.keys(errors.value).length === 0)

  const visibleError = (field) => (touched[field] ? errors.value[field] : '')
  const touch = (field) => { touched[field] = true }
  const touchAll = () => Object.keys(rules).forEach(touch)
  const reset = () => Object.keys(touched).forEach((k) => delete touched[k])

  return { errors, isValid, visibleError, touch, touchAll, reset }
}

export const required = (msg = 'Обязательное поле') => (v) => (String(v ?? '').trim() ? true : msg)
export const minLength = (n) => (v) => (String(v ?? '').trim().length >= n ? true : `Минимум ${n} символов`)
export const maxLength = (n) => (v) => (String(v ?? '').length <= n ? true : `Максимум ${n} символов`)
export const email = (msg = 'Некорректный email') => (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? true : msg)
