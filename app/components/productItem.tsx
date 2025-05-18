import React from "react";
import { ProductItemProps } from "../Types/types";

const ProductItem: React.FC<ProductItemProps> = ({ product, onSelect }) => {
  return (
    <li
      className="px-5 py-3 text-gray-700 hover:bg-blue-50 cursor-pointer transition duration-150"
      onClick={() => onSelect(product)}
    >
      {product?.title ?? "Unknown Product"}
    </li>
  );
};

export default ProductItem;
