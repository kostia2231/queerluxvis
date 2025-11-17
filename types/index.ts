export type CheckoutCreateResponse = {
  checkoutCreate: {
    checkout: {
      id: string
      webUrl: string
    } | null
    userErrors: { message: string }[]
  }
}

export type CartCreateResponse = {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null
    userErrors: { message: string }[]
  }
}

export type Product = {
  id: string
  title: string
  handle: string
  description: string
  images: {
    edges: {
      node: {
        src: string
        altText: string | null
      }
    }[]
  }

  metafield?: {
    value: string | null
  }

  variants: {
    edges: {
      node: {
        id: string
        title: string
        availableForSale: boolean
        quantityAvailable: number
        price: {
          amount: string
          currencyCode: string
        }
      }
    }[]
  }
}

export type ProductsResponse = {
  products: {
    edges: {
      node: Product
    }[]
  }
}

export type CartProps = {
  toggleCartAction: () => void
  isClosed: boolean
}

export type Variant = {
  id: string
  price: {
    amount: string
    currencyCode: string
  }
}

export type CartProduct = {
  id: string
  lineId: string
  title: string
  price: number
  isPreorder: number
  quantity: number
  image: string
  variants: {
    edges: {
      node: {
        id: string
        title: string
        price: {
          amount: string
          currencyCode: string
        }
      }
    }[]
  }
}

export type PropsProductParams = {
  params: Promise<{ handle: string }>
}

export type ProductByHandleResponse = {
  productByHandle: Product | null
}
