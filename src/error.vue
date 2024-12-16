<script setup lang="ts">
const error = useError();

const handleError = () => {
	clearError({
		redirect: "/",
	});
};
</script>

<template>
  <div class="min-h-screen grid place-content-center text-center">
    <h1 class="text-4xl font-bold">Error {{ error?.statusCode }}</h1>
    <p class="text-lg">{{ error?.message }}</p>
  </div>
</template>
