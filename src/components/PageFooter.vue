<script setup lang="ts">
import { useContentStore } from "@/stores/content";
const contentStore = useContentStore();
</script>

<template>
  <footer class="w-full py-4">
    <div class="container flex justify-between items-center">
      <p class="text-md md:text-2xl font-bold">{{ contentStore.settings?.data.site_title }}</p>
      <nav>
        <ul class="flex items-center space-x-4">
          <li v-for="item in contentStore.settings?.data.social_navigation" :key="item.label ?? ''">
            <PrismicLink :field="item.link" class="text-md md:text-2xl font-bold text-pot-gray">
              {{ item.label }}
            </PrismicLink>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

