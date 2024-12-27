<script setup>
import Button from "@/components/ui/button.vue";

const route = useRoute();

const handleLogoClick = (event) => {
	if (route.path === "/") {
		event.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}
};
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-10 bg-transparent mix-blend-difference">
    <div class="h-[60px] container flex items-center justify-between px-4">
      <Button
        to="/"
        as="NuxtLink"
        variant="link"
        class="hidden md:block text-md font-bold"
        @click="handleLogoClick"
      >
        Pot Pot Pottery
      </Button>
      <Navigation />
    </div>
  </header>
</template>

