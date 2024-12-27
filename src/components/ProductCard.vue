<script setup lang="ts">
interface Product {
	id: string;
	title: string;
	price: number;
	image: string;
}

const props = defineProps<{
	product: Product;
}>();

const productNavigation = useProductNavigation();

const handleProductClick = () => {
	productNavigation.saveEntry();
	navigateTo(`/products/${props.product.id}`);
};
</script>

<template>
  <div
    class="cursor-pointer"
    @click="handleProductClick"
  >
    <div class="rounded-lg overflow-hidden relative aspect-[3/4] transition-transform will-change-transform duration-300 hover:scale-95">
      <NuxtImg
        :src="product.image"
        :alt="product.title"
        :placeholder="[50]"
        width="400"
        height="533"
        sizes="sm:100vw md:50vw lg:33vw"
        class="w-full h-full object-cover pointer-events-none select-none"
        preload
      />
      <div class="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-background/80 to-transparent">
        <h2 class="text-xl font-semibold">
          {{ product.title }}
        </h2>
        <p class="text-primary font-bold">
          €{{ product.price?.toFixed(2) ?? 'Not available' }}
        </p>
      </div>
    </div>
  </div>
</template>
