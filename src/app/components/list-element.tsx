import { Product } from "../product";
import { useState } from "react";

export function ListElement({ product }: { product: Product }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(product.name);

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
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
        <button onClick={() => deleteTask(product.id)} className="">
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
