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
      <button
        onClick={() => deleteTask(product.id)}
        className="bg-red-400 w-10 h-10 rounded-md flex justify-center"
      >
        d
      </button>
    </div>
  );
}
