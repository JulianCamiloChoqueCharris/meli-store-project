export type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

export type Review = {
  rating: number;
  comment: string;
  date?: string;
  reviewerName?: string;
  reviewerEmail?: string;
};

export type Meta = {
  createdAt?: string;
  updatedAt?: string;
  barcode?: string;
  qrCode?: string;
};

export type Product = {
  id: number;
  title: string;
  description?: string;
  price: number;
  category: string;

  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: Dimensions;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  minimumOrderQuantity?: number;
  meta?: Meta;

  images?: string[];
  thumbnail?: string;

  reviews?: Review[];
};

export type ProductsResponse = {
  ok: boolean;
  paging: { total: number; page: number; limit: number };
  products: Product[];
};

export type CategoriesResponse = {
  ok: boolean;
  categories: string[];
};

export type CategoryNode = {
  key: string;
  label: string;
  children?: CategoryNode[];
  isLeaf?: boolean;
};
