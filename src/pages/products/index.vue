<script setup lang="ts">
import { useContentStore } from "@/stores/content";

const contentStore = useContentStore();

useSeoMeta({
	title: () => "Pot Pot Pottery | Products",
	description: () => "Browse our collection of pottery products",
	ogImage: () => contentStore.homepage?.data.meta_image?.url ?? "",
});
</script>

<template>
  <div class="min-h-screen">
    <div class="container pt-24">
      <h1 class="text-4xl font-bold leading-none text-center">Pot Pot Pottery</h1>
      <h2 class="text-4xl font-semibold leading-none text-pot-gray text-center mb-8">
        Potteries by Leonardo Romano
      </h2>
      <ProductGrid :products="contentStore.transformedProducts" />
    </div>
  </div>
</template>