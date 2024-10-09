interface ProductProps {
  productName: string;
}

const Product: React.FC<ProductProps> = ({ productName }) => {
  return <div className="bg-black">{productName}</div>;
};

export default Product;
