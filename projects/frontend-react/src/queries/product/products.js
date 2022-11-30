export const GET_PRODUCTS = `
  query getProducts {
    getProducts {
      _id
      name
      description
      image
      created_at
      updated_at
    }
  }
`;

export const SEARCH_PRODUCTS = `
  mutation searchProducts($input: SearchProductInput!) {
    searchProducts(input: $input) {
      _id
      name
      description
      image
      created_at
      updated_at
    }
  }
`;