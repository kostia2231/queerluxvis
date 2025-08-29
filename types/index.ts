export type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: {
    edges: {
      node: {
        src: string;
        altText: string | null;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
};

export type ProductsResponse = {
  products: {
    edges: {
      node: Product;
    }[];
  };
};
