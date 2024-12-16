<script setup lang="ts">
import { components } from "~/slices";
import { useContentStore } from "@/stores/content";

const contentStore = useContentStore();

useSeoMeta({
	title: () => contentStore.homepage?.data.meta_title ?? "",
	description: () => contentStore.homepage?.data.meta_description ?? "",
	ogImage: () => contentStore.homepage?.data.meta_image?.url ?? "",
});
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <SliceZone
      :slices="contentStore.homepage?.data?.slices ?? []"
      :components="components"
    />
    <div class="container pb-8 pt-16 lg:pt-24">
      <ProductGrid :products="contentStore.transformedProducts" :limit="3" />
    </div>
  </div>
</template>
