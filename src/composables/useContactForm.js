import { reactive, ref, watch } from 'vue'
import { useFormValidation, required, email, minLength, maxLength } from './useFormValidation'
import { useLocalStorage } from './useLocalStorage'

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT

export const SUBJECTS = ['Предложение о работе', 'Заказ проекта', 'Сотрудничество', 'Просто поздороваться']
export const MESSAGE_MAX = 1000

const emptyForm = () => ({ name: '', email: '', subject: SUBJECTS[0], message: '', website: '' })

/** Вся логика контактной формы: состояние, черновик, валидация, отправка. */
export function useContactForm() {
  // Черновик переживает перезагрузку страницы
  const draft = useLocalStorage('contact-draft', null)
  const form = reactive({ ...emptyForm(), ...draft.value })
  watch(form, (value) => { draft.value = { ...value } }, { deep: true })

  const validation = useFormValidation(form, {
    name: [required('Как к вам обращаться?'), minLength(2)],
    email: [required('Укажите email для ответа'), email()],
    message: [required('Напишите пару слов'), minLength(10), maxLength(MESSAGE_MAX)],
  })

  const status = ref('idle') // idle | sending | sent | error

  async function submit() {
    validation.touchAll()
    if (!validation.isValid.value) return false

    // honeypot: скрытое поле заполняют только боты
    if (form.website) {
      status.value = 'sent'
      return true
    }

    status.value = 'sending'
    try {
      const payload = { name: form.name, email: form.email, subject: form.subject, message: form.message }
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
      } else {
        // Бэкенд не настроен — имитируем отправку (см. .env.example)
        await new Promise((r) => setTimeout(r, 1200))
        console.info('[contact form] VITE_CONTACT_ENDPOINT не задан, сообщение:', payload)
      }
      status.value = 'sent'
      Object.assign(form, emptyForm())
      draft.value = null
      validation.reset()
      return true
    } catch (err) {
      console.error(err)
      status.value = 'error'
      return false
    }
  }

  return { form, status, submit, ...validation }
}
