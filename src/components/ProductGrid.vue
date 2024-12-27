<script setup lang="ts">
import Button from "@/components/ui/button.vue";

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

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <ProductCard
      v-for="product in displayedProducts"
      :key="product.id"
      :product="product"
    />
  </div>
  <div v-if="limit && products.length > limit" class="pt-4 text-center">
    <Button
      to="/products"
      variant="link"
      class="text-primary text-2xl font-bold"
    >
      Discover All
    </Button>
  </div>
</template>