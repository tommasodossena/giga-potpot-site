interface ProductNavigationState {
  entryRoute: string;
  scrollPosition: number;
  pageContent: string | null;
}

export const useNavigationStore = defineStore('navigation', () => {
  const productNavigation = ref<ProductNavigationState | null>(null);

  const saveProductEntry = () => {
    productNavigation.value = {
      entryRoute: window.location.pathname,
      scrollPosition: window.scrollY,
      pageContent: document.querySelector('main')?.innerHTML || null
    };
  };

  const handleProductReturn = async () => {
    try {
      if (!productNavigation.value) return '/';
      const { entryRoute, scrollPosition } = productNavigation.value;
      return { route: entryRoute, scroll: scrollPosition };
    } catch (error) {
      console.error('Navigation error:', error);
      return '/';
    }
  };

  const clearAfterTransition = () => {
    setTimeout(() => {
      productNavigation.value = null;
    }, 100);
  };

  return {
    productNavigation,
    saveProductEntry,
    handleProductReturn,
    clearAfterTransition,
  };
});
