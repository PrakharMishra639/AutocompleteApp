// types.ts

export interface Product {
  id: number;
  title: string;
}

export interface ProductItemProps {
  product: Product;
  onSelect: (product: Product) => void;
}
