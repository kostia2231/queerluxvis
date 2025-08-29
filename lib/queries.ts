export const GET_PRODUCTS = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 1) {
            edges {
              node {
                src
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const CREATE_CART = `
  mutation createCart {
    cartCreate {
      cart {
        id
        checkoutUrl
      }
    }
  }
`;

export const ADD_TO_CART = `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;


export const GET_PRODUCT_BY_HANDLE = `
  query getProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      images(first: 5) {
        edges {
          node {
            src
          }
        }
      }
      variants(first: 5) {
        edges {
          node {
            id
            price {
              amount
            }
          }
        }
      }
    }
  }
`
