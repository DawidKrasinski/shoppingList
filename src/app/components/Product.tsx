import React from "react";

interface ProductProps {
  productName: string;
}

const Product: React.FC<ProductProps> = ({ productName }) => {
  return <div className="text-white">{productName}</div>;
};

export default Product;
