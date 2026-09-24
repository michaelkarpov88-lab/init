<script setup>
import { profile } from '@/data/portfolio'
import { useContactForm, SUBJECTS, MESSAGE_MAX } from '@/composables/useContactForm'
import { useUiStore } from '@/stores/ui'
import BaseField from '@/components/BaseField.vue'
import SocialLinks from '@/components/SocialLinks.vue'

const { form, status, submit, visibleError, touch, isValid } = useContactForm()
const ui = useUiStore()

async function onSubmit() {
  const ok = await submit()
  if (ok) ui.notify('Спасибо! Сообщение отправлено, скоро отвечу 🙌')
  else if (status.value === 'error') ui.notify('Не удалось отправить. Попробуйте ещё раз.', 'error')
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    ui.notify('Email скопирован в буфер обмена')
  } catch {
    ui.notify('Не удалось скопировать email', 'error')
  }
}
</script>

<template>
  <section class="container section contact">
    <div class="contact__info">
      <h1 class="page-title">Давайте поговорим</h1>
      <p class="page-lead">
        Есть идея проекта, вакансия или просто вопрос? Заполните форму — отвечу в течение дня.
        Черновик сообщения сохраняется автоматически, так что можно не торопиться.
      </p>
      <ul class="contact__list">
        <li>
          <span>📧</span>
          <button class="copy" title="Скопировать" @click="copyEmail">{{ profile.email }}</button>
        </li>
        <li><span>📍</span> {{ profile.location }}</li>
      </ul>
      <SocialLinks />
    </div>

    <Transition name="fade" mode="out-in">
      <div v-if="status === 'sent'" key="done" class="card-box success">
        <div class="success__icon">🎉</div>
        <h2>Сообщение отправлено!</h2>
        <p>Спасибо, что написали. Я свяжусь с вами в ближайшее время.</p>
        <button class="btn btn--primary" @click="status = 'idle'">Написать ещё</button>
      </div>

      <form v-else key="form" class="card-box form" novalidate @submit.prevent="onSubmit">
        <div class="form__row">
          <BaseField v-model="form.name" label="Имя" autocomplete="name" :error="visibleError('name')" @blur="touch('name')" />
          <BaseField
            v-model="form.email"
            label="Email"
            type="email"
            autocomplete="email"
            :error="visibleError('email')"
            @blur="touch('email')"
          />
        </div>
        <BaseField v-model="form.subject" as="select" label="Тема" :options="SUBJECTS" />
        <BaseField
          v-model="form.message"
          as="textarea"
          label="Сообщение"
          :maxlength="MESSAGE_MAX"
          placeholder="Расскажите о задаче..."
          :error="visibleError('message')"
          @blur="touch('message')"
        />

        <!-- honeypot против спам-ботов -->
        <input v-model="form.website" class="hp" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" />

        <button type="submit" class="btn btn--primary btn--block" :disabled="status === 'sending'">
          <span v-if="status === 'sending'" class="spinner" />
          {{ status === 'sending' ? 'Отправляю...' : 'Отправить сообщение' }}
        </button>
        <p class="form__hint" :class="{ 'form__hint--ok': isValid }">
          {{ isValid ? '✓ Всё заполнено верно' : 'Поля проверяются при вводе' }}
        </p>
      </form>
    </Transition>
  </section>
</template>

<style scoped>
.contact {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 48px;
  align-items: start;
}
.contact__list {
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.contact__list li { display: flex; gap: 10px; align-items: center; }
.copy {
  padding: 0;
  color: var(--accent);
  font-weight: 600;
  text-decoration: underline dotted;
  text-underline-offset: 4px;
}
.card-box {
  padding: 32px;
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.form__hint {
  margin: 8px 0 0;
  text-align: center;
  font-size: 0.85rem;
  color: var(--text-muted);
  transition: color 0.3s;
}
.form__hint--ok { color: #10b981; }
.hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgb(255 255 255 / 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.success { text-align: center; }
.success__icon {
  font-size: 4rem;
  animation: pop 0.6s cubic-bezier(0.3, 1.6, 0.5, 1);
}
@keyframes pop { from { transform: scale(0); } }

@media (max-width: 860px) {
  .contact { grid-template-columns: 1fr; }
}
@media (max-width: 520px) {
  .form__row { grid-template-columns: 1fr; gap: 8px; }
  .card-box { padding: 20px; }
}
</style>
