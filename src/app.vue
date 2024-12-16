<script setup lang="ts">
import { useContentStore } from "@/stores/content";

const contentStore = useContentStore();
const isLoading = ref(true);

watchEffect(() => {
	if (typeof window !== "undefined") {
		if (isLoading.value) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}
});

const handleLoadingComplete = () => {
	isLoading.value = false;
};

onMounted(async () => {
	if (!contentStore.initialized) {
		await contentStore.initializeContent();
	}
});

onUnmounted(() => {
	if (typeof window !== "undefined") {
		document.body.style.overflow = "";
	}
});
</script>

<template>
  <div>
    <AppLoader :is-visible="isLoading" @loading-complete="handleLoadingComplete" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>