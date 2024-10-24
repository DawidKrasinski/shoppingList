import { Product } from "../product";
import { useState } from "react";

export function ListElement({
  product,
  fetchProducts,
}: {
  product: Product;
  fetchProducts: () => Promise<void>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  async function deleteTask(id: number) {
    const response = await fetch("api/product", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    });
    fetchProducts();
  }

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  return !isEditing ? (
    <div className="listElement">
      <div>{product.name}</div>
      <div className="buttons">
        <button onClick={() => setIsEditing(true)}>
          <i className="fa-solid fa-pen-to-square icon"></i>
        </button>
        <button onClick={() => deleteTask(product.id)} className="">
          <i className="fa-solid fa-trash-can icon"></i>
        </button>
      </div>
    </div>
  ) : (
    <div className="listElement">
      <input value={product.name} onChange={inputChange} />
      <div className="buttons !justify-end">
        <button>
          <i className="fa-solid fa-square-check icon"></i>
        </button>
      </div>
    </div>
  );
}
