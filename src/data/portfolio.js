// Все тексты портфолио собраны здесь — отредактируйте под себя.

export const profile = {
  name: 'Михаил Карпов',
  roles: ['Frontend-разработчик', 'Vue.js энтузиаст', 'Любитель чистого кода', 'UI/UX-перфекционист'],
  about:
    'Создаю быстрые, доступные и приятные в использовании веб-интерфейсы. ' +
    'Люблю Vue за его простоту и реактивность, а TypeScript — за спокойный сон.',
  location: 'Москва, Россия',
  email: 'hello@example.com',
  socials: [
    { name: 'GitHub', url: 'https://github.com/', icon: 'github' },
    { name: 'Telegram', url: 'https://t.me/', icon: 'telegram' },
    { name: 'LinkedIn', url: 'https://linkedin.com/', icon: 'linkedin' },
  ],
}

export const stats = [
  { label: 'лет опыта', value: 4, suffix: '+' },
  { label: 'проектов', value: 32, suffix: '' },
  { label: 'довольных клиентов', value: 18, suffix: '' },
  { label: 'чашек кофе', value: 1500, suffix: '+' },
]

export const skills = [
  { name: 'Vue 3 / Nuxt', level: 92 },
  { name: 'JavaScript / TypeScript', level: 88 },
  { name: 'HTML / CSS / SCSS', level: 95 },
  { name: 'Pinia / Vue Router', level: 85 },
  { name: 'Node.js / REST API', level: 70 },
  { name: 'Тестирование (Vitest)', level: 65 },
]

export const categories = ['Все', 'Веб-приложения', 'Лендинги', 'Open Source']

export const projects = [
  {
    id: 1,
    title: 'TaskFlow',
    category: 'Веб-приложения',
    year: 2026,
    emoji: '📋',
    gradient: 'linear-gradient(135deg, #6366f1, #a855f7)',
    short: 'Канбан-доска с drag & drop и совместной работой в реальном времени.',
    description:
      'SPA для управления задачами: перетаскивание карточек, фильтры, метки, ' +
      'синхронизация через WebSocket и офлайн-режим с последующей синхронизацией.',
    tags: ['Vue 3', 'Pinia', 'WebSocket', 'IndexedDB'],
    link: '#',
  },
  {
    id: 2,
    title: 'Кофейня «Зерно»',
    category: 'Лендинги',
    year: 2025,
    emoji: '☕',
    gradient: 'linear-gradient(135deg, #f59e0b, #b45309)',
    short: 'Промо-сайт кофейни с онлайн-меню и бронированием столиков.',
    description:
      'Адаптивный лендинг с параллакс-анимациями, интерактивным меню и формой ' +
      'бронирования. Lighthouse 100/100 по производительности.',
    tags: ['Nuxt', 'SCSS', 'GSAP'],
    link: '#',
  },
  {
    id: 3,
    title: 'vue-tiny-toast',
    category: 'Open Source',
    year: 2025,
    emoji: '🍞',
    gradient: 'linear-gradient(135deg, #10b981, #0ea5e9)',
    short: 'Лёгкая библиотека уведомлений для Vue весом 2 КБ.',
    description:
      'Плагин уведомлений с Teleport, TransitionGroup и полной типизацией. ' +
      'Поддерживает очередь, промисы и кастомные компоненты.',
    tags: ['Vue 3', 'TypeScript', 'Vite', 'npm'],
    link: '#',
  },
  {
    id: 4,
    title: 'FinDash',
    category: 'Веб-приложения',
    year: 2024,
    emoji: '📈',
    gradient: 'linear-gradient(135deg, #0ea5e9, #2563eb)',
    short: 'Дашборд личных финансов с графиками и бюджетированием.',
    description:
      'Импорт выписок, автоматическая категоризация трат, интерактивные графики ' +
      'и цели накоплений. PWA с установкой на телефон.',
    tags: ['Vue 3', 'Chart.js', 'PWA'],
    link: '#',
  },
  {
    id: 5,
    title: 'Студия йоги «Прана»',
    category: 'Лендинги',
    year: 2024,
    emoji: '🧘',
    gradient: 'linear-gradient(135deg, #ec4899, #f97316)',
    short: 'Сайт студии с расписанием занятий и онлайн-записью.',
    description:
      'Расписание с фильтрами по тренерам и направлениям, запись на занятие ' +
      'и интеграция с CRM студии.',
    tags: ['Vue 3', 'Vue Router', 'REST API'],
    link: '#',
  },
  {
    id: 6,
    title: 'use-magic-hooks',
    category: 'Open Source',
    year: 2023,
    emoji: '🪄',
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    short: 'Набор composables для типичных задач фронтенда.',
    description:
      'Коллекция из 20+ composable-функций: useDebounce, useInfiniteScroll, ' +
      'useClipboard и другие. Tree-shakable, покрытие тестами 95%.',
    tags: ['Composition API', 'Vitest', 'TypeScript'],
    link: '#',
  },
]
