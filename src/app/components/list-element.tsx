import { useState } from "react";
import { Product } from "../product";
import { useShopingList } from "../shopingListProvider";

export function ListElement({ product }: { product: Product }) {
  const { deleteProduct, editProduct } = useShopingList();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(product.name);

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  async function confirm(id: number) {
    if (inputValue !== "" && inputValue.length <= 20) {
      await editProduct(id, inputValue);
      setIsEditing(false);
    } else {
      console.error("The product name is incorrect");
      setInputValue(product.name);
    }
  }

  function enterPressed(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") confirm(product.id);
  }

  return !isEditing ? (
    <div className="listElement">
      <div>{product.name}</div>
      <div className="buttons">
        <button onClick={() => setIsEditing(true)}>
          <i className="fa-solid fa-pen-to-square icon"></i>
        </button>
        <button onClick={() => deleteProduct(product.id)} className="">
          <i className="fa-solid fa-trash-can icon"></i>
        </button>
      </div>
    </div>
  ) : (
    <div className="listElement">
      <input
        placeholder={product.name}
        value={inputValue}
        onChange={inputChange}
        onKeyDown={enterPressed}
        className="bg-transparent outline-transparent h-fit w-fit"
      />
      <div className="buttons !justify-end">
        <button onClick={() => confirm(product.id)}>
          <i className="fa-solid fa-square-check icon"></i>
        </button>
      </div>
    </div>
  );
}
