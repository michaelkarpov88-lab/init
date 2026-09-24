<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import ThemeToggle from './ThemeToggle.vue'
import { useFavoritesStore } from '@/stores/favorites'

const links = [
  { to: '/', label: 'Главная' },
  { to: '/projects', label: 'Проекты' },
  { to: '/contact', label: 'Контакты' },
]

const menuOpen = ref(false)
const route = useRoute()
watch(() => route.path, () => { menuOpen.value = false })

const { count: favCount } = storeToRefs(useFavoritesStore())
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <RouterLink to="/" class="logo">&lt;<span>MK</span> /&gt;</RouterLink>

      <nav class="nav" :class="{ 'nav--open': menuOpen }">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="nav__link">
          {{ link.label }}
          <Transition name="pop">
            <span v-if="link.to === '/projects' && favCount" class="badge">{{ favCount }}</span>
          </Transition>
        </RouterLink>
      </nav>

      <div class="header__actions">
        <ThemeToggle />
        <button
          class="burger"
          :class="{ 'burger--open': menuOpen }"
          :aria-expanded="menuOpen"
          aria-label="Меню"
          @click="menuOpen = !menuOpen"
        >
          <span /><span /><span />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(12px);
  background: color-mix(in srgb, var(--bg) 75%, transparent);
  border-bottom: 1px solid var(--border);
}
.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}
.logo {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--text);
}
.logo span {
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.nav {
  display: flex;
  gap: 8px;
}
.nav__link {
  position: relative;
  padding: 8px 14px;
  border-radius: 999px;
  color: var(--text-muted);
  font-weight: 500;
  transition: color 0.2s, background 0.2s;
}
.nav__link:hover {
  color: var(--text);
}
.nav__link.router-link-exact-active {
  color: var(--text);
  background: var(--surface-2);
}
.badge {
  position: absolute;
  top: -2px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-size: 0.7rem;
  line-height: 18px;
  text-align: center;
}
.header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 0 9px;
  border-radius: 10px;
}
.burger span {
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}
.burger--open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.burger--open span:nth-child(2) { opacity: 0; }
.burger--open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 720px) {
  .burger { display: flex; }
  .nav {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    flex-direction: column;
    padding: 12px 16px 20px;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    transform: translateY(-10px);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.25s, opacity 0.25s;
  }
  .nav--open {
    transform: none;
    opacity: 1;
    pointer-events: auto;
  }
  .nav__link { align-self: flex-start; }
}
</style>
