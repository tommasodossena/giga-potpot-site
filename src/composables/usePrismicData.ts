export const usePrismicData = () => {
  const prismic = usePrismic()

  return {
    settings: () => prismic.client.getSingle('settings'),
    homepage: () => prismic.client.getSingle('homepage'),
    products: () => prismic.client.getAllByType('product', {
      orderings: {
        field: 'document.last_publication_date',
        direction: 'desc'
      }
    }),
    product: (uid: string) => prismic.client.getByUID('product', uid)
  }
}