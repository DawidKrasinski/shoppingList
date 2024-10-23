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
      <div className="buttons">
        <button>
          <i className="fa-solid fa-pen-to-square icon"></i>
        </button>
        <button onClick={() => deleteTask(product.id)} className="">
          <i className="fa-solid fa-trash-can icon"></i>
        </button>
      </div>
    </div>
  );
}
