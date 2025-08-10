export type MeliSearchItem = {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  thumbnail: string;
  permalink: string;
  category_id: string;
};

export type MeliSearchResponse = {
  site_id: string;
  query: string | null;
  paging: {
    total: number;
    offset: number;
    limit: number;
    primary_results: number;
  };
  results: MeliSearchItem[];
};

export type ProductRow = {
  id: string;
  title: string;
  priceLabel: string;
  imageUrl: string;
  permalink: string;
  categoryId: string;
};
