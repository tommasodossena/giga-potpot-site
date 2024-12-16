import { gsap } from "gsap";

export const useProductNavigation = () => {
  const navigationStore = useNavigationStore();
  const router = useRouter();

  const animateIn = async (element: HTMLElement) => {
    gsap.set(element, { yPercent: 100 });
    await gsap.to(element, {
      yPercent: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const animateOut = async (element: HTMLElement) => {
    await gsap.to(element, {
      yPercent: -100,
      duration: 0.3,
      ease: "power2.in"
    });
  };

  const saveEntry = () => {
    navigationStore.saveProductEntry();
  };

  const handleReturn = async (element: HTMLElement) => {
    const navigation = await navigationStore.handleProductReturn();

    await animateOut(element);
    await new Promise(resolve => requestAnimationFrame(resolve));

    if (typeof navigation !== 'string') {
      router.back();
      window.scrollTo({
        top: navigation.scroll,
        behavior: "instant",
      });
      navigationStore.clearAfterTransition();
      return true;
    }

    navigateTo("/");
    return false;
  };

  return {
    saveEntry,
    handleReturn,
    animateIn
  };
};