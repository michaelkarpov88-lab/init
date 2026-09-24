<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import ToastStack from './components/ToastStack.vue'
import ScrollProgress from './components/ScrollProgress.vue'
</script>

<template>
  <ScrollProgress />
  <AppHeader />
  <main>
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <KeepAlive include="ProjectsView">
          <component :is="Component" :key="route.path" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </main>
  <AppFooter />
  <ToastStack />
</template>
