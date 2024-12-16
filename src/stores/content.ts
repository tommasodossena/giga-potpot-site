import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type * as prismic from "@prismicio/client"

// Convert Prismic ProductDocument to a more usable format
interface TransformedProduct {
  id: string
  title: string
  price: number
  image: string
}

export const useContentStore = defineStore('content', () => {
  const homepage = ref<prismic.Content.HomepageDocument | null>(null)
  const products = ref<prismic.Content.ProductDocument[] | null>(null)
  const settings = ref<prismic.Content.SettingsDocument | null>(null)
  const error = ref<Error | null>(null)
  const initialized = ref(false)

  const transformedProducts = computed<TransformedProduct[]>(() => {
    if (!products.value) return []

    return products.value.map((product) => ({
      id: product.uid,
      title: product.data.name ?? '',
      price: product.data.price ?? 0,
      image: product.data.image.url ?? '',
    }))
  })

  const initializeContent = async () => {
    const prismicData = usePrismicData()
    error.value = null

    try {
      const [homepageData, productsData, settingsData] = await Promise.all([
        prismicData.homepage(),
        prismicData.products(),
        prismicData.settings()
      ])

      homepage.value = homepageData
      products.value = productsData
      settings.value = settingsData
      initialized.value = true
    } catch (e) {
      error.value = e as Error
      console.error('Failed to initialize content:', e)
    }
  }

  // Add refresh method for ISR
  const refreshContent = async () => {
    await initializeContent()
  }

  return {
    homepage,
    products,
    settings,
    error,
    initialized,
    initializeContent,
    refreshContent,
    transformedProducts,
  }
})
