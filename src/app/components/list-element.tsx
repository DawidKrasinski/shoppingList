import { Product } from "../product";
import { useState } from "react";

export function ListElement({ product }: { product: Product }) {
  // const [productList, setProductList] = useState<Product[]>([]);
  // async function fetchProducts() {
  //   const response = await fetch("api/products");
  //   const body = await response.json();
  //   setProductList(body);
  // }

  async function deleteTask(id: number) {
    const response = await fetch("api/product", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    });
  }

  return (
    <div className="listElement">
      <div>{product.name}</div>
      <button
        onClick={() => deleteTask(product.id)}
        className="bg-red-400 w-10 h-10 rounded-md flex justify-center"
      >
        d
      </button>
    </div>
  );
}
