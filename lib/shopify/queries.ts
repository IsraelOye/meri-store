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
