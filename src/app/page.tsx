"use client";

import { useShoppingList } from "./shoppingListProvider";
import { useState } from "react";
import { ListElement } from "./components/list-element";
import { twMerge } from "tailwind-merge";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const { productList, addProduct } = useShoppingList();
  // const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    const value = e.target.value;
    setIsError(value.length > 20);
  }

  function enterPressed(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") addProductClickHandler();
  }

  async function addProductClickHandler() {
    if (!isError) {
      addProduct(inputValue);
      setInputValue("");
    } else {
      console.error("The product name is incorrect");
      // setErrorMessage("Product name maxium length is 20 characters");
    }
  }

  return (
    <div className="container">
      <div className="add">
        <input
          type="text"
          autoComplete="off"
          value={inputValue}
          id="addInput"
          className={twMerge("addInput", isError && "focus:outline-red-500")}
          placeholder=""
          onChange={inputChange}
          onKeyDown={enterPressed}
        />
        <label htmlFor="addInput">Product</label>
        <button className="addButton" onClick={addProductClickHandler}>
          Add
        </button>
      </div>

      <div className="spacer"></div>
      <div className="list">
        {productList.toReversed().map((product) => (
          <ListElement key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
