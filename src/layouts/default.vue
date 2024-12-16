<template>
  <div class="flex flex-col min-h-screen">
    <PageHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <PageFooter />
  </div>
</template>