<script setup lang="ts">
import Button from "@/components/ui/button.vue";

const navLinks = ref([
	{ text: "Home", path: "/" },
	{ text: "Products", path: "/products" },
]);
</script>

<template>
  <nav class="w-full md:w-auto flex justify-center md:justify-end space-x-8">
    <Button
      v-for="link in navLinks"
      :key="link.path"
      :to="link.path"
      as="NuxtLink"
      variant="link"
      class="text-md font-bold"
    >
      {{ link.text }}
    </Button>
  </nav>
</template>