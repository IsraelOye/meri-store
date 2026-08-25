// Query to fetch list of products
export const PRODUCTS_QUERY = `
  query GetProducts(
  $first: Int!
  $after: String
  $query: String 
  $sortKey: ProductSortKeys 
  $reverse: Boolean
  ) {
    products(
    first: $first 
    after: $after 
    query: $query 
    sortKey: $sortKey
    reverse: $reverse
    ) {
      edges {
        node {
          id
          handle
          title
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
        pageInfo {
            hasNextPage
            endCursor
        }
    }
  }
`;

// Query to fetch one product by it's handle
export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      availableForSale
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 25) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        id
        name
        values
      }
    }
  }
`;

// Query to fetch collections
export const COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
        }
      }
    }
  }
`;

export const PRODUCT_RECOMMENDATIONS_QUERY = `
  query GetProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      id
      handle
      title
      featuredImage {
        url
        altText
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;

export const CART_CREATE_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// export const CART_LINES_ADD_MUTATION = `
//   mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
//     cartLinesAdd(cartId: $cartId, lines: $lines) {
//       cart {
//         id
//         checkoutUrl
//         totalQuantity
//       }
//       userErrors {
//         field
//         message
//       }
//     }
//   }
// `;

export const CART_QUERY = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 50) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  title
                  handle
                  featuredImage {
                    url
                    altText
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

// export const CART_LINES_UPDATE_MUTATION = `
//   mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
//     cartLinesUpdate(cartId: $cartId, lines: $lines) {
//       cart {
//         id
//         checkoutUrl
//         totalQuantity
//       }
//       userErrors {
//         field
//         message
//       }
//     }
//   }
// `;

// export const CART_LINES_REMOVE_MUTATION = `
//   mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
//     cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
//       cart {
//         id
//         checkoutUrl
//         totalQuantity
//       }
//       userErrors {
//         field
//         message
//       }
//     }
//   }
// `;

export const PRODUCTS_BY_COLLECTION_QUERY = `
  query GetProductsByCollection(
    $handle: String!
    $first: Int!
    $after: String
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    collection(handle: $handle) {
      products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            id
            handle
            title
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;