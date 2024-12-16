<script setup lang="ts">
const navigationStore = useNavigationStore();
</script>

<style scoped>
.fixed {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>

<template>
  <div class="layout relative min-h-screen">
    <!-- This will show the previous page -->
    <div class="fixed inset-0" ref="previousPageRef">
      <NuxtLayout name="default">
        <div
          v-if="navigationStore.productNavigation?.pageContent"
          v-html="navigationStore.productNavigation.pageContent"
          :style="{ marginTop: `-${navigationStore.productNavigation.scrollPosition}px` }"
        />
      </NuxtLayout>
    </div>

    <!-- This will contain our modal/overlay content -->
    <main class="relative z-20">
      <slot />
    </main>
  </div>
</template>
