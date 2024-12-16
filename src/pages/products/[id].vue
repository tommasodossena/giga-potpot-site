<script setup lang="ts">
const route = useRoute();
const contentStore = useContentStore();
const navigationStore = useNavigationStore();
const modalRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const productNavigation = useProductNavigation();

definePageMeta({
	layout: "blank",
});

const product = computed(() =>
	contentStore.transformedProducts.find((p) => p.id === route.params.id),
);

useSeoMeta({
	title: () => `Pot Pot Pottery | ${product.value?.title}`,
	description: () => `Discover our ${product.value?.title}`,
	ogImage: () => product.value?.image ?? "",
});

const handleClose = async () => {
	isOpen.value = false;
	if (modalRef.value) {
		await productNavigation.handleReturn(modalRef.value);
	}
};

onMounted(() => {
	if (modalRef.value) {
		productNavigation.animateIn(modalRef.value).then(() => {
			isOpen.value = true;
		});
	}

	if (!navigationStore.productNavigation) {
		navigationStore.clearAfterTransition();
	}
});
</script>

<template>
  <div class="fixed inset-0">
    <div
      ref="modalRef"
      class="absolute inset-x-0 bottom-0 w-full h-full bg-background overflow-hidden"
    >
      <div class="container h-full py-4">
        <div v-if="product" class="h-full flex justify-center relative">
            <div class="w-full md:w-2/3 lg:w-1/2 relative">
              <NuxtImg
                :src="product.image"
                :alt="product.title"
                :placeholder="[50]"
                width="400"
                height="400"
                loading="eager"
                class="w-full h-full object-cover rounded"
              />
            </div>

            <div class="absolute bottom-0 left-0 w-full md:flex p-2 md:p-0 justify-between items-end">
              <h1 class="text-4xl font-bold text-pretty w-auto md:w-[20%]">{{ product.title }}</h1>
              <p class="text-4xl font-bold">€{{ product.price.toFixed(2) }}</p>
            </div>

            <button
              class="absolute right-0 top-0 text-4xl font-bold p-2 md:p-0"
              @click="handleClose"
            >
              Close
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

