<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
	getSliceComponentProps<Content.HeroSlice>([
		"slice",
		"index",
		"slices",
		"context",
	]),
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="w-full"
  >
    <PrismicImage
      :field="slice.primary.image"
      class="w-full h-[75vh] object-cover"
      preload="eager"
      placeholder
    />
    <div class="container text-center pt-4">
      <PrismicRichText
        :field="slice.primary.heading"
        class="text-4xl font-bold leading-none"
      />
      <PrismicRichText
        :field="slice.primary.body"
        class="text-4xl font-semibold leading-none text-pot-gray"
      />
    </div>
  </section>
</template>
