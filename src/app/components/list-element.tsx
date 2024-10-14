import { Product } from "../product";

export function ListElement({ product }: { product: Product }) {
  return <div className="text-white">{product.name}</div>;
}
