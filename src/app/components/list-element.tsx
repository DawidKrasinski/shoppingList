import { Product } from "../product";
import { useState, useRef } from "react";
import { useShoppingList } from "../shoppingListProvider";

export function ListElement({ product }: { product: Product }) {
  const { editProduct, deleteProduct } = useShoppingList();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(product.name);
  const inputRef = useRef<HTMLInputElement>(null);

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

  async function handleEditButtonClick() {
    console.log(inputRef);
    setIsEditing(true);
    inputRef.current?.focus();
  }

  return !isEditing ? (
    <div className="listElement">
      <div>{product.name}</div>
      <div className="buttons">
        <button onClick={handleEditButtonClick}>
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
        ref={inputRef}
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
