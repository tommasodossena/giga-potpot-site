<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <ProductCard
      v-for="product in displayedProducts"
      :key="product.id"
      :product="product"
    />
  </div>
  <div v-if="limit && products.length > limit" class="pt-4 text-center">
    <NuxtLink to="/products" class="text-2xl font-bold">Discover All</NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface Product {
	id: string;
	title: string;
	price: number;
	image: string;
}

const props = defineProps<{
	products: Product[];
	limit?: number;
}>();

const displayedProducts = computed(() =>
	props.limit ? props.products.slice(0, props.limit) : props.products,
);
</script>