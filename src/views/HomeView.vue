<script setup>
import { computed } from 'vue'
import { profile, stats, skills, projects } from '@/data/portfolio'
import { useTypewriter } from '@/composables/useTypewriter'
import StatCounter from '@/components/StatCounter.vue'
import SkillBar from '@/components/SkillBar.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import SocialLinks from '@/components/SocialLinks.vue'

const role = useTypewriter(profile.roles)
const featured = computed(() => projects.slice(0, 3))

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 6) return 'Доброй ночи'
  if (h < 12) return 'Доброе утро'
  if (h < 18) return 'Добрый день'
  return 'Добрый вечер'
})
</script>

<template>
  <div>
    <section class="hero container">
      <div class="hero__text">
        <p class="hero__hello">{{ greeting }} 👋 Меня зовут</p>
        <h1 class="hero__name">{{ profile.name }}</h1>
        <p class="hero__role">
          <span class="typed">{{ role }}</span><span class="cursor">|</span>
        </p>
        <p class="hero__about">{{ profile.about }}</p>
        <div class="hero__cta">
          <RouterLink to="/projects" class="btn btn--primary">Смотреть проекты</RouterLink>
          <RouterLink to="/contact" class="btn btn--ghost">Написать мне</RouterLink>
        </div>
        <SocialLinks />
      </div>
      <div class="hero__visual" aria-hidden="true">
        <div class="blob" />
        <pre class="code-card"><code><span class="k">const</span> dev = <span class="k">reactive</span>({
  name: <span class="s">'{{ profile.name.split(' ')[0] }}'</span>,
  stack: [<span class="s">'Vue'</span>, <span class="s">'Vite'</span>, <span class="s">'Pinia'</span>],
  coffee: <span class="n">Infinity</span>,
  openToWork: <span class="n">true</span>,
})</code></pre>
      </div>
    </section>

    <section class="container section">
      <div class="stats">
        <StatCounter v-for="s in stats" :key="s.label" v-bind="s" />
      </div>
    </section>

    <section class="container section">
      <h2 v-reveal class="section__title">Навыки</h2>
      <div class="skills">
        <SkillBar v-for="s in skills" :key="s.name" v-bind="s" />
      </div>
    </section>

    <section class="container section">
      <div class="section__head">
        <h2 v-reveal class="section__title">Избранные проекты</h2>
        <RouterLink to="/projects" class="link-arrow">Все проекты →</RouterLink>
      </div>
      <div class="grid">
        <ProjectCard v-for="(p, i) in featured" :key="p.id" v-reveal="i * 120" :project="p" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 48px;
  align-items: center;
  min-height: calc(100vh - 64px);
  padding-block: 48px;
}
.hero__hello {
  color: var(--accent);
  font-family: var(--font-mono);
  margin: 0;
}
.hero__name {
  font-size: clamp(2.4rem, 6vw, 4.2rem);
  line-height: 1.05;
  margin: 12px 0;
}
.hero__role {
  font-size: clamp(1.3rem, 3vw, 1.9rem);
  font-weight: 600;
  color: var(--text-muted);
  min-height: 1.5em;
  margin: 0 0 20px;
}
.typed {
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.cursor {
  color: var(--accent);
  animation: blink 1s steps(1) infinite;
}
@keyframes blink { 50% { opacity: 0; } }
.hero__about {
  max-width: 540px;
  color: var(--text-muted);
  font-size: 1.1rem;
}
.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 28px 0;
}
.hero__visual {
  position: relative;
  display: grid;
  place-items: center;
}
.blob {
  position: absolute;
  width: 340px;
  height: 340px;
  background: var(--gradient);
  filter: blur(70px);
  opacity: 0.45;
  border-radius: 40% 60% 60% 40% / 50% 40% 60% 50%;
  animation: morph 10s ease-in-out infinite;
}
@keyframes morph {
  50% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(20deg) scale(1.1); }
}
.code-card {
  position: relative;
  margin: 0;
  padding: 24px 28px;
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  font-family: var(--font-mono);
  font-size: 0.95rem;
  line-height: 1.7;
  overflow-x: auto;
  max-width: 100%;
  animation: float 6s ease-in-out infinite;
}
@keyframes float { 50% { transform: translateY(-12px); } }
.k { color: #a855f7; }
.s { color: #10b981; }
.n { color: #f59e0b; }

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}
.skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px 48px;
}
.section__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 12px;
}
.link-arrow { font-weight: 600; }

@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  .blob { width: 240px; height: 240px; }
}
@media (max-width: 400px) {
  .skills { grid-template-columns: 1fr; }
}
</style>
