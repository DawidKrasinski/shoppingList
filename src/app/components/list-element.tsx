import { Product } from "../product";

export function ListElement({
  product,
  fetchProducts,
}: {
  product: Product;
  fetchProducts: () => Promise<void>;
}) {
  async function deleteTask(id: number) {
    const response = await fetch("api/product", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    });
    fetchProducts();
  }

  return (
    <div className="listElement">
      <div>{product.name}</div>
      <button onClick={() => deleteTask(product.id)} className="">
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </div>
  );
}
